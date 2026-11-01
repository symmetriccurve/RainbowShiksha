import { ChevronDown, HelpCircle } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";

type Faq = { q: string; a: React.ReactNode };
type FaqGroup = { title: string; items: Faq[] };

const groups: FaqGroup[] = [
  {
    title: "About Rainbow Shiksha",
    items: [
      {
        q: "Is Rainbow Shiksha a registered organization?",
        a: (
          <>
            Yes. We are registered as <strong>Rainbow Shiksha Education
            Development Trust</strong> (Regt No: 48/2025) and listed on the
            NITI Aayog NGO Darpan portal (Darpan Id: AP/2025/0805747). Our
            registered office is at B R Reddy Colony, Kallur Estate, Kurnool
            518003, Andhra Pradesh. Our work began in 2013; the trust was
            formally registered in 2025 so we could scale our impact.
          </>
        ),
      },
      {
        q: "Is Rainbow Shiksha a registered company?",
        a: (
          <>
            No. Rainbow Shiksha is a registered <strong>charitable trust</strong>,
            not a private or public limited company. It is a non-profit: no one
            owns it or takes profit from it, and its funds are used only for
            its educational objectives.
          </>
        ),
      },
      {
        q: "How do I know Rainbow Shiksha is legitimate?",
        a: (
          <>
            You can check our registration number and Darpan Id (above) on the
            official NGO Darpan portal. Donations go only to the trust's
            official UPI ID and bank account shown on our{" "}
            <Link to="/donate" className="text-blue-600 underline">
              Donate page
            </Link>
            , in the trust's name. We never ask for donations to a personal
            account. You are always welcome to{" "}
            <Link to="/contact" className="text-blue-600 underline">
              contact us
            </Link>{" "}
            to verify anything.
          </>
        ),
      },
      {
        q: "How transparent are you about how funds are used?",
        a: (
          <>
            We publish what we do with the money: photos and details of every
            event on our{" "}
            <Link to="/gallery" className="text-blue-600 underline">
              Gallery
            </Link>
            , our{" "}
            <Link to="/impact" className="text-blue-600 underline">
              Impact
            </Link>{" "}
            page, and our{" "}
            <Link to="/events" className="text-blue-600 underline">
              Events
            </Link>{" "}
            page. Sponsors of individual students receive regular updates on
            their progress. If you want details on a specific donation, write
            to us and we will share them.
          </>
        ),
      },
    ],
  },
  {
    title: "Donations & Tax Receipts",
    items: [
      {
        q: "How can I contribute to the organization?",
        a: (
          <>
            There are four ways: <strong>donate</strong> via UPI or bank
            transfer, <strong>sponsor</strong> a student's school fees,{" "}
            <strong>give in kind</strong> (books, stationery, computers), or{" "}
            <strong>volunteer</strong> your time as a teacher, mentor or career
            advisor. Organizations can also partner with us through CSR. See{" "}
            <Link to="/donate" className="text-blue-600 underline">
              Donate
            </Link>{" "}
            and{" "}
            <Link to="/get-involved" className="text-blue-600 underline">
              Get Involved
            </Link>
            .
          </>
        ),
      },
      {
        q: "Will I get a tax receipt after donating?",
        a: (
          <>
            Yes. Donations are eligible for 80G tax deductions under the Indian
            Income Tax Act. After you donate, send us your payment reference
            through the{" "}
            <Link to="/contact" className="text-blue-600 underline">
              Contact page
            </Link>{" "}
            along with your name and PAN, and we will issue your receipt.
          </>
        ),
      },
      {
        q: "Can I visit the schools or students you support?",
        a: (
          <>
            Yes. We organize school visits around our upcoming events.{" "}
            <Link to="/contact" className="text-blue-600 underline">
              Contact us
            </Link>{" "}
            to schedule one.
          </>
        ),
      },
    ],
  },
  {
    title: "Joining & Eligibility",
    items: [
      {
        q: "How do I join Rainbow Shiksha?",
        a: (
          <>
            Choose a role on our{" "}
            <Link to="/get-involved" className="text-blue-600 underline">
              Get Involved
            </Link>{" "}
            page and apply to volunteer, or send us a message on the{" "}
            <Link to="/contact" className="text-blue-600 underline">
              Contact page
            </Link>
            . We will get back to you about the roles currently open.
          </>
        ),
      },
      {
        q: "Who is eligible to volunteer?",
        a: "Anyone with the time and a genuine wish to help children learn. Roles include teaching, career guidance, student mentoring and fundraising support, with commitments of roughly 2–6 hours a week, onsite or remote. A degree is preferred for teaching but is not required for every role.",
      },
      {
        q: "Who is eligible for support from Rainbow Shiksha?",
        a: "We support underprivileged students who need help with school fees, stationery, books, or access to technology. Teachers, schools and families can contact us with a student's details and we will review each case.",
      },
    ],
  },
];

const FAQ: React.FC = () => {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="FAQ – Frequently Asked Questions"
        description="Answers about Rainbow Shiksha: how to join, who is eligible, how to contribute, 80G tax receipts, our registration as a charitable trust, and how we stay transparent."
        path="#/faq"
      />
      <section className="bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 rounded-full flex items-center justify-center">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Everything you may want to know about Rainbow Shiksha: who we are,
            how to join, how to give, and how we keep it transparent.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {groups.map((group, gi) => (
            <div key={group.title}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {group.title}
              </h2>
              <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white shadow-sm">
                {group.items.map((item, i) => {
                  const id = `faq-${gi}-${i}`;
                  const isOpen = open === id;
                  return (
                    <div key={id}>
                      <h3>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`${id}-panel`}
                          onClick={() => setOpen(isOpen ? null : id)}
                          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        >
                          {item.q}
                          <ChevronDown
                            className={`h-5 w-5 shrink-0 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                      </h3>
                      {isOpen && (
                        <div
                          id={`${id}-panel`}
                          className="px-5 pb-5 text-gray-600 leading-relaxed"
                        >
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <p className="text-center text-gray-600">
            Still have a question?{" "}
            <Link to="/contact" className="text-blue-600 underline">
              Get in touch
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
