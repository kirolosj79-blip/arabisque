/**
 * Arabic/English translations for Arabesque by Mimo
 * Egyptian Arabic dialect
 */

export type Lang = "en" | "ar";

export const translations = {
  en: {
    // Nav
    nav_story: "Our Story",
    nav_menu: "Menu",
    nav_gallery: "Gallery",
    nav_contact: "Contact",
    nav_order: "Order Online",

    // Hero
    hero_tagline: "When Authentic Egyptian Flavors Meet Nostalgia",
    hero_order: "Order Online",
    hero_explore: "Explore Menu",

    // Menu
    menu_title: "Our Menu",
    menu_order_cta: "Order Online Now",
    menu_ready: "Ready to order?",
    plates_step1: "First Step: Choose Your Base",
    plates_step2: "Second Step: Choose Your Protein",
    plates_step3: "Third Step: Choose Your Toppings",
    plates_note: "ALL Plates served with Tahini sauce or Garlic sauce and one of your choices of the following sides: Fries, Egyptian Salad or Potato Salad.",
    plates_add: "Add +$1 for Baba Ghanoush Or Hummus",
    sauce_tips: "Mimo's Sauce Suggestions",

    // Order
    order_title: "Order Online",
    order_sub: "Fresh, halal, and made to order.",
    order_via: "Order via",
    order_grubhub: "Order on GrubHub",

    // Contact
    contact_title: "Contact & Location",
    contact_find: "Find Us",
    contact_hours: "Hours",
    contact_location: "Location",
    contact_address: "Address",
    contact_phone: "Phone",
    contact_email: "Email",
    contact_maps: "Open in Google Maps",
    contact_order_now: "🛒 Order Now",
    hours_daily: "Daily",

    // Gallery
    gallery_title: "Our Gallery",
    gallery_journey: "A Visual Journey",

    // About
    about_title: "Our Story",

    // Footer
    footer_tagline: "When Authentic Egyptian Flavors Meet Nostalgia.",
    footer_halal: "Halal certified · Anaheim, California",
    footer_navigate: "Navigate",
    footer_visit: "Visit Us",
    footer_hours: "Hours",
    footer_inside: "Inside Anaheim Food Co.",

    // Categories
    cat_classics: "Signature Classics",
    cat_plates: "Signature Plates",
    cat_desserts: "Desserts",
    cat_sides: "Side Items",
    cat_drinks: "Egyptian Drinks",
    cat_offers: "Offers",
  },

  ar: {
    // Nav
    nav_story: "قصتنا",
    nav_menu: "المنيو",
    nav_gallery: "معرض الصور",
    nav_contact: "تواصل معنا",
    nav_order: "اطلب الآن",

    // Hero
    hero_tagline: "لما النكهات المصرية الأصيلة تلتقي بالنوستالجيا",
    hero_order: "اطلب الآن",
    hero_explore: "استكشف المنيو",

    // Menu
    menu_title: "منيونا",
    menu_order_cta: "اطلب أونلاين",
    menu_ready: "جاهز تطلب؟",
    plates_step1: "الخطوة الأولى: اختار الأساس",
    plates_step2: "الخطوة التانية: اختار البروتين",
    plates_step3: "الخطوة التالتة: اختار الصوص",
    plates_note: "كل الأطباق بتيجي مع صوص طحينة أو ثوم وجانب من اختيارك: بطاطس أو سلطة مصرية أو سلطة بطاطس.",
    plates_add: "أضف +١ دولار لبابا غنوج أو حمص",
    sauce_tips: "اقتراحات ميمو للصوص",

    // Order
    order_title: "اطلب أونلاين",
    order_sub: "طازج، حلال، ومتعمل خصيصاً ليك.",
    order_via: "اطلب عن طريق",
    order_grubhub: "اطلب على GrubHub",

    // Contact
    contact_title: "تواصل وموقعنا",
    contact_find: "لاقينا",
    contact_hours: "مواعيد العمل",
    contact_location: "الموقع",
    contact_address: "العنوان",
    contact_phone: "التليفون",
    contact_email: "الإيميل",
    contact_maps: "افتح في خرائط جوجل",
    contact_order_now: "🛒 اطلب دلوقتي",
    hours_daily: "يومياً",

    // Gallery
    gallery_title: "معرض صورنا",
    gallery_journey: "رحلة بصرية",

    // About
    about_title: "قصتنا",

    // Footer
    footer_tagline: "لما النكهات المصرية الأصيلة تلتقي بالنوستالجيا.",
    footer_halal: "حلال معتمد · أنهايم، كاليفورنيا",
    footer_navigate: "التنقل",
    footer_visit: "زورونا",
    footer_hours: "المواعيد",
    footer_inside: "جوه Anaheim Food Co.",

    // Categories
    cat_classics: "كلاسيكيات سيجنيتشر",
    cat_plates: "أطباق سيجنيتشر",
    cat_desserts: "الحلويات",
    cat_sides: "الإضافات",
    cat_drinks: "المشروبات المصرية",
    cat_offers: "العروض",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
