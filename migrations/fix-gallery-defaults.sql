-- Run this in Supabase SQL Editor to fix/seed the correct default gallery images.
-- Safe to run multiple times.

-- Remove any old/wrong default rows pointing at files that don't exist
DELETE FROM gallery_images WHERE is_default = true AND src NOT IN ('/images/cairo-scene.jpg', '/images/menu-board.jpg');

-- Insert the correct defaults if they're not already there
INSERT INTO gallery_images (src, alt, caption, display_order, is_default)
SELECT '/images/cairo-scene.jpg', 'Cairo — The Inspiration Behind Arabesque', 'The Spirit of Cairo', 1, true
WHERE NOT EXISTS (SELECT 1 FROM gallery_images WHERE src = '/images/cairo-scene.jpg');

INSERT INTO gallery_images (src, alt, caption, display_order, is_default)
SELECT '/images/menu-board.jpg', 'Arabesque by Mimo Menu', 'Signature Classics', 2, true
WHERE NOT EXISTS (SELECT 1 FROM gallery_images WHERE src = '/images/menu-board.jpg');
