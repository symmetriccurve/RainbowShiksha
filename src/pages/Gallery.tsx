import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SEOHead from "../components/SEOHead";

// Every sub-folder of src/assets/gallery is its own event section.
// Name folders "<event>-<year>" (e.g. book-distribution-2022) and files
// "<folder>-01.jpg" / "<folder>-video-01.mp4"; sections are grouped by year.
// Drop a new folder of photos in there and it shows up automatically.
// Videos (mp4/webm/mov) in the same folders are shown alongside the photos.
const images = import.meta.glob(
  "../assets/gallery/*/*.{png,jpg,jpeg,webp,svg,mp4,webm,mov}",
  {
    eager: true,
    as: "url",
  },
) as Record<string, string>;

const isVideoPath = (path: string) => /\.(mp4|webm|mov)$/i.test(path);

// Optional display-name overrides, keyed by folder name (the year is shown
// as the year heading, so leave it out of the title).
// Folders without an entry get a title generated from the folder name.
const titleOverrides: Record<string, string> = {
  "bag-donation-kbr": "Bag Donation – KBR",
  "shaik-sameera-fee-support-2026": "Shaik Sameera – Fee Support",
  "mounika-fee-support-2025": "K. Mounika – Fee Support",
  "madhava-school-website-2026": "Madhava School Website Launch in the News",
  "braille-event-jan-2021": "Braille Day Event (January)",
  "p-indra-reddy-fee-support-2022": "P. Indra Reddy – Fee Support",
  "boya-ramudu-fee-support-2023": "Boya Ramudu – Fee Support",
  "puli-laxmi-durga-fee-support-2023": "Puli Lakshmi Durga – Fee Support",
  "vanaja-devi-fee-support-2022": "Vanaja Devi – Fee Support",
  "ramulu-fee-support": "Ramulu – Fee Support",
};

const UNDATED = "Other";

type MediaItem = { url: string; isVideo: boolean };

type EventSection = {
  slug: string;
  title: string;
  year: string | null;
  photos: MediaItem[];
};

const prettify = (slug: string) =>
  slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const buildSections = (): EventSection[] => {
  const bySlug: Record<string, { path: string; url: string }[]> = {};
  for (const [path, url] of Object.entries(images)) {
    const slug = path.split("/").slice(-2, -1)[0];
    (bySlug[slug] ||= []).push({ path, url });
  }
  return Object.entries(bySlug)
    .map(([slug, files]) => {
      const year = slug.match(/(?:^|[-_])(\d{4})$/)?.[1] ?? null;
      const base = year ? slug.slice(0, -5) : slug;
      return {
        slug,
        year,
        title: titleOverrides[slug] ?? prettify(base),
        photos: files
          .sort((a, b) =>
            a.path.localeCompare(b.path, undefined, { numeric: true }),
          )
          .map((f) => ({ url: f.url, isVideo: isVideoPath(f.path) })),
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
};

// Newest year first; undated folders go last
const groupByYear = (sections: EventSection[]) => {
  const groups = new Map<string, EventSection[]>();
  for (const s of sections) {
    const key = s.year ?? UNDATED;
    groups.set(key, [...(groups.get(key) ?? []), s]);
  }
  return [...groups.entries()].sort(([a], [b]) =>
    a === UNDATED ? 1 : b === UNDATED ? -1 : Number(b) - Number(a),
  );
};

const countLabel = (items: MediaItem[]) => {
  const videos = items.filter((m) => m.isVideo).length;
  const photos = items.length - videos;
  const parts: string[] = [];
  if (photos) parts.push(`${photos} ${photos === 1 ? "photo" : "photos"}`);
  if (videos) parts.push(`${videos} ${videos === 1 ? "video" : "videos"}`);
  return parts.join(" · ");
};

const Gallery = () => {
  const sections = useMemo(buildSections, []);
  const yearGroups = useMemo(() => groupByYear(sections), [sections]);
  // Lightbox is scoped to one event: which section, and which photo in it
  const [viewer, setViewer] = useState<{ slug: string; index: number } | null>(
    null,
  );
  const [searchParams] = useSearchParams();
  const targetEvent = searchParams.get("event");
  const [touchX, setTouchX] = useState<number | null>(null);

  const photos = sections.find((s) => s.slug === viewer?.slug);
  const count = photos?.photos.length ?? 0;

  const close = useCallback(() => setViewer(null), []);
  const step = useCallback(
    (d: number) =>
      setViewer((v) =>
        v && count ? { ...v, index: (v.index + d + count) % count } : v,
      ),
    [count],
  );

  // Deep link: /gallery?event=<folder> scrolls to that event's section
  useEffect(() => {
    if (!targetEvent) return;
    document
      .getElementById(`event-${targetEvent}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [targetEvent]);

  useEffect(() => {
    if (!viewer) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [viewer, close, step]);

  return (
    <>
      <SEOHead
        title="Gallery – Photos from Our Events & Programs"
        description="Browse photos from Rainbow Shiksha events — bag donations, computer distributions, Children's Day celebrations, stationery drives, and more across India."
        path="#/gallery"
      />
      <section
        className="bg-white py-10 sm:py-16"
        aria-label="Event photo gallery"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Event Gallery
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Moments from our events and programs
            </p>
          </header>

          {/* One independent section per event folder, all photos shown inline */}
          <div className="space-y-14 sm:space-y-20">
            {yearGroups.map(([year, yearSections]) => (
              <div key={year} id={`year-${year}`} className="scroll-mt-24">
                <h3 className="mb-6 text-2xl sm:text-3xl font-extrabold text-blue-700">
                  {year}
                </h3>
                <div className="space-y-12 sm:space-y-16">
                  {yearSections.map((section) => (
                    <section
                      key={section.slug}
                      id={`event-${section.slug}`}
                      aria-labelledby={`event-title-${section.slug}`}
                      className="scroll-mt-24"
                    >
                      <div className="mb-4 flex items-baseline justify-between gap-3 border-b border-gray-200 pb-2">
                        <h4
                          id={`event-title-${section.slug}`}
                          className="text-xl sm:text-2xl font-bold text-gray-900"
                        >
                          {section.title}
                        </h4>
                        <span className="shrink-0 text-xs sm:text-sm text-gray-500">
                          {countLabel(section.photos)}
                        </span>
                      </div>
                      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                        {section.photos.map(({ url: src, isVideo }, i) => (
                          <li key={src}>
                            <button
                              type="button"
                              onClick={() =>
                                setViewer({ slug: section.slug, index: i })
                              }
                              aria-label={`Open ${section.title} ${isVideo ? "video" : "photo"} ${i + 1} of ${section.photos.length}`}
                              className="group relative block w-full aspect-square overflow-hidden rounded-lg bg-gray-100 shadow-sm hover:shadow-lg transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                            >
                              {isVideo ? (
                                <>
                                  <video
                                    src={`${src}#t=0.1`}
                                    preload="metadata"
                                    muted
                                    playsInline
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  />
                                  <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white">
                                      <Play className="h-6 w-6 fill-current" />
                                    </span>
                                  </span>
                                </>
                              ) : (
                                <img
                                  src={src}
                                  alt={`${section.title} – photo ${i + 1}`}
                                  loading="lazy"
                                  decoding="async"
                                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox, limited to the photos of the section it was opened from */}
      {viewer && photos && photos.photos[viewer.index] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label={photos.title}
          onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX === null) return;
            const dx = e.changedTouches[0].clientX - touchX;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            setTouchX(null);
          }}
        >
          <button
            type="button"
            aria-label="Close backdrop"
            onClick={close}
            className="absolute inset-0 cursor-default"
          />
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white focus:outline-none focus-visible:ring-2"
          >
            <X className="h-5 w-5" />
          </button>
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous"
                className="absolute left-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white focus:outline-none focus-visible:ring-2"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next"
                className="absolute right-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white focus:outline-none focus-visible:ring-2"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
          {photos.photos[viewer.index].isVideo ? (
            <video
              key={photos.photos[viewer.index].url}
              src={photos.photos[viewer.index].url}
              controls
              autoPlay
              playsInline
              className="relative max-h-[85dvh] max-w-full object-contain px-12 sm:px-16"
            />
          ) : (
            <img
              src={photos.photos[viewer.index].url}
              alt={`${photos.title} – photo ${viewer.index + 1}`}
              className="relative max-h-[85dvh] max-w-full object-contain px-12 sm:px-16"
            />
          )}
          <div className="pointer-events-none absolute bottom-4 left-0 right-0 px-4 text-center text-sm text-white/80">
            {photos.title} · {viewer.index + 1} / {count}
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
