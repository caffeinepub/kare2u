import React, { useRef } from 'react';
import { Hero } from './components/Hero';
import { BrandValues } from './components/BrandValues';
import { ProductCatalog } from './components/ProductCatalog';
import { WhyKare2U } from './components/WhyKare2U';
import { BrandStory } from './components/BrandStory';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleShopBaby = () => {
    scrollTo('products');
    // Small delay to let scroll start, then switch to baby tab
    setTimeout(() => {
      const babyTab = document.querySelector('[data-value="baby"]') as HTMLButtonElement;
      if (babyTab) babyTab.click();
    }, 400);
  };

  const handleShopAdult = () => {
    scrollTo('products');
    setTimeout(() => {
      const adultTab = document.querySelector('[data-value="adult"]') as HTMLButtonElement;
      if (adultTab) adultTab.click();
    }, 400);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onScrollTo={scrollTo} />

      <main>
        <Hero onShopBaby={handleShopBaby} onShopAdult={handleShopAdult} />
        <BrandValues />
        <ProductCatalog />
        <WhyKare2U />
        <BrandStory />
      </main>

      <Footer onScrollTo={scrollTo} />
    </div>
  );
}

export default App;
