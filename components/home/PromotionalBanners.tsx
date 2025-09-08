'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Tag, Clock, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const PromotionalBanners = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  const banners = [
    {
      id: 1,
      title: 'Black Friday 2024',
      subtitle: 'Jusqu\'à 80% de réduction',
      description: 'Les plus grandes offres de l\'année sur tous les produits',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
      cta: 'Découvrir les offres',
      ctaLink: '/black-friday',
      bgColor: 'bg-gradient-to-r from-red-600 to-red-800',
      badge: 'LIMITÉ',
      badgeColor: 'bg-red-500',
      icon: Tag,
      endDate: '2024-12-31'
    },
    {
      id: 2,
      title: 'Livraison Gratuite',
      subtitle: 'Sur toutes vos commandes',
      description: 'Profitez de la livraison gratuite dès 25 000 FCFA',
      image: 'https://images.pexels.com/photos/4397919/pexels-photo-4397919.jpeg',
      cta: 'Commander maintenant',
      ctaLink: '/free-shipping',
      bgColor: 'bg-gradient-to-r from-green-600 to-green-800',
      badge: 'GRATUIT',
      badgeColor: 'bg-green-500',
      icon: Gift,
      endDate: null
    },
    {
      id: 3,
      title: 'Nouveautés Tech',
      subtitle: 'Derniers smartphones et gadgets',
      description: 'Découvrez les dernières innovations technologiques',
      image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
      cta: 'Explorer la tech',
      ctaLink: '/electronics',
      bgColor: 'bg-gradient-to-r from-blue-600 to-blue-800',
      badge: 'NOUVEAU',
      badgeColor: 'bg-blue-500',
      icon: Clock,
      endDate: null
    }
  ];

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(nextBanner, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentBannerData = banners[currentBanner];

  return (
    <section className="py-8 bg-gray-50">
      <div className="be-container">
        <div className="relative">
          {/* Main Banner */}
          <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-2xl shadow-2xl">
            <div className={`${currentBannerData.bgColor} h-full relative`}>
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="be-container h-full flex items-center relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
                  <div className="text-white space-y-6">
                    <div className="flex items-center space-x-3">
                      <Badge className={`${currentBannerData.badgeColor} text-white text-sm px-3 py-1`}>
                        {currentBannerData.badge}
                      </Badge>
                      <currentBannerData.icon className="h-5 w-5" />
                    </div>
                    
                    <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                      {currentBannerData.title}
                    </h2>
                    
                    <p className="text-xl md:text-2xl opacity-90 font-semibold">
                      {currentBannerData.subtitle}
                    </p>
                    
                    <p className="text-lg opacity-80">
                      {currentBannerData.description}
                    </p>
                    
                    <div className="flex space-x-4">
                      <Button asChild className="be-button-secondary text-lg px-8 py-3 h-auto">
                        <Link href={currentBannerData.ctaLink}>
                          {currentBannerData.cta}
                        </Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="hidden lg:block">
                    <div className="relative h-80 w-full">
                      <Image
                        src={currentBannerData.image}
                        alt={currentBannerData.title}
                        fill
                        className="object-cover rounded-lg shadow-2xl"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevBanner}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all z-20"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextBanner}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all z-20"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentBanner ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Secondary Banners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {banners.slice(0, 3).map((banner, index) => (
            <Link
              key={banner.id}
              href={banner.ctaLink}
              className={`group relative h-32 md:h-40 overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className={`${banner.bgColor} h-full relative`}>
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                <div className="absolute inset-0 p-4 flex items-center justify-between">
                  <div className="text-white">
                    <Badge className={`${banner.badgeColor} text-white text-xs mb-2`}>
                      {banner.badge}
                    </Badge>
                    <h3 className="font-bold text-lg md:text-xl mb-1">
                      {banner.title}
                    </h3>
                    <p className="text-sm opacity-90">
                      {banner.subtitle}
                    </p>
                  </div>
                  <div className="text-white opacity-20 group-hover:opacity-40 transition-opacity">
                    <banner.icon className="h-8 w-8" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanners;

