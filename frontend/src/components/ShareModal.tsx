import React, { useState } from 'react';
import { Share2, Copy, Check, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
}

export function ShareModal({ open, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://kare2u.com';

  // Google Charts QR code API — no npm package needed
  const qrUrl = `https://chart.googleapis.com/chart?cht=qr&chs=240x240&chl=${encodeURIComponent(siteUrl)}&choe=UTF-8&chld=M|2`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea');
      el.value = siteUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <DialogContent
        className="max-w-sm w-full rounded-3xl border-0 shadow-2xl p-0 overflow-hidden"
        style={{ background: 'oklch(0.98 0.01 220)' }}
      >
        {/* Header strip */}
        <div
          className="px-6 pt-6 pb-4 flex items-center justify-between"
          style={{ background: 'oklch(0.72 0.09 220)' }}
        >
          <div className="flex items-center gap-2">
            <Share2 size={18} className="text-white" />
            <DialogTitle className="font-display text-lg font-bold text-white m-0">
              Share Kare2U
            </DialogTitle>
          </div>
        </div>

        <DialogDescription className="sr-only">
          Scan the QR code or copy the link to share the Kare2U website.
        </DialogDescription>

        <div className="px-6 py-6 flex flex-col items-center gap-5">
          {/* Tagline */}
          <p
            className="font-body text-sm text-center leading-relaxed"
            style={{ color: 'oklch(0.45 0.05 230)' }}
          >
            Scan the QR code or copy the link below to share our site with friends and family.
          </p>

          {/* QR Code */}
          <div
            className="rounded-2xl p-3 shadow-md"
            style={{ background: 'white', border: '2px solid oklch(0.88 0.055 150)' }}
          >
            <img
              src={qrUrl}
              alt={`QR code for ${siteUrl}`}
              width={200}
              height={200}
              className="block rounded-xl"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>

          {/* URL display + copy */}
          <div
            className="w-full flex items-center gap-2 rounded-2xl px-4 py-3"
            style={{
              background: 'oklch(0.93 0.03 220)',
              border: '1.5px solid oklch(0.85 0.05 220)',
            }}
          >
            <span
              className="flex-1 font-body text-xs truncate select-all"
              style={{ color: 'oklch(0.35 0.05 230)' }}
            >
              {siteUrl}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-body font-bold text-xs transition-all duration-200 hover:scale-105 active:scale-95 shrink-0"
              style={{
                background: copied ? 'oklch(0.72 0.12 150)' : 'oklch(0.72 0.09 220)',
                color: 'white',
              }}
              aria-label="Copy link to clipboard"
            >
              {copied ? (
                <>
                  <Check size={13} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={13} />
                  Copy
                </>
              )}
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-2xl font-body font-semibold text-sm transition-all duration-200 hover:opacity-80"
            style={{
              background: 'oklch(0.93 0.03 220)',
              color: 'oklch(0.45 0.05 230)',
            }}
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
