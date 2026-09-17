import React from 'react';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import Services from '../components/Services';
import ServiceSectors from '../components/ServiceSectors';
import WhyChooseUs from '../components/WhyChooseUs';
import Goal from '../components/Goal';
import About from '../components/About';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <ServiceSectors />
      <WhyChooseUs />
      <Goal />
      <About />
    </>
  );
};

export default HomePage;
