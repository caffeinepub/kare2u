import React from 'react';
import { LeafMotif } from './LeafMotif';

interface HeroProps {
  onShopBaby: () => void;
  onShopAdult: () => void;
}

export function Hero({ onShopBaby, onShopAdult }: HeroProps) {
  return (
    <section
      id="home"
      className="relative w-full min-h-[600px] flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, oklch(0.96 0.04 220) 0%, oklch(0.98 0.02 150) 50%, oklch(0.97 0.03 200) 100%)',
      }}
    >
      {/* Hero background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-bg.dim_1440x600.png"
          alt=""
          className="w-full h-full object-cover opacity-30"
          aria-hidden="true"
        />
      </div>

      {/* Decorative leaf motifs */}
      <div className="absolute top-8 right-8 z-10 hidden md:block" aria-hidden="true">
        <LeafMotif color="green" size="xl" opacity={0.35} rotate={15} />
      </div>
      <div className="absolute bottom-4 right-32 z-10 hidden lg:block" aria-hidden="true">
        <LeafMotif color="blue" size="lg" opacity={0.25} rotate={-30} />
      </div>
      <div className="absolute top-16 left-8 z-10 hidden lg:block" aria-hidden="true">
        <LeafMotif color="green" size="md" opacity={0.2} rotate={45} />
      </div>
      <div className="absolute bottom-8 left-24 z-10 hidden md:block" aria-hidden="true">
        <LeafMotif color="blue" size="sm" opacity={0.3} rotate={-15} />
      </div>
      <div className="absolute top-4 right-1/3 z-10 hidden xl:block" aria-hidden="true">
        <LeafMotif color="green" size="sm" opacity={0.2} rotate={60} />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-12">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left max-w-2xl">
          {/* Logo */}
          <div className="mb-6 flex justify-center lg:justify-start">
            <img
              src="/assets/generated/kare2u-logo.dim_400x160.png"
              alt="Kare2U"
              className="h-16 md:h-20 w-auto object-contain"
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-green-light/60 text-brand-green-dark rounded-full px-4 py-1.5 text-sm font-semibold mb-5 font-body">
            <span>🌿</span>
            <span>Eczema-Focused Skincare</span>
          </div>

          {/* Tagline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-brand-navy leading-tight mb-4">
            Because your skin{' '}
            <span className="text-brand-blue-dark italic">deserves better.</span>
          </h1>

          {/* Supporting text */}
          <p className="font-body text-lg md:text-xl text-foreground/70 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Gentle, fragrance-free formulas crafted for sensitive and eczema-prone skin — safe for babies, effective for adults.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={onShopBaby}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-body font-bold text-base transition-all duration-200 hover:scale-105 active:scale-95 shadow-soft"
              style={{
                background: 'oklch(0.72 0.09 220)',
                color: 'white',
              }}
            >
              <span>🍼</span>
              Shop Baby
            </button>
            <button
              onClick={onShopAdult}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-body font-bold text-base transition-all duration-200 hover:scale-105 active:scale-95 border-2"
              style={{
                borderColor: 'oklch(0.74 0.09 150)',
                color: 'oklch(0.45 0.08 150)',
                background: 'oklch(0.88 0.055 150 / 0.3)',
              }}
            >
              <span>🌿</span>
              Shop Adult
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start text-sm font-body text-foreground/60">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green inline-block"></span>
              Dermatologist-Inspired
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue inline-block"></span>
              Fragrance-Free
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green inline-block"></span>
              Natural Ingredients
            </span>
          </div>
        </div>

        {/* Hero image area */}
        <div className="shrink-0 relative hidden lg:block">
          <div
            className="w-72 h-72 xl:w-80 xl:h-80 rounded-full flex items-center justify-center relative overflow-hidden"
            style={{ background: 'oklch(0.88 0.055 150 / 0.25)' }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <LeafMotif color="green" size="xl" opacity={0.15} rotate={0} />
            </div>
            <div className="relative z-10 text-center p-8">
              <div className="text-7xl mb-3">🧴</div>
              <p className="font-display text-brand-navy font-semibold text-lg">Pure. Gentle. Effective.</p>
            </div>
          </div>
          {/* Floating accent */}
          <div
            className="absolute -top-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center shadow-soft"
            style={{ background: 'oklch(0.84 0.065 220 / 0.6)' }}
          >
            <LeafMotif color="blue" size="sm" opacity={0.8} rotate={20} />
          </div>
          <div
            className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center shadow-soft"
            style={{ background: 'oklch(0.88 0.055 150 / 0.6)' }}
          >
            <LeafMotif color="green" size="sm" opacity={0.8} rotate={-30} />
          </div>
        </div>
      </div>
    </section>
  );
}
