import React from 'react';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Goal from '../components/Goal';
import About from '../components/About';
import Testimonials from '../components/Testimonials';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <WhyChooseUs />
      <Goal />
      <About />
      <Testimonials />
    </>
  );
};

export default HomePage;
