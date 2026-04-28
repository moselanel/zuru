-- Seed demo tenants for Zuru platform demonstration
-- This creates two showcase tenants: Mpumalanga Tourism (South Africa) and Visit Rwanda

-- Note: In production, tenants would be created via the signup flow
-- These are pre-seeded demos to showcase the platform capabilities

-- 1. Create Mpumalanga Tourism & Parks Agency (South Africa) tenant
INSERT INTO tenants (
  id,
  name,
  slug,
  tagline,
  description,
  country,
  currency,
  timezone,
  subscription_tier,
  subscription_status,
  primary_color,
  secondary_color,
  logo_url,
  contact_email,
  contact_phone,
  website_url,
  social_links
) VALUES (
  'tenant-mpumalanga-demo',
  'Mpumalanga Tourism & Parks Agency',
  'mpumalanga',
  'Place of the Rising Sun',
  'Discover the natural wonders of Mpumalanga, South Africa''s premier ecotourism destination featuring the Panorama Route, Kruger National Park, and world-class nature reserves.',
  'South Africa',
  'ZAR',
  'Africa/Johannesburg',
  'safari',
  'active',
  '#2E7D32',
  '#FFA000',
  NULL,
  'info@mtpa.co.za',
  '+27 13 759 5300',
  'https://mpumalanga.zuru.africa',
  '{"facebook": "https://facebook.com/mpumalangatourism", "instagram": "https://instagram.com/visitmpu", "twitter": "https://twitter.com/visitmpu"}'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description;

-- 2. Create Visit Rwanda tenant
INSERT INTO tenants (
  id,
  name,
  slug,
  tagline,
  description,
  country,
  currency,
  timezone,
  subscription_tier,
  subscription_status,
  primary_color,
  secondary_color,
  logo_url,
  contact_email,
  contact_phone,
  website_url,
  social_links
) VALUES (
  'tenant-rwanda-demo',
  'Rwanda Development Board - Tourism',
  'visitrwanda',
  'Remarkable Rwanda',
  'Experience the Land of a Thousand Hills. From mountain gorillas in Volcanoes National Park to the vibrant culture of Kigali, Rwanda offers extraordinary adventures.',
  'Rwanda',
  'RWF',
  'Africa/Kigali',
  'safari',
  'active',
  '#00A8E8',
  '#FFD700',
  NULL,
  'info@visitrwanda.com',
  '+250 252 576 514',
  'https://visitrwanda.zuru.africa',
  '{"facebook": "https://facebook.com/visitrwanda", "instagram": "https://instagram.com/visitrwanda_now", "twitter": "https://twitter.com/visitrwanda_now"}'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description;

-- ============================================
-- MPUMALANGA DESTINATIONS
-- ============================================

INSERT INTO destinations (tenant_id, name, slug, short_description, description, hero_image_url, region, province, country, latitude, longitude, is_published, is_featured, sort_order)
VALUES
  ('tenant-mpumalanga-demo', 'Kruger National Park', 'kruger-national-park',
   'Africa''s greatest wildlife sanctuary, home to the Big Five and incredible biodiversity.',
   'Kruger National Park is one of Africa''s largest game reserves, spanning nearly 2 million hectares of unrivaled diversity of life forms. Home to the Big Five (lion, leopard, rhino, elephant, and buffalo), the park offers world-class safari experiences with over 500 bird species and 147 mammal species.',
   'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200',
   'Lowveld', 'Mpumalanga', 'South Africa', -24.0117, 31.4853, true, true, 1),
   
  ('tenant-mpumalanga-demo', 'Blyde River Canyon', 'blyde-river-canyon',
   'The third largest canyon on Earth and the largest green canyon in the world.',
   'The Blyde River Canyon is a 26km long, 800m deep canyon covered with lush subtropical vegetation. Part of the Panorama Route, it features iconic landmarks like the Three Rondavels, Bourke''s Luck Potholes, and God''s Window with breathtaking views of the Lowveld.',
   'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1200',
   'Panorama Route', 'Mpumalanga', 'South Africa', -24.5834, 30.8181, true, true, 2),

  ('tenant-mpumalanga-demo', 'God''s Window', 'gods-window',
   'A spectacular viewpoint offering panoramic views over the Lowveld and beyond.',
   'God''s Window offers one of the most spectacular views in South Africa. On clear days, you can see all the way to Mozambique. The viewpoint is surrounded by lush rainforest and features well-maintained walking trails.',
   'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=1200',
   'Panorama Route', 'Mpumalanga', 'South Africa', -24.8741, 30.8891, true, true, 3),

  ('tenant-mpumalanga-demo', 'Pilgrim''s Rest', 'pilgrims-rest',
   'A perfectly preserved gold mining town from the 1870s, now a living museum.',
   'Step back in time at Pilgrim''s Rest, a historic gold mining town declared a national monument. Wander through original Victorian buildings, visit the Gold Panning Museum, and experience the atmosphere of South Africa''s gold rush era.',
   'https://images.unsplash.com/photo-1565073624497-7144969d0a07?w=1200',
   'Panorama Route', 'Mpumalanga', 'South Africa', -24.8938, 30.7543, true, false, 4),

  ('tenant-mpumalanga-demo', 'Sudwala Caves', 'sudwala-caves',
   'Ancient dolomite caves dating back 240 million years, the oldest known caves in the world.',
   'Explore the Sudwala Caves, some of the oldest caves in the world with fascinating geological formations. The caves feature impressive stalactites, stalagmites, and unique rock formations. The nearby Dinosaur Park is perfect for families.',
   'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200',
   'Lowveld', 'Mpumalanga', 'South Africa', -25.3636, 30.7039, true, false, 5)
ON CONFLICT (tenant_id, slug) DO UPDATE SET
  name = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description;

-- ============================================
-- RWANDA DESTINATIONS
-- ============================================

INSERT INTO destinations (tenant_id, name, slug, short_description, description, hero_image_url, region, province, country, latitude, longitude, is_published, is_featured, sort_order)
VALUES
  ('tenant-rwanda-demo', 'Volcanoes National Park', 'volcanoes-national-park',
   'Home to the endangered mountain gorillas, one of Africa''s most sought-after wildlife encounters.',
   'Volcanoes National Park is a sanctuary for the rare mountain gorilla. Trek through bamboo forests and volcanic terrain to encounter gorilla families in their natural habitat. The park is also home to golden monkeys and offers hiking to volcanic peaks.',
   'https://images.unsplash.com/photo-1521651201144-634f700b36ef?w=1200',
   'Northern Province', 'Northern', 'Rwanda', -1.4574, 29.5360, true, true, 1),

  ('tenant-rwanda-demo', 'Kigali City', 'kigali',
   'Rwanda''s vibrant capital, a clean and green city with rich culture and history.',
   'Kigali is one of Africa''s cleanest and safest cities. Visit the Genocide Memorial, explore local markets, experience the thriving arts scene, and enjoy world-class restaurants. The city is a testament to Rwanda''s remarkable recovery and progress.',
   'https://images.unsplash.com/photo-1580746738099-04b72d5232b1?w=1200',
   'Kigali', 'Kigali', 'Rwanda', -1.9403, 29.8739, true, true, 2),

  ('tenant-rwanda-demo', 'Lake Kivu', 'lake-kivu',
   'One of Africa''s Great Lakes, offering beaches, boat trips, and stunning mountain scenery.',
   'Lake Kivu is a freshwater lake bordering Rwanda and the Democratic Republic of Congo. The lakeside towns of Gisenyi, Kibuye, and Cyangugu offer sandy beaches, boat trips, and spectacular mountain backdrops. Perfect for relaxation after gorilla trekking.',
   'https://images.unsplash.com/photo-1596005554384-d293674c91d7?w=1200',
   'Western Province', 'Western', 'Rwanda', -2.0710, 29.2060, true, true, 3),

  ('tenant-rwanda-demo', 'Nyungwe Forest National Park', 'nyungwe-forest',
   'Africa''s oldest rainforest, home to 13 primate species and the famous canopy walkway.',
   'Nyungwe Forest is one of the most biodiverse mountain rainforests in Africa. Walk the thrilling canopy walkway suspended above the forest floor, track chimpanzees, and discover over 300 bird species. The forest is a paradise for nature lovers.',
   'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200',
   'Southern Province', 'Southern', 'Rwanda', -2.4833, 29.2500, true, true, 4),

  ('tenant-rwanda-demo', 'Akagera National Park', 'akagera-national-park',
   'Rwanda''s only savanna park, offering classic Big Five safari experiences.',
   'Akagera National Park is Rwanda''s largest protected wetland and the last remaining refuge for savannah-adapted species. The park is home to the Big Five including recently reintroduced lions and rhinos. Enjoy boat safaris on Lake Ihema.',
   'https://images.unsplash.com/photo-1534177616064-ef1fc6fb4032?w=1200',
   'Eastern Province', 'Eastern', 'Rwanda', -1.9000, 30.5000, true, false, 5)
ON CONFLICT (tenant_id, slug) DO UPDATE SET
  name = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description;

-- ============================================
-- MPUMALANGA EXPERIENCES
-- ============================================

INSERT INTO experiences (tenant_id, name, slug, short_description, description, hero_image_url, category, duration_hours, difficulty_level, min_group_size, max_group_size, price_from, price_currency, is_published, is_featured)
VALUES
  ('tenant-mpumalanga-demo', 'Big Five Safari Drive', 'big-five-safari',
   'Experience the thrill of spotting Africa''s Big Five in their natural habitat.',
   'Join expert rangers on an unforgettable game drive through Kruger National Park. Our experienced guides know the best spots to find lions, leopards, elephants, rhinos, and buffalos. Morning and sunset drives available with refreshments included.',
   'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200',
   'Safari', 4, 'Easy', 2, 8, 1500, 'ZAR', true, true),

  ('tenant-mpumalanga-demo', 'Panorama Route Adventure', 'panorama-route',
   'A full-day tour of Mpumalanga''s most spectacular viewpoints and natural wonders.',
   'Discover the breathtaking Panorama Route including God''s Window, Bourke''s Luck Potholes, the Three Rondavels, and more. Professional guide, comfortable transport, and lunch at a local restaurant included.',
   'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1200',
   'Scenic', 8, 'Easy', 2, 12, 1200, 'ZAR', true, true),

  ('tenant-mpumalanga-demo', 'Hot Air Balloon Safari', 'balloon-safari',
   'Float silently over the African bush at sunrise for a unique wildlife viewing experience.',
   'Experience the magic of a hot air balloon flight over the spectacular landscapes of Mpumalanga. Watch the sunrise over the bushveld, spot wildlife from above, and end with a champagne breakfast. An unforgettable experience.',
   'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=1200',
   'Adventure', 4, 'Easy', 2, 16, 4500, 'ZAR', true, true),

  ('tenant-mpumalanga-demo', 'Chimpanzee Sanctuary Visit', 'chimp-eden',
   'Meet rescued chimpanzees at the renowned Jane Goodall Institute sanctuary.',
   'Visit Chimp Eden, the only chimpanzee sanctuary in South Africa. Learn about chimpanzee conservation, observe rescued chimps in a natural environment, and support vital rehabilitation work. Educational guided tours available.',
   'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=1200',
   'Wildlife', 2, 'Easy', 1, 20, 350, 'ZAR', true, false),

  ('tenant-mpumalanga-demo', 'White Water Rafting', 'white-water-rafting',
   'Tackle exciting rapids on the Blyde or Sabie Rivers with experienced guides.',
   'Get your adrenaline pumping with white water rafting on Mpumalanga''s scenic rivers. Choose from half-day or full-day trips suitable for beginners to experienced rafters. All safety equipment and professional guides provided.',
   'https://images.unsplash.com/photo-1504870712357-65ea720d6078?w=1200',
   'Adventure', 4, 'Moderate', 4, 12, 950, 'ZAR', true, false)
ON CONFLICT (tenant_id, slug) DO UPDATE SET
  name = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description;

-- ============================================
-- RWANDA EXPERIENCES
-- ============================================

INSERT INTO experiences (tenant_id, name, slug, short_description, description, hero_image_url, category, duration_hours, difficulty_level, min_group_size, max_group_size, price_from, price_currency, is_published, is_featured)
VALUES
  ('tenant-rwanda-demo', 'Mountain Gorilla Trek', 'gorilla-trekking',
   'A once-in-a-lifetime encounter with endangered mountain gorillas in their natural habitat.',
   'Trek through the misty volcanic slopes of the Virunga Mountains to spend a magical hour with a habituated gorilla family. Permits are limited to protect these gentle giants. Includes park fees, guide, and porter services.',
   'https://images.unsplash.com/photo-1521651201144-634f700b36ef?w=1200',
   'Wildlife', 6, 'Challenging', 1, 8, 1500, 'USD', true, true),

  ('tenant-rwanda-demo', 'Golden Monkey Tracking', 'golden-monkey',
   'Track playful golden monkeys in the bamboo forests of Volcanoes National Park.',
   'The golden monkey is one of Africa''s rarest primates, found only in the Virunga Mountains. This less strenuous trek offers excellent wildlife photography opportunities and a chance to observe these beautiful, playful creatures.',
   'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=1200',
   'Wildlife', 4, 'Moderate', 1, 15, 100, 'USD', true, true),

  ('tenant-rwanda-demo', 'Kigali City Tour', 'kigali-tour',
   'Discover Rwanda''s vibrant capital, from historical sites to local markets and culture.',
   'Explore Kigali with a local guide. Visit the Genocide Memorial, explore the colorful Kimironko Market, see local arts at Inema Art Center, and sample Rwandan cuisine. A perfect introduction to Rwanda''s past, present, and future.',
   'https://images.unsplash.com/photo-1580746738099-04b72d5232b1?w=1200',
   'Cultural', 5, 'Easy', 1, 10, 80, 'USD', true, false),

  ('tenant-rwanda-demo', 'Nyungwe Canopy Walk', 'canopy-walk',
   'Walk among the treetops on East Africa''s only canopy walkway.',
   'Experience Nyungwe Forest from a unique perspective on the 200-meter canopy walkway suspended 50 meters above the forest floor. Combined with forest walks and possible chimpanzee tracking for a full rainforest experience.',
   'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200',
   'Adventure', 3, 'Moderate', 1, 20, 60, 'USD', true, true),

  ('tenant-rwanda-demo', 'Lake Kivu Kayaking', 'kivu-kayaking',
   'Paddle the calm waters of Lake Kivu with stunning mountain scenery.',
   'Explore the beautiful shores of Lake Kivu by kayak. Paddle through fishing villages, visit small islands, and enjoy swimming breaks in the warm, bilharzia-free waters. Suitable for beginners, all equipment provided.',
   'https://images.unsplash.com/photo-1596005554384-d293674c91d7?w=1200',
   'Adventure', 3, 'Easy', 1, 8, 45, 'USD', true, false)
ON CONFLICT (tenant_id, slug) DO UPDATE SET
  name = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description;

-- ============================================
-- MPUMALANGA ACCOMMODATIONS
-- ============================================

INSERT INTO accommodations (tenant_id, name, slug, short_description, description, hero_image_url, accommodation_type, star_rating, room_count, price_from, price_currency, amenities, address, latitude, longitude, is_published, is_featured)
VALUES
  ('tenant-mpumalanga-demo', 'Kruger Gate Hotel', 'kruger-gate-hotel',
   'Luxury safari lodge at the doorstep of Kruger National Park.',
   'Experience world-class luxury just meters from Kruger''s Paul Kruger Gate. Our 5-star hotel features spacious rooms with private balconies overlooking the bush, award-winning restaurants, and daily game drives into the park.',
   'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
   'Lodge', 5, 48, 3500, 'ZAR', '["Pool", "Spa", "Restaurant", "WiFi", "Game Drives", "Bar", "Room Service", "Concierge"]', 'Paul Kruger Gate Road, Skukuza', -25.0183, 31.4853, true, true),

  ('tenant-mpumalanga-demo', 'Canyon Lodge & Spa', 'canyon-lodge-spa',
   'Boutique lodge perched on the edge of Blyde River Canyon with infinity pool views.',
   'Wake up to the most spectacular views in Mpumalanga at our cliff-edge lodge. Each suite offers private decks overlooking the canyon, outdoor showers, and direct access to hiking trails. Our spa uses local botanicals for treatments.',
   'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200',
   'Lodge', 4, 24, 2800, 'ZAR', '["Pool", "Spa", "Restaurant", "WiFi", "Hiking", "Bar", "Mountain Views"]', 'Blyde River Canyon Road', -24.5834, 30.8181, true, true),

  ('tenant-mpumalanga-demo', 'Riverside Bush Camp', 'riverside-bush-camp',
   'Authentic tented safari camp on the banks of the Sabie River.',
   'Reconnect with nature at our intimate tented camp. Each luxury tent features en-suite bathrooms, private decks over the river, and the sounds of the African bush. Perfect for bird watching and nature walks.',
   'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200',
   'Tented Camp', 3, 10, 1500, 'ZAR', '["Restaurant", "Bar", "Bird Watching", "Nature Walks", "River Views"]', 'Sabie River Valley', -25.1019, 30.7811, true, false),

  ('tenant-mpumalanga-demo', 'Pilgrim''s Rest Inn', 'pilgrims-rest-inn',
   'Historic guesthouse in the heart of the gold mining heritage town.',
   'Stay in a beautifully restored Victorian building from the 1880s gold rush era. Our charming inn offers character rooms with period furniture, a cozy pub, and easy access to all of Pilgrim''s Rest historic attractions.',
   'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200',
   'Guesthouse', 3, 12, 950, 'ZAR', '["Restaurant", "Bar", "WiFi", "Historic", "Garden"]', 'Main Street, Pilgrim''s Rest', -24.8938, 30.7543, true, false)
ON CONFLICT (tenant_id, slug) DO UPDATE SET
  name = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description;

-- ============================================
-- RWANDA ACCOMMODATIONS
-- ============================================

INSERT INTO accommodations (tenant_id, name, slug, short_description, description, hero_image_url, accommodation_type, star_rating, room_count, price_from, price_currency, amenities, address, latitude, longitude, is_published, is_featured)
VALUES
  ('tenant-rwanda-demo', 'Bisate Lodge', 'bisate-lodge',
   'Ultra-luxury eco-lodge with views of the Virunga volcanoes and gorilla territory.',
   'Bisate Lodge is an architectural marvel nestled in the eroded volcanic cone. Each of the six luxurious forest villas offers panoramic views, fireplaces, and exquisite décor inspired by the Rwandan royal palace. Perfect base for gorilla trekking.',
   'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
   'Lodge', 5, 6, 2500, 'USD', '["Spa", "Restaurant", "WiFi", "Gorilla Trekking", "Volcano Views", "Fireplace", "Butler Service"]', 'Volcanoes National Park', -1.4574, 29.5360, true, true),

  ('tenant-rwanda-demo', 'The Retreat by Heaven', 'retreat-heaven-kigali',
   'Kigali''s premier boutique hotel combining luxury with stunning city views.',
   'Perched on one of Kigali''s famous hills, The Retreat offers panoramic views of the city below. Contemporary African design, world-class cuisine, and a rooftop infinity pool make this the perfect urban oasis.',
   'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200',
   'Hotel', 5, 14, 450, 'USD', '["Pool", "Spa", "Restaurant", "WiFi", "Bar", "City Views", "Gym"]', 'Kiyovu, Kigali', -1.9503, 29.8739, true, true),

  ('tenant-rwanda-demo', 'Lake Kivu Serena Hotel', 'kivu-serena',
   'Lakeside luxury resort with private beach and spectacular sunset views.',
   'Relax on the shores of Lake Kivu at this premier resort. Enjoy water sports, spa treatments, and sundowners overlooking the lake. The perfect place to unwind after gorilla trekking adventures.',
   'https://images.unsplash.com/photo-1596005554384-d293674c91d7?w=1200',
   'Resort', 4, 66, 280, 'USD', '["Pool", "Spa", "Restaurant", "WiFi", "Beach", "Water Sports", "Tennis"]', 'Gisenyi Beach, Lake Kivu', -1.7000, 29.2567, true, true),

  ('tenant-rwanda-demo', 'Nyungwe House', 'nyungwe-house',
   'Tea plantation lodge on the edge of Africa''s oldest rainforest.',
   'Stay amid the rolling tea plantations of the Congo-Nile Trail with easy access to Nyungwe Forest. Our colonial-style lodge offers cozy rooms, forest hikes, and the chance to experience Rwanda''s thriving tea industry.',
   'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200',
   'Lodge', 4, 22, 320, 'USD', '["Restaurant", "WiFi", "Forest Walks", "Tea Tours", "Bird Watching"]', 'Gisakura, Nyungwe', -2.4000, 29.2000, true, false)
ON CONFLICT (tenant_id, slug) DO UPDATE SET
  name = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description;

-- ============================================
-- SAMPLE ENQUIRIES
-- ============================================

INSERT INTO enquiries (tenant_id, name, email, phone, message, source_page, interested_in, travel_dates, group_size, status)
VALUES
  ('tenant-mpumalanga-demo', 'Sarah Johnson', 'sarah.johnson@email.com', '+1 555 123 4567',
   'We''re planning a family trip to South Africa in July. Would love to combine a Kruger safari with the Panorama Route. What packages do you recommend for a family with 2 teens?',
   '/destinations/kruger-national-park', '["Safari", "Panorama Route", "Family"]'::jsonb, 'July 2026', 4, 'new'),

  ('tenant-mpumalanga-demo', 'Hans Mueller', 'h.mueller@gmail.com', '+49 170 123 4567',
   'Looking for a luxury honeymoon package. Interested in private safari experiences and the canyon lodge. Budget around R50,000 for 5 nights.',
   '/accommodations/canyon-lodge-spa', '["Honeymoon", "Luxury", "Safari"]'::jsonb, 'September 2026', 2, 'contacted'),

  ('tenant-mpumalanga-demo', 'Lisa van Berg', 'lisavb@hotmail.com', '+27 82 555 1234',
   'Corporate retreat for 15 people. Need conference facilities and team building activities.',
   '/contact', '["Corporate", "Team Building"]'::jsonb, 'October 2026', 15, 'qualified'),

  ('tenant-rwanda-demo', 'Michael Chen', 'mchen@techcorp.com', '+1 415 555 0199',
   'Bucket list gorilla trekking trip! Would like to book permits for 2 days of trekking plus golden monkey experience. What dates have availability in August?',
   '/experiences/gorilla-trekking', '["Gorilla Trekking", "Golden Monkey"]'::jsonb, 'August 2026', 2, 'new'),

  ('tenant-rwanda-demo', 'Emma Thompson', 'emma.t@travel.co.uk', '+44 7700 900123',
   'Travel blogger planning a 10-day Rwanda coverage. Interested in full country tour including gorillas, Kigali, Lake Kivu, and Nyungwe. Media rates available?',
   '/contact', '["Full Tour", "Media", "Content Creation"]'::jsonb, 'November 2026', 1, 'new'),

  ('tenant-rwanda-demo', 'Jean-Pierre Habimana', 'jphabimana@rwandatrade.rw', '+250 788 123 456',
   'Organizing VIP tour for international business delegation. Need premium accommodations and private gorilla trekking permits for 8 people.',
   '/accommodations/bisate-lodge', '["VIP", "Corporate", "Gorilla Trekking"]'::jsonb, 'December 2026', 8, 'contacted')
ON CONFLICT DO NOTHING;

-- Verify the seeded data
SELECT 'Tenants created:' as info, count(*) as count FROM tenants WHERE id LIKE 'tenant-%demo';
SELECT 'Destinations created:' as info, count(*) as count FROM destinations WHERE tenant_id LIKE 'tenant-%demo';
SELECT 'Experiences created:' as info, count(*) as count FROM experiences WHERE tenant_id LIKE 'tenant-%demo';
SELECT 'Accommodations created:' as info, count(*) as count FROM accommodations WHERE tenant_id LIKE 'tenant-%demo';
SELECT 'Enquiries created:' as info, count(*) as count FROM enquiries WHERE tenant_id LIKE 'tenant-%demo';
