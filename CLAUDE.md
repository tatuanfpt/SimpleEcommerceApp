@AGENTS.md

## Project

**ShopVibe** — Vietnamese-language e-commerce prototype built with React Native + Expo.

- React Native 0.86 · Expo 57 · React 19 · TypeScript 6 · Expo Router

## Running

```bash
npx expo start          # QR code for Expo Go
npx expo start --ios    # iOS Simulator
npx expo start --android
```

## Architecture

- **Entry:** `index.ts` → `expo-router/entry`
- **Root layout:** `app/_layout.tsx` — wraps the whole app in `<AppProvider>`
- **Navigation:** `app/(tabs)/_layout.tsx` — 4-tab bottom bar (Storefront, Cart, Profile, Orders)
- **State:** `context/AppContext.tsx` — single `useReducer` store; exports `useApp()`, `formatPrice()`, `cartCount()`, `cartTotal()`
- **Data:** `data/products.ts` — 8 hardcoded mock products, no network calls
- **Design tokens:** `constants/Colors.ts` — palette (primary `#1A1A2E`, accent `#FF6B35`)

## Directory Layout

```
app/
  _layout.tsx           root layout (AppProvider + StatusBar)
  (tabs)/
    _layout.tsx         tab bar + cart badge counter
    index.tsx           Storefront — product grid, search, category filter, product modal
    cart.tsx            Cart — qty controls, checkout flow, auth gate
    profile.tsx         Profile — dummy login form / logged-in profile view
    orders.tsx          Orders — expandable order history cards
components/
  ProductCard.tsx       2-col grid card with Add-to-Cart
  CartItem.tsx          cart row with +/- qty and delete
  OrderCard.tsx         collapsible order card
  PromoBanner.tsx       auto-scrolling promo carousel (3.5 s interval)
context/
  AppContext.tsx        Cart · Auth · Orders state (useReducer)
constants/
  Colors.ts             centralized palette
data/
  products.ts           8 mock products with Unsplash images
```

## State Actions

| Action | Effect |
|---|---|
| `ADD_TO_CART` | add product or increment quantity |
| `REMOVE_FROM_CART` | remove item by id |
| `UPDATE_QTY` | set qty; removes item if qty ≤ 0 |
| `CLEAR_CART` | empty the cart |
| `PLACE_ORDER` | snapshot cart → orders[], clear cart |
| `LOGIN` | set `user` (dummy — no API call) |
| `LOGOUT` | clear `user` |

## Key Patterns

- Path alias `@/` resolves to project root (tsconfig `paths`)
- `formatPrice()` uses `Intl.NumberFormat` for Vietnamese VND formatting
- `PromoBanner` auto-scrolls via `setInterval` + `ScrollView.scrollTo`
- Checkout flow redirects to Profile tab when `state.user` is `null`
- All styling uses React Native `StyleSheet` — no external styling library
