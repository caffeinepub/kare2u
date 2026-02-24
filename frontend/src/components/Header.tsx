import React, { useState, useEffect } from 'react';
import { Menu, X, Share2 } from 'lucide-react';
import { LeafMotif } from './LeafMotif';
import { ShareModal } from './ShareModal';

interface HeaderProps {
  onScrollTo: (id: string) => void;
}

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'Products', id: 'products' },
  { label: 'Why Kare2U', id: 'why' },
  { label: 'Our Story', id: 'story' },
];

export function Header({ onScrollTo }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (id: string) => {
    onScrollTo(id);
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'shadow-soft backdrop-blur-md' : ''
        }`}
        style={{
          background: isScrolled ? 'oklch(1 0 0 / 0.92)' : 'transparent',
        }}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 group"
            aria-label="Kare2U Home"
          >
            <img
              src="/assets/generated/kare2u-logo.dim_400x160.png"
              alt="Kare2U"
              className="h-10 w-auto object-contain"
            />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="px-4 py-2 rounded-full font-body font-semibold text-sm transition-all duration-200 hover:bg-brand-blue-light/40"
                style={{ color: 'oklch(0.35 0.05 230)' }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + Share */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setShareOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full font-body font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: 'oklch(0.93 0.03 220)',
                color: 'oklch(0.35 0.05 230)',
                border: '1.5px solid oklch(0.85 0.05 220)',
              }}
              aria-label="Share our site"
            >
              <Share2 size={14} />
              Share
            </button>
            <button
              onClick={() => handleNav('products')}
              className="px-5 py-2.5 rounded-full font-body font-bold text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-xs"
              style={{
                background: 'oklch(0.72 0.09 220)',
                color: 'white',
              }}
            >
              Shop Now
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-xl transition-colors"
            style={{ color: 'oklch(0.35 0.05 230)' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden border-t shadow-soft"
            style={{ background: 'oklch(1 0 0 / 0.97)', borderColor: 'oklch(0.9 0.03 220)' }}
          >
            <nav className="container mx-auto px-6 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className="text-left px-4 py-3 rounded-xl font-body font-semibold text-sm transition-colors hover:bg-brand-blue-light/30"
                  style={{ color: 'oklch(0.35 0.05 230)' }}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => { setShareOpen(true); setMobileOpen(false); }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl font-body font-semibold text-sm transition-colors hover:bg-brand-blue-light/30"
                style={{ color: 'oklch(0.35 0.05 230)' }}
              >
                <Share2 size={15} />
                Share Our Site
              </button>
              <button
                onClick={() => handleNav('products')}
                className="mt-2 px-5 py-3 rounded-full font-body font-bold text-sm text-center"
                style={{
                  background: 'oklch(0.72 0.09 220)',
                  color: 'white',
                }}
              >
                Shop Now
              </button>
            </nav>
          </div>
        )}
      </header>

      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </>
  );
}
