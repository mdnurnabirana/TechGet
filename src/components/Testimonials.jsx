import React from "react";
import Image from "next/image";

const testimonials = [
  {
    name: "Jennifer",
    location: "California",
    text: "I have been going to Certified Auto for almost four years now, and have always received great service and fair prices. They always go out of their way to finish the work...",
    rating: 5,
  },
  {
    name: "Jessica",
    location: "Chicago",
    text: "I have been going to Certified Auto for almost four years now, and have always received great service and fair prices. They always go out of their way to finish the work...",
    rating: 5,
  },
  {
    name: "Daniel",
    location: "Seattle",
    text: "I have been going to Certified Auto for almost four years now, and have always received great service and fair prices. They always go out of their way to finish the work...",
    rating: 5,
  },
  {
    name: "Rebeccah",
    location: "Nevada",
    text: "I have been going to Certified Auto for almost four years now, and have always received great service and fair prices. They always go out of their way to finish the work...",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="container mx-auto my-15 px-5">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-base-content">
          WHAT OUR CUSTOMERS SAY
        </h2>
        <p className="mt-2 text-base-content/70 text-sm sm:text-base">
          Our references are very valuable – the result of great effort
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((item) => (
          <div
            key={item.name}
            className="flex flex-col gap-4 bg-base-200 p-5 rounded-2xl shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-base-300">
                <Image
                  src="/assets/avatar_fallback.png"
                  alt={`${item.name} avatar`}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h4 className="font-semibold text-base-content text-base">
                  {item.name}
                </h4>
                <p className="text-base-content/60 text-xs sm:text-sm">
                  {item.location}
                </p>
              </div>
            </div>

            <div className="flex gap-0.5">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">
                    ★
                  </span>
                ))}
            </div>

            <blockquote className="text-base-content/80 text-sm leading-relaxed">
              {item.text}
            </blockquote>
          </div>
        ))}
      </div>
    </section>
  );
}