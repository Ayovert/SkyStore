import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { connect, ConnectedProps } from "react-redux";
import { AddtoCart, RemoveFromCart, ClearCart } from "../../features/Cart/cartSlice";
import { CartParams } from "../model/Cart";
import { RootState } from "../redux/store";

interface DispatchProps {
    addToCart: (cartParams: CartParams) => void;
    removeFromCart: (cartParams: CartParams) => void;
    clearCart: (cartParams: CartParams) => void;
  }
  
  export const mapDispatchToProps = (
    dispatch: ThunkDispatch<RootState, void, AnyAction>
  ): DispatchProps => ({
    addToCart: (cartParams: CartParams) => {
      dispatch(AddtoCart(cartParams));
    },
    removeFromCart: (cartParams: CartParams) => {
      dispatch(RemoveFromCart(cartParams));
    },
    clearCart: (cartParams: CartParams) => {
      dispatch(ClearCart(cartParams));
    },
  });
  
  export const mapStateToProps = (state: RootState) => {
    return {
      cart: state.cart.cart,
    };
  };
  
  export const connector = connect(mapStateToProps, mapDispatchToProps);
  
  export type PropRedux = ConnectedProps<typeof connector>;
  
  export type AppState = {
    currency: number;
  };