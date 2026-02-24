import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { type Product, ProductType, Category } from '../backend';

interface ProductCardProps {
  product: Product;
}

const productTypeLabels: Record<ProductType, string> = {
  [ProductType.shampoo]: 'Shampoo',
  [ProductType.conditioner]: 'Conditioner',
  [ProductType.bodyWash]: 'Body Wash',
  [ProductType.lotion]: 'Lotion',
  [ProductType.serum]: 'Serum',
};

const productTypeEmoji: Record<ProductType, string> = {
  [ProductType.shampoo]: '🫧',
  [ProductType.conditioner]: '🧴',
  [ProductType.bodyWash]: '🧴',
  [ProductType.lotion]: '🌿',
  [ProductType.serum]: '✨',
};

const productImages: Record<string, string> = {
  'baby-shampoo': '/assets/generated/product-baby-shampoo.dim_400x400.png',
  'baby-conditioner': '/assets/generated/product-baby-conditioner.dim_400x400.png',
  'baby-bodyWash': '/assets/generated/product-baby-bodywash.dim_400x400.png',
  'baby-lotion': '/assets/generated/product-baby-lotion.dim_400x400.png',
  'adult-shampoo': '/assets/generated/product-adult-shampoo.dim_400x400.png',
  'adult-conditioner': '/assets/generated/product-adult-conditioner.dim_400x400.png',
  'adult-bodyWash': '/assets/generated/product-adult-bodywash.dim_400x400.png',
  'adult-lotion': '/assets/generated/product-adult-lotion.dim_400x400.png',
};

export function ProductCard({ product }: ProductCardProps) {
  const imageKey = `${product.category}-${product.productType}`;
  const imageSrc = productImages[imageKey];
  const typeLabel = productTypeLabels[product.productType] ?? product.productType;
  const emoji = productTypeEmoji[product.productType] ?? '🧴';
  const priceDisplay = `$${Number(product.price)}`;

  return (
    <article className="group bg-white rounded-3xl shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1.5 overflow-hidden flex flex-col">
      {/* Product image */}
      <div
        className="relative w-full aspect-square overflow-hidden flex items-center justify-center"
        style={{ background: 'oklch(0.97 0.025 210)' }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 p-8">
            <span className="text-5xl">{emoji}</span>
            <span className="font-body text-sm font-semibold" style={{ color: 'oklch(0.55 0.07 220)' }}>
              {typeLabel}
            </span>
          </div>
        )}
        {/* Price badge */}
        <div
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold font-body shadow-xs"
          style={{
            background: 'oklch(0.88 0.055 150 / 0.9)',
            color: 'oklch(0.35 0.08 150)',
          }}
        >
          {priceDisplay}
        </div>
      </div>

      {/* Card content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="mb-1">
          <span
            className="text-xs font-semibold font-body uppercase tracking-wider"
            style={{ color: 'oklch(0.65 0.07 220)' }}
          >
            {typeLabel}
          </span>
        </div>
        <h3
          className="font-display font-semibold text-lg mb-2 leading-snug"
          style={{ color: 'oklch(0.28 0.05 230)' }}
        >
          {product.name}
        </h3>
        <p
          className="font-body text-sm leading-relaxed flex-1 mb-4"
          style={{ color: 'oklch(0.5 0.03 230)' }}
        >
          {product.description}
        </p>

        {/* Add to Cart button */}
        <button
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-body font-bold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: 'oklch(0.72 0.09 220)',
            color: 'white',
          }}
          onClick={(e) => e.preventDefault()}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart size={16} strokeWidth={2} />
          Add to Cart
        </button>
      </div>
    </article>
  );
}
