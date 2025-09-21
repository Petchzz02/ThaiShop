import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, CartItem, Cart } from '@/types/shop';
import { useToast } from '@/hooks/use-toast';

interface CartState {
  cart: Cart;
}

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.items.find(
        item => item.product.id === action.product.id
      );

      if (existingItem) {
        const updatedItems = state.cart.items.map(item =>
          item.product.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        const total = updatedItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
        return {
          cart: { items: updatedItems, total }
        };
      }

      const newItems = [...state.cart.items, { product: action.product, quantity: 1 }];
      const total = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      return {
        cart: { items: newItems, total }
      };
    }

    case 'REMOVE_FROM_CART': {
      const updatedItems = state.cart.items.filter(
        item => item.product.id !== action.productId
      );
      const total = updatedItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      return {
        cart: { items: updatedItems, total }
      };
    }

    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', productId: action.productId });
      }

      const updatedItems = state.cart.items.map(item =>
        item.product.id === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      );
      const total = updatedItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      return {
        cart: { items: updatedItems, total }
      };
    }

    case 'CLEAR_CART':
      return {
        cart: { items: [], total: 0 }
      };

    default:
      return state;
  }
};

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartItemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: { items: [], total: 0 }
  });
  const { toast } = useToast();

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', product });
    toast({
      title: "เพิ่มสินค้าในตะกร้าแล้ว",
      description: `${product.name} ถูกเพิ่มในตะกร้าแล้ว`,
    });
  };

  const removeFromCart = (productId: string) => {
    const item = state.cart.items.find(item => item.product.id === productId);
    dispatch({ type: 'REMOVE_FROM_CART', productId });
    if (item) {
      toast({
        title: "ลบสินค้าออกจากตะกร้าแล้ว",
        description: `${item.product.name} ถูกลบออกจากตะกร้าแล้ว`,
        variant: "destructive",
      });
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast({
      title: "ล้างตะกร้าแล้ว",
      description: "สินค้าทั้งหมดถูกลบออกจากตะกร้าแล้ว",
    });
  };

  const cartItemsCount = state.cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};