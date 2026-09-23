import React from 'react';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import Comparison from '../components/Comparison';
import ServiceSectors from '../components/ServiceSectors';
import WhyChooseUs from '../components/WhyChooseUs';
import Goal from '../components/Goal';
import About from '../components/About';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Intro />
      <Comparison />
      <ServiceSectors />
      <WhyChooseUs />
      <Goal />
      <About />
    </>
  );
};

export default HomePage;
