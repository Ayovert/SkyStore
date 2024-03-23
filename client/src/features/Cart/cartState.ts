import { Cart, CartItems, CartParams } from "../../app/model/Cart";

export interface CartProps {
  cart?: Cart | null;
  currency?: number;
  addCart: (cartParams: CartParams) => void;
  removeFromCart: (cartParams: CartParams) => void;
}

export interface CartControlProps extends CartProps {
  item: CartItems;
}

export type CartImageSwitcherState = {
  slideArr: number[];
};

export interface CartImageSwitcherProps {
  cartLength: number;
  gallery: string[];
  index: number;
}
