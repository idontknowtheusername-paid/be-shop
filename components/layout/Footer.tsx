import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="be-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-[#1E40AF] text-white px-3 py-2 rounded-lg font-bold text-xl">
                Be
              </div>
              <div>
                <div className="text-xl font-bold">Shop</div>
                <div className="text-xs text-[#EA580C] font-medium">Shopping d'Élite du Bénin</div>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              La première plateforme e-commerce du Bénin offrant des produits de qualité avec une livraison rapide dans tout le pays.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-[#EA580C] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#EA580C] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#EA580C] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#EA580C] transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Service Client</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-300 hover:text-white transition-colors">Centre d'Aide</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Nous Contacter</Link></li>
              <li><Link href="/track" className="text-gray-300 hover:text-white transition-colors">Suivre votre commande</Link></li>
              <li><Link href="/returns" className="text-gray-300 hover:text-white transition-colors">Retours & Remboursements</Link></li>
              <li><Link href="/warranty" className="text-gray-300 hover:text-white transition-colors">Garantie</Link></li>
              <li><Link href="/shipping" className="text-gray-300 hover:text-white transition-colors">Informations de livraison</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">À propos de Be Shop</Link></li>
              <li><Link href="/sell" className="text-gray-300 hover:text-white transition-colors">Vendre sur Be Shop</Link></li>
              <li><Link href="/careers" className="text-gray-300 hover:text-white transition-colors">Carrières</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/deals" className="text-gray-300 hover:text-white transition-colors">Offres du Jour</Link></li>
              <li><Link href="/gift-cards" className="text-gray-300 hover:text-white transition-colors">Cartes Cadeaux</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Nous Contacter</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-[#EA580C]" />
                <span className="text-gray-300">Cotonou, Bénin</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-[#EA580C]" />
                <span className="text-gray-300">+229 97 XX XX XX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-[#EA580C]" />
                <span className="text-gray-300">support@beshop.bj</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-medium mb-2">S'abonner à notre newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:border-[#1E40AF] text-white"
                />
                <button className="px-4 py-2 be-secondary rounded-r-md">
                  S'abonner
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-gray-800 py-6">
        <div className="be-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="font-medium mb-2">Moyens de Paiement</h4>
              <div className="flex space-x-4">
                <div className="bg-white px-3 py-2 rounded text-black font-bold text-sm">VISA</div>
                <div className="bg-white px-3 py-2 rounded text-black font-bold text-sm">MC</div>
                <div className="bg-white px-3 py-2 rounded text-black font-bold text-sm">PayPal</div>
                <div className="bg-white px-3 py-2 rounded text-black font-bold text-sm">MTN</div>
                <div className="bg-white px-3 py-2 rounded text-black font-bold text-sm">Airtel</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-300 text-sm">Sécurisé par</div>
              <div className="bg-white px-3 py-1 rounded text-black font-bold text-sm mt-1">SSL</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-4">
        <div className="be-container">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
            <div className="mb-2 md:mb-0">
              © 2024 Be Shop. Tous droits réservés.
            </div>
            <div className="flex space-x-4">
              <Link href="/privacy" className="hover:text-white transition-colors">Politique de Confidentialité</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Conditions d'Utilisation</Link>
              <Link href="/cookies" className="hover:text-white transition-colors">Politique des Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;