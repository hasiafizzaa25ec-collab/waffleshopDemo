export type WaffleCategory = 'all' | 'liege' | 'brussels' | 'savory' | 'drinks';

export interface ToppingOption {
  id: string;
  name: string;
  category: 'drizzle' | 'fruit' | 'crunch' | 'cream';
  price: number;
  calories: number;
  dietary?: string[];
}

export interface WaffleItem {
  id: string;
  name: string;
  category: 'liege' | 'brussels' | 'savory' | 'drinks';
  subCategory?: string;
  price: number;
  description: string;
  image: string;
  badge?: string;
  calories: number;
  prepTime: string;
  dietary: string[];
  signatureNote?: string;
  availableToppings?: ToppingOption[];
}

export interface CustomWaffleCreation {
  id: string;
  baseDough: {
    id: string;
    name: string;
    description: string;
    price: number;
    calories: number;
  };
  drizzles: ToppingOption[];
  fruits: ToppingOption[];
  crunches: ToppingOption[];
  creams: ToppingOption[];
  notes?: string;
  quantity: number;
  totalPrice: number;
}

export interface CartItem {
  cartId: string;
  isCustom?: boolean;
  item?: WaffleItem;
  customWaffle?: CustomWaffleCreation;
  quantity: number;
  selectedToppings?: ToppingOption[];
  notes?: string;
  unitPrice: number;
  totalPrice: number;
}

export interface ReservationData {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'cozy-indoor' | 'sunlit-patio' | 'chef-counter';
  specialNotes?: string;
  status: 'confirmed' | 'pending';
  createdAt: string;
}

export interface OrderConfirmation {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderType: 'pickup' | 'dine-in';
  scheduledTime: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: string;
  estimatedPrepMinutes: number;
  timestamp: string;
}
