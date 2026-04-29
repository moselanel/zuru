-- Seed demo tenants for Zuru platform demonstration
-- Two showcase tenants: South African Tourism and Visit Rwanda

-- ============================================
-- TENANTS
-- ============================================

INSERT INTO tenants (
  id, slug, name,
  primary_color, secondary_color,
  currency, timezone,
  subscription_tier, subscription_status,
  max_destinations, max_listings, max_users, max_languages,
  contact_email, contact_phone,
  is_demo, is_active
) VALUES (
  'e193b62e-af6e-4721-a2f6-95694bb22891',
  'southafrica',
  'South African Tourism',
  '#006B3F', '#FFB612',
  'ZAR', 'Africa/Johannesburg',
  'safari', 'active',
  10, 100, 5, 6,
  'info@southafrica.net', '+27 11 895 3000',
  true, true
) ON CONFLICT (slug) DO UPDATE SET
  name          = EXCLUDED.name,
  primary_color = EXCLUDED.primary_color,
  is_demo       = true,
  is_active     = true;

INSERT INTO tenants (
  id, slug, name,
  primary_color, secondary_color,
  currency, timezone,
  subscription_tier, subscription_status,
  max_destinations, max_listings, max_users, max_languages,
  contact_email, contact_phone,
  is_demo, is_active
) VALUES (
  'a010c87c-2bd9-41d3-a692-38634d2e1343',
  'visitrwanda',
  'Rwanda Development Board - Tourism',
  '#00A8E8', '#FFD700',
  'RWF', 'Africa/Kigali',
  'safari', 'active',
  10, 100, 5, 6,
  'info@visitrwanda.com', '+250 252 576 514',
  true, true
) ON CONFLICT (slug) DO UPDATE SET
  name          = EXCLUDED.name,
  primary_color = EXCLUDED.primary_color,
  is_demo       = true,
  is_active     = true;

-- ============================================
-- SOUTH AFRICA — DESTINATIONS
-- ============================================

INSERT INTO destinations (tenant_id, slug, name, short_description, description, hero_image_url, location, is_published, is_featured, sort_order)
VALUES
  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'kruger-national-park', 'Kruger National Park',
   'Africa''s greatest wildlife sanctuary, home to the Big Five and incredible biodiversity.',
   'Kruger National Park is one of Africa''s largest game reserves, spanning nearly 2 million hectares of unrivaled diversity of life forms. Home to the Big Five (lion, leopard, rhino, elephant, and buffalo), the park offers world-class safari experiences with over 500 bird species and 147 mammal species.',
   'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200',
   '{"lat": -24.0117, "lng": 31.4853, "region": "Limpopo / Mpumalanga"}'::jsonb,
   true, true, 1),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'blyde-river-canyon', 'Blyde River Canyon',
   'The third largest canyon on Earth and the largest green canyon in the world.',
   'The Blyde River Canyon is a 26km long, 800m deep canyon covered with lush subtropical vegetation. Part of the Panorama Route, it features iconic landmarks like the Three Rondavels, Bourke''s Luck Potholes, and God''s Window with breathtaking views of the Lowveld.',
   'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1200',
   '{"lat": -24.5834, "lng": 30.8181, "region": "Mpumalanga"}'::jsonb,
   true, true, 2),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'gods-window', 'God''s Window',
   'A spectacular viewpoint offering panoramic views over the Lowveld and beyond.',
   'God''s Window offers one of the most spectacular views in South Africa. On clear days, you can see all the way to Mozambique. The viewpoint is surrounded by lush rainforest and features well-maintained walking trails.',
   'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=1200',
   '{"lat": -24.8741, "lng": 30.8891, "region": "Mpumalanga"}'::jsonb,
   true, true, 3),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'pilgrims-rest', 'Pilgrim''s Rest',
   'A perfectly preserved gold mining town from the 1870s, now a living museum.',
   'Step back in time at Pilgrim''s Rest, a historic gold mining town declared a national monument. Wander through original Victorian buildings, visit the Gold Panning Museum, and experience the atmosphere of South Africa''s gold rush era.',
   'https://images.unsplash.com/photo-1565073624497-7144969d0a07?w=1200',
   '{"lat": -24.8938, "lng": 30.7543, "region": "Mpumalanga"}'::jsonb,
   true, false, 4),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'sudwala-caves', 'Sudwala Caves',
   'Ancient dolomite caves dating back 240 million years, the oldest known caves in the world.',
   'Explore the Sudwala Caves, some of the oldest caves in the world with fascinating geological formations. The caves feature impressive stalactites, stalagmites, and unique rock formations. The nearby Dinosaur Park is perfect for families.',
   'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200',
   '{"lat": -25.3636, "lng": 30.7039, "region": "Mpumalanga"}'::jsonb,
   true, false, 5)
ON CONFLICT (tenant_id, slug) DO UPDATE SET
  name              = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description       = EXCLUDED.description;

-- ============================================
-- RWANDA — DESTINATIONS
-- ============================================

INSERT INTO destinations (tenant_id, slug, name, short_description, description, hero_image_url, location, is_published, is_featured, sort_order)
VALUES
  ('a010c87c-2bd9-41d3-a692-38634d2e1343', 'volcanoes-national-park', 'Volcanoes National Park',
   'Home to the endangered mountain gorillas, one of Africa''s most sought-after wildlife encounters.',
   'Volcanoes National Park is a sanctuary for the rare mountain gorilla. Trek through bamboo forests and volcanic terrain to encounter gorilla families in their natural habitat. The park is also home to golden monkeys and offers hiking to volcanic peaks.',
   'https://images.unsplash.com/photo-1521651201144-634f700b36ef?w=1200',
   '{"lat": -1.4574, "lng": 29.5360, "region": "Northern Province"}'::jsonb,
   true, true, 1),

  ('a010c87c-2bd9-41d3-a692-38634d2e1343', 'kigali', 'Kigali City',
   'Rwanda''s vibrant capital, a clean and green city with rich culture and history.',
   'Kigali is one of Africa''s cleanest and safest cities. Visit the Genocide Memorial, explore local markets, experience the thriving arts scene, and enjoy world-class restaurants. The city is a testament to Rwanda''s remarkable recovery and progress.',
   'https://images.unsplash.com/photo-1580746738099-04b72d5232b1?w=1200',
   '{"lat": -1.9403, "lng": 29.8739, "region": "Kigali"}'::jsonb,
   true, true, 2),

  ('a010c87c-2bd9-41d3-a692-38634d2e1343', 'lake-kivu', 'Lake Kivu',
   'One of Africa''s Great Lakes, offering beaches, boat trips, and stunning mountain scenery.',
   'Lake Kivu is a freshwater lake bordering Rwanda and the Democratic Republic of Congo. The lakeside towns of Gisenyi, Kibuye, and Cyangugu offer sandy beaches, boat trips, and spectacular mountain backdrops. Perfect for relaxation after gorilla trekking.',
   'https://images.unsplash.com/photo-1596005554384-d293674c91d7?w=1200',
   '{"lat": -2.0710, "lng": 29.2060, "region": "Western Province"}'::jsonb,
   true, true, 3),

  ('a010c87c-2bd9-41d3-a692-38634d2e1343', 'nyungwe-forest', 'Nyungwe Forest National Park',
   'Africa''s oldest rainforest, home to 13 primate species and the famous canopy walkway.',
   'Nyungwe Forest is one of the most biodiverse mountain rainforests in Africa. Walk the thrilling canopy walkway suspended above the forest floor, track chimpanzees, and discover over 300 bird species. The forest is a paradise for nature lovers.',
   'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200',
   '{"lat": -2.4833, "lng": 29.2500, "region": "Southern Province"}'::jsonb,
   true, true, 4),

  ('a010c87c-2bd9-41d3-a692-38634d2e1343', 'akagera-national-park', 'Akagera National Park',
   'Rwanda''s only savanna park, offering classic Big Five safari experiences.',
   'Akagera National Park is Rwanda''s largest protected wetland and the last remaining refuge for savannah-adapted species. The park is home to the Big Five including recently reintroduced lions and rhinos. Enjoy boat safaris on Lake Ihema.',
   'https://images.unsplash.com/photo-1534177616064-ef1fc6fb4032?w=1200',
   '{"lat": -1.9000, "lng": 30.5000, "region": "Eastern Province"}'::jsonb,
   true, false, 5)
ON CONFLICT (tenant_id, slug) DO UPDATE SET
  name              = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description       = EXCLUDED.description;

-- ============================================
-- SOUTH AFRICA — EXPERIENCES
-- ============================================

INSERT INTO experiences (tenant_id, slug, name, short_description, description, hero_image_url, category, duration, difficulty, price_from, price_currency, is_published, is_featured, sort_order)
VALUES
  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'big-five-safari', 'Big Five Safari Drive',
   'Experience the thrill of spotting Africa''s Big Five in their natural habitat.',
   'Join expert rangers on an unforgettable game drive through Kruger National Park. Our experienced guides know the best spots to find lions, leopards, elephants, rhinos, and buffalos. Morning and sunset drives available with refreshments included.',
   'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200',
   'safari', '4 hours', 'easy', 1500, 'ZAR', true, true, 1),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'panorama-route', 'Panorama Route Adventure',
   'A full-day tour of Mpumalanga''s most spectacular viewpoints and natural wonders.',
   'Discover the breathtaking Panorama Route including God''s Window, Bourke''s Luck Potholes, the Three Rondavels, and more. Professional guide, comfortable transport, and lunch at a local restaurant included.',
   'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1200',
   'adventure', '8 hours', 'easy', 1200, 'ZAR', true, true, 2),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'balloon-safari', 'Hot Air Balloon Safari',
   'Float silently over the African bush at sunrise for a unique wildlife viewing experience.',
   'Experience the magic of a hot air balloon flight over the spectacular landscapes of Mpumalanga. Watch the sunrise over the bushveld, spot wildlife from above, and end with a champagne breakfast. An unforgettable experience.',
   'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=1200',
   'adventure', '4 hours', 'easy', 4500, 'ZAR', true, true, 3),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'chimp-eden', 'Chimpanzee Sanctuary Visit',
   'Meet rescued chimpanzees at the renowned Jane Goodall Institute sanctuary.',
   'Visit Chimp Eden, the only chimpanzee sanctuary in South Africa. Learn about chimpanzee conservation, observe rescued chimps in a natural environment, and support vital rehabilitation work. Educational guided tours available.',
   'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=1200',
   'safari', '2 hours', 'easy', 350, 'ZAR', true, false, 4),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'white-water-rafting', 'White Water Rafting',
   'Tackle exciting rapids on the Blyde or Sabie Rivers with experienced guides.',
   'Get your adrenaline pumping with white water rafting on Mpumalanga''s scenic rivers. Choose from half-day or full-day trips suitable for beginners to experienced rafters. All safety equipment and professional guides provided.',
   'https://images.unsplash.com/photo-1504870712357-65ea720d6078?w=1200',
   'adventure', '4 hours', 'moderate', 950, 'ZAR', true, false, 5)
ON CONFLICT (tenant_id, slug) DO UPDATE SET
  name              = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description       = EXCLUDED.description;

-- ============================================
-- RWANDA — EXPERIENCES
-- ============================================

INSERT INTO experiences (tenant_id, slug, name, short_description, description, hero_image_url, category, duration, difficulty, price_from, price_currency, is_published, is_featured, sort_order)
VALUES
  ('a010c87c-2bd9-41d3-a692-38634d2e1343', 'gorilla-trekking', 'Mountain Gorilla Trek',
   'A once-in-a-lifetime encounter with endangered mountain gorillas in their natural habitat.',
   'Trek through the misty volcanic slopes of the Virunga Mountains to spend a magical hour with a habituated gorilla family. Permits are limited to protect these gentle giants. Includes park fees, guide, and porter services.',
   'https://images.unsplash.com/photo-1521651201144-634f700b36ef?w=1200',
   'safari', '6 hours', 'challenging', 1500, 'USD', true, true, 1),

  ('a010c87c-2bd9-41d3-a692-38634d2e1343', 'golden-monkey', 'Golden Monkey Tracking',
   'Track playful golden monkeys in the bamboo forests of Volcanoes National Park.',
   'The golden monkey is one of Africa''s rarest primates, found only in the Virunga Mountains. This less strenuous trek offers excellent wildlife photography opportunities and a chance to observe these beautiful, playful creatures.',
   'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=1200',
   'safari', '4 hours', 'moderate', 100, 'USD', true, true, 2),

  ('a010c87c-2bd9-41d3-a692-38634d2e1343', 'kigali-tour', 'Kigali City Tour',
   'Discover Rwanda''s vibrant capital, from historical sites to local markets and culture.',
   'Explore Kigali with a local guide. Visit the Genocide Memorial, explore the colorful Kimironko Market, see local arts at Inema Art Center, and sample Rwandan cuisine. A perfect introduction to Rwanda''s past, present, and future.',
   'https://images.unsplash.com/photo-1580746738099-04b72d5232b1?w=1200',
   'cultural', '5 hours', 'easy', 80, 'USD', true, false, 3),

  ('a010c87c-2bd9-41d3-a692-38634d2e1343', 'canopy-walk', 'Nyungwe Canopy Walk',
   'Walk among the treetops on East Africa''s only canopy walkway.',
   'Experience Nyungwe Forest from a unique perspective on the 200-meter canopy walkway suspended 50 meters above the forest floor. Combined with forest walks and possible chimpanzee tracking for a full rainforest experience.',
   'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200',
   'adventure', '3 hours', 'moderate', 60, 'USD', true, true, 4),

  ('a010c87c-2bd9-41d3-a692-38634d2e1343', 'kivu-kayaking', 'Lake Kivu Kayaking',
   'Paddle the calm waters of Lake Kivu with stunning mountain scenery.',
   'Explore the beautiful shores of Lake Kivu by kayak. Paddle through fishing villages, visit small islands, and enjoy swimming breaks in the warm, bilharzia-free waters. Suitable for beginners, all equipment provided.',
   'https://images.unsplash.com/photo-1596005554384-d293674c91d7?w=1200',
   'water', '3 hours', 'easy', 45, 'USD', true, false, 5)
ON CONFLICT (tenant_id, slug) DO UPDATE SET
  name              = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description       = EXCLUDED.description;

-- ============================================
-- SOUTH AFRICA — ACCOMMODATIONS
-- ============================================

INSERT INTO accommodations (tenant_id, slug, name, short_description, description, hero_image_url, category, star_rating, amenities, location, price_from, price_currency, is_published, is_featured, sort_order)
VALUES
  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'kruger-gate-hotel', 'Kruger Gate Hotel',
   'Luxury safari lodge at the doorstep of Kruger National Park.',
   'Experience world-class luxury just meters from Kruger''s Paul Kruger Gate. Our 5-star hotel features spacious rooms with private balconies overlooking the bush, award-winning restaurants, and daily game drives into the park.',
   'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
   'lodge', 5,
   '["Pool", "Spa", "Restaurant", "WiFi", "Game Drives", "Bar", "Room Service", "Concierge"]'::jsonb,
   '{"address": "Paul Kruger Gate Road, Skukuza", "lat": -25.0183, "lng": 31.4853}'::jsonb,
   3500, 'ZAR', true, true, 1),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'canyon-lodge-spa', 'Canyon Lodge & Spa',
   'Boutique lodge perched on the edge of Blyde River Canyon with infinity pool views.',
   'Wake up to the most spectacular views in Mpumalanga at our cliff-edge lodge. Each suite offers private decks overlooking the canyon, outdoor showers, and direct access to hiking trails. Our spa uses local botanicals for treatments.',
   'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200',
   'lodge', 4,
   '["Pool", "Spa", "Restaurant", "WiFi", "Hiking", "Bar", "Mountain Views"]'::jsonb,
   '{"address": "Blyde River Canyon Road", "lat": -24.5834, "lng": 30.8181}'::jsonb,
   2800, 'ZAR', true, true, 2),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'riverside-bush-camp', 'Riverside Bush Camp',
   'Authentic tented safari camp on the banks of the Sabie River.',
   'Reconnect with nature at our intimate tented camp. Each luxury tent features en-suite bathrooms, private decks over the river, and the sounds of the African bush. Perfect for bird watching and nature walks.',
   'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200',
   'camp', 3,
   '["Restaurant", "Bar", "Bird Watching", "Nature Walks", "River Views"]'::jsonb,
   '{"address": "Sabie River Valley", "lat": -25.1019, "lng": 30.7811}'::jsonb,
   1500, 'ZAR', true, false, 3),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'pilgrims-rest-inn', 'Pilgrim''s Rest Inn',
   'Historic guesthouse in the heart of the gold mining heritage town.',
   'Stay in a beautifully restored Victorian building from the 1880s gold rush era. Our charming inn offers character rooms with period furniture, a cozy pub, and easy access to all of Pilgrim''s Rest historic attractions.',
   'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200',
   'guesthouse', 3,
   '["Restaurant", "Bar", "WiFi", "Historic", "Garden"]'::jsonb,
   '{"address": "Main Street, Pilgrim''s Rest", "lat": -24.8938, "lng": 30.7543}'::jsonb,
   950, 'ZAR', true, false, 4)
ON CONFLICT (tenant_id, slug) DO UPDATE SET
  name              = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description       = EXCLUDED.description;

-- ============================================
-- RWANDA — ACCOMMODATIONS
-- ============================================

INSERT INTO accommodations (tenant_id, slug, name, short_description, description, hero_image_url, category, star_rating, amenities, location, price_from, price_currency, is_published, is_featured, sort_order)
VALUES
  ('a010c87c-2bd9-41d3-a692-38634d2e1343', 'bisate-lodge', 'Bisate Lodge',
   'Ultra-luxury eco-lodge with views of the Virunga volcanoes and gorilla territory.',
   'Bisate Lodge is an architectural marvel nestled in the eroded volcanic cone. Each of the six luxurious forest villas offers panoramic views, fireplaces, and exquisite décor inspired by the Rwandan royal palace. Perfect base for gorilla trekking.',
   'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
   'lodge', 5,
   '["Spa", "Restaurant", "WiFi", "Gorilla Trekking", "Volcano Views", "Fireplace", "Butler Service"]'::jsonb,
   '{"address": "Volcanoes National Park", "lat": -1.4574, "lng": 29.5360}'::jsonb,
   2500, 'USD', true, true, 1),

  ('a010c87c-2bd9-41d3-a692-38634d2e1343', 'retreat-heaven-kigali', 'The Retreat by Heaven',
   'Kigali''s premier boutique hotel combining luxury with stunning city views.',
   'Perched on one of Kigali''s famous hills, The Retreat offers panoramic views of the city below. Contemporary African design, world-class cuisine, and a rooftop infinity pool make this the perfect urban oasis.',
   'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200',
   'hotel', 5,
   '["Pool", "Spa", "Restaurant", "WiFi", "Bar", "City Views", "Gym"]'::jsonb,
   '{"address": "Kiyovu, Kigali", "lat": -1.9503, "lng": 29.8739}'::jsonb,
   450, 'USD', true, true, 2),

  ('a010c87c-2bd9-41d3-a692-38634d2e1343', 'kivu-serena', 'Lake Kivu Serena Hotel',
   'Lakeside luxury resort with private beach and spectacular sunset views.',
   'Relax on the shores of Lake Kivu at this premier resort. Enjoy water sports, spa treatments, and sundowners overlooking the lake. The perfect place to unwind after gorilla trekking adventures.',
   'https://images.unsplash.com/photo-1596005554384-d293674c91d7?w=1200',
   'hotel', 4,
   '["Pool", "Spa", "Restaurant", "WiFi", "Beach", "Water Sports", "Tennis"]'::jsonb,
   '{"address": "Gisenyi Beach, Lake Kivu", "lat": -1.7000, "lng": 29.2567}'::jsonb,
   280, 'USD', true, true, 3),

  ('a010c87c-2bd9-41d3-a692-38634d2e1343', 'nyungwe-house', 'Nyungwe House',
   'Tea plantation lodge on the edge of Africa''s oldest rainforest.',
   'Stay amid the rolling tea plantations of the Congo-Nile Trail with easy access to Nyungwe Forest. Our colonial-style lodge offers cozy rooms, forest hikes, and the chance to experience Rwanda''s thriving tea industry.',
   'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200',
   'lodge', 4,
   '["Restaurant", "WiFi", "Forest Walks", "Tea Tours", "Bird Watching"]'::jsonb,
   '{"address": "Gisakura, Nyungwe", "lat": -2.4000, "lng": 29.2000}'::jsonb,
   320, 'USD', true, false, 4)
ON CONFLICT (tenant_id, slug) DO UPDATE SET
  name              = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description       = EXCLUDED.description;

-- ============================================
-- SAMPLE ENQUIRIES
-- ============================================

INSERT INTO enquiries (tenant_id, name, email, phone, message, source_page, travel_dates, guests, status)
VALUES
  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'Sarah Johnson', 'sarah.johnson@email.com', '+1 555 123 4567',
   'We''re planning a family trip to South Africa in July. Would love to combine a Kruger safari with the Panorama Route. What packages do you recommend for a family with 2 teens?',
   '/destinations/kruger-national-park', '"July 2026"'::jsonb, 4, 'new'),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'Hans Mueller', 'h.mueller@gmail.com', '+49 170 123 4567',
   'Looking for a luxury honeymoon package. Interested in private safari experiences and the canyon lodge. Budget around R50,000 for 5 nights.',
   '/accommodations/canyon-lodge-spa', '"September 2026"'::jsonb, 2, 'contacted'),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'Lisa van Berg', 'lisavb@hotmail.com', '+27 82 555 1234',
   'Corporate retreat for 15 people. Need conference facilities and team building activities.',
   '/contact', '"October 2026"'::jsonb, 15, 'qualified'),

  ('a010c87c-2bd9-41d3-a692-38634d2e1343', 'Michael Chen', 'mchen@techcorp.com', '+1 415 555 0199',
   'Bucket list gorilla trekking trip! Would like to book permits for 2 days of trekking plus golden monkey experience. What dates have availability in August?',
   '/experiences/gorilla-trekking', '"August 2026"'::jsonb, 2, 'new'),

  ('a010c87c-2bd9-41d3-a692-38634d2e1343', 'Emma Thompson', 'emma.t@travel.co.uk', '+44 7700 900123',
   'Travel blogger planning a 10-day Rwanda coverage. Interested in full country tour including gorillas, Kigali, Lake Kivu, and Nyungwe. Media rates available?',
   '/contact', '"November 2026"'::jsonb, 1, 'new'),

  ('a010c87c-2bd9-41d3-a692-38634d2e1343', 'Jean-Pierre Habimana', 'jphabimana@rwandatrade.rw', '+250 788 123 456',
   'Organizing VIP tour for international business delegation. Need premium accommodations and private gorilla trekking permits for 8 people.',
   '/accommodations/bisate-lodge', '"December 2026"'::jsonb, 8, 'contacted')
ON CONFLICT DO NOTHING;

-- ============================================
-- VERIFY
-- ============================================
SELECT 'Tenants'        AS entity, count(*) FROM tenants        WHERE slug IN ('southafrica', 'visitrwanda')
UNION ALL
SELECT 'Destinations'   AS entity, count(*) FROM destinations   WHERE tenant_id IN ('e193b62e-af6e-4721-a2f6-95694bb22891', 'a010c87c-2bd9-41d3-a692-38634d2e1343')
UNION ALL
SELECT 'Experiences'    AS entity, count(*) FROM experiences    WHERE tenant_id IN ('e193b62e-af6e-4721-a2f6-95694bb22891', 'a010c87c-2bd9-41d3-a692-38634d2e1343')
UNION ALL
SELECT 'Accommodations' AS entity, count(*) FROM accommodations WHERE tenant_id IN ('e193b62e-af6e-4721-a2f6-95694bb22891', 'a010c87c-2bd9-41d3-a692-38634d2e1343')
UNION ALL
SELECT 'Enquiries'      AS entity, count(*) FROM enquiries      WHERE tenant_id IN ('e193b62e-af6e-4721-a2f6-95694bb22891', 'a010c87c-2bd9-41d3-a692-38634d2e1343');
