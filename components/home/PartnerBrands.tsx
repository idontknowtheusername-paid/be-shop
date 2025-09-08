'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PartnerBrands = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const brands = [
    {
      id: 1,
      name: 'Samsung',
      logo: 'https://logos-world.net/wp-content/uploads/2020/09/Samsung-Logo.png',
      slug: 'samsung',
      productCount: '2,500+ produits'
    },
    {
      id: 2,
      name: 'Apple',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo.png',
      slug: 'apple',
      productCount: '1,200+ produits'
    },
    {
      id: 3,
      name: 'Nike',
      logo: 'https://logos-world.net/wp-content/uploads/2020/09/Nike-Logo.png',
      slug: 'nike',
      productCount: '800+ produits'
    },
    {
      id: 4,
      name: 'Adidas',
      logo: 'https://logos-world.net/wp-content/uploads/2020/09/Adidas-Logo.png',
      slug: 'adidas',
      productCount: '650+ produits'
    },
    {
      id: 5,
      name: 'Sony',
      logo: 'https://logos-world.net/wp-content/uploads/2020/09/Sony-Logo.png',
      slug: 'sony',
      productCount: '900+ produits'
    },
    {
      id: 6,
      name: 'LG',
      logo: 'https://logos-world.net/wp-content/uploads/2020/09/LG-Logo.png',
      slug: 'lg',
      productCount: '1,100+ produits'
    },
    {
      id: 7,
      name: 'HP',
      logo: 'https://logos-world.net/wp-content/uploads/2020/09/HP-Logo.png',
      slug: 'hp',
      productCount: '750+ produits'
    },
    {
      id: 8,
      name: 'Dell',
      logo: 'https://logos-world.net/wp-content/uploads/2020/09/Dell-Logo.png',
      slug: 'dell',
      productCount: '600+ produits'
    }
  ];

  const brandsPerSlide = 4; // Réduit pour un meilleur affichage
  const totalSlides = Math.ceil(brands.length / brandsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, []);

  const getCurrentBrands = () => {
    const start = currentSlide * brandsPerSlide;
    const end = start + brandsPerSlide;
    return brands.slice(start, end);
  };

  return (
    <section className="py-12 bg-white">
      <div className="be-container">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Marques Partenaires
          </h2>
          <p className="text-lg text-gray-600">
            Découvrez les plus grandes marques disponibles sur Be Shop
          </p>
        </div>

        <div className="relative">
          {/* Carrousel Container */}
          <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 p-6">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {brands.slice(slideIndex * brandsPerSlide, (slideIndex + 1) * brandsPerSlide).map((brand) => (
                      <Link
                        key={brand.id}
                        href={`/brands/${brand.slug}`}
                        className="group bg-white rounded-xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2"
                      >
                        <div className="text-center space-y-4">
                          <div className="relative h-20 w-full mx-auto">
                            <Image
                              src={brand.logo}
                              alt={brand.name}
                              fill
                              className="object-contain group-hover:scale-125 transition-transform duration-500"
                              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 group-hover:text-[#1E40AF] transition-colors text-base">
                              {brand.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-2 font-medium">
                              {brand.productCount}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-xl hover:shadow-2xl text-gray-600 hover:text-[#1E40AF] p-3 rounded-full transition-all duration-300 z-10 hover:scale-110"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-xl hover:shadow-2xl text-gray-600 hover:text-[#1E40AF] p-3 rounded-full transition-all duration-300 z-10 hover:scale-110"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-3">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-[#1E40AF] scale-125 shadow-lg' 
                  : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
              }`}
            />
          ))}
        </div>

        {/* View All Brands Button */}
        <div className="text-center mt-8">
          <Button asChild className="be-button-primary text-lg px-8 py-3 h-auto hover:scale-105 transition-transform duration-300">
            <Link href="/brands">
              Voir toutes les marques
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PartnerBrands;
