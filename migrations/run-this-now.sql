-- =============================================
-- ARABESQUE BY MIMO — Safe to run multiple times
-- This creates any MISSING tables (gallery_images was missing)
-- and fixes the default gallery images.
-- =============================================

-- Gallery images table (this is the one that was missing)
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  src TEXT NOT NULL,
  alt TEXT DEFAULT '',
  caption TEXT DEFAULT '',
  display_order INTEGER DEFAULT 0,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_gallery" ON gallery_images;
CREATE POLICY "public_read_gallery" ON gallery_images FOR SELECT USING (true);

-- Seed the correct default images (only if not already present)
INSERT INTO gallery_images (src, alt, caption, display_order, is_default)
SELECT '/images/cairo-scene.jpg', 'Cairo — The Inspiration Behind Arabesque', 'The Spirit of Cairo', 1, true
WHERE NOT EXISTS (SELECT 1 FROM gallery_images WHERE src = '/images/cairo-scene.jpg');

INSERT INTO gallery_images (src, alt, caption, display_order, is_default)
SELECT '/images/menu-board.jpg', 'Arabesque by Mimo Menu', 'Signature Classics', 2, true
WHERE NOT EXISTS (SELECT 1 FROM gallery_images WHERE src = '/images/menu-board.jpg');

-- Sanity check: confirm menu_items_custom table also exists
-- (run this SELECT separately afterwards to verify everything is in place)
-- SELECT table_name FROM information_schema.tables WHERE table_schema='public';
