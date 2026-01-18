import React, { useState } from "react";

export default function ExploreShop() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="container mx-auto my-12">
      <div className="bg-linear-to-br from-base-100 to-base-200/60 rounded-3xl shadow-xl overflow-hidden border border-base-200/80">
        <div className="px-6 py-12 md:px-12 lg:px-16 lg:py-16">
          <div className="max-w-3xl mx-auto text-center md:text-left">
            <div className="inline-block mb-3">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                About Us
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-4.5xl font-bold text-title tracking-tight mb-6">
              Explore TechGet Ultra
            </h2>

            {/* First paragraph - always visible */}
            <p className="text-content text-base sm:text-lg leading-relaxed mb-8">
              TechGet Ultra is your trusted destination for premium mobile
              accessories, high-performance gadgets, computer components and
              quality automotive parts. We carefully select every product to
              offer genuine quality, fair prices, lightning-fast delivery across
              Bangladesh and a truly seamless shopping experience.
            </p>

            {/* Expandable second paragraph */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-content text-base sm:text-lg leading-relaxed mb-8">
                Our goal is simple — make advanced technology and reliable auto
                essentials accessible to everyone. With thousands of happy
                customers, hundreds of carefully curated items, multiple secure
                payment options and dedicated support available every day,
                TechGet Ultra continues to grow as one of the most dependable
                names in Bangladeshi e-commerce. Shop with confidence — your
                satisfaction is always our highest priority.
              </p>
            </div>

            {/* Toggle button - nicer style */}
            <button
              onClick={() => setExpanded(!expanded)}
              className={`
                group inline-flex items-center gap-2 px-6 py-3 rounded-xl
                text-primary font-medium transition-all duration-300
                hover:bg-primary/10 active:bg-primary/15
                focus:outline-none focus:ring-2 focus:ring-primary/30
              `}
            >
              <span>{expanded ? "Show Less" : "Read More"}</span>
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${
                  expanded ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}