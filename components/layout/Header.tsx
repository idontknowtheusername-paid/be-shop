'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Heart, User, Menu, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import AdvancedSearch from '@/components/ui/advanced-search';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(5);
  const { user, isAuthenticated, signOut } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      {/* Main Header */}
      <div className="be-container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-[#1E40AF] text-white px-4 py-2 rounded-lg font-bold text-2xl">
              Be
            </div>
            <div>
              <div className="text-2xl font-bold text-[#1E40AF]">Shop</div>
              <div className="text-xs text-[#EA580C] font-medium">Shopping d'Élite du Bénin</div>
            </div>
          </Link>

          {/* Advanced Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <AdvancedSearch 
              className="w-full"
              placeholder="Rechercher des produits, marques et catégories..."
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Account */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="hidden md:flex items-center space-x-2 hover:text-[#1E40AF] transition-colors">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar_url} alt={user?.full_name} />
                      <AvatarFallback>
                        {user?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <div className="font-medium">{user?.full_name || 'Utilisateur'}</div>
                      <div className="text-xs text-gray-500">{user?.email}</div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center space-x-2">
                      <User size={16} />
                      <span>Mon Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="flex items-center space-x-2">
                      <Settings size={16} />
                      <span>Paramètres</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => signOut()}
                    className="flex items-center space-x-2 text-red-600"
                  >
                    <LogOut size={16} />
                    <span>Se déconnecter</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/login" className="hidden md:flex items-center space-x-2 hover:text-[#1E40AF] transition-colors">
                <User size={24} />
                <div className="text-sm">
                  <div className="font-medium">Compte</div>
                  <div className="text-xs text-gray-500">Se connecter</div>
                </div>
              </Link>
            )}

            {/* Wishlist */}
            <Link href="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Heart size={24} />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-[#EA580C] text-white min-w-[20px] h-5 text-xs">
                  {wishlistCount}
                </Badge>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-[#EA580C] text-white min-w-[20px] h-5 text-xs">
                  {cartCount}
                </Badge>
              )}
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="flex">
            <Input
              type="text"
              placeholder="Rechercher des produits..."
              className="flex-1 rounded-r-none border-r-0"
            />
            <Button className="be-button-secondary rounded-l-none">
              <Search size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Categories Menu */}
      <div className="bg-gray-50 border-t">
        <div className="be-container">
          <div className="hidden md:flex items-center justify-between py-3">
            <div className="flex items-center space-x-8">
              <Link href="/electronics" className="hover:text-[#1E40AF] transition-colors font-medium">
                Électronique
              </Link>
              <Link href="/fashion" className="hover:text-[#1E40AF] transition-colors font-medium">
                Mode
              </Link>
              <Link href="/home-garden" className="hover:text-[#1E40AF] transition-colors font-medium">
                Maison & Jardin
              </Link>
              <Link href="/beauty-health" className="hover:text-[#1E40AF] transition-colors font-medium">
                Beauté & Santé
              </Link>
              <Link href="/sports" className="hover:text-[#1E40AF] transition-colors font-medium">
                Sport & Loisirs
              </Link>
              <Link href="/food" className="hover:text-[#1E40AF] transition-colors font-medium">
                Alimentation & Boissons
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/flash-sales" className="text-[#EA580C] hover:text-[#FB923C] transition-colors font-medium">
                🔥 Ventes Flash
              </Link>
              <Link href="/sell" className="hover:text-[#1E40AF] transition-colors font-medium">
                Vendre sur Be Shop
              </Link>
              <Link href="/track" className="hover:text-[#1E40AF] transition-colors font-medium">
                Suivre ma commande
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="be-container py-4 space-y-4">
            {/* Mobile Search */}
            <div className="mb-4">
              <AdvancedSearch 
                className="w-full"
                placeholder="Rechercher..."
              />
            </div>
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-2 py-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user?.avatar_url} alt={user?.full_name} />
                    <AvatarFallback>
                      {user?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user?.full_name || 'Utilisateur'}</span>
                </div>
                <Link href="/dashboard" className="flex items-center space-x-2 py-2 text-sm">
                  <User size={16} />
                  <span>Mon Dashboard</span>
                </Link>
                <button 
                  onClick={() => signOut()}
                  className="flex items-center space-x-2 py-2 text-sm text-red-600 w-full text-left"
                >
                  <LogOut size={16} />
                  <span>Se déconnecter</span>
                </button>
              </div>
            ) : (
              <Link href="/auth/login" className="flex items-center space-x-2 py-2">
                <User size={20} />
                <span>Mon Compte</span>
              </Link>
            )}
            <div className="grid grid-cols-2 gap-4">
              <Link href="/electronics" className="py-2 hover:text-[#1E40AF]">Électronique</Link>
              <Link href="/fashion" className="py-2 hover:text-[#1E40AF]">Mode</Link>
              <Link href="/home-garden" className="py-2 hover:text-[#1E40AF]">Maison & Jardin</Link>
              <Link href="/beauty-health" className="py-2 hover:text-[#1E40AF]">Beauté & Santé</Link>
              <Link href="/sports" className="py-2 hover:text-[#1E40AF]">Sport & Loisirs</Link>
              <Link href="/food" className="py-2 hover:text-[#1E40AF]">Alimentation & Boissons</Link>
            </div>
            <div className="space-y-2">
              <Link href="/flash-sales" className="block py-2 text-[#EA580C] font-medium">
                🔥 Ventes Flash
              </Link>
              <Link href="/sell" className="block py-2 hover:text-[#1E40AF]">
                Vendre sur Be Shop
              </Link>
              <Link href="/track" className="block py-2 hover:text-[#1E40AF]">
                Suivre ma commande
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;