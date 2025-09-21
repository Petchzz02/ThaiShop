export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface OrderSummary {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}