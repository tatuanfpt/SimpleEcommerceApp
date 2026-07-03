import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '@/data/products';

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Đang giao' | 'Đã giao' | 'Đã hủy';
}

interface AppState {
  cart: CartItem[];
  orders: Order[];
  user: { name: string; email: string } | null;
}

type Action =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; id: string }
  | { type: 'UPDATE_QTY'; id: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'PLACE_ORDER' }
  | { type: 'LOGIN'; email: string }
  | { type: 'LOGOUT' };

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cart.find(item => item.id === action.product.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...action.product, quantity: 1 }] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.id) };
    case 'UPDATE_QTY':
      if (action.quantity <= 0) {
        return { ...state, cart: state.cart.filter(item => item.id !== action.id) };
      }
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.id ? { ...item, quantity: action.quantity } : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'PLACE_ORDER': {
      if (state.cart.length === 0) return state;
      const total = state.cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const order: Order = {
        id: `ORD-${Date.now().toString().slice(-6)}`,
        items: [...state.cart],
        total,
        date: new Date().toLocaleDateString('vi-VN', {
          day: '2-digit', month: '2-digit', year: 'numeric',
          hour: '2-digit', minute: '2-digit',
        }),
        status: 'Đang giao',
      };
      return { ...state, cart: [], orders: [order, ...state.orders] };
    }
    case 'LOGIN':
      return {
        ...state,
        user: { name: 'Khách hàng VIP', email: action.email },
      };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, {
    cart: [],
    orders: [],
    user: null,
  });
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}

export const cartTotal = (cart: CartItem[]) =>
  cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

export const cartCount = (cart: CartItem[]) =>
  cart.reduce((sum, i) => sum + i.quantity, 0);

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
