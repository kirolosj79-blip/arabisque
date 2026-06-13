-- =============================================
-- ARABESQUE BY MIMO — Complete Database Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  text TEXT NOT NULL,
  approved BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order links table
CREATE TABLE IF NOT EXISTS order_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT DEFAULT '',
  is_primary BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Menu offers table
CREATE TABLE IF NOT EXISTS menu_offers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  original_price DECIMAL(10,2) DEFAULT 0,
  offer_price DECIMAL(10,2) DEFAULT 0,
  image TEXT DEFAULT '',
  badge TEXT DEFAULT 'SPECIAL',
  badge_color TEXT DEFAULT 'gold',
  expires_at TEXT DEFAULT '',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Menu items table (for admin-managed items)
CREATE TABLE IF NOT EXISTS menu_items_custom (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_ar TEXT DEFAULT '',
  description TEXT DEFAULT '',
  price DECIMAL(10,2) NOT NULL,
  combo_price DECIMAL(10,2),
  category TEXT NOT NULL,
  is_vegetarian BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  spice_level INTEGER DEFAULT 0,
  note TEXT DEFAULT '',
  image TEXT DEFAULT '',
  is_available BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Default order links
INSERT INTO order_links (label, url, description, is_primary, is_active, display_order) VALUES
  ('Anaheim Food Co', 'https://anaheimfoodco.com/s/arabesque/1560-s-lewis-st-anaheim/94193ec7-7e7b-4357-8ba6-2d36b8bb1632', 'Main order page — pickup & all delivery options', true, true, 1),
  ('GrubHub', 'https://grubhub.com/restaurant/arabesque-1560-s-lewis-st-anaheim/14655520', 'Direct GrubHub delivery', false, true, 2)
ON CONFLICT DO NOTHING;

-- Default settings
INSERT INTO settings (key, value) VALUES
  ('phone', '+1 (310) 691-2534'),
  ('address', '1560 S Lewis St, Anaheim CA 92805'),
  ('email', 'hello@arabesque-by-mimo.com'),
  ('grand_opening', '2026-06-13'),
  ('instagram', 'https://www.instagram.com/anaheimfoodco/'),
  ('facebook', 'https://www.facebook.com/AnaheimFoodCo/'),
  ('hours_daily', '10:00 AM – 1:00 AM'),
  ('catering_phone', '657-657-3161'),
  ('catering_email', 'Arabesque@mimo-culinary.kitchen'),
  ('tiktok', 'https://www.tiktok.com/@arabesquebymimo?_r=1&_t=ZP-97ASt7K9hEs'),
  ('socials', '[{"id":"ig","label":"Instagram","url":"https://www.instagram.com/arabesque_bymimo?igsh=OHhkeGY0N2FkMnAy","icon":"📸","active":true},{"id":"fb","label":"Facebook","url":"https://www.facebook.com/share/1BcD5jjb8N/","icon":"👍","active":true},{"id":"tt","label":"TikTok","url":"https://www.tiktok.com/@arabesquebymimo?_r=1&_t=ZP-97ASt7K9hEs","icon":"🎵","active":true}]'),
  ('hours_schedule', '[{"day":"Monday","open":"9:00 AM","close":"12:00 AM","closed":false},{"day":"Tuesday","open":"9:00 AM","close":"12:00 AM","closed":false},{"day":"Wednesday","open":"9:00 AM","close":"12:00 AM","closed":false},{"day":"Thursday","open":"9:00 AM","close":"12:00 AM","closed":false},{"day":"Friday","open":"9:00 AM","close":"12:00 AM","closed":false},{"day":"Saturday","open":"9:00 AM","close":"12:00 AM","closed":false},{"day":"Sunday","open":"9:00 AM","close":"12:00 AM","closed":false}]')
ON CONFLICT (key) DO NOTHING;

-- ─── Row Level Security ───────────────────────────────────────────────────────

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items_custom ENABLE ROW LEVEL SECURITY;

-- Public can read approved reviews
CREATE POLICY "public_read_reviews" ON reviews
  FOR SELECT USING (approved = true);

-- Public can submit reviews
CREATE POLICY "public_insert_reviews" ON reviews
  FOR INSERT WITH CHECK (true);

-- Public can read active order links
CREATE POLICY "public_read_orders" ON order_links
  FOR SELECT USING (is_active = true);

-- Public can read active offers
CREATE POLICY "public_read_offers" ON menu_offers
  FOR SELECT USING (is_active = true);

-- Public can read settings
CREATE POLICY "public_read_settings" ON settings
  FOR SELECT USING (true);

-- Public can read menu items
CREATE POLICY "public_read_menu" ON menu_items_custom
  FOR SELECT USING (is_available = true);

-- Service role has full access (admin operations)
-- This is automatic with service role key
