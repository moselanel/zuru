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
  'USD', 'Africa/Johannesburg',
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
  'USD', 'Africa/Kigali',
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
   'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200',
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
   'https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?w=1200',
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
   'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200',
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

INSERT INTO experiences (tenant_id, slug, name, short_description, description, hero_image_url, category, duration, difficulty, price_from, price_currency, highlights, included, excluded, requirements, what_to_bring, group_size_min, group_size_max, is_published, is_featured, sort_order)
VALUES
  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'big-five-safari', 'Big Five Safari Drive',
   'Experience the thrill of spotting Africa''s Big Five in their natural habitat.',
   'Join expert rangers on an unforgettable game drive through Kruger National Park. Our experienced guides know the best spots to find lions, leopards, elephants, rhinos, and buffalos. Morning and sunset drives available with refreshments included.',
   'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200',
   'safari', '4 hours', 'easy', 1500, 'USD',
   '["Spot the iconic Big Five", "Expert ranger-guided tracking", "Morning and magical sunset drives available", "Refreshments included throughout"]'::jsonb,
   '["Game drive fees", "Park entrance fee", "Professional ranger and tracker", "Refreshments and snacks"]'::jsonb,
   '["Hotel transfers", "Gratuities", "Personal travel insurance", "Meals outside drive"]'::jsonb,
   '["Minimum age: 6 years", "All fitness levels welcome", "Closed-toe shoes required in the vehicle"]'::jsonb,
   '["Binoculars", "Camera with zoom lens", "Neutral-colored clothing", "Sun hat and sunscreen", "Insect repellent", "Water bottle"]'::jsonb,
   2, 8, true, true, 1),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'panorama-route', 'Panorama Route Adventure',
   'A full-day tour of Mpumalanga''s most spectacular viewpoints and natural wonders.',
   'Discover the breathtaking Panorama Route including God''s Window, Bourke''s Luck Potholes, the Three Rondavels, and more. Professional guide, comfortable transport, and lunch at a local restaurant included.',
   'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1200',
   'adventure', '8 hours', 'easy', 1200, 'USD',
   '["God''s Window panoramic views to Mozambique", "Bourke''s Luck Potholes geological wonder", "Three Rondavels viewpoint", "Lunch at a local restaurant included"]'::jsonb,
   '["Professional guide", "Air-conditioned transport", "Lunch", "All park and site fees"]'::jsonb,
   '["Hotel pickup/drop-off", "Gratuities", "Personal shopping", "Travel insurance"]'::jsonb,
   '["Minimum age: 5 years", "Moderate walking ability required", "Not suitable for wheelchairs at all sites"]'::jsonb,
   '["Comfortable walking shoes", "Camera", "Sun hat", "Water bottle", "Light jacket"]'::jsonb,
   2, 12, true, true, 2),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'balloon-safari', 'Hot Air Balloon Safari',
   'Float silently over the African bush at sunrise for a unique wildlife viewing experience.',
   'Experience the magic of a hot air balloon flight over the spectacular landscapes of Mpumalanga. Watch the sunrise over the bushveld, spot wildlife from above, and end with a champagne breakfast. An unforgettable experience.',
   'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=1200',
   'adventure', '4 hours', 'easy', 4500, 'USD',
   '["Sunrise flight over the African bush", "Wildlife spotting from the air", "Champagne breakfast on landing", "Official certificate of flight"]'::jsonb,
   '["Balloon flight (approx. 1 hour)", "Champagne breakfast", "Flight certificate", "Transport from meeting point"]'::jsonb,
   '["Hotel accommodation", "Travel insurance", "Gratuities"]'::jsonb,
   '["Minimum age: 12 years", "Weight limit: 120 kg per person", "Not suitable for pregnant women", "Not suitable for those with heart conditions or serious back problems", "Must be able to stand for up to 1 hour"]'::jsonb,
   '["Warm jacket (cold at altitude before sunrise)", "Camera", "Comfortable closed shoes", "Sun protection"]'::jsonb,
   2, 16, true, true, 3),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'chimp-eden', 'Chimpanzee Sanctuary Visit',
   'Meet rescued chimpanzees at the renowned Jane Goodall Institute sanctuary.',
   'Visit Chimp Eden, the only chimpanzee sanctuary in South Africa. Learn about chimpanzee conservation, observe rescued chimps in a natural environment, and support vital rehabilitation work. Educational guided tours available.',
   'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=1200',
   'safari', '2 hours', 'easy', 350, 'USD',
   '["Meet rescued and rehabilitated chimpanzees", "Conservation education talk", "Natural habitat viewing enclosures", "Directly supports Jane Goodall Institute"]'::jsonb,
   '["Guided tour", "Entry fee", "Conservation presentation"]'::jsonb,
   '["Transport", "Lunch", "Gratuities"]'::jsonb,
   '["Minimum age: 8 years", "Quiet and calm behavior around animals required", "Photography allowed"]'::jsonb,
   '["Camera", "Comfortable shoes", "Sunscreen"]'::jsonb,
   1, 20, true, false, 4),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'white-water-rafting', 'White Water Rafting',
   'Tackle exciting rapids on the Blyde or Sabie Rivers with experienced guides.',
   'Get your adrenaline pumping with white water rafting on Mpumalanga''s scenic rivers. Choose from half-day or full-day trips suitable for beginners to experienced rafters. All safety equipment and professional guides provided.',
   'https://images.unsplash.com/photo-1504870712357-65ea720d6078?w=1200',
   'adventure', '4 hours', 'moderate', 950, 'USD',
   '["Grade 2–4 rapids on scenic Mpumalanga rivers", "Swimming holes and river pools", "Professional safety guides throughout", "Half-day and full-day options available"]'::jsonb,
   '["All safety equipment", "Wetsuit if needed", "Certified safety guides", "Light snack on return"]'::jsonb,
   '["Transport to river", "Lunch", "Personal travel insurance"]'::jsonb,
   '["Minimum age: 12 years", "Must be able to swim", "Moderate fitness required", "Not suitable for pregnant women"]'::jsonb,
   '["Swimming costume", "Change of clothes and towel", "Secure footwear", "Waterproof camera optional"]'::jsonb,
   4, 12, true, false, 5)
ON CONFLICT (tenant_id, slug) DO UPDATE SET
  name              = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description       = EXCLUDED.description,
  highlights        = EXCLUDED.highlights,
  included          = EXCLUDED.included,
  excluded          = EXCLUDED.excluded,
  requirements      = EXCLUDED.requirements,
  what_to_bring     = EXCLUDED.what_to_bring,
  group_size_min    = EXCLUDED.group_size_min,
  group_size_max    = EXCLUDED.group_size_max;

-- ============================================
-- RWANDA — EXPERIENCES
-- ============================================

INSERT INTO experiences (tenant_id, slug, name, short_description, description, hero_image_url, category, duration, difficulty, price_from, price_currency, highlights, included, excluded, requirements, what_to_bring, group_size_min, group_size_max, is_published, is_featured, sort_order)
VALUES
  ('a010c87c-2bd9-41d3-a692-38634d2e1343', 'gorilla-trekking', 'Mountain Gorilla Trek',
   'A once-in-a-lifetime encounter with endangered mountain gorillas in their natural habitat.',
   'Trek through the misty volcanic slopes of the Virunga Mountains to spend a magical hour with a habituated gorilla family. Permits are limited to protect these gentle giants. Includes park fees, guide, and porter services.',
   'https://images.unsplash.com/photo-1521651201144-634f700b36ef?w=1200',
   'safari', '6 hours', 'challenging', 1500, 'USD',
   '["One magical hour with a habituated gorilla family", "Misty volcanic mountain scenery", "Expert tracking and armed ranger escort", "Directly funds gorilla conservation"]'::jsonb,
   '["Gorilla trekking permit", "Park entrance fee", "Armed ranger escort", "Porter service (optional, recommended)"]'::jsonb,
   '["Accommodation", "Meals", "Travel insurance", "Porter and guide tips", "Transport to trailhead"]'::jsonb,
   '["Minimum age: 15 years", "Moderate to good fitness — treks can last 2–8 hours", "No active respiratory infections (to protect gorillas)", "Maximum 8 visitors per gorilla group per day"]'::jsonb,
   '["Sturdy hiking boots", "Long-sleeved shirt and long trousers", "Gardening gloves (thorny vegetation)", "Rain jacket", "2 liters of water", "Energy snacks", "Camera (no flash)"]'::jsonb,
   1, 8, true, true, 1),

  ('a010c87c-2bd9-41d3-a692-38634d2e1343', 'golden-monkey', 'Golden Monkey Tracking',
   'Track playful golden monkeys in the bamboo forests of Volcanoes National Park.',
   'The golden monkey is one of Africa''s rarest primates, found only in the Virunga Mountains. This less strenuous trek offers excellent wildlife photography opportunities and a chance to observe these beautiful, playful creatures.',
   'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=1200',
   'safari', '4 hours', 'moderate', 100, 'USD',
   '["Rare endemic primate found only in the Virungas", "Playful behavior great for photography", "Bamboo forest habitat", "Less strenuous than gorilla trek"]'::jsonb,
   '["Golden monkey permit", "Park entrance fee", "Expert guide"]'::jsonb,
   '["Accommodation", "Meals", "Transport", "Guide tips"]'::jsonb,
   '["Minimum age: 12 years", "Moderate fitness level", "No active illness to protect wildlife"]'::jsonb,
   '["Hiking boots", "Long trousers", "Rain jacket", "Camera", "Water bottle"]'::jsonb,
   1, 8, true, true, 2),

  ('a010c87c-2bd9-41d3-a692-38634d2e1343', 'kigali-tour', 'Kigali City Tour',
   'Discover Rwanda''s vibrant capital, from historical sites to local markets and culture.',
   'Explore Kigali with a local guide. Visit the Genocide Memorial, explore the colorful Kimironko Market, see local arts at Inema Art Center, and sample Rwandan cuisine. A perfect introduction to Rwanda''s past, present, and future.',
   'https://images.unsplash.com/photo-1580746738099-04b72d5232b1?w=1200',
   'cultural', '5 hours', 'easy', 80, 'USD',
   '["Kigali Genocide Memorial — a moving tribute to history", "Kimironko Market — vibrant local colour and crafts", "Inema Art Center — Rwanda''s thriving contemporary art scene", "Authentic Rwandan cuisine tasting"]'::jsonb,
   '["Local expert guide", "Genocide Memorial entry", "Art Center visit", "Lunch at a local restaurant"]'::jsonb,
   '["Hotel pickup/drop-off", "Personal shopping", "Gratuities"]'::jsonb,
   '["All ages welcome", "Comfortable walking shoes recommended", "Respectful attire for memorial visit"]'::jsonb,
   '["Camera", "Comfortable walking shoes", "Light jacket", "Cash for market shopping"]'::jsonb,
   1, 15, true, false, 3),

  ('a010c87c-2bd9-41d3-a692-38634d2e1343', 'canopy-walk', 'Nyungwe Canopy Walk',
   'Walk among the treetops on East Africa''s only canopy walkway.',
   'Experience Nyungwe Forest from a unique perspective on the 200-meter canopy walkway suspended 50 meters above the forest floor. Combined with forest walks and possible chimpanzee tracking for a full rainforest experience.',
   'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200',
   'adventure', '3 hours', 'moderate', 60, 'USD',
   '["200-meter walkway suspended 50 meters above the forest floor", "Possible chimpanzee tracking in the same area", "Over 300 bird species including Albertine Rift endemics", "One of the oldest and most biodiverse rainforests in Africa"]'::jsonb,
   '["Park entry fee", "Licensed ranger guide", "Canopy walk permit"]'::jsonb,
   '["Transport", "Accommodation", "Additional chimpanzee tracking permit"]'::jsonb,
   '["Minimum age: 8 years", "Moderate fitness for forest trails", "Not suitable for those with severe acrophobia or vertigo"]'::jsonb,
   '["Hiking boots", "Rain jacket", "Insect repellent", "Camera", "Water bottle"]'::jsonb,
   1, 20, true, true, 4),

  ('a010c87c-2bd9-41d3-a692-38634d2e1343', 'kivu-kayaking', 'Lake Kivu Kayaking',
   'Paddle the calm waters of Lake Kivu with stunning mountain scenery.',
   'Explore the beautiful shores of Lake Kivu by kayak. Paddle through fishing villages, visit small islands, and enjoy swimming breaks in the warm, bilharzia-free waters. Suitable for beginners, all equipment provided.',
   'https://images.unsplash.com/photo-1596005554384-d293674c91d7?w=1200',
   'water', '3 hours', 'easy', 45, 'USD',
   '["Paddle through traditional fishing villages", "Visit uninhabited lake islands", "Swimming breaks in bilharzia-free waters", "Stunning Congo-Nile mountain backdrop"]'::jsonb,
   '["Kayak and all paddle equipment", "Life jacket", "Certified guide", "Swimming break time"]'::jsonb,
   '["Transport to the lake", "Lunch", "Gratuities"]'::jsonb,
   '["Minimum age: 8 years", "Basic swimming ability required", "Beginner friendly", "Not suitable for those with severe upper body injuries"]'::jsonb,
   '["Swimwear", "Sunscreen", "Change of clothes", "Water bottle", "Waterproof bag for valuables"]'::jsonb,
   2, 12, true, false, 5)
ON CONFLICT (tenant_id, slug) DO UPDATE SET
  name              = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description       = EXCLUDED.description,
  highlights        = EXCLUDED.highlights,
  included          = EXCLUDED.included,
  excluded          = EXCLUDED.excluded,
  requirements      = EXCLUDED.requirements,
  what_to_bring     = EXCLUDED.what_to_bring,
  group_size_min    = EXCLUDED.group_size_min,
  group_size_max    = EXCLUDED.group_size_max;

-- ============================================
-- SOUTH AFRICA — ACCOMMODATIONS
-- ============================================

INSERT INTO accommodations (tenant_id, slug, name, short_description, description, hero_image_url, category, star_rating, amenities, room_types, total_rooms, max_guests, location, price_from, price_currency, is_published, is_featured, sort_order)
VALUES
  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'kruger-gate-hotel', 'Kruger Gate Hotel',
   'Luxury safari lodge at the doorstep of Kruger National Park.',
   'Experience world-class luxury just meters from Kruger''s Paul Kruger Gate. Our 5-star hotel features spacious rooms with private balconies overlooking the bush, award-winning restaurants, and daily game drives into the park.',
   'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
   'lodge', 5,
   '["Pool", "Spa", "Restaurant", "WiFi", "Game Drives", "Bar", "Room Service", "Concierge"]'::jsonb,
   '[{"name":"Standard Safari Room","description":"Spacious room with private balcony overlooking the bush, twin or king beds"},{"name":"Deluxe Bush Suite","description":"Larger suite with lounge area, outdoor shower, and premium bush views"},{"name":"Presidential Villa","description":"Private villa with plunge pool, butler service, and panoramic Kruger views"}]'::jsonb,
   45, 90,
   '{"address": "Paul Kruger Gate Road, Skukuza", "lat": -25.0183, "lng": 31.4853}'::jsonb,
   3500, 'USD', true, true, 1),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'canyon-lodge-spa', 'Canyon Lodge & Spa',
   'Boutique lodge perched on the edge of Blyde River Canyon with infinity pool views.',
   'Wake up to the most spectacular views in Mpumalanga at our cliff-edge lodge. Each suite offers private decks overlooking the canyon, outdoor showers, and direct access to hiking trails. Our spa uses local botanicals for treatments.',
   'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200',
   'lodge', 4,
   '["Pool", "Spa", "Restaurant", "WiFi", "Hiking", "Bar", "Mountain Views"]'::jsonb,
   '[{"name":"Canyon Suite","description":"Cliff-edge suite with private deck and floor-to-ceiling canyon views"},{"name":"Luxury Suite","description":"Spacious suite with outdoor shower and direct trail access"},{"name":"Honeymoon Suite","description":"Romantic suite with private plunge pool and fireplace"}]'::jsonb,
   16, 32,
   '{"address": "Blyde River Canyon Road", "lat": -24.5834, "lng": 30.8181}'::jsonb,
   2800, 'USD', true, true, 2),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'riverside-bush-camp', 'Riverside Bush Camp',
   'Authentic tented safari camp on the banks of the Sabie River.',
   'Reconnect with nature at our intimate tented camp. Each luxury tent features en-suite bathrooms, private decks over the river, and the sounds of the African bush. Perfect for bird watching and nature walks.',
   'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200',
   'camp', 3,
   '["Restaurant", "Bar", "Bird Watching", "Nature Walks", "River Views"]'::jsonb,
   '[{"name":"Luxury Safari Tent","description":"En-suite tent with private deck over the river, king bed and outdoor shower"},{"name":"Family Tent","description":"Larger tent with two bedrooms and shared lounge, sleeps up to 4"}]'::jsonb,
   10, 22,
   '{"address": "Sabie River Valley", "lat": -25.1019, "lng": 30.7811}'::jsonb,
   1500, 'USD', true, false, 3),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'pilgrims-rest-inn', 'Pilgrim''s Rest Inn',
   'Historic guesthouse in the heart of the gold mining heritage town.',
   'Stay in a beautifully restored Victorian building from the 1880s gold rush era. Our charming inn offers character rooms with period furniture, a cozy pub, and easy access to all of Pilgrim''s Rest historic attractions.',
   'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200',
   'guesthouse', 3,
   '["Restaurant", "Bar", "WiFi", "Historic", "Garden"]'::jsonb,
   '[{"name":"Standard Room","description":"Cozy Victorian-style room with period furniture and garden views"},{"name":"Heritage Suite","description":"Larger suite in the original 1880s building with authentic gold-rush era décor"}]'::jsonb,
   20, 40,
   '{"address": "Main Street, Pilgrim''s Rest", "lat": -24.8938, "lng": 30.7543}'::jsonb,
   950, 'USD', true, false, 4)
ON CONFLICT (tenant_id, slug) DO UPDATE SET
  name              = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description       = EXCLUDED.description,
  amenities         = EXCLUDED.amenities,
  room_types        = EXCLUDED.room_types,
  total_rooms       = EXCLUDED.total_rooms,
  max_guests        = EXCLUDED.max_guests;

-- ============================================
-- RWANDA — ACCOMMODATIONS
-- ============================================

INSERT INTO accommodations (tenant_id, slug, name, short_description, description, hero_image_url, category, star_rating, amenities, room_types, total_rooms, max_guests, location, price_from, price_currency, is_published, is_featured, sort_order)
VALUES
  ('a010c87c-2bd9-41d3-a692-38634d2e1343', 'bisate-lodge', 'Bisate Lodge',
   'Ultra-luxury eco-lodge with views of the Virunga volcanoes and gorilla territory.',
   'Bisate Lodge is an architectural marvel nestled in the eroded volcanic cone. Each of the six luxurious forest villas offers panoramic views, fireplaces, and exquisite décor inspired by the Rwandan royal palace. Perfect base for gorilla trekking.',
   'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200',
   'lodge', 5,
   '["Spa", "Restaurant", "WiFi", "Gorilla Trekking", "Volcano Views", "Fireplace", "Butler Service"]'::jsonb,
   '[{"name":"Forest Villa","description":"Individual two-storey villa with fireplace, outdoor rain shower, and panoramic volcano views. Sleeps 2."}]'::jsonb,
   6, 12,
   '{"address": "Volcanoes National Park", "lat": -1.4574, "lng": 29.5360}'::jsonb,
   2500, 'USD', true, true, 1),

  ('a010c87c-2bd9-41d3-a692-38634d2e1343', 'retreat-heaven-kigali', 'The Retreat by Heaven',
   'Kigali''s premier boutique hotel combining luxury with stunning city views.',
   'Perched on one of Kigali''s famous hills, The Retreat offers panoramic views of the city below. Contemporary African design, world-class cuisine, and a rooftop infinity pool make this the perfect urban oasis.',
   'https://images.unsplash.com/photo-1551882547-ff40c63fe2e2?w=1200',
   'hotel', 5,
   '["Pool", "Spa", "Restaurant", "WiFi", "Bar", "City Views", "Gym"]'::jsonb,
   '[{"name":"Superior Room","description":"Elegant room with city views, king bed and contemporary African décor"},{"name":"Deluxe Suite","description":"Spacious suite with private lounge, terrace, and panoramic Kigali views"},{"name":"Penthouse Suite","description":"Top-floor suite with wrap-around terrace and butler service"}]'::jsonb,
   14, 28,
   '{"address": "Kiyovu, Kigali", "lat": -1.9503, "lng": 29.8739}'::jsonb,
   450, 'USD', true, true, 2),

  ('a010c87c-2bd9-41d3-a692-38634d2e1343', 'kivu-serena', 'Lake Kivu Serena Hotel',
   'Lakeside luxury resort with private beach and spectacular sunset views.',
   'Relax on the shores of Lake Kivu at this premier resort. Enjoy water sports, spa treatments, and sundowners overlooking the lake. The perfect place to unwind after gorilla trekking adventures.',
   'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
   'hotel', 4,
   '["Pool", "Spa", "Restaurant", "WiFi", "Beach", "Water Sports", "Tennis"]'::jsonb,
   '[{"name":"Superior Room","description":"Comfortable room with partial lake views and en-suite bathroom"},{"name":"Deluxe Lake View","description":"Spacious room with private balcony and unobstructed Lake Kivu panorama"},{"name":"Executive Suite","description":"Large suite with separate lounge, private terrace, and premium lake views"}]'::jsonb,
   48, 96,
   '{"address": "Gisenyi Beach, Lake Kivu", "lat": -1.7000, "lng": 29.2567}'::jsonb,
   280, 'USD', true, true, 3),

  ('a010c87c-2bd9-41d3-a692-38634d2e1343', 'nyungwe-house', 'Nyungwe House',
   'Tea plantation lodge on the edge of Africa''s oldest rainforest.',
   'Stay amid the rolling tea plantations of the Congo-Nile Trail with easy access to Nyungwe Forest. Our colonial-style lodge offers cozy rooms, forest hikes, and the chance to experience Rwanda''s thriving tea industry.',
   'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200',
   'lodge', 4,
   '["Restaurant", "WiFi", "Forest Walks", "Tea Tours", "Bird Watching"]'::jsonb,
   '[{"name":"Garden Room","description":"Comfortable room with views of the tea plantation gardens"},{"name":"Forest View Room","description":"Room with private veranda overlooking the Nyungwe Forest canopy"},{"name":"Forest Suite","description":"Spacious suite with living area, fireplace, and sweeping forest views"}]'::jsonb,
   22, 44,
   '{"address": "Gisakura, Nyungwe", "lat": -2.4000, "lng": 29.2000}'::jsonb,
   320, 'USD', true, false, 4)
ON CONFLICT (tenant_id, slug) DO UPDATE SET
  name              = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description       = EXCLUDED.description,
  amenities         = EXCLUDED.amenities,
  room_types        = EXCLUDED.room_types,
  total_rooms       = EXCLUDED.total_rooms,
  max_guests        = EXCLUDED.max_guests;

-- ============================================
-- CAPE TOWN — DESTINATION UPDATE + FULL DATA
-- ============================================

-- Fix Cape Town hero + gallery images (previous images were incorrect)
INSERT INTO destinations (
  tenant_id, slug, name, short_description, description,
  hero_image_url, gallery, location, is_published, is_featured, sort_order
) VALUES (
  'e193b62e-af6e-4721-a2f6-95694bb22891', 'cape-town', 'Cape Town',
  'The Mother City — where Table Mountain meets the Atlantic Ocean.',
  'Cape Town is one of the world''s most beautiful cities, nestled between the iconic Table Mountain and the sea. Take the cable car to the summit for panoramic views, explore the historic Bo-Kaap neighbourhood, visit Robben Island where Nelson Mandela was imprisoned, and watch African penguins at Boulders Beach. The V&A Waterfront offers world-class dining, shopping, and harbour views.',
  'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200',
  '[
    "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200",
    "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=1200",
    "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200",
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200",
    "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200"
  ]'::jsonb,
  '{"lat": -33.9249, "lng": 18.4241, "region": "Western Cape"}'::jsonb,
  true, true, 0
) ON CONFLICT (tenant_id, slug) DO UPDATE SET
  name              = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description       = EXCLUDED.description,
  hero_image_url    = EXCLUDED.hero_image_url,
  gallery           = EXCLUDED.gallery,
  is_featured       = EXCLUDED.is_featured,
  sort_order        = EXCLUDED.sort_order;

-- ============================================
-- GARDEN ROUTE — DESTINATION UPDATE + FULL DATA
-- ============================================

-- Fix Garden Route hero + gallery images (previous images were incorrect)
INSERT INTO destinations (
  tenant_id, slug, name, short_description, description,
  hero_image_url, gallery, location, is_published, is_featured, sort_order
) VALUES (
  'e193b62e-af6e-4721-a2f6-95694bb22891', 'garden-route', 'Garden Route',
  'A scenic stretch of coastline featuring forests, lagoons, and charming towns.',
  'The Garden Route is one of South Africa''s most beloved road trips, stretching 300km from Mossel Bay to Storms River. Experience Knysna''s iconic lagoon and Heads, the ancient Tsitsikamma forest, whale watching at Plettenberg Bay, and adrenaline activities like the world''s highest commercial bungee jump at Bloukrans Bridge. With a mild climate year-round, the Garden Route enchants at any season.',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
  '[
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
    "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200"
  ]'::jsonb,
  '{"lat": -33.9646, "lng": 22.4620, "region": "Western & Eastern Cape"}'::jsonb,
  true, true, 1
) ON CONFLICT (tenant_id, slug) DO UPDATE SET
  name              = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description       = EXCLUDED.description,
  hero_image_url    = EXCLUDED.hero_image_url,
  gallery           = EXCLUDED.gallery,
  is_featured       = EXCLUDED.is_featured,
  sort_order        = EXCLUDED.sort_order;

-- ============================================
-- CAPE TOWN — EXPERIENCES
-- ============================================

INSERT INTO experiences (tenant_id, slug, name, short_description, description, hero_image_url, category, duration, difficulty, price_from, price_currency, highlights, included, excluded, requirements, what_to_bring, group_size_min, group_size_max, is_published, is_featured, sort_order)
VALUES
  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'table-mountain-cable-car', 'Table Mountain Cable Car',
   'Ride the iconic rotating cable car to the summit of Table Mountain for 360° views.',
   'The Table Mountain Aerial Cableway takes you to the summit of one of the world''s most recognisable landmarks. The rotating cable car offers 360° views on the ascent. At the top, explore 3km of walking trails, spot unique fynbos flora and dassies, and take in views stretching to Robben Island, the Cape Peninsula, and the Winelands.',
   'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200',
   'sightseeing', '3 hours', 'easy', 60, 'USD',
   '["360° rotating cable car with panoramic views", "3km of summit walking trails", "Spot Cape dassies and endemic fynbos", "Views to Robben Island and Cape Peninsula"]'::jsonb,
   '["Return cable car ticket", "Summit access", "Trail map"]'::jsonb,
   '["Transport to lower cable station", "Food and drinks", "Gratuities"]'::jsonb,
   '["Suitable for all ages", "Wear sturdy non-slip footwear", "Check weather before going — cable car closes in high winds", "Arrive early to avoid queues"]'::jsonb,
   '["Warm layer (it''s cooler at the summit)", "Sunscreen and hat", "Camera", "Comfortable walking shoes", "Water bottle"]'::jsonb,
   1, 50, true, true, 6),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'cape-point-day-trip', 'Cape Point & Peninsula Tour',
   'A full-day scenic drive along the Cape Peninsula to the dramatic Cape Point headland.',
   'Drive the Cape Peninsula, one of the world''s most scenic coastal routes. Visit Hout Bay, Chapman''s Peak Drive, watch African penguins at Boulders Beach, and end at the breathtaking Cape Point — the southwest tip of Africa. Includes a funicular ride to the lighthouse for spectacular Atlantic Ocean views.',
   'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=1200',
   'sightseeing', '8 hours', 'easy', 180, 'USD',
   '["Chapman''s Peak scenic coastal drive", "African penguins at Boulders Beach", "Cape Point — southwest tip of Africa", "Funicular to the historic lighthouse"]'::jsonb,
   '["Professional guide", "Air-conditioned transport", "Lunch at a harbourfront restaurant", "All entry fees"]'::jsonb,
   '["Hotel pickup/drop-off", "Alcoholic beverages", "Personal shopping", "Gratuities"]'::jsonb,
   '["All fitness levels welcome", "Minimum age: 4 years", "Comfortable shoes recommended for penguin colony boardwalks"]'::jsonb,
   '["Sunscreen and hat", "Light jacket (coastal winds)", "Camera", "Water bottle"]'::jsonb,
   2, 16, true, true, 7),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'robben-island-tour', 'Robben Island Ferry Tour',
   'Visit the island where Nelson Mandela was imprisoned for 18 years.',
   'Robben Island is a UNESCO World Heritage Site and one of South Africa''s most powerful symbols of the struggle against apartheid. The guided tour of the prison complex is led by former political prisoners, including a walk through Mandela''s cell. The ferry ride across Table Bay offers stunning views of Cape Town.',
   'https://images.unsplash.com/photo-1559548331-f9cb98001426?w=1200',
   'cultural', '4 hours', 'easy', 45, 'USD',
   '["Tour of Mandela''s cell block guided by former political prisoners", "Bus tour of the island including World War II fortifications", "Ferry ride across Table Bay with Table Mountain views", "UNESCO World Heritage Site"]'::jsonb,
   '["Return ferry ticket from V&A Waterfront", "Island bus tour", "Guided prison tour", "All entry fees"]'::jsonb,
   '["Transport to V&A Waterfront", "Food and drinks on island", "Gratuities"]'::jsonb,
   '["All ages welcome — powerful but suitable for children", "Book in advance — tickets sell out quickly", "Ferries may cancel in bad weather"]'::jsonb,
   '["Light jacket (windy on the ferry)", "Sun protection", "Camera", "Water and snacks for the island"]'::jsonb,
   4, 40, true, true, 8),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'cape-winelands-tour', 'Cape Winelands Wine Tour',
   'Explore the historic wine estates of Stellenbosch, Franschhoek, and Paarl.',
   'The Cape Winelands, just 45 minutes from Cape Town, is one of the world''s great wine regions. Visit 3-4 award-winning estates, taste world-class Pinotage, Chenin Blanc, and Cap Classique, and enjoy lunch at a winery restaurant. The scenery — oak-lined streets, Cape Dutch homesteads, and mountain backdrops — is as memorable as the wine.',
   'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200',
   'cultural', '7 hours', 'easy', 150, 'USD',
   '["3–4 award-winning wine estates in Stellenbosch or Franschhoek", "Guided wine tastings with a sommelier", "Gourmet lunch at a vineyard restaurant", "Cape Dutch architecture and scenery"]'::jsonb,
   '["Professional guide and driver", "Tastings at all estates (4–6 wines per estate)", "Gourmet lunch", "Transport from Cape Town"]'::jsonb,
   '["Hotel pickup outside Cape Town CBD", "Additional wine purchases", "Gratuities"]'::jsonb,
   '["Minimum age: 18 for wine tasting", "Not suitable for those who cannot consume alcohol (juice alternatives available)", "Book 48 hours in advance"]'::jsonb,
   '["Smart-casual clothing", "Sun hat", "Camera"]'::jsonb,
   2, 12, true, false, 9),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'boulders-beach-penguins', 'Boulders Beach Penguin Colony',
   'Watch the thriving colony of endangered African penguins at their famous beach habitat.',
   'Boulders Beach is home to a colony of over 3,000 African penguins, a species listed as Endangered. Walk the boardwalks between the penguins, watch them waddle, nest, and swim just metres away. The sheltered bay with its huge granite boulders makes a perfect swimming spot too.',
   'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200',
   'wildlife', '2 hours', 'easy', 35, 'USD',
   '["Up-close encounters with wild African penguins", "Boardwalk through nesting areas", "Swim at sheltered Boulders Beach", "Learn about penguin conservation"]'::jsonb,
   '["Entry fee to Boulders Beach (Table Mountain National Park)", "Guided boardwalk information points"]'::jsonb,
   '["Transport to Simon''s Town", "Food and drinks", "Gratuities"]'::jsonb,
   '["All ages and fitness levels", "Do not touch or feed the penguins", "Wear comfortable shoes for sandy paths"]'::jsonb,
   '["Swimwear if you want to swim", "Sunscreen", "Camera with zoom lens", "Water bottle"]'::jsonb,
   1, 30, true, false, 10)
ON CONFLICT (tenant_id, slug) DO UPDATE SET
  name              = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description       = EXCLUDED.description,
  highlights        = EXCLUDED.highlights,
  included          = EXCLUDED.included,
  excluded          = EXCLUDED.excluded,
  requirements      = EXCLUDED.requirements,
  what_to_bring     = EXCLUDED.what_to_bring,
  group_size_min    = EXCLUDED.group_size_min,
  group_size_max    = EXCLUDED.group_size_max;

-- ============================================
-- GARDEN ROUTE — EXPERIENCES
-- ============================================

INSERT INTO experiences (tenant_id, slug, name, short_description, description, hero_image_url, category, duration, difficulty, price_from, price_currency, highlights, included, excluded, requirements, what_to_bring, group_size_min, group_size_max, is_published, is_featured, sort_order)
VALUES
  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'bloukrans-bungee', 'Bloukrans Bungee Jump',
   'Take the plunge from the world''s highest commercial bridge bungee jump — 216 metres.',
   'Bloukrans Bridge is the world''s highest commercial bungee jump at 216 metres above the river gorge. You are attached to the bungee cord, step onto the platform, and free-fall into the gorge below. The jump is operated by Face Adrenalin, the pioneers of bridge bungee jumping.',
   'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200',
   'adventure', '2 hours', 'extreme', 150, 'USD',
   '["World''s highest commercial bungee jump at 216 metres", "Jump from the iconic Bloukrans Bridge arch", "Professional Face Adrenalin crew", "Certificate of completion"]'::jsonb,
   '["Bungee jump", "Safety harness and all equipment", "Professional supervision", "Certificate"]'::jsonb,
   '["Transport to Bloukrans Bridge", "Photo and video packages (available on site)", "Insurance"]'::jsonb,
   '["Minimum age: 10 years", "Maximum weight: 145 kg, minimum weight: 40 kg", "Not suitable for pregnant women or those with heart conditions, high blood pressure, recent surgeries, or epilepsy", "Must sign indemnity form"]'::jsonb,
   '["Secure, enclosed shoes (no slip-ons)", "Comfortable clothing", "Long hair tied back", "Leave valuables at the office"]'::jsonb,
   1, 20, true, true, 6),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'knysna-lagoon-cruise', 'Knysna Lagoon Sunset Cruise',
   'Cruise the iconic Knysna Lagoon as the sun sets over the famous Knysna Heads.',
   'Knysna''s sheltered lagoon is one of South Africa''s most beautiful waterways. Cruise past the famous Heads — two dramatic sandstone cliffs guarding the lagoon''s ocean entrance — and watch the sun set over the water. Enjoy sundowners, fresh oysters, and the sounds of the lagoon.',
   'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
   'water', '2 hours', 'easy', 65, 'USD',
   '["Sunset views over the Knysna Heads", "Cruise through the sheltered lagoon", "Fresh Knysna oysters and sundowners", "Knysna kingfisher and other bird sightings"]'::jsonb,
   '["Boat cruise", "Welcome oysters and sparkling wine", "Sunset drinks", "Knowledgeable skipper"]'::jsonb,
   '["Transport to the harbour", "Additional drinks and food", "Gratuities"]'::jsonb,
   '["All ages welcome", "Life jackets available on board", "Dress warmly — evenings can be cool on the water"]'::jsonb,
   '["Warm jacket", "Camera", "Comfortable shoes (non-marking preferred)"]'::jsonb,
   2, 24, true, true, 7),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'tsitsikamma-forest-trail', 'Tsitsikamma Forest Trail',
   'Hike through ancient yellowwood forests and along dramatic coastal cliffs.',
   'The Tsitsikamma National Park protects 80km of coastline and some of Africa''s oldest temperate rainforest. Hike the iconic Otter Trail section or the Waterfall trail through towering yellowwood and Outeniqua yellowwood trees. Cross the famous suspension bridge over the Storms River mouth for dramatic ocean and canyon views.',
   'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
   'adventure', '4 hours', 'moderate', 45, 'USD',
   '["Ancient yellowwood forests — some trees over 800 years old", "Suspension bridge over Storms River mouth", "Dramatic coastal cliff scenery", "Rich birdlife including Knysna loeries"]'::jsonb,
   '["Guided trail walk", "Park entry fee", "Bridge crossing permit"]'::jsonb,
   '["Transport to Tsitsikamma", "Food and drinks", "Accommodation", "Gratuities"]'::jsonb,
   '["Minimum age: 7 years", "Moderate fitness required — some steep sections", "Wear sturdy hiking boots — trail can be slippery when wet", "Not suitable for wheelchairs or strollers"]'::jsonb,
   '["Sturdy hiking boots", "Rain jacket", "Water and snacks", "Insect repellent", "Camera"]'::jsonb,
   2, 16, true, true, 8),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'plett-whale-watching', 'Plettenberg Bay Whale Watching',
   'Spot Southern Right whales and dolphins in the waters off Plettenberg Bay.',
   'Plettenberg Bay is one of South Africa''s best whale watching destinations, particularly from June to November when Southern Right whales come to calve in the warm, sheltered bay. Experienced marine guides take you out on rigid inflatable boats to observe whales, dolphins, Cape fur seals, and seabirds up close.',
   'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200',
   'wildlife', '3 hours', 'easy', 85, 'USD',
   '["Southern Right whales and their calves (June–November)", "Common and bottlenose dolphins year-round", "Cape fur seal colony", "Diverse seabird life including gannets"]'::jsonb,
   '["Boat trip", "Marine biologist guide", "Life jackets", "Complimentary warm drink on return"]'::jsonb,
   '["Transport to the harbour", "Weather cannot be guaranteed", "Whale sightings not guaranteed (though highly likely in season)"]'::jsonb,
   '["Minimum age: 5 years", "Not recommended for those prone to seasickness in rough seas", "Trips may be cancelled in bad weather — full refund provided"]'::jsonb,
   '["Warm waterproof jacket", "Sunscreen", "Hat and sunglasses", "Camera with zoom lens", "Motion sickness tablets if needed"]'::jsonb,
   2, 20, true, false, 9),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'garden-route-road-trip', 'Garden Route Highlights Drive',
   'A curated full-day road trip covering Knysna, Wilderness, and the Tsitsikamma coast.',
   'Let a local expert guide show you the best of the Garden Route in a single day. From the Indian Ocean beaches of Wilderness and the Knysna Lagoon to the ancient Tsitsikamma forests and the dramatic Storms River mouth. Includes stops for fresh oysters, scenic viewpoints, and a forest walk.',
   'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
   'adventure', '10 hours', 'easy', 200, 'USD',
   '["Wilderness beach and lagoon views", "Fresh oysters at Knysna Quays", "Tsitsikamma Storms River bridge", "Scenic forest stops and viewpoints throughout"]'::jsonb,
   '["Professional guide and vehicle", "Lunch and two snack stops", "All entry fees", "Oyster tasting at Knysna"]'::jsonb,
   '["Hotel pickup outside George/Knysna", "Additional shopping", "Gratuities"]'::jsonb,
   '["All ages welcome", "Comfortable walking shoes for forest stops", "Camera essential"]'::jsonb,
   '["Camera", "Comfortable shoes", "Sun protection", "Light jacket for forest sections"]'::jsonb,
   1, 8, true, false, 10)
ON CONFLICT (tenant_id, slug) DO UPDATE SET
  name              = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description       = EXCLUDED.description,
  highlights        = EXCLUDED.highlights,
  included          = EXCLUDED.included,
  excluded          = EXCLUDED.excluded,
  requirements      = EXCLUDED.requirements,
  what_to_bring     = EXCLUDED.what_to_bring,
  group_size_min    = EXCLUDED.group_size_min,
  group_size_max    = EXCLUDED.group_size_max;

-- ============================================
-- CAPE TOWN — ACCOMMODATIONS
-- ============================================

INSERT INTO accommodations (tenant_id, slug, name, short_description, description, hero_image_url, category, star_rating, amenities, room_types, total_rooms, max_guests, location, price_from, price_currency, is_published, is_featured, sort_order)
VALUES
  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'silo-hotel-cape-town', 'The Silo Hotel',
   'A design icon rising above the V&A Waterfront in a converted grain elevator silo.',
   'The Silo Hotel occupies the upper floors of the converted grain elevator at the V&A Waterfront. With only 28 rooms, each individually decorated with curated contemporary art, the hotel is known for its extraordinary aesthetics, panoramic views of Table Mountain and the harbour, and its rooftop pool which offers 360° views of Cape Town.',
   'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
   'hotel', 5,
   '["Rooftop Pool", "Spa", "Restaurant", "WiFi", "Bar", "Concierge", "Butler Service", "Valet Parking", "Table Mountain Views"]'::jsonb,
   '[{"name":"Superior Room","description":"Uniquely designed room with original pillow-shaped windows, king or twin beds, and city or harbour views"},{"name":"Deluxe Room","description":"Larger room with sitting area, statement art pieces, and panoramic harbour or mountain views"},{"name":"Silo Suite","description":"Expansive suite with curved pillow windows on two sides, private dining room, and butler service"},{"name":"Penthouse","description":"The ultimate Cape Town experience — duplex penthouse spanning the full width of the silo with 360° city views"}]'::jsonb,
   28, 56,
   '{"address": "Silo Square, V&A Waterfront, Cape Town", "lat": -33.9063, "lng": 18.4208}'::jsonb,
   750, 'USD', true, true, 5),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'mount-nelson-hotel', 'Belmond Mount Nelson Hotel',
   'Cape Town''s legendary "Pink Lady" — a landmark hotel in the heart of the Gardens.',
   'Since 1899, the Belmond Mount Nelson Hotel has been Cape Town''s most storied address. Set in six acres of manicured gardens at the foot of Devil''s Peak, the hotel offers elegant rooms, a renowned afternoon tea, two pools, and a sense of colonial grandeur. The famous afternoon tea is a Cape Town institution not to be missed.',
   'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
   'hotel', 5,
   '["Two Pools", "Spa", "Restaurant", "WiFi", "Bar", "Afternoon Tea", "Tennis", "Gardens", "Concierge"]'::jsonb,
   '[{"name":"Classic Room","description":"Elegantly appointed room with period furnishings, garden or mountain views, and all modern comforts"},{"name":"Superior Garden Room","description":"Spacious room with French doors opening to a private garden terrace"},{"name":"Junior Suite","description":"Expansive suite with separate lounge, fireplace, and mountain views"},{"name":"Lord Milner Suite","description":"Historic grand suite in the original 1899 wing with private lounge, fireplace, and butler"}]'::jsonb,
   209, 420,
   '{"address": "76 Orange St, Gardens, Cape Town", "lat": -33.9302, "lng": 18.4113}'::jsonb,
   650, 'USD', true, true, 6),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'pod-boutique-cape-town', 'POD Boutique Hotel',
   'Hip sea-facing boutique hotel in Sea Point with stylish rooms and a rooftop terrace.',
   'POD is Cape Town''s most stylish mid-range option, perched on the Sea Point promenade facing the Atlantic Ocean. Minimalist rooms feature custom furniture, local artwork, and large windows facing the sea. The rooftop terrace with plunge pool and ocean views is a favourite for sundowners.',
   'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
   'boutique', 4,
   '["Rooftop Plunge Pool", "Restaurant", "WiFi", "Bar", "Sea Views", "Gym", "Concierge"]'::jsonb,
   '[{"name":"Sea View Room","description":"Compact room with floor-to-ceiling windows and Atlantic Ocean views"},{"name":"Superior Sea View","description":"Larger room with sitting area and panoramic ocean and Lion''s Head views"},{"name":"Suite","description":"Studio suite with kitchenette, private balcony, and sweeping Atlantic views"}]'::jsonb,
   60, 120,
   '{"address": "Sea Point Promenade, Cape Town", "lat": -33.9238, "lng": 18.3925}'::jsonb,
   280, 'USD', true, false, 7)
ON CONFLICT (tenant_id, slug) DO UPDATE SET
  name              = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description       = EXCLUDED.description,
  amenities         = EXCLUDED.amenities,
  room_types        = EXCLUDED.room_types,
  total_rooms       = EXCLUDED.total_rooms,
  max_guests        = EXCLUDED.max_guests;

-- ============================================
-- GARDEN ROUTE — ACCOMMODATIONS
-- ============================================

INSERT INTO accommodations (tenant_id, slug, name, short_description, description, hero_image_url, category, star_rating, amenities, room_types, total_rooms, max_guests, location, price_from, price_currency, is_published, is_featured, sort_order)
VALUES
  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'hog-hollow-lodge', 'Hog Hollow Country Lodge',
   'Award-winning hillside lodge nestled in the indigenous forest above Plettenberg Bay.',
   'Hog Hollow is one of South Africa''s most acclaimed boutique lodges, perched above the Matjes River valley in a private nature reserve. Each suite is an individual wooden chalet on stilts, nestled among the trees with private decks for birdwatching and forest views. Voted one of the world''s best small hotels, it combines warm hospitality with exceptional cuisine and access to the coast.',
   'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200',
   'lodge', 5,
   '["Pool", "Restaurant", "WiFi", "Forest Walks", "Bird Watching", "Bar", "Transfer Service"]'::jsonb,
   '[{"name":"Forest Suite","description":"Individual wooden chalet on stilts among the trees with private deck, outdoor shower, and forest views"},{"name":"Luxury Suite","description":"Larger split-level suite with lounge area, fireplace, and sweeping forest and valley views"},{"name":"Family Suite","description":"Two interconnecting suites perfect for families, with children''s activities included"}]'::jsonb,
   16, 32,
   '{"address": "Askop Road, The Crags, Plettenberg Bay", "lat": -33.9895, "lng": 23.4500}'::jsonb,
   450, 'USD', true, true, 8),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'knysna-lagoon-hotel', 'Knysna Log-Inn Hotel',
   'Characterful log cabin hotel at the heart of Knysna, steps from the waterfront.',
   'The Knysna Log-Inn is a charming landmark in the heart of Knysna, built from hand-crafted logs. Rooms and chalets are individually decorated with local art and natural materials. Walk to the Knysna Quays for oysters, browse the craft market, or book a lagoon cruise from the hotel.',
   'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
   'hotel', 4,
   '["Pool", "Restaurant", "WiFi", "Bar", "Lagoon Views", "Garden"]'::jsonb,
   '[{"name":"Standard Log Cabin Room","description":"Cosy room in the original log structure with en-suite bathroom and garden views"},{"name":"Lagoon View Room","description":"Superior room with a private balcony overlooking the Knysna Lagoon"},{"name":"Family Chalet","description":"Self-contained log chalet with kitchenette, lounge, and private garden, sleeps up to 4"}]'::jsonb,
   65, 130,
   '{"address": "Gray Street, Knysna", "lat": -34.0369, "lng": 23.0478}'::jsonb,
   180, 'USD', true, true, 9),

  ('e193b62e-af6e-4721-a2f6-95694bb22891', 'storms-river-mouth-rest-camp', 'Tsitsikamma Village Inn',
   'Rustic but comfortable village inn at the gateway to Tsitsikamma National Park.',
   'Tsitsikamma Village Inn is a charming collection of thatched rondavels and chalets in the village of Storms River. It''s the closest overnight option to the Tsitsikamma National Park trailhead, making it perfect for hikers and nature lovers. The restaurant serves hearty food and local craft beer from the region.',
   'https://images.unsplash.com/photo-1559548331-f9cb98001426?w=1200',
   'guesthouse', 3,
   '["Restaurant", "Bar", "WiFi", "Garden", "Hiking Access", "Braai Facilities"]'::jsonb,
   '[{"name":"Standard Rondavel","description":"Traditional circular thatched rondavel with en-suite bathroom and garden views"},{"name":"Chalet","description":"Self-contained chalet with small kitchenette, lounge area, and private veranda"},{"name":"Family Unit","description":"Larger chalet with two bedrooms and private braai area, sleeps up to 5"}]'::jsonb,
   44, 88,
   '{"address": "Storms River Village", "lat": -33.9733, "lng": 23.8778}'::jsonb,
   120, 'USD', true, false, 10)
ON CONFLICT (tenant_id, slug) DO UPDATE SET
  name              = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description       = EXCLUDED.description,
  amenities         = EXCLUDED.amenities,
  room_types        = EXCLUDED.room_types,
  total_rooms       = EXCLUDED.total_rooms,
  max_guests        = EXCLUDED.max_guests;

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
