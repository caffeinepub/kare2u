import React, { useState } from 'react';
import { Globe, Copy, Check, Rocket } from 'lucide-react';
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
          className="px-6 pt-6 pb-4 flex items-center gap-3"
          style={{ background: 'oklch(0.22 0.04 230)' }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'oklch(0.72 0.09 220)' }}
          >
            <Rocket size={16} className="text-white" />
          </div>
          <div>
            <DialogTitle className="font-display text-base font-bold text-white m-0 leading-tight">
              Your Site is Live!
            </DialogTitle>
            <p className="font-body text-xs mt-0.5" style={{ color: 'oklch(0.72 0.05 220)' }}>
              Share it with the world
            </p>
          </div>
        </div>

        <DialogDescription className="sr-only">
          Your Kare2U site is published and live. Scan the QR code or copy the link to share it.
        </DialogDescription>

        <div className="px-6 py-6 flex flex-col items-center gap-5">
          {/* Live badge + URL */}
          <div
            className="w-full flex items-center gap-2 rounded-2xl px-4 py-3"
            style={{
              background: 'oklch(0.93 0.03 220)',
              border: '1.5px solid oklch(0.85 0.05 220)',
            }}
          >
            <Globe size={14} style={{ color: 'oklch(0.55 0.08 150)', flexShrink: 0 }} />
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
                background: copied ? 'oklch(0.62 0.14 150)' : 'oklch(0.72 0.09 220)',
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
                  Copy Link
                </>
              )}
            </button>
          </div>

          {/* Divider with label */}
          <div className="w-full flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: 'oklch(0.88 0.03 220)' }} />
            <span className="font-body text-xs" style={{ color: 'oklch(0.6 0.04 220)' }}>
              or scan QR code
            </span>
            <div className="flex-1 h-px" style={{ background: 'oklch(0.88 0.03 220)' }} />
          </div>

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

          <p
            className="font-body text-xs text-center leading-relaxed"
            style={{ color: 'oklch(0.55 0.04 230)' }}
          >
            Anyone who scans this code or visits the link will see your live Kare2U site.
          </p>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-2xl font-body font-semibold text-sm transition-all duration-200 hover:opacity-80"
            style={{
              background: 'oklch(0.93 0.03 220)',
              color: 'oklch(0.45 0.05 230)',
            }}
          >
            Done
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
