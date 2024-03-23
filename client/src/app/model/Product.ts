export enum AttributeType {
  text = "text",
  swatch = "swatch",
}
export interface Currency {
  label: string;
  symbol: string;
}

export interface Price {
  currency: Currency;
  amount: number;
}

export interface Item {
  displayValue: string;
  value?: string;
  id?: string;
}

export interface Attribute {
  id?: string;
  name: string;
  type: AttributeType;
  items: Item[];
}

export interface Product {
  id: string;
  name: string;
  prices: Price[];
  category: string;
  description: string;
  gallery: string[];
  attributes: Attribute[];
  inStock: boolean;
  brand: string;
}

export interface Category {
  name: string;
  products?: Product[];
}

export interface Categories {
  category: Category[];
}

export interface DefaultAttribute {
  defaultSize: string;
  defaultColor: string;
  defaultCapacity: string;
}
