import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Share2,
  Copy,
  Check,
  MessageCircle,
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import logo from "../assets/rainbow_shiksha_logo.png";

const SITE_URL = "https://www.rainbowshiksha.org";
const SHARE_TEXT =
  "Rainbow Shiksha – Empowering underprivileged children through education in India since 2013. Join our mission! 🌈📚";
const HASHTAGS = "RainbowShiksha,EducationForAll,NGOIndia,DonateForEducation";

const shareLinks = {
  facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}`,
  twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(SITE_URL)}&text=${encodeURIComponent(SHARE_TEXT)}&hashtags=${HASHTAGS}`,
  whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(SHARE_TEXT + " " + SITE_URL)}`,
  linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE_URL)}`,
};

interface CardWrapperProps {
  label: string;
  icon: React.ReactNode;
  accentColor: string;
  buttonClassName: string;
  shareHref?: string;
  onShare?: () => void;
  children: React.ReactNode;
}

const CardWrapper: React.FC<CardWrapperProps> = ({
  label,
  icon,
  accentColor,
  buttonClassName,
  shareHref,
  onShare,
  children,
}) => (
  <div className="flex flex-col gap-3">
    <div className={`flex items-center gap-2 font-semibold ${accentColor}`}>
      {icon}
      <span>{label}</span>
    </div>

    <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 w-full">
      {children}
    </div>

    {shareHref ? (
      <a
        href={shareHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:shadow-lg ${buttonClassName}`}
      >
        <Share2 className="h-4 w-4" />
        Share on {label}
      </a>
    ) : (
      <button
        onClick={onShare}
        className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:shadow-lg ${buttonClassName}`}
      >
        <Share2 className="h-4 w-4" />
        {label === "Instagram" ? "Copy Link for Instagram" : `Share on ${label}`}
      </button>
    )}
  </div>
);

const ShareCards: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(SITE_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { number: "25+", label: "Children Supported" },
    { number: "5+", label: "Schools Partnered" },
    { number: "₹3L+", label: "Funds Raised" },
    { number: "13+", label: "Years of Service" },
  ];

  return (
    <div>
      <SEOHead
        title="Share Our Mission"
        description="Help spread the word about Rainbow Shiksha. Share our story on Facebook, Twitter, Instagram, WhatsApp, and LinkedIn."
        path="#/share"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Rainbow Shiksha" className="h-24 object-contain drop-shadow-md" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Share Our{" "}
            <span className="bg-gradient-to-r from-blue-600 via-green-600 to-yellow-600 bg-clip-text text-transparent">
              Mission
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Every share brings us closer to our goal of educating every child in India.
            Pick your platform and help us grow.
          </p>
          <button
            onClick={copyLink}
            className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-white hover:shadow-md transition-all duration-200"
          >
            {copied ? <Check className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      </section>

      {/* Cards grid */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* ── Facebook Card ─────────────────────────────────────── */}
            <CardWrapper
              label="Facebook"
              icon={<Facebook className="h-5 w-5" />}
              accentColor="text-blue-600"
              buttonClassName="bg-blue-600"
              shareHref={shareLinks.facebook}
            >
              {/* aspect-ratio 1.91:1 */}
              <div
                className="relative w-full bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 flex flex-col items-center justify-center px-8 py-10 gap-4"
                style={{ aspectRatio: "1.91 / 1" }}
              >
                {/* Decorative circles */}
                <div className="absolute top-0 left-0 w-40 h-40 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-56 h-56 bg-white opacity-5 rounded-full translate-x-1/4 translate-y-1/4" />

                <img src={logo} alt="Rainbow Shiksha" className="h-14 object-contain drop-shadow-lg" />
                <div className="text-center text-white">
                  <div className="text-2xl font-bold tracking-wide">Rainbow Shiksha</div>
                  <div className="text-sm opacity-80 mt-1">Empowering Children Through Education</div>
                </div>
                <div className="flex gap-6 mt-2">
                  {stats.slice(0, 3).map((s) => (
                    <div key={s.label} className="text-center text-white">
                      <div className="text-xl font-bold">{s.number}</div>
                      <div className="text-xs opacity-75 leading-tight">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="text-white text-xs opacity-60 mt-1">www.rainbowshiksha.org</div>
              </div>
              {/* Facebook link preview bar */}
              <div className="bg-gray-100 px-4 py-3 border-t border-gray-200">
                <div className="text-xs text-gray-500 uppercase tracking-wide">RAINBOWSHIKSHA.ORG</div>
                <div className="text-sm font-semibold text-gray-900 leading-snug mt-0.5">
                  Rainbow Shiksha | Empowering Education for Underprivileged Children in India
                </div>
                <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                  Rainbow Shiksha is a registered non-profit NGO supporting underprivileged children with education, stationery, fee assistance, and community programs across India since 2013.
                </div>
              </div>
            </CardWrapper>

            {/* ── Twitter / X Card ───────────────────────────────────── */}
            <CardWrapper
              label="Twitter / X"
              icon={<Twitter className="h-5 w-5" />}
              accentColor="text-sky-500"
              buttonClassName="bg-sky-500"
              shareHref={shareLinks.twitter}
            >
              {/* aspect-ratio 16:9 */}
              <div
                className="relative w-full bg-gradient-to-br from-gray-900 via-gray-800 to-sky-900 flex flex-col items-center justify-center px-8 py-8 gap-4"
                style={{ aspectRatio: "16 / 9" }}
              >
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "radial-gradient(circle at 20% 80%, #38bdf8 0%, transparent 50%), radial-gradient(circle at 80% 20%, #22d3ee 0%, transparent 50%)",
                  }}
                />
                <img src={logo} alt="Rainbow Shiksha" className="h-12 object-contain drop-shadow-lg" />
                <div className="text-center text-white">
                  <div className="text-xl font-bold">Rainbow Shiksha</div>
                  <div className="text-sm text-sky-300 mt-1">Empowering Children Through Education</div>
                </div>
                <div className="flex gap-6">
                  {stats.map((s) => (
                    <div key={s.label} className="text-center text-white">
                      <div className="text-lg font-bold">{s.number}</div>
                      <div className="text-xs text-gray-400 leading-tight">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-1">www.rainbowshiksha.org</div>
              </div>
              {/* X preview bar */}
              <div className="bg-white px-4 py-2 border-t border-gray-200 flex items-center gap-2">
                <div className="text-xs text-gray-400 flex-1">rainbowshiksha.org • Summary Large Image</div>
              </div>
            </CardWrapper>

            {/* ── Instagram Card ────────────────────────────────────── */}
            <CardWrapper
              label="Instagram"
              icon={<Instagram className="h-5 w-5" />}
              accentColor="text-pink-500"
              buttonClassName="bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-600"
              onShare={copyLink}
            >
              {/* 1:1 square */}
              <div
                className="relative w-full flex flex-col items-center justify-between px-8 py-10"
                style={{
                  aspectRatio: "1 / 1",
                  background: "linear-gradient(135deg, #f9a825 0%, #e91e8c 40%, #7b2ff7 80%, #2563eb 100%)",
                }}
              >
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "radial-gradient(circle at 50% 50%, white 0%, transparent 70%)",
                  }}
                />

                {/* Top: logo + handle */}
                <div className="flex items-center gap-3 self-start z-10">
                  <img src={logo} alt="" className="h-10 w-10 rounded-full object-contain bg-white p-1 shadow" />
                  <div className="text-white">
                    <div className="font-bold text-sm leading-tight">rainbowshiksha</div>
                    <div className="text-xs opacity-75">Non-Profit Organization</div>
                  </div>
                </div>

                {/* Center: headline */}
                <div className="text-center z-10">
                  <div className="text-white font-black text-3xl leading-tight drop-shadow-lg">
                    Every Child<br />Deserves<br />Education
                  </div>
                </div>

                {/* Bottom: stats + hashtags */}
                <div className="z-10 w-full">
                  <div className="flex justify-around mb-4">
                    {stats.map((s) => (
                      <div key={s.label} className="text-center text-white">
                        <div className="text-xl font-bold drop-shadow">{s.number}</div>
                        <div className="text-xs opacity-80 leading-tight">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center text-white text-xs opacity-80 leading-relaxed">
                    #RainbowShiksha #EducationForAll #NGOIndia<br />
                    #DonateForEducation #KidsEducation
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 text-xs text-gray-400">
                Instagram doesn't support web sharing — copy link and paste in your caption.
              </div>
            </CardWrapper>

            {/* ── WhatsApp Card ─────────────────────────────────────── */}
            <CardWrapper
              label="WhatsApp"
              icon={<MessageCircle className="h-5 w-5" />}
              accentColor="text-green-600"
              buttonClassName="bg-green-600"
              shareHref={shareLinks.whatsapp}
            >
              {/* 1.91:1 */}
              <div
                className="relative w-full flex flex-col items-center justify-center px-8 py-10 gap-4"
                style={{
                  aspectRatio: "1.91 / 1",
                  background: "linear-gradient(135deg, #075e54 0%, #128c7e 50%, #25d366 100%)",
                }}
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full translate-x-1/4 -translate-y-1/4" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-x-1/4 translate-y-1/4" />

                <img src={logo} alt="Rainbow Shiksha" className="h-14 object-contain drop-shadow-lg" />
                <div className="text-center text-white">
                  <div className="text-2xl font-bold">Rainbow Shiksha</div>
                  <div className="text-sm opacity-80 mt-1">Empowering Children Through Education</div>
                </div>

                <div className="bg-white bg-opacity-15 rounded-xl px-6 py-3 text-white text-center text-sm">
                  <span className="font-semibold">📞 +91 9959277190</span>
                  {"  •  "}
                  <span className="opacity-80">www.rainbowshiksha.org</span>
                </div>

                <div className="text-white text-xs opacity-60">
                  Registered Non-Profit NGO | Since 2013
                </div>
              </div>
              {/* WhatsApp message preview */}
              <div className="bg-[#e5ddd5] px-4 py-3">
                <div className="bg-white rounded-lg px-3 py-2 shadow-sm max-w-xs">
                  <div className="text-xs font-semibold text-green-700 mb-1">Rainbow Shiksha</div>
                  <div className="text-xs text-gray-700 leading-relaxed">
                    {SHARE_TEXT}
                  </div>
                  <div className="text-xs text-blue-600 mt-1">{SITE_URL}</div>
                </div>
              </div>
            </CardWrapper>

            {/* ── LinkedIn Card ─────────────────────────────────────── */}
            <div className="lg:col-span-2">
              <CardWrapper
                label="LinkedIn"
                icon={<Linkedin className="h-5 w-5" />}
                accentColor="text-blue-700"
                buttonClassName="bg-blue-700"
                shareHref={shareLinks.linkedin}
              >
                {/* 1.91:1 — full-width on desktop */}
                <div className="flex flex-col md:flex-row">
                  <div
                    className="relative flex flex-col items-center justify-center px-10 py-10 gap-4 md:w-3/5"
                    style={{
                      background: "linear-gradient(135deg, #0a66c2 0%, #0073b1 60%, #004182 100%)",
                      minHeight: "240px",
                    }}
                  >
                    <div className="absolute inset-0 opacity-5"
                      style={{
                        backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
                        backgroundSize: "12px 12px",
                      }}
                    />
                    <img src={logo} alt="Rainbow Shiksha" className="h-16 object-contain drop-shadow-lg" />
                    <div className="text-center text-white">
                      <div className="text-2xl font-bold">Rainbow Shiksha</div>
                      <div className="text-sm opacity-80 mt-1 italic">
                        "Empowering Children Through Education"
                      </div>
                    </div>
                    <div className="flex gap-6 mt-2">
                      {stats.map((s) => (
                        <div key={s.label} className="text-center text-white">
                          <div className="text-xl font-bold">{s.number}</div>
                          <div className="text-xs opacity-70 leading-tight">{s.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="text-white text-xs opacity-50 mt-1">www.rainbowshiksha.org</div>
                  </div>

                  {/* LinkedIn right panel (article text) */}
                  <div className="bg-white px-6 py-6 flex flex-col justify-between md:w-2/5 border-l border-gray-200">
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">RAINBOWSHIKSHA.ORG</div>
                      <div className="text-base font-bold text-gray-900 leading-snug mb-2">
                        Rainbow Shiksha | Empowering Education for Underprivileged Children in India
                      </div>
                      <div className="text-sm text-gray-500 leading-relaxed line-clamp-4">
                        Rainbow Shiksha is a registered non-profit NGO supporting underprivileged children with education, stationery, fee assistance, and community programs across India since 2013.
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {["#RainbowShiksha", "#NGO", "#Education", "#CSR", "#SocialImpact"].map((tag) => (
                        <span key={tag} className="text-xs text-blue-700 hover:underline cursor-pointer">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardWrapper>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 via-green-600 to-yellow-600 text-white py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Every Share Makes a Difference</h2>
          <p className="text-lg opacity-90 mb-6">
            Help us reach more donors, volunteers, and well-wishers who can join our mission.
          </p>
          <button
            onClick={copyLink}
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-3 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            {copied ? <Check className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
            {copied ? "Link Copied!" : "Copy Page Link"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default ShareCards;
