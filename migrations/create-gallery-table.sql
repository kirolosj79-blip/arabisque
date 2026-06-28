-- Run this ONCE in Supabase SQL Editor to create the gallery_images table
-- (this table did not exist yet, which is why fix-gallery-defaults.sql failed)

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

INSERT INTO gallery_images (src, alt, caption, display_order, is_default)
SELECT '/images/cairo-scene.jpg', 'Cairo — The Inspiration Behind Arabesque', 'The Spirit of Cairo', 1, true
WHERE NOT EXISTS (SELECT 1 FROM gallery_images WHERE src = '/images/cairo-scene.jpg');

INSERT INTO gallery_images (src, alt, caption, display_order, is_default)
SELECT '/images/menu-board.jpg', 'Arabesque by Mimo Menu', 'Signature Classics', 2, true
WHERE NOT EXISTS (SELECT 1 FROM gallery_images WHERE src = '/images/menu-board.jpg');
