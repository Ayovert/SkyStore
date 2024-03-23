import { CartProps } from "../../../features/Cart/cartState";
import { Category } from "../../model/Product";

export type CurrencyProps = {
    setCurrency: () => void;
    currencyActive: number;
  };
  
  export type CurrencyState = {
    currencyNum: number;
  };

  export interface HeaderProps extends CartProps {
    setCurrency: () => void;
    categories: Category[];
  }