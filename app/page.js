// app/page.js
'use client';
import { useState } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CategoryCircles from './components/CategoryCircles';
import FeaturedProducts from './components/FeaturedProducts';
import WhyVerdora from './components/WhyVerdora';
import ProductGrid from './components/ProductGrid';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import AuthModal from './components/AuthModal';

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <Header onCartOpen={() => setCartOpen(true)} onAuthOpen={() => setAuthOpen(true)} />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <main>
        <HeroBanner />
        <CategoryCircles />
        <FeaturedProducts />
        <WhyVerdora />
        <div id="products">
          <ProductGrid />
        </div>
        <Features />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}