import { ChangeEvent, DOMAttributes } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Cart, CartItems, CartParams } from "../../app/model/Cart";
import { Product, Attribute } from "../../app/model/Product";


export interface ProductProps {
  categoryName: string;
  pageTitle: string;
  addCart: (cartParams: CartParams) => void;
  currency: number;
}

export interface AttributeProps {
    productData?: Product;
    cartItems?: CartItems;
    handleAttributeChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    attribute: string;
    input: boolean;
    alt?: string;
    // name: string;
    attributeX: Attribute;
  }


  export type ProductState = {
    id: string;
    currency: number;
    color: string;
    size: string;
    capacity: string;
    imageIndex: number;
  };
  
 export interface DetailsProps extends RouteComponentProps {
    addCart: (cartParams: CartParams) => void;
    removeFromCart: (cartParams: CartParams) => void;
    cart: Cart | null;
  }

  export type ImageState = {
    imageIndex: number;
  };
  
  export interface ImageSwitcherProps extends DOMAttributes<HTMLImageElement> {
    value: string;
    index: number;
    imageIndex: number;
  }
  