import { Component, ReactNode } from "react";
import { CartToCartParams } from "../../app/util/util";
import { CartControlProps } from "./cartState";


class CartControls extends Component<CartControlProps> {
  render(): ReactNode {
    const { item, addCart, removeFromCart } = this.props;
    return (
      <div className="cartControls">
        <div
          className="cartControlItem"
          onClick={() => {
            addCart(CartToCartParams(item));
          }}
        >
          <span>+</span>
        </div>

        <span className="cartCount">{item.quantity}</span>

        <div
          className="cartControlItem"
          onClick={() => removeFromCart(CartToCartParams(item))}
        >
          <span>-</span>
        </div>
      </div>
    );
  }
}

export default CartControls;
