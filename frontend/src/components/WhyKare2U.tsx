import React from 'react';
import { Microscope, Leaf, Users } from 'lucide-react';

const features = [
  {
    icon: Microscope,
    heading: 'Eczema-Focused Formula',
    text: 'Every Kare2U product is developed specifically for sensitive and eczema-prone skin. We understand the triggers, the flare-ups, and the frustration — so we formulated solutions that actually work without causing harm.',
    color: 'green' as const,
  },
  {
    icon: Leaf,
    heading: 'Clean & Transparent Ingredients',
    text: 'No hidden chemicals, no mystery fillers. We use naturally sourced, plant-based ingredients and list every single one clearly. What you see on the label is exactly what goes on your skin.',
    color: 'blue' as const,
  },
  {
    icon: Users,
    heading: 'For Every Stage of Life',
    text: "From newborns to grandparents, Kare2U is gentle enough for the most delicate baby skin while being effective for adults. One brand, one philosophy — caring for your whole family's skin journey.",
    color: 'green' as const,
  },
];

export function WhyKare2U() {
  return (
    <section
      id="why"
      className="py-20 relative overflow-hidden"
      style={{ background: 'oklch(0.97 0.025 150 / 0.4)' }}
    >
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold font-body mb-4"
            style={{
              background: 'oklch(0.88 0.055 150 / 0.4)',
              color: 'oklch(0.4 0.09 150)',
            }}
          >
            <span>✨</span>
            <span>Why Choose Us</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: 'oklch(0.28 0.05 230)' }}>
            Why Kare2U?
          </h2>
          <p className="font-body text-lg max-w-xl mx-auto" style={{ color: 'oklch(0.5 0.03 230)' }}>
            We're not just another skincare brand. We're a promise — to your skin, your family, and your peace of mind.
          </p>
        </div>

        {/* Feature columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isGreen = feature.color === 'green';
            return (
              <div
                key={feature.heading}
                className="relative bg-white rounded-3xl p-8 shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Number accent */}
                <div
                  className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-body"
                  style={{
                    background: isGreen ? 'oklch(0.88 0.055 150 / 0.3)' : 'oklch(0.84 0.065 220 / 0.3)',
                    color: isGreen ? 'oklch(0.45 0.09 150)' : 'oklch(0.45 0.09 220)',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-xs"
                  style={{
                    background: isGreen
                      ? 'oklch(0.88 0.055 150 / 0.35)'
                      : 'oklch(0.84 0.065 220 / 0.35)',
                  }}
                >
                  <Icon
                    size={30}
                    strokeWidth={1.6}
                    style={{
                      color: isGreen ? 'oklch(0.5 0.1 150)' : 'oklch(0.5 0.1 220)',
                    }}
                  />
                </div>

                {/* Content */}
                <h3
                  className="font-display text-xl font-semibold mb-3"
                  style={{
                    color: isGreen ? 'oklch(0.4 0.09 150)' : 'oklch(0.4 0.09 220)',
                  }}
                >
                  {feature.heading}
                </h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'oklch(0.5 0.03 230)' }}>
                  {feature.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
