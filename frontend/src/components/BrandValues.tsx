import React from 'react';
import { Leaf, FlaskConical, Heart, ShieldCheck } from 'lucide-react';
import { LeafMotif } from './LeafMotif';

const values = [
  {
    icon: ShieldCheck,
    label: 'Fragrance-Free',
    description: 'Zero synthetic fragrances — safe for the most sensitive skin.',
    color: 'blue' as const,
  },
  {
    icon: FlaskConical,
    label: 'Dermatologist-Inspired',
    description: 'Formulas developed with sensitive skin science in mind.',
    color: 'green' as const,
  },
  {
    icon: Leaf,
    label: 'Natural Ingredients',
    description: 'Plant-based, clean ingredients you can trust and pronounce.',
    color: 'blue' as const,
  },
  {
    icon: Heart,
    label: 'Family-Safe',
    description: 'Gentle enough for babies, effective for the whole family.',
    color: 'green' as const,
  },
];

export function BrandValues() {
  return (
    <section
      id="values"
      className="relative py-14 overflow-hidden"
      style={{ background: 'oklch(0.96 0.04 220 / 0.5)' }}
    >
      {/* Decorative leaf accents */}
      <div className="absolute top-0 left-0 opacity-20 pointer-events-none" aria-hidden="true">
        <LeafMotif color="green" size="lg" opacity={1} rotate={-30} />
      </div>
      <div className="absolute bottom-0 right-0 opacity-20 pointer-events-none" aria-hidden="true">
        <LeafMotif color="blue" size="lg" opacity={1} rotate={45} />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => {
            const Icon = value.icon;
            const isBlue = value.color === 'blue';
            return (
              <div
                key={value.label}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/70 backdrop-blur-sm shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-xs"
                  style={{
                    background: isBlue
                      ? 'oklch(0.84 0.065 220 / 0.35)'
                      : 'oklch(0.88 0.055 150 / 0.35)',
                  }}
                >
                  <Icon
                    size={26}
                    style={{
                      color: isBlue ? 'oklch(0.55 0.1 220)' : 'oklch(0.55 0.1 150)',
                    }}
                    strokeWidth={1.8}
                  />
                </div>
                <h3
                  className="font-body font-bold text-base mb-1.5"
                  style={{ color: 'oklch(0.28 0.05 230)' }}
                >
                  {value.label}
                </h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'oklch(0.5 0.03 230)' }}>
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
