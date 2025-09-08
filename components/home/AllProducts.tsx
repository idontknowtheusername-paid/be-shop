'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Heart, ShoppingCart, Filter, Grid, List, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AllProducts = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const allProducts = [
    {
      id: 29,
      name: 'Xiaomi Redmi Note 12 Pro',
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
      originalPrice: 125000,
      salePrice: 98000,
      discount: 22,
      rating: 4.4,
      reviews: 234,
      badge: 'Valeur',
      category: 'Électronique',
      brand: 'Xiaomi'
    },
    {
      id: 30,
      name: 'Puma RS-X Sneakers',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
      originalPrice: 48000,
      salePrice: 36000,
      discount: 25,
      rating: 4.3,
      reviews: 156,
      badge: 'Sport',
      category: 'Mode',
      brand: 'Puma'
    },
    {
      id: 31,
      name: 'Instant Pot Duo 7-en-1',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      originalPrice: 85000,
      salePrice: 68000,
      discount: 20,
      rating: 4.6,
      reviews: 345,
      badge: 'Cuisine',
      category: 'Maison',
      brand: 'Instant Pot'
    },
    {
      id: 32,
      name: 'Logitech MX Master 3S',
      image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg',
      originalPrice: 45000,
      salePrice: 38000,
      discount: 16,
      rating: 4.7,
      reviews: 289,
      badge: 'Productivité',
      category: 'Électronique',
      brand: 'Logitech'
    },
    {
      id: 33,
      name: 'Kit de Soins The Ordinary',
      image: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg',
      originalPrice: 28000,
      salePrice: 22000,
      discount: 21,
      rating: 4.5,
      reviews: 567,
      badge: 'Soins',
      category: 'Beauté',
      brand: 'The Ordinary'
    },
    {
      id: 34,
      name: 'Fitbit Charge 5',
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
      originalPrice: 95000,
      salePrice: 78000,
      discount: 18,
      rating: 4.4,
      reviews: 234,
      badge: 'Fitness',
      category: 'Électronique',
      brand: 'Fitbit'
    },
    {
      id: 35,
      name: 'Manteau en Laine Zara',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
      originalPrice: 125000,
      salePrice: 95000,
      discount: 24,
      rating: 4.2,
      reviews: 123,
      badge: 'Mode',
      category: 'Mode',
      brand: 'Zara'
    },
    {
      id: 36,
      name: 'Friteuse à Air Philips XXL',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      originalPrice: 155000,
      salePrice: 125000,
      discount: 19,
      rating: 4.6,
      reviews: 456,
      badge: 'Santé',
      category: 'Maison',
      brand: 'Philips'
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-BJ', {
      style: 'currency',
      currency: 'XOF'
    }).format(price);
  };

  const ProductCard = ({ product, isListView = false }: { product: any, isListView?: boolean }) => (
    <div className={`be-card p-4 group hover:shadow-lg transition-all duration-300 ${
      isListView ? 'flex space-x-4' : ''
    }`}>
      <div className={`relative ${isListView ? 'w-32 h-32 flex-shrink-0' : 'mb-4'}`}>
        <Link href={`/product/${product.id}`}>
          <div className={`${isListView ? 'w-full h-full' : 'aspect-square'} relative overflow-hidden rounded-lg`}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
        
        {product.badge && (
          <Badge className="absolute top-2 left-2 bg-[#EA580C] text-white text-xs">
            {product.badge}
          </Badge>
        )}
        
        {product.discount > 0 && (
          <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">
            -{product.discount}%
          </Badge>
        )}
        
        {!isListView && (
          <div className="absolute bottom-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" variant="outline" className="p-1 bg-white hover:bg-gray-100">
              <Heart size={14} />
            </Button>
            <Button size="sm" className="p-1 be-primary">
              <ShoppingCart size={14} />
            </Button>
          </div>
        )}
      </div>
      
      <div className={`space-y-2 ${isListView ? 'flex-1' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="text-xs text-[#EA580C] font-medium">
            {product.category} • {product.brand}
          </div>
          {isListView && (
            <div className="flex space-x-1">
              <Button size="sm" variant="outline" className="p-1">
                <Heart size={14} />
              </Button>
              <Button size="sm" className="p-1 be-primary">
                <ShoppingCart size={14} />
              </Button>
            </div>
          )}
        </div>
        
        <Link href={`/product/${product.id}`}>
          <h3 className={`font-medium hover:text-[#1E40AF] transition-colors ${
            isListView ? 'text-base' : 'text-sm line-clamp-2'
          }`}>
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center space-x-1">
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={12}
                className={`${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">
            ({product.reviews})
          </span>
        </div>
        
        <div className="space-y-1">
          <div className={`${isListView ? 'flex items-center space-x-2' : 'space-y-1'}`}>
            <span className={`font-bold text-[#EA580C] ${isListView ? 'text-xl' : 'text-lg'}`}>
              {formatPrice(product.salePrice)}
            </span>
            {product.originalPrice > product.salePrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
        
        {isListView && (
          <Button className="be-button-primary mt-2">
            Ajouter au Panier
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <section className="py-12 bg-white">
      <div className="be-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Tous les Produits
            </h2>
            <p className="text-lg text-gray-600">
              {allProducts.length} produits disponibles
            </p>
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Vedettes</SelectItem>
                <SelectItem value="price-low">Prix : Croissant</SelectItem>
                <SelectItem value="price-high">Prix : Décroissant</SelectItem>
                <SelectItem value="rating">Mieux Notés</SelectItem>
                <SelectItem value="newest">Plus Récents</SelectItem>
              </SelectContent>
            </Select>
            
            {/* View Mode */}
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid size={16} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List size={16} />
              </Button>
            </div>
            
            {/* Filters */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter size={16} />
              <span>Filtres</span>
              <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <h4 className="font-medium mb-2">Catégorie</h4>
                <div className="space-y-2">
                  {['Électronique', 'Mode', 'Maison', 'Beauté'].map((cat) => (
                    <label key={cat} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Fourchette de Prix</h4>
                <div className="space-y-2">
                  {['Moins de 50 000 XOF', '50 000 - 100 000 XOF', '100 000 - 200 000 XOF', 'Plus de 200 000 XOF'].map((range) => (
                    <label key={range} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{range}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Marque</h4>
                <div className="space-y-2">
                  {['Apple', 'Samsung', 'Nike', 'Adidas'].map((brand) => (
                    <label key={brand} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Note</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: rating }, (_, i) => (
                          <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-sm">& plus</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid/List */}
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6' 
            : 'space-y-4'
        }`}>
          {allProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isListView={viewMode === 'list'} 
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button className="be-button-primary text-lg px-8 py-3 h-auto">
            Charger Plus de Produits
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AllProducts;