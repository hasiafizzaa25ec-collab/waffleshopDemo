import { WaffleItem, ToppingOption } from '../types/waffle';

// Image imports for proper Vite bundling in production & GitHub Pages
import heroImg from '../assets/images/hero_artisanal_waffle_1791195527306.jpg';
import classicLiegeImg from '../assets/images/waffle_classic_liege_1791195685798.jpg';
import savoryBrunchImg from '../assets/images/waffle_savory_brunch_1791195700034.jpg';
import berryChantillyImg from '../assets/images/waffle_berry_chantilly_1791195718031.jpg';
import bakeryPressImg from '../assets/images/waffle_press_bakery_1791195735925.jpg';

export const IMAGES = {
  hero: heroImg,
  classicLiege: classicLiegeImg,
  savoryBrunch: savoryBrunchImg,
  berryChantilly: berryChantillyImg,
  bakeryPress: bakeryPressImg,
};


export const MENU_ITEMS: WaffleItem[] = [
  {
    id: 'liege-signature-pearl',
    name: 'Authentic Liege Pearl Sugar Waffle',
    category: 'liege',
    subCategory: 'Heritage Classics',
    price: 8.5,
    description: 'Enriched 48-hour fermented brioche dough studded with Belgian pearl sugar that caramelizes to a crisp, golden crackle in our cast iron irons.',
    image: IMAGES.classicLiege,
    badge: 'Signature House Recipe',
    calories: 420,
    prepTime: '6-8 min',
    dietary: ['Vegetarian'],
    signatureNote: 'Baked fresh with imported Belgian sugar crystals from Verviers.',
  },
  {
    id: 'brussels-berry-chantilly',
    name: 'Brussels Wild Berry & Mascarpone',
    category: 'brussels',
    subCategory: 'Golden Crisp Stacks',
    price: 11.5,
    description: 'Ultra-light, crispy Brussels grid waffle layered with wild Maine blueberries, vine-ripened strawberries, and Madagascar vanilla bean chantilly cream.',
    image: IMAGES.berryChantilly,
    badge: 'Guest Favorite',
    calories: 460,
    prepTime: '7-9 min',
    dietary: ['Vegetarian'],
    signatureNote: 'Airy lattice pockets that trap syrup and cream in every bite.',
  },
  {
    id: 'savory-hot-honey-chicken',
    name: 'Buttermilk Herb Waffle & Hot Honey Chicken',
    category: 'savory',
    subCategory: 'Chef Specialties',
    price: 15.0,
    description: 'Savory chive and aged Gruyère buttermilk waffle crowned with crispy spiced fried chicken, habanero-infused wildflower honey, and fresh microgreens.',
    image: IMAGES.savoryBrunch,
    badge: 'Brunch Crown',
    calories: 680,
    prepTime: '10-12 min',
    dietary: ['Nut-Free'],
    signatureNote: 'Perfect balance of caramelized crunch, savory warmth, and gentle heat.',
  },
  {
    id: 'liege-belgian-dark-hazelnut',
    name: 'Liege Dark Chocolate Noir & Roasted Hazelnut',
    category: 'liege',
    subCategory: 'Heritage Classics',
    price: 10.5,
    description: 'Warm caramelized Liege waffle smothered in warm 70% Callebaut dark chocolate ganache, slow-roasted hazelnuts, and sea salt flakes.',
    image: IMAGES.classicLiege,
    calories: 510,
    prepTime: '6-8 min',
    dietary: ['Vegetarian'],
    signatureNote: 'Featuring authentic single-origin Belgian Callebaut chocolate.',
  },
  {
    id: 'brussels-speculoos-caramel',
    name: 'Brussels Speculoos Biscoff & Salted Caramel',
    category: 'brussels',
    subCategory: 'Golden Crisp Stacks',
    price: 11.0,
    description: 'Crisp light waffle enveloped in warm spiced speculoos cookie butter, house-cooked salted fleur de sel caramel, and crushed cinnamon biscuits.',
    image: IMAGES.hero,
    calories: 490,
    prepTime: '7-9 min',
    dietary: ['Vegetarian', 'Nut-Free'],
    signatureNote: 'A nostalgic Belgian bakery standard with deep spices.',
  },
  {
    id: 'savory-smoked-salmon-mascarpone',
    name: 'Smoked Salmon & Herbed Mascarpone Brussels',
    category: 'savory',
    subCategory: 'Chef Specialties',
    price: 16.5,
    description: 'Savory dill waffle topped with cold-smoked Atlantic salmon, whipped lemon-caper mascarpone, pickled red onion ribbons, and baby watercress.',
    image: IMAGES.savoryBrunch,
    calories: 530,
    prepTime: '8-10 min',
    dietary: ['Pescatarian', 'Nut-Free'],
    signatureNote: 'Subtle herb infusion in the batter creates a crisp, delicate base.',
  },
  {
    id: 'drink-belgian-hot-chocolate',
    name: 'Artisan Belgian Sipping Chocolate',
    category: 'drinks',
    subCategory: 'Artisan Barista',
    price: 5.5,
    description: 'Steamed whole milk blended with melted 70% dark Callebaut chocolate and a pinch of cinnamon, topped with fresh torched marshmallow foam.',
    image: IMAGES.hero,
    calories: 310,
    prepTime: '4 min',
    dietary: ['Gluten-Friendly', 'Vegetarian'],
    signatureNote: 'Decadent, velvet-smooth European drinking chocolate.',
  },
  {
    id: 'drink-speculoos-latte',
    name: 'Speculoos Spiced Oat Milk Latte',
    category: 'drinks',
    subCategory: 'Artisan Barista',
    price: 6.0,
    description: 'Double shot of Ethiopian single-origin espresso, steamed oat milk, spiced cookie butter syrup, and dusted gingerbread nutmeg.',
    image: IMAGES.classicLiege,
    calories: 220,
    prepTime: '4 min',
    dietary: ['Vegan', 'Gluten-Friendly'],
    signatureNote: 'Subtly sweet with notes of cardamon, clove, and toasted caramel.',
  },
];

export const DOUGH_BASES = [
  {
    id: 'dough-liege-brioche',
    name: 'Authentic Liege Brioche Dough',
    description: 'Dense, chewy, golden brioche studded with Belgian pearl sugar that caramelizes into a glossy crisp shell.',
    price: 6.5,
    calories: 380,
  },
  {
    id: 'dough-brussels-crisp',
    name: 'Classic Brussels Lattice Batter',
    description: 'Light, airy, and rectangular with deep geometric pockets that stay wonderfully crisp.',
    price: 6.0,
    calories: 290,
  },
  {
    id: 'dough-gluten-free-almond',
    name: 'Gluten-Friendly Vanilla Almond',
    description: 'Crafted with fine almond flour, tapioca starch, and pure vanilla bean for a delicate nutty crunch.',
    price: 7.5,
    calories: 320,
  },
];

export const DRIZZLE_OPTIONS: ToppingOption[] = [
  { id: 'drizzle-dark-choco', name: '70% Belgian Dark Chocolate', category: 'drizzle', price: 1.5, calories: 90, dietary: ['Vegetarian'] },
  { id: 'drizzle-salted-caramel', name: 'House Salted Fleur de Sel Caramel', category: 'drizzle', price: 1.5, calories: 110, dietary: ['Vegetarian'] },
  { id: 'drizzle-vermont-maple', name: 'Pure Grade A Vermont Maple Syrup', category: 'drizzle', price: 1.25, calories: 75, dietary: ['Vegan'] },
  { id: 'drizzle-speculoos', name: 'Warm Speculoos Cookie Butter', category: 'drizzle', price: 1.75, calories: 120, dietary: ['Vegetarian'] },
  { id: 'drizzle-raspberry-coulis', name: 'Tart Wild Raspberry Coulis', category: 'drizzle', price: 1.25, calories: 45, dietary: ['Vegan'] },
  { id: 'drizzle-hot-honey', name: 'Habanero Infused Wildflower Honey', category: 'drizzle', price: 1.5, calories: 60, dietary: ['Vegetarian'] },
];

export const FRUIT_OPTIONS: ToppingOption[] = [
  { id: 'fruit-strawberries', name: 'Fresh Sweet Strawberries', category: 'fruit', price: 1.75, calories: 35, dietary: ['Vegan'] },
  { id: 'fruit-blueberries', name: 'Wild Maine Blueberries', category: 'fruit', price: 2.0, calories: 40, dietary: ['Vegan'] },
  { id: 'fruit-bananas', name: 'Caramelized Banana Slices', category: 'fruit', price: 1.25, calories: 70, dietary: ['Vegan'] },
  { id: 'fruit-raspberries', name: 'Fresh Tart Raspberries', category: 'fruit', price: 2.25, calories: 30, dietary: ['Vegan'] },
];

export const CRUNCH_OPTIONS: ToppingOption[] = [
  { id: 'crunch-hazelnuts', name: 'Slow-Roasted Piedmont Hazelnuts', category: 'crunch', price: 1.75, calories: 85, dietary: ['Vegetarian'] },
  { id: 'crunch-biscoff', name: 'Crumbled Speculoos Biscuits', category: 'crunch', price: 1.25, calories: 70, dietary: ['Vegetarian'] },
  { id: 'crunch-candied-pecans', name: 'Bourbon Candied Pecan Pieces', category: 'crunch', price: 2.0, calories: 95, dietary: ['Vegetarian'] },
  { id: 'crunch-cocoa-nibs', name: 'Raw Organic Cocoa Nibs', category: 'crunch', price: 1.5, calories: 50, dietary: ['Vegan'] },
  { id: 'crunch-crispy-bacon', name: 'Applewood Smoked Bacon Bits', category: 'crunch', price: 2.5, calories: 110, dietary: [] },
];

export const CREAM_OPTIONS: ToppingOption[] = [
  { id: 'cream-chantilly', name: 'Fresh Madagascar Vanilla Chantilly', category: 'cream', price: 1.5, calories: 95, dietary: ['Vegetarian'] },
  { id: 'cream-mascarpone', name: 'Whipped Orange Blossom Mascarpone', category: 'cream', price: 1.75, calories: 120, dietary: ['Vegetarian'] },
  { id: 'cream-gelato-vanilla', name: 'Artisan Tahitian Vanilla Gelato Scoop', category: 'cream', price: 2.5, calories: 140, dietary: ['Vegetarian'] },
  { id: 'cream-salted-butter', name: 'French Cultured Salted Honey Butter', category: 'cream', price: 1.25, calories: 80, dietary: ['Vegetarian'] },
];

export const CAFE_INFO = {
  name: 'Maison de la Gaufre',
  subname: 'Artisanal Belgian Waffle House & Espresso Bar',
  address: '412 Cobblestone Lane, Historic Market District, Suite 101',
  phone: '(555) 842-8335',
  email: 'bonjour@maisondelagaufre.com',
  hours: [
    { days: 'Monday – Thursday', time: '7:30 AM – 6:00 PM' },
    { days: 'Friday', time: '7:30 AM – 8:00 PM' },
    { days: 'Saturday & Sunday (Weekend Brunch)', time: '8:00 AM – 7:00 PM' },
  ],
  announcement: 'Fresh batch of 48-hour brioche pearl dough ready every 15 minutes.',
};

export const REVIEWS = [
  {
    id: 'rev-1',
    author: 'Clara Dubois',
    role: 'Pastry Chef & Food Columnist',
    source: 'The Daily Epicure',
    quote: 'The caramelized pearl sugar crust on their Liege waffle is undeniably authentic. It crackles on the teeth before yielding to the warmest, most pillowy brioche dough in the city.',
    rating: 5,
    date: 'September 2026',
  },
  {
    id: 'rev-2',
    author: 'Julian Vane',
    role: 'Weekend Brunch Regular',
    source: 'Verified Patron',
    quote: 'Their savory buttermilk chicken waffle with habanero wildflower honey is on another level. The crispiness stays even beneath the hot honey glaze. Unbeatable.',
    rating: 5,
    date: 'August 2026',
  },
  {
    id: 'rev-3',
    author: 'Elena Rostova',
    role: 'Coffee & Dessert Enthusiast',
    source: 'Google Reviewer (500+ reviews)',
    quote: 'Sitting at the cedar counter with a freshly pressed Brussels waffle and their Belgian dark sipping chocolate felt like being transported straight to Ghent.',
    rating: 5,
    date: 'July 2026',
  },
];
