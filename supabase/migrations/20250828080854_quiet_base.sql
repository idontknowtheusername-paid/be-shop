/*
  # Seed Initial Data for Be Shop

  Populate the database with initial categories, brands, and sample products
  to get the e-commerce platform ready for testing and demonstration.
*/

-- Insert main categories
INSERT INTO categories (name, slug, description, image_url, sort_order) VALUES
  ('Electronics', 'electronics', 'Smartphones, laptops, TVs and electronic gadgets', 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg', 1),
  ('Fashion', 'fashion', 'Clothing, shoes and accessories for men and women', 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg', 2),
  ('Home & Garden', 'home-garden', 'Furniture, home decor and garden supplies', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg', 3),
  ('Beauty & Health', 'beauty-health', 'Cosmetics, skincare and health products', 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg', 4),
  ('Sports & Leisure', 'sports', 'Sports equipment and leisure activities', 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg', 5),
  ('Food & Drinks', 'food', 'Groceries, beverages and food products', 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', 6);

-- Insert subcategories
INSERT INTO categories (name, slug, description, parent_id, sort_order) VALUES
  ('Smartphones', 'smartphones', 'Mobile phones and accessories', (SELECT id FROM categories WHERE slug = 'electronics'), 1),
  ('Laptops & Computers', 'laptops', 'Laptops, desktops and computer accessories', (SELECT id FROM categories WHERE slug = 'electronics'), 2),
  ('TVs & Audio', 'tvs-audio', 'Televisions, speakers and audio equipment', (SELECT id FROM categories WHERE slug = 'electronics'), 3),
  ('Men''s Fashion', 'mens-fashion', 'Clothing and accessories for men', (SELECT id FROM categories WHERE slug = 'fashion'), 1),
  ('Women''s Fashion', 'womens-fashion', 'Clothing and accessories for women', (SELECT id FROM categories WHERE slug = 'fashion'), 2),
  ('Shoes', 'shoes', 'Footwear for all ages', (SELECT id FROM categories WHERE slug = 'fashion'), 3);

-- Insert popular brands
INSERT INTO brands (name, slug, description, logo_url) VALUES
  ('Apple', 'apple', 'Premium technology products', 'https://images.pexels.com/photos/18105/pexels-photo.jpg'),
  ('Samsung', 'samsung', 'Electronics and mobile devices', 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg'),
  ('Nike', 'nike', 'Sports and lifestyle brand', 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg'),
  ('Adidas', 'adidas', 'Sports and lifestyle brand', 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg'),
  ('Sony', 'sony', 'Electronics and entertainment', 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'),
  ('HP', 'hp', 'Computers and printers', 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg'),
  ('Dell', 'dell', 'Computers and technology', 'https://images.pexels.com/photos/18105/pexels-photo.jpg'),
  ('LG', 'lg', 'Home appliances and electronics', 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg');

-- Create sample vendor (for demo purposes)
INSERT INTO profiles (id, email, full_name, phone, role) VALUES
  (gen_random_uuid(), 'vendor@beshop.bj', 'Be Shop Official Store', '+229 97 XX XX XX', 'vendor');

INSERT INTO vendors (user_id, business_name, business_description, business_email, business_phone, is_approved, is_active) VALUES
  ((SELECT id FROM profiles WHERE email = 'vendor@beshop.bj'), 'Be Shop Official Store', 'Official Be Shop store with premium products', 'vendor@beshop.bj', '+229 97 XX XX XX', true, true);

-- Insert sample products
INSERT INTO products (
  vendor_id, category_id, brand_id, name, slug, description, short_description,
  sku, price, sale_price, stock_quantity, status, featured, rating, rating_count
) VALUES
  (
    (SELECT id FROM vendors WHERE business_name = 'Be Shop Official Store'),
    (SELECT id FROM categories WHERE slug = 'smartphones'),
    (SELECT id FROM brands WHERE slug = 'samsung'),
    'Samsung Galaxy A54 5G 128GB',
    'samsung-galaxy-a54-5g-128gb',
    'Experience premium features with the Samsung Galaxy A54 5G. Featuring a vibrant 6.4" Super AMOLED display, triple camera system with 50MP main camera, and all-day battery life. Perfect for photography enthusiasts and power users.',
    'Samsung Galaxy A54 5G with 50MP camera and Super AMOLED display',
    'SAM-A54-128-BLK',
    185000,
    145000,
    25,
    'active',
    true,
    4.5,
    342
  ),
  (
    (SELECT id FROM vendors WHERE business_name = 'Be Shop Official Store'),
    (SELECT id FROM categories WHERE slug = 'shoes'),
    (SELECT id FROM brands WHERE slug = 'nike'),
    'Nike Air Max 270 Running Shoes',
    'nike-air-max-270-running',
    'The Nike Air Max 270 delivers visible comfort with the largest Air unit yet. The sleek silhouette features a modern design that''s perfect for everyday wear, while the responsive cushioning keeps you comfortable all day long.',
    'Nike Air Max 270 with maximum air cushioning technology',
    'NIKE-270-42-WHT',
    65000,
    48000,
    15,
    'active',
    true,
    4.7,
    128
  ),
  (
    (SELECT id FROM vendors WHERE business_name = 'Be Shop Official Store'),
    (SELECT id FROM categories WHERE slug = 'laptops'),
    (SELECT id FROM brands WHERE slug = 'apple'),
    'Apple MacBook Air M2 256GB',
    'macbook-air-m2-256gb',
    'The new MacBook Air with M2 chip delivers incredible performance in an ultra-thin design. Features a 13.6" Liquid Retina display, up to 20 hours of battery life, and the power to run professional apps with ease.',
    'MacBook Air with M2 chip, 13.6" display and all-day battery',
    'APPLE-MBA-M2-256',
    850000,
    720000,
    8,
    'active',
    true,
    4.9,
    89
  ),
  (
    (SELECT id FROM vendors WHERE business_name = 'Be Shop Official Store'),
    (SELECT id FROM categories WHERE slug = 'tvs-audio'),
    (SELECT id FROM brands WHERE slug = 'sony'),
    'Sony WH-1000XM5 Noise Cancelling Headphones',
    'sony-wh1000xm5-headphones',
    'Industry-leading noise canceling with new Integrated Processor V1 and 8 microphones for unprecedented noise canceling performance. Crystal clear hands-free calling and voice assistant compatibility.',
    'Sony premium noise cancelling headphones with superior sound',
    'SONY-XM5-BLK',
    95000,
    68000,
    20,
    'active',
    false,
    4.6,
    234
  ),
  (
    (SELECT id FROM vendors WHERE business_name = 'Be Shop Official Store'),
    (SELECT id FROM categories WHERE slug = 'laptops'),
    (SELECT id FROM brands WHERE slug = 'hp'),
    'HP Pavilion Gaming Laptop 15"',
    'hp-pavilion-gaming-15',
    'Get serious about gaming with the HP Pavilion Gaming Laptop. Featuring AMD Ryzen 5 processor, NVIDIA GeForce GTX graphics, and a 144Hz display for smooth gameplay. Perfect for gaming and content creation.',
    'HP gaming laptop with AMD Ryzen 5 and GTX graphics',
    'HP-PAV-GAME-15',
    450000,
    385000,
    12,
    'active',
    false,
    4.4,
    156
  ),
  (
    (SELECT id FROM vendors WHERE business_name = 'Be Shop Official Store'),
    (SELECT id FROM categories WHERE slug = 'smartphones'),
    (SELECT id FROM brands WHERE slug = 'apple'),
    'iPhone 15 Pro Max 256GB',
    'iphone-15-pro-max-256gb',
    'The most advanced iPhone ever. Featuring the powerful A17 Pro chip, professional camera system with 5x optical zoom, and aerospace-grade titanium design. Shot on iPhone, edited on iPhone.',
    'iPhone 15 Pro Max with titanium design and A17 Pro chip',
    'APPLE-15PM-256-TIT',
    650000,
    580000,
    6,
    'active',
    true,
    4.8,
    256
  );

-- Insert product images
INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary) VALUES
  ((SELECT id FROM products WHERE slug = 'samsung-galaxy-a54-5g-128gb'), 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg', 'Samsung Galaxy A54 5G front view', 1, true),
  ((SELECT id FROM products WHERE slug = 'samsung-galaxy-a54-5g-128gb'), 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg', 'Samsung Galaxy A54 5G back view', 2, false),
  ((SELECT id FROM products WHERE slug = 'nike-air-max-270-running'), 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg', 'Nike Air Max 270 side view', 1, true),
  ((SELECT id FROM products WHERE slug = 'macbook-air-m2-256gb'), 'https://images.pexels.com/photos/18105/pexels-photo.jpg', 'MacBook Air M2 open view', 1, true),
  ((SELECT id FROM products WHERE slug = 'sony-wh1000xm5-headphones'), 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg', 'Sony WH-1000XM5 headphones', 1, true),
  ((SELECT id FROM products WHERE slug = 'hp-pavilion-gaming-15'), 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg', 'HP Pavilion Gaming laptop', 1, true),
  ((SELECT id FROM products WHERE slug = 'iphone-15-pro-max-256gb'), 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg', 'iPhone 15 Pro Max front', 1, true);

-- Insert product variants (colors, sizes)
INSERT INTO product_variants (product_id, name, value, stock_quantity) VALUES
  ((SELECT id FROM products WHERE slug = 'samsung-galaxy-a54-5g-128gb'), 'Color', 'Awesome Black', 15),
  ((SELECT id FROM products WHERE slug = 'samsung-galaxy-a54-5g-128gb'), 'Color', 'Awesome Blue', 10),
  ((SELECT id FROM products WHERE slug = 'nike-air-max-270-running'), 'Size', '42', 5),
  ((SELECT id FROM products WHERE slug = 'nike-air-max-270-running'), 'Size', '43', 7),
  ((SELECT id FROM products WHERE slug = 'nike-air-max-270-running'), 'Size', '44', 3),
  ((SELECT id FROM products WHERE slug = 'macbook-air-m2-256gb'), 'Color', 'Space Gray', 4),
  ((SELECT id FROM products WHERE slug = 'macbook-air-m2-256gb'), 'Color', 'Silver', 4),
  ((SELECT id FROM products WHERE slug = 'iphone-15-pro-max-256gb'), 'Color', 'Natural Titanium', 3),
  ((SELECT id FROM products WHERE slug = 'iphone-15-pro-max-256gb'), 'Color', 'Blue Titanium', 3);

-- Insert promotional banners
INSERT INTO banners (title, description, image_url, link_url, position, sort_order, is_active) VALUES
  ('Flash Sale - Up to 70% Off', 'Limited time offers on electronics and fashion', 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg', '/flash-sales', 'homepage', 1, true),
  ('New Fashion Collection', 'Discover the latest trends for 2024', 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg', '/fashion', 'homepage', 2, true),
  ('Electronics Sale', 'Best deals on smartphones and laptops', 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg', '/electronics', 'homepage', 3, true);

-- Insert sample coupons
INSERT INTO coupons (code, description, discount_type, discount_value, minimum_amount, usage_limit, valid_until, is_active) VALUES
  ('WELCOME10', 'Welcome discount for new customers', 'percentage', 10.00, 50000, 1000, NOW() + INTERVAL '30 days', true),
  ('FLASH20', 'Flash sale discount', 'percentage', 20.00, 100000, 500, NOW() + INTERVAL '7 days', true),
  ('SAVE5000', 'Fixed discount on orders over 150,000 XOF', 'fixed', 5000.00, 150000, 200, NOW() + INTERVAL '15 days', true);