import React from 'react';
import { LeafMotif } from './LeafMotif';

export function BrandStory() {
  return (
    <section id="story" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative leaves */}
      <div className="absolute top-12 right-8 pointer-events-none" aria-hidden="true">
        <LeafMotif color="green" size="xl" opacity={0.08} rotate={20} />
      </div>
      <div className="absolute bottom-12 left-8 pointer-events-none" aria-hidden="true">
        <LeafMotif color="blue" size="lg" opacity={0.08} rotate={-40} />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div
              className="relative rounded-3xl overflow-hidden shadow-soft"
              style={{ background: 'oklch(0.96 0.04 220 / 0.3)' }}
            >
              <img
                src="/assets/generated/brand-story-illustration.dim_600x500.png"
                alt="A parent lovingly caring for their baby — the heart of Kare2U"
                className="w-full h-auto object-cover"
              />
              {/* Overlay badge */}
              <div
                className="absolute bottom-6 left-6 right-6 rounded-2xl p-4 backdrop-blur-sm"
                style={{ background: 'oklch(1 0 0 / 0.85)' }}
              >
                <p className="font-display text-base font-semibold italic" style={{ color: 'oklch(0.28 0.05 230)' }}>
                  "Because your skin deserves better."
                </p>
                <p className="font-body text-xs mt-1" style={{ color: 'oklch(0.55 0.05 230)' }}>
                  — The Kare2U Promise
                </p>
              </div>
            </div>

            {/* Floating accent cards */}
            <div
              className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl shadow-soft hidden md:flex flex-col items-center justify-center"
              style={{ background: 'oklch(0.88 0.055 150 / 0.9)' }}
            >
              <span className="text-2xl">🌿</span>
              <span className="font-body text-xs font-bold mt-1" style={{ color: 'oklch(0.35 0.09 150)' }}>Natural</span>
            </div>
            <div
              className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl shadow-soft hidden md:flex flex-col items-center justify-center"
              style={{ background: 'oklch(0.84 0.065 220 / 0.9)' }}
            >
              <span className="text-2xl">💙</span>
              <span className="font-body text-xs font-bold mt-1" style={{ color: 'oklch(0.35 0.09 220)' }}>Trusted</span>
            </div>
          </div>

          {/* Text content */}
          <div className="order-1 lg:order-2">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold font-body mb-5"
              style={{
                background: 'oklch(0.84 0.065 220 / 0.25)',
                color: 'oklch(0.45 0.09 220)',
              }}
            >
              <span>💚</span>
              <span>Our Story</span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ color: 'oklch(0.28 0.05 230)' }}>
              Born from Real Experience with Sensitive Skin
            </h2>

            <div className="space-y-5 font-body text-base leading-relaxed" style={{ color: 'oklch(0.42 0.03 230)' }}>
              <p>
                Kare2U was born out of a deeply personal journey. When our founder's child was diagnosed with eczema, the search for safe, effective skincare became an exhausting daily struggle. Most products either irritated the skin further or were filled with ingredients that felt more like a chemistry experiment than a gentle remedy.
              </p>
              <p>
                That frustration became our purpose. We spent years researching, testing, and collaborating with dermatologists to create formulas that truly work for sensitive and eczema-prone skin — without the harsh chemicals, synthetic fragrances, or hidden irritants that make flare-ups worse.
              </p>
              <p>
                Today, Kare2U is more than a skincare brand. It's a community of families who understand the daily reality of sensitive skin. We believe in radical transparency — every ingredient is listed, every formula is tested, and every product is made with the same love and care we'd want for our own family.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { value: '8+', label: 'Products' },
                { value: '100%', label: 'Fragrance-Free' },
                { value: '2', label: 'Age Groups' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-2xl"
                  style={{ background: 'oklch(0.96 0.04 220 / 0.4)' }}
                >
                  <div className="font-display text-2xl font-bold" style={{ color: 'oklch(0.55 0.1 220)' }}>
                    {stat.value}
                  </div>
                  <div className="font-body text-xs mt-1" style={{ color: 'oklch(0.5 0.03 230)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
