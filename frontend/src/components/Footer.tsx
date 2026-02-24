import React from 'react';
import { SiInstagram, SiFacebook, SiTiktok } from 'react-icons/si';
import { LeafMotif } from './LeafMotif';

interface FooterProps {
  onScrollTo: (id: string) => void;
}

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'Products', id: 'products' },
  { label: 'Our Story', id: 'story' },
  { label: 'Contact', id: 'contact' },
];

export function Footer({ onScrollTo }: FooterProps) {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'kare2u');

  return (
    <footer
      className="relative overflow-hidden pt-16 pb-8"
      style={{ background: 'oklch(0.22 0.04 230)' }}
    >
      {/* Decorative leaves */}
      <div className="absolute top-8 right-8 pointer-events-none" aria-hidden="true">
        <LeafMotif color="green" size="xl" opacity={0.08} rotate={20} />
      </div>
      <div className="absolute bottom-8 left-8 pointer-events-none" aria-hidden="true">
        <LeafMotif color="blue" size="lg" opacity={0.08} rotate={-30} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <img
              src="/assets/generated/kare2u-logo.dim_400x160.png"
              alt="Kare2U"
              className="h-12 w-auto object-contain mb-4 brightness-0 invert opacity-90"
            />
            <p className="font-display text-base italic mb-4" style={{ color: 'oklch(0.84 0.065 220)' }}>
              "Because your skin deserves better."
            </p>
            <p className="font-body text-sm leading-relaxed" style={{ color: 'oklch(0.65 0.03 220)' }}>
              Gentle, eczema-focused skincare for babies and adults. Fragrance-free, dermatologist-inspired, and made with love.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              {[
                { Icon: SiInstagram, label: 'Instagram' },
                { Icon: SiFacebook, label: 'Facebook' },
                { Icon: SiTiktok, label: 'TikTok' },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  aria-label={`${label} (coming soon)`}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: 'oklch(0.32 0.04 230)',
                    color: 'oklch(0.75 0.05 220)',
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-body font-bold text-sm uppercase tracking-widest mb-5" style={{ color: 'oklch(0.84 0.065 220)' }}>
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onScrollTo(link.id)}
                    className="font-body text-sm transition-colors hover:text-white"
                    style={{ color: 'oklch(0.65 0.03 220)' }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-body font-bold text-sm uppercase tracking-widest mb-5" style={{ color: 'oklch(0.88 0.055 150)' }}>
              Our Products
            </h3>
            <ul className="space-y-3">
              {['Baby Shampoo', 'Baby Conditioner', 'Baby Body Wash', 'Baby Lotion', 'Adult Shampoo', 'Adult Lotion'].map((product) => (
                <li key={product}>
                  <button
                    onClick={() => onScrollTo('products')}
                    className="font-body text-sm transition-colors hover:text-white"
                    style={{ color: 'oklch(0.65 0.03 220)' }}
                  >
                    {product}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t mb-6" style={{ borderColor: 'oklch(0.32 0.04 230)' }} />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-body" style={{ color: 'oklch(0.5 0.03 230)' }}>
          <p>© {year} Kare2U. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with{' '}
            <span style={{ color: 'oklch(0.72 0.09 220)' }}>♥</span>{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-80 transition-opacity"
              style={{ color: 'oklch(0.72 0.09 220)' }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
