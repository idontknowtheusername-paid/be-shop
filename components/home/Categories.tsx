import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: 'Électronique',
      slug: 'electronics',
      image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
      color: 'bg-blue-500',
      items: '15 000+ articles'
    },
    {
      id: 2,
      name: 'Mode',
      slug: 'fashion',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
      color: 'bg-pink-500',
      items: '25 000+ articles'
    },
    {
      id: 3,
      name: 'Maison & Jardin',
      slug: 'home-garden',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      color: 'bg-green-500',
      items: '8 000+ articles'
    },
    {
      id: 4,
      name: 'Beauté & Santé',
      slug: 'beauty-health',
      image: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg',
      color: 'bg-purple-500',
      items: '12 000+ articles'
    },
    {
      id: 5,
      name: 'Sport & Loisirs',
      slug: 'sports',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
      color: 'bg-orange-500',
      items: '6 000+ articles'
    },
    {
      id: 6,
      name: 'Alimentation & Boissons',
      slug: 'food',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      color: 'bg-red-500',
      items: '3 000+ articles'
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="be-container">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Acheter par Catégorie
          </h2>
          <p className="text-lg text-gray-600">
            Découvrez notre large gamme de produits dans différentes catégories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.slug}`}
              className="group be-card p-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-center space-y-3">
                <div className="relative aspect-square mx-auto max-w-[100px] overflow-hidden rounded-full">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 ${category.color} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#1E40AF] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {category.items}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;