import CategoryCatelog from '@/components/CategoryCatelog';
import Hero from '@/components/Hero';
import Logo from '@/components/Logo';
import StoreFeatures from '@/components/StoreFeatures';
import Testimonials from '@/components/Testimonials';
import React from 'react';

const Home = () => {
  return (
    <div>
      <Hero />
      <CategoryCatelog />
      <StoreFeatures />
      <Testimonials />
    </div>
  );
};

export default Home;