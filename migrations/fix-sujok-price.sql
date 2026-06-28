-- Fix Sujok Plate price: $16.99 → $17.99
-- Run in Supabase SQL Editor
UPDATE menu_items_custom SET price = 17.99 WHERE id = 'p4';

-- If no row exists yet (first time), insert it
INSERT INTO menu_items_custom (id, name, price, category, description, is_available)
SELECT 'p4', 'Sujok Plate', 17.99, 'plates', '', true
WHERE NOT EXISTS (SELECT 1 FROM menu_items_custom WHERE id = 'p4');
