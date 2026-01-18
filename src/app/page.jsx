"use client";

import React from "react";

import Hero from "@/components/Hero";
import CategoryCatelog from "@/components/CategoryCatelog";
import ExploreShop from "@/components/ExploreShop";
import StoreFeatures from "@/components/StoreFeatures";
import StoreStats from "@/components/StoreStats";
import Testimonials from "@/components/Testimonials";
import NewsLetter from "@/components/NewsLetter";

export default function Home() {
  return (
    <div>
      <Hero />
      <CategoryCatelog />
      <ExploreShop />
      <StoreFeatures />
      <StoreStats />
      <Testimonials />
      <NewsLetter />
    </div>
  );
}