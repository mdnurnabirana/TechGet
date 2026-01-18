import React from "react";

export default function StoreStats() {
  return (
    <section className="container mx-auto my-10 px-5">
      <div className="bg-base-100 rounded-2xl shadow-md overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left - Text Content */}
          <div className="p-8 md:p-12 lg:p-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-title mb-5">
              Explore Our E-Commerce Store
            </h2>

            <p className="text-content text-base leading-relaxed mb-8">
              At{" "}
              <span className="font-semibold text-primary">TechGet Ultra</span>,
              we bring you the best in tech accessories, gadgets, and
              ultra-performance components with fast delivery, genuine products,
              and unbeatable prices. Join thousands of satisfied customers who
              trust us for their everyday tech needs.
            </p>

            <div className="flex flex-wrap gap-8">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  1,200+
                </div>
                <p className="text-content/80 text-sm mt-1">Products</p>
              </div>

              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  60+
                </div>
                <p className="text-content/80 text-sm mt-1">Categories</p>
              </div>
            </div>
          </div>

          {/* Right - Big Numbers */}
          <div className="bg-base-200 p-8 md:p-12 lg:p-16 flex items-center">
            <div className="w-full grid grid-cols-2 gap-10 md:gap-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-title">
                  22,000+
                </div>
                <p className="text-content/70 mt-3 text-base md:text-lg">
                  Products Sold
                </p>
              </div>

              <div className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-title">
                  5,000+
                </div>
                <p className="text-content/70 mt-3 text-base md:text-lg">
                  Happy Customers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}