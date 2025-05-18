import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Programs from './components/Programs';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <section id="accueil">
        <Hero />
      </section>
      <Features />
      <section id="formations">
        <Programs />
      </section>
      <Testimonials />
      <CTA />
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </main>
  );
}
