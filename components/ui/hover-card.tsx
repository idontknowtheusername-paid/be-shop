'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, ShoppingCart, Eye, Share2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

interface HoverCardProps {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    rating: number;
    reviews: number;
    badge?: string;
    isNew?: boolean;
    isHot?: boolean;
    isLimited?: boolean;
  };
  className?: string;
  showQuickActions?: boolean;
  showWishlist?: boolean;
  showShare?: boolean;
}

const HoverCard: React.FC<HoverCardProps> = ({
  product,
  className = '',
  showQuickActions = true,
  showWishlist = true,
  showShare = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-BJ', {
      style: 'currency',
      currency: 'XOF'
    }).format(price);
  };

  const getBadgeColor = (badge: string) => {
    switch (badge.toLowerCase()) {
      case 'nouveau':
      case 'new':
        return 'bg-green-500';
      case 'hot':
      case 'tendance':
        return 'bg-red-500';
      case 'limité':
      case 'limited':
        return 'bg-orange-500';
      case 'soldes':
      case 'sale':
        return 'bg-purple-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <motion.div
      className={`relative group ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Link href={`/products/${product.id}`}>
        <div className="be-card overflow-hidden relative">
          {/* Product Image */}
          <div className="relative h-48 md:h-56 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            
            {/* Badge */}
            {product.badge && (
              <Badge className={`absolute top-2 left-2 ${getBadgeColor(product.badge)} text-white text-xs`}>
                {product.badge}
              </Badge>
            )}

            {/* Quick Actions Overlay */}
            <AnimatePresence>
              {isHovered && showQuickActions && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center space-x-2"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </motion.div>
                  {showShare && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Wishlist Button */}
            {showWishlist && (
              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  setIsWishlisted(!isWishlisted);
                }}
                className="absolute top-2 right-2 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart 
                  className={`h-4 w-4 transition-colors ${
                    isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  }`} 
                />
              </motion.button>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-3">
            {/* Product Name */}
            <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-[#1E40AF] transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={`${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600">({product.reviews})</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-[#EA580C]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  {product.discount && (
                    <Badge className="bg-red-500 text-white text-xs">
                      -{product.discount}%
                    </Badge>
                  )}
                </>
              )}
            </div>

            {/* Special Indicators */}
            <div className="flex items-center space-x-2">
              {product.isNew && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center space-x-1 text-green-600"
                >
                  <Zap className="h-3 w-3" />
                  <span className="text-xs font-medium">Nouveau</span>
                </motion.div>
              )}
              {product.isHot && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center space-x-1 text-red-600"
                >
                  <Zap className="h-3 w-3" />
                  <span className="text-xs font-medium">Tendance</span>
                </motion.div>
              )}
              {product.isLimited && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center space-x-1 text-orange-600"
                >
                  <Zap className="h-3 w-3" />
                  <span className="text-xs font-medium">Limité</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Hover Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isHovered ? 0.1 : 0,
              boxShadow: isHovered ? '0 0 20px rgba(30, 64, 175, 0.3)' : '0 0 0px rgba(30, 64, 175, 0)'
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </Link>
    </motion.div>
  );
};

export default HoverCard;