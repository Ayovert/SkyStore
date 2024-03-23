import { PureComponent, ReactNode } from "react";
import { Link } from "react-router-dom";
import "./cartPage.scss";
import {
  calculateTax,
  getQuantity,
  getSubtotal,
  getCartAttr,
} from "../../app/util/util";

import CartControls from "./cartControls";
import CartImageSwitcher from "./cartImageSwitcher";
import ProductAttributeComponent from "../product/productDetails/productAttributeComponent";
import { CartProps } from "./cartState";

class CartPage extends PureComponent<CartProps> {
  render(): ReactNode {
    const { cart = null, currency = 0, addCart, removeFromCart } = this.props;
    const subtotal = getSubtotal(cart, currency);
    const tax = calculateTax(subtotal);
    const quantity = getQuantity(cart);

    return (
      <>
        <h1>CART</h1>
        <div className="cartPage">
          {cart !== null &&
            cart.items.length > 0 &&
            cart.items.map((item, index) => {
              //    const { sizeAttr, capacityAttr, colorAttr } = attrExist;
              const cartAtr = getCartAttr(item);

              return (
                <div key={index}>
                  <div className="cartItems">
                    <div className="productAttributes">
                      <p className="productBrand">{item.brand}</p>
                      <p className="productName">{item.name}</p>

                      {/*price*/}
                      <span className="productPrice">
                        {item.prices[currency].currency.symbol}
                        <span>{item.prices[currency].amount}</span>(
                        {item.prices[currency].currency.label})
                      </span>

                      {/**price*/}

                      {/**Size */}

                      {item.attributes.map((value, index) => {
                        console.log(value);
                        return (
                          <ProductAttributeComponent
                            key={index}
                            //productData={productData}
                            attribute={cartAtr[index]!}
                            input={false}
                            // name={name}
                            attributeX={value}
                          />
                        );
                      })}
                    </div>

                    <CartControls
                      item={item}
                      addCart={addCart}
                      removeFromCart={removeFromCart}
                    />

                    <CartImageSwitcher
                      gallery={item.gallery}
                      index={index}
                      cartLength={cart.items.length}
                    />
                  </div>

                  <hr />
                </div>
              );
            })}

          {cart !== null && cart.items.length > 0 && (
            <>
              <div className="cartSummary">
                <div className="cartSummaryTitle">
                  <span>Tax (21%): </span>
                  <span>Quantity: </span>
                  <span>Total: </span>
                </div>
                <div className="cartSummaryData">
                  <span>
                    {cart?.items[0].prices[currency].currency.symbol}{" "}
                    {tax.toFixed(2)}
                  </span>
                  <span>{quantity}</span>
                  <span>
                    {cart?.items[0].prices[currency].currency.symbol}{" "}
                    {subtotal.toFixed(2)}{" "}
                  </span>
                </div>
              </div>

              <div className="cartOverlayButton">
                <Link to="" className="viewCart">
                  Checkout
                </Link>
              </div>
            </>
          )}

          {cart === null ||
            (cart.items.length < 1 && (
              <div>
                <h1>Cart Empty</h1>
              </div>
            ))}
        </div>
      </>
    );
  }
}

export default CartPage;
