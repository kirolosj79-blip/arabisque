export interface MenuItem {
  id: string
  name: string
  nameAr?: string
  description: string
  price: number
  comboPrice?: number
  category: string
  isVegetarian?: boolean
  isFeatured?: boolean
  spiceLevel?: number
  note?: string
  image?: string
  isAvailable?: boolean
}

export interface MenuCategory {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
}

export const menuCategories: MenuCategory[] = [
  { id: '1', name: 'Signature Classics', slug: 'classics', icon: '🥙' },
  { id: '2', name: 'Signature Plates',   slug: 'plates',   icon: '🍽️' },
  { id: '3', name: 'Desserts',           slug: 'desserts', icon: '🍮' },
  { id: '4', name: 'Side Items',         slug: 'sides',    icon: '🥗' },
  { id: '5', name: 'Egyptian Drinks',    slug: 'drinks',   icon: '🥤' },
  { id: '6', name: 'Offers',             slug: 'offers',   icon: '🎁' },
]

export const menuItems: MenuItem[] = [
  // ─── SIGNATURE CLASSICS ───
  {
    id: 'c1',
    name: 'Beef Shawarma',
    description: 'Thinly sliced Egyptian-style beef shawarma, deeply marinated and grilled with onions, tomato and parsley, finished with rich tahini sauce for a bold and smoky flavor.',
    price: 12.99,
    comboPrice: 17.99,
    category: 'classics',
    note: 'WRAP: $12.99  COMBO: $17.99',
  },
  {
    id: 'c2',
    name: 'Chicken Shawarma',
    description: 'Tender Egyptian-style chicken shawarma marinated with signature spices, grilled to perfection, and topped with creamy garlic sauce for a juicy and flavorful bite.',
    price: 12.99,
    comboPrice: 17.99,
    category: 'classics',
    note: 'WRAP: $12.99  COMBO: $17.99',
  },
  {
    id: 'c3',
    name: 'Kebda Eskandarani Sandwich',
    description: 'Sizzling marinated beef liver sautéed with garlic, chili, and peppers. Bold, spicy and packed with mouthwatering flavor. Served with tahini sauce and pickles.',
    price: 12.99,
    comboPrice: 17.99,
    category: 'classics',
    note: 'SANDWICH: $12.99  COMBO: $17.99',
    spiceLevel: 2,
  },
  {
    id: 'c4',
    name: 'Sujok Sandwich',
    description: 'Juicy spiced Egyptian street sausage sautéed with peppers and onions. Savory, slightly spicy and incredibly satisfying. Served with tahini sauce and pickles.',
    price: 12.99,
    comboPrice: 17.99,
    category: 'classics',
    note: 'SANDWICH: $12.99  COMBO: $17.99',
    spiceLevel: 1,
  },
  {
    id: 'c5',
    name: 'Hawawshi',
    isFeatured: true,
    description: 'Golden-crispy Egyptian bread stuffed with juicy spiced minced beef and onions. Crunchy outside, bursting with savory goodness inside. Served with tahini sauce and pickles.',
    price: 12.99,
    comboPrice: 17.99,
    category: 'classics',
    note: 'HAWAWSHI ADD-ONS: Cheese +$2.00 · Beef Shawarma +$3.5 · Kebda Eskandarani +$3.5 · Sujok +$3.5',
  },
  {
    id: 'c6',
    name: 'Koshari',
    isFeatured: true,
    nameAr: 'كشري',
    description: 'A legendary Egyptian favorite — fluffy rice, hearty lentils, and tender pasta piled high, crowned with crispy golden onions and drenched in a rich, tangy tomato sauce with a bold garlic-chili kick.',
    price: 15.99,
    category: 'classics',
    isVegetarian: true,
  },
  {
    id: 'c7',
    name: 'Macarona Béchamel',
    description: 'Perfectly layered pasta and seasoned beef baked in a luxuriously creamy béchamel sauce, topped with a golden, bubbling crust — rich, cheesy, and irresistibly indulgent.',
    price: 16.99,
    category: 'classics',
  },

  // ─── SIGNATURE PLATES — no descriptions, name + price only ───
  {
    id: 'p1',
    name: 'Beef Shawarma Plate',
    description: '',
    price: 17.99,
    category: 'plates',
  },
  {
    id: 'p2',
    name: 'Chicken Shawarma Plate',
    description: '',
    price: 16.99,
    category: 'plates',
  },
  {
    id: 'p3',
    name: 'Kebda Eskandarani Plate',
    description: '',
    price: 16.99,
    category: 'plates',
    spiceLevel: 2,
  },
  {
    id: 'p4',
    name: 'Sujok Plate',
    description: '',
    price: 17.99,
    category: 'plates',
  },
  {
    id: 'p5',
    name: 'Biftek (2 Pieces) Plate',
    description: '',
    price: 18.99,
    category: 'plates',
  },

  // ─── DESSERTS ───
  {
    id: 'd1',
    name: 'Pistachio Kunafa Chocolate Ball (Signature)',
    isFeatured: true,
    description: '',
    price: 6.99,
    category: 'desserts',
    isVegetarian: true,
  },
  {
    id: 'd2',
    name: 'Baklava with mixed walnuts and pistachio',
    description: '',
    price: 6.99,
    category: 'desserts',
    isVegetarian: true,
    note: '6pcs',
  },
  {
    id: 'd3',
    name: 'Om Ali',
    description: '',
    price: 7.99,
    category: 'desserts',
    isVegetarian: true,
  },

  // ─── SIDES — name only, no description ───
  {
    id: 's1',
    name: 'Tahini Sauce',
    description: '',
    price: 1.99,
    category: 'sides',
    isVegetarian: true,
  },
  {
    id: 's2',
    name: 'Mix Pickles',
    description: '',
    price: 3.99,
    category: 'sides',
    isVegetarian: true,
  },
  {
    id: 's3',
    name: 'Hummus',
    description: '',
    price: 4.99,
    category: 'sides',
    isVegetarian: true,
  },
  {
    id: 's4',
    name: 'Garlic Sauce',
    description: '',
    price: 1.99,
    category: 'sides',
    isVegetarian: true,
  },
  {
    id: 's5',
    name: 'Fries',
    description: '',
    price: 3.99,
    category: 'sides',
    isVegetarian: true,
  },
  {
    id: 's6',
    name: 'BABA Ghanoush (Roasted Eggplants)',
    description: '',
    price: 4.99,
    category: 'sides',
    isVegetarian: true,
  },
  {
    id: 's7',
    name: 'Egyptian Green Salad',
    description: '',
    price: 3.99,
    category: 'sides',
    isVegetarian: true,
  },
  {
    id: 's8',
    name: 'Potato Salad',
    description: '',
    price: 3.99,
    category: 'sides',
    isVegetarian: true,
  },

  // ─── DRINKS — keep "Non-Alcoholic Malt Beverage" only where applicable ───
  {
    id: 'dr1',
    name: 'Birell',
    description: 'Non-Alcoholic Malt Beverage',
    price: 2.50,
    category: 'drinks',
  },
  {
    id: 'dr2',
    name: 'Fairouz Pineapple',
    description: '',
    price: 2.50,
    category: 'drinks',
  },
  {
    id: 'dr3',
    name: 'Schweppes Lemon/Mint',
    description: '',
    price: 2.50,
    category: 'drinks',
  },
  {
    id: 'dr4',
    name: 'Schweppes Pomegranate',
    description: '',
    price: 2.50,
    category: 'drinks',
  },
  {
    id: 'dr5',
    name: 'Schweppes Pineapple',
    description: '',
    price: 2.50,
    category: 'drinks',
  },
  {
    id: 'dr6',
    name: 'Schweppes Peach',
    description: '',
    price: 2.50,
    category: 'drinks',
  },
]

export const featuredItems = (() => {
  const order = ['c6', 'c5', 'd1']; // Koshari, Hawawshi, Kunafa
  return order.map(id => menuItems.find(i => i.id === id)!).filter(Boolean);
})()

export const platesBases = [
  'Jasmine White Rice',
  'Red Sauce Pasta (Macarona Bel Salsa)',
  'Half Portion Koshari',
  'Egyptian Green Salad',
]

export const platesToppings = [
  'Tahini Sauce',
  'Red Sauce',
  'Garlic Sauce',
  'Zesty Dressing',
]

export const mimoSauceSuggestions = [
  {
    item: 'Beef Shawarma',
    suggestion: 'Tahini on Rice, Red Sauce on Pasta, Red & Garlic on Koshari, Zesty Tahini on Salad. A classic for a reason.',
  },
  {
    item: 'Chicken Shawarma',
    suggestion: 'Garlic on Rice, Red Sauce on Pasta, Red & Garlic on Koshari, Zesty Garlic on Salad. Light, fresh & spot on.',
  },
  {
    item: 'Kebda Eskandarani',
    suggestion: 'Tahini on Rice, Red Sauce on Pasta, Red & Tahini on Koshari, Zesty Tahini on Salad. Bold flavors, perfectly balanced.',
  },
  {
    item: 'Sujok',
    suggestion: 'Red Sauce on everything. Straightforward, indulgent & absolutely worth it.',
  },
  {
    item: 'Biftek',
    suggestion: 'Red Sauce on everything. Rich, smoky & saucy.',
  },
]
