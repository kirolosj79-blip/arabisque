-- Remove old base64 images from menu_items_custom
-- (only keep Storage URLs that start with 'http')
UPDATE menu_items_custom 
SET image = '' 
WHERE image IS NOT NULL 
  AND image != ''
  AND image NOT LIKE 'http%';

-- Verify what's left
SELECT id, name, 
  CASE WHEN image LIKE 'http%' THEN 'Storage URL ✅' 
       WHEN image = '' OR image IS NULL THEN 'Empty' 
       ELSE 'Old base64 ❌' END as image_status
FROM menu_items_custom;
