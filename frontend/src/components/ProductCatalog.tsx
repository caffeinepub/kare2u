import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductCard } from './ProductCard';
import { useAllProducts } from '../hooks/useQueries';
import { Category, type Product } from '../backend';
import { LeafMotif } from './LeafMotif';

function ProductGrid({ products, isLoading }: { products: Product[]; isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-3xl overflow-hidden bg-white shadow-card">
            <Skeleton className="w-full aspect-square" />
            <div className="p-5 space-y-3">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-10 w-full rounded-2xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">🌿</div>
        <p className="font-body text-lg" style={{ color: 'oklch(0.5 0.03 230)' }}>
          Products coming soon...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
      {products.map((product) => (
        <div key={String(product.id)} className="w-full max-w-sm">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

export function ProductCatalog() {
  const [activeTab, setActiveTab] = useState<'baby' | 'adult'>('baby');
  const { data: allProducts = [], isLoading } = useAllProducts();

  const babyProducts = allProducts.filter((p) => p.category === Category.baby);
  const adultProducts = allProducts.filter((p) => p.category === Category.adult);

  return (
    <section id="products" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative leaves */}
      <div className="absolute top-8 left-4 pointer-events-none" aria-hidden="true">
        <LeafMotif color="blue" size="lg" opacity={0.1} rotate={-20} />
      </div>
      <div className="absolute bottom-8 right-4 pointer-events-none" aria-hidden="true">
        <LeafMotif color="green" size="lg" opacity={0.1} rotate={30} />
      </div>

      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold font-body mb-4"
            style={{
              background: 'oklch(0.84 0.065 220 / 0.25)',
              color: 'oklch(0.45 0.09 220)',
            }}
          >
            <span>🧴</span>
            <span>Our Products</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: 'oklch(0.28 0.05 230)' }}>
            Gentle Care for Every Skin
          </h2>
          <p className="font-body text-lg max-w-xl mx-auto" style={{ color: 'oklch(0.5 0.03 230)' }}>
            Thoughtfully formulated for sensitive and eczema-prone skin — from the tiniest babies to full-grown adults.
          </p>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as 'baby' | 'adult')}
          className="w-full"
        >
          <div className="flex justify-center mb-10">
            <TabsList
              className="rounded-full p-1.5 h-auto gap-1"
              style={{ background: 'oklch(0.96 0.04 220 / 0.5)' }}
            >
              <TabsTrigger
                value="baby"
                className="rounded-full px-8 py-2.5 font-body font-semibold text-sm data-[state=active]:shadow-soft transition-all duration-200"
                style={{
                  color: activeTab === 'baby' ? 'white' : 'oklch(0.45 0.07 220)',
                }}
              >
                🍼 For Babies
              </TabsTrigger>
              <TabsTrigger
                value="adult"
                className="rounded-full px-8 py-2.5 font-body font-semibold text-sm data-[state=active]:shadow-soft transition-all duration-200"
                style={{
                  color: activeTab === 'adult' ? 'white' : 'oklch(0.45 0.07 220)',
                }}
              >
                🌿 For Adults
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="baby" className="mt-0 animate-fade-in">
            <ProductGrid products={babyProducts} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="adult" className="mt-0 animate-fade-in">
            <ProductGrid products={adultProducts} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
