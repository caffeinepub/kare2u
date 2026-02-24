import React from 'react';

interface LeafMotifProps {
  className?: string;
  color?: 'blue' | 'green' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: number;
  rotate?: number;
}

const sizeMap = {
  sm: 32,
  md: 56,
  lg: 80,
  xl: 120,
};

const colorMap = {
  blue: '#A8D8EA',
  green: '#B8D8B8',
  white: '#FFFFFF',
};

export function LeafMotif({ className = '', color = 'green', size = 'md', opacity = 0.6, rotate = 0 }: LeafMotifProps) {
  const px = sizeMap[size];
  const fill = colorMap[color];

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity, transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <path
        d="M40 8C40 8 12 20 12 44C12 58 24 68 40 68C56 68 68 58 68 44C68 20 40 8 40 8Z"
        fill={fill}
      />
      <path
        d="M40 8L40 68"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M40 28C40 28 28 34 26 44"
        stroke={fill}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M40 38C40 38 52 44 54 54"
        stroke={fill}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

export function LeafCluster({ className = '', color = 'green' as 'blue' | 'green' | 'white' }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <LeafMotif color={color} size="xl" opacity={0.25} rotate={-20} className="absolute -top-4 -left-4" />
      <LeafMotif color={color} size="lg" opacity={0.18} rotate={30} className="absolute top-8 left-16" />
      <LeafMotif color={color} size="md" opacity={0.22} rotate={-45} className="absolute top-0 left-24" />
    </div>
  );
}
