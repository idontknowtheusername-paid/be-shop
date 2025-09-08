'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Clock, TrendingUp, Tag, Star, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchSuggestion {
  id: string;
  type: 'product' | 'category' | 'brand' | 'recent' | 'trending';
  title: string;
  subtitle?: string;
  image?: string;
  price?: number;
  rating?: number;
  category?: string;
  brand?: string;
}

interface AdvancedSearchProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  className = '',
  placeholder = 'Rechercher des produits, marques et catégories...',
  onSearch
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [trendingSearches, setTrendingSearches] = useState<string[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const debouncedQuery = useDebounce(query, 300);

  // Mock data - En production, cela viendrait de l'API
  const mockSuggestions: SearchSuggestion[] = [
    {
      id: '1',
      type: 'product',
      title: 'iPhone 15 Pro Max',
      subtitle: 'Smartphone Apple',
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
      price: 650000,
      rating: 4.8,
      category: 'Électronique',
      brand: 'Apple'
    },
    {
      id: '2',
      type: 'product',
      title: 'Samsung Galaxy S24',
      subtitle: 'Smartphone Samsung',
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
      price: 580000,
      rating: 4.7,
      category: 'Électronique',
      brand: 'Samsung'
    },
    {
      id: '3',
      type: 'category',
      title: 'Smartphones',
      subtitle: 'Catégorie Électronique',
      category: 'Électronique'
    },
    {
      id: '4',
      type: 'brand',
      title: 'Apple',
      subtitle: 'Marque Électronique',
      brand: 'Apple'
    },
    {
      id: '5',
      type: 'product',
      title: 'Nike Air Max 270',
      subtitle: 'Chaussures de sport',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
      price: 65000,
      rating: 4.6,
      category: 'Mode',
      brand: 'Nike'
    }
  ];

  const mockTrendingSearches = [
    'iPhone 15', 'Samsung Galaxy', 'Nike Air Max', 'MacBook Air', 'Adidas Ultraboost'
  ];

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Filter suggestions based on query
  useEffect(() => {
    if (debouncedQuery.length > 1) {
      const filtered = mockSuggestions.filter(item =>
        item.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        item.subtitle?.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        item.brand?.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery]);

  // Handle search
  const handleSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    // Add to recent searches
    const newRecent = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));
    
    // Navigate to search results
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    
    // Close dropdown
    setIsOpen(false);
    setQuery('');
    
    // Call onSearch callback if provided
    onSearch?.(searchQuery);
  }, [recentSearches, router, onSearch]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length > 0);
    setSelectedIndex(-1);
  };

  // Handle key navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length + recentSearches.length + trendingSearches.length - 1 
            ? prev + 1 
            : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          const totalItems = suggestions.length + recentSearches.length + trendingSearches.length;
          if (selectedIndex < suggestions.length) {
            handleSearch(suggestions[selectedIndex].title);
          } else if (selectedIndex < suggestions.length + recentSearches.length) {
            const recentIndex = selectedIndex - suggestions.length;
            handleSearch(recentSearches[recentIndex]);
          } else {
            const trendingIndex = selectedIndex - suggestions.length - recentSearches.length;
            handleSearch(trendingSearches[trendingIndex]);
          }
        } else {
          handleSearch(query);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-BJ', {
      style: 'currency',
      currency: 'XOF'
    }).format(price);
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'product': return <Search className="h-4 w-4" />;
      case 'category': return <Tag className="h-4 w-4" />;
      case 'brand': return <Star className="h-4 w-4" />;
      case 'recent': return <Clock className="h-4 w-4" />;
      case 'trending': return <TrendingUp className="h-4 w-4" />;
      default: return <Search className="h-4 w-4" />;
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'product': return 'text-blue-600';
      case 'category': return 'text-green-600';
      case 'brand': return 'text-purple-600';
      case 'recent': return 'text-gray-600';
      case 'trending': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex">
        <div className="relative flex-1">
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className="flex-1 rounded-r-none border-r-0 focus:ring-[#1E40AF] focus:border-[#1E40AF] pr-10"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button 
          onClick={() => handleSearch(query)}
          className="be-button-secondary rounded-l-none"
        >
          <Search size={20} />
        </Button>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <Card 
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 z-50 max-h-96 overflow-y-auto shadow-xl border-0"
        >
          <CardContent className="p-0">
            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
                  Suggestions
                </div>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSearch(suggestion.title)}
                    className={`w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors ${
                      selectedIndex === index ? 'bg-gray-50' : ''
                    }`}
                  >
                    <div className={`${getSuggestionColor(suggestion.type)}`}>
                      {getSuggestionIcon(suggestion.type)}
                    </div>
                    {suggestion.image && (
                      <div className="w-8 h-8 relative overflow-hidden rounded">
                        <img
                          src={suggestion.image}
                          alt={suggestion.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-900">{suggestion.title}</div>
                      {suggestion.subtitle && (
                        <div className="text-sm text-gray-500">{suggestion.subtitle}</div>
                      )}
                      {suggestion.price && (
                        <div className="text-sm font-semibold text-[#EA580C]">
                          {formatPrice(suggestion.price)}
                        </div>
                      )}
                    </div>
                    {suggestion.rating && (
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-500">{suggestion.rating}</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Recent Searches */}
            {recentSearches.length > 0 && query.length === 0 && (
              <div className="p-2 border-t">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
                  Recherches récentes
                </div>
                {recentSearches.map((search, index) => (
                  <button
                    key={search}
                    onClick={() => handleSearch(search)}
                    className={`w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors ${
                      selectedIndex === suggestions.length + index ? 'bg-gray-50' : ''
                    }`}
                  >
                    <Clock className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-900">{search}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Trending Searches */}
            {trendingSearches.length > 0 && query.length === 0 && (
              <div className="p-2 border-t">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
                  Tendances
                </div>
                {trendingSearches.map((search, index) => (
                  <button
                    key={search}
                    onClick={() => handleSearch(search)}
                    className={`w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors ${
                      selectedIndex === suggestions.length + recentSearches.length + index ? 'bg-gray-50' : ''
                    }`}
                  >
                    <TrendingUp className="h-4 w-4 text-orange-600" />
                    <span className="text-gray-900">{search}</span>
                  </button>
                ))}
              </div>
            )}

            {/* No Results */}
            {query.length > 1 && suggestions.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p>Aucun résultat pour "{query}"</p>
                <Button 
                  onClick={() => handleSearch(query)}
                  className="mt-2 be-button-primary"
                  size="sm"
                >
                  Rechercher "{query}"
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdvancedSearch;

