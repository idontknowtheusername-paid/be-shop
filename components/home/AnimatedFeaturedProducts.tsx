'use client';

import React from 'react';
import AnimatedSection from '@/components/ui/animated-section';
import HoverCard from '@/components/ui/hover-card';

const AnimatedFeaturedProducts = () => {
  const featuredProducts = [
    {
      id: '1',
      name: 'iPhone 15 Pro Max 256GB',
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
      price: 650000,
      originalPrice: 750000,
      discount: 13,
      rating: 4.8,
      reviews: 256,
      badge: 'NOUVEAU',
      isNew: true,
      isHot: false,
      isLimited: false
    },
    {
      id: '2',
      name: 'Samsung Galaxy S24 Ultra',
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
      price: 580000,
      originalPrice: 680000,
      discount: 15,
      rating: 4.7,
      reviews: 189,
      badge: 'HOT',
      isNew: false,
      isHot: true,
      isLimited: false
    },
    {
      id: '3',
      name: 'MacBook Air M2 13"',
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
      price: 850000,
      originalPrice: 950000,
      discount: 11,
      rating: 4.9,
      reviews: 89,
      badge: 'LIMITÉ',
      isNew: false,
      isHot: false,
      isLimited: true
    },
    {
      id: '4',
      name: 'Nike Air Max 270',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
      price: 65000,
      originalPrice: 85000,
      discount: 24,
      rating: 4.6,
      reviews: 128,
      badge: 'SOLDES',
      isNew: false,
      isHot: true,
      isLimited: false
    },
    {
      id: '5',
      name: 'Sony WH-1000XM5',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
      price: 95000,
      originalPrice: 120000,
      discount: 21,
      rating: 4.8,
      reviews: 234,
      badge: 'BESTSELLER',
      isNew: false,
      isHot: false,
      isLimited: false
    },
    {
      id: '6',
      name: 'Adidas Ultraboost 22',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
      price: 72000,
      originalPrice: 90000,
      discount: 20,
      rating: 4.5,
      reviews: 95,
      badge: 'TRENDING',
      isNew: false,
      isHot: true,
      isLimited: false
    }
  ];

  return (
    <AnimatedSection direction="up" delay={0.2}>
      <section className="py-12 bg-white">
        <div className="be-container">
          <AnimatedSection direction="fade" delay={0.4}>
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Produits Vedettes Animés
              </h2>
              <p className="text-lg text-gray-600">
                Découvrez nos produits avec des animations fluides et des interactions avancées
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.6}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {featuredProducts.map((product, index) => (
                <AnimatedSection 
                  key={product.id}
                  direction="up" 
                  delay={0.8 + index * 0.1}
                  className="group"
                >
                  <HoverCard
                    product={product}
                    showQuickActions={true}
                    showWishlist={true}
                    showShare={true}
                  />
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default AnimatedFeaturedProducts;

