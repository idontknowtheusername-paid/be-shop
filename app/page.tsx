import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FlashSales from '@/components/home/FlashSales';
import PromotionalBanners from '@/components/home/PromotionalBanners';
import SpecialOffers from '@/components/home/SpecialOffers';
import PartnerBrands from '@/components/home/PartnerBrands';
import Categories from '@/components/home/Categories';
import TopDeals from '@/components/home/TopDeals';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import ProductsByCategory from '@/components/home/ProductsByCategory';
import TrendingProducts from '@/components/home/TrendingProducts';
import AllProducts from '@/components/home/AllProducts';
import AnimatedFeaturedProducts from '@/components/home/AnimatedFeaturedProducts';
import InteractiveDemo from '@/components/home/InteractiveDemo';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <PromotionalBanners />
        <FlashSales />
        <SpecialOffers />
        <PartnerBrands />
        <AnimatedFeaturedProducts />
        <InteractiveDemo />
        <FeaturedProducts />
        <Categories />
        <ProductsByCategory />
        <TopDeals />
        <TrendingProducts />
        <AllProducts />
      </main>
      <Footer />
    </div>
  );
}