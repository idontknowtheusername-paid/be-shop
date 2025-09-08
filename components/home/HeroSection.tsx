'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Ventes Flash jusqu\'à 70% de réduction',
      subtitle: 'Offres limitées sur l\'électronique, la mode et plus encore',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
      cta: 'Acheter maintenant',
      ctaLink: '/flash-sales',
      bgColor: 'bg-gradient-to-r from-[#1E40AF] to-[#3B82F6]'
    },
    {
      id: 2,
      title: 'Nouvelle Collection Mode',
      subtitle: 'Découvrez les dernières tendances pour hommes et femmes',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
      cta: 'Explorer la Mode',
      ctaLink: '/fashion',
      bgColor: 'bg-gradient-to-r from-[#EA580C] to-[#FB923C]'
    },
    {
      id: 3,
      title: 'Électronique & Gadgets',
      subtitle: 'Derniers smartphones, ordinateurs portables & appareils ménagers',
      image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
      cta: 'Acheter l\'Électronique',
      ctaLink: '/electronics',
      bgColor: 'bg-gradient-to-r from-[#7C2D12] to-[#A3664A]'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className={`${slide.bgColor} h-full relative`}>
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <div className="be-container h-full flex items-center relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
                <div className="text-white space-y-6">
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl opacity-90">
                    {slide.subtitle}
                  </p>
                  <div className="flex space-x-4">
                    <Button asChild className="be-button-secondary text-lg px-8 py-3 h-auto">
                      <Link href={slide.ctaLink}>{slide.cta}</Link>
                    </Button>
                    <Button asChild variant="outline" className="text-lg px-8 py-3 h-auto border-white text-white hover:bg-white hover:text-black">
                      <Link href="/categories">Parcourir Tout</Link>
                    </Button>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="relative h-80 w-full">
                    <Image
                      src={slide.image}
                      alt={slide.title}
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
      ))}

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all z-20"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all z-20"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;