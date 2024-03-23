import { Attribute, Price, Product } from "../../app/model/Product";

export interface Cart {
  id: number;
  items: CartItems[];
}

export interface CartItems {
  id: string;
  name: string;
  prices: Price[];
  category: string;
  description: string;
  gallery: string[];
  attributes: Attribute[];
  inStock: boolean;
  brand: string;
  quantity: number; // exce
  productId: string; //exce
  selectedColor?: string;
  selectedSize?: string;
  selectedCapacity?: string;
}

export interface CartParams {
  quantity?: number;
  product: Product;
  selectedColor?: string;
  selectedSize?: string;
  selectedCapacity?: string;
}
