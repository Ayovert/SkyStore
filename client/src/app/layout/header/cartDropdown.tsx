import { Link } from "react-router-dom";
import { PureComponent, ReactNode } from "react";
import { ReactComponent as CartIcon } from "../../../images/cart.svg";
import {
  getQuantity,
  getSubtotal,
  getCurrencySymbol,
  getCartAttr,
} from "../../util/util";
import CartControls from "../../../features/Cart/cartControls";
import ProductAttributeComponent from "../../../features/product/productDetails/productAttributeComponent";
import { CartProps } from "../../../features/Cart/cartState";
import "./cartDropdown.scss";

class CartOverlay extends PureComponent<CartProps> {
  render(): ReactNode {
    const { cart = null, addCart, removeFromCart, currency = 0 } = this.props;

    const subtotal = getSubtotal(cart, currency);

    const cartQuantity = getQuantity(cart);

    const { label, symbol } = getCurrencySymbol(cart, currency);

    return (
      <>
        <div className="cartOverlay">
          <span className="cartButton">
            {cartQuantity > 0 && (
              <span className="cartCount">
                <span>{cartQuantity}</span>{" "}
              </span>
            )}
            <CartIcon height={25} width={25} />
          </span>

          <div
            className="cartOverlayContent"
            // style={{
            //overflow:`${cartQuantity > 2 ? 'scroll' : ''} `
            //}}
          >
            <p className="cartTitle">
              <span>My Bag .</span> {cartQuantity} items
            </p>

            {/**cart items */}
            {cart !== null &&
              cart.items.length > 0 &&
              cart.items.map((item, index) => {
                const cartAtr = getCartAttr(item);

                return (
                  <div key={index} className="cartItems">
                    <div className="productAttributes">
                      <p className="productBrand">{item.brand}</p>
                      <p className="productName">{item.name}</p>

                      {/*price */}

                      <span className="productPrice">
                        {item.prices[currency].currency.symbol}
                        <span>{item.prices[currency].amount}</span>
                        {/* ({item.prices[currency].currency.label})*/}
                      </span>

                      {/**price*/}

                      {item.attributes.map((value, index) => {
                        return (
                          <ProductAttributeComponent
                            key={index}
                            //productData={productData}
                            attribute={cartAtr[index]!}
                            input={false}
                            alt="X"
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

                    <div className="cartImageDiv">
                      <div
                        className="cartImage"
                        style={{ backgroundImage: `url(${item.gallery[0]})` }}
                      ></div>
                    </div>
                  </div>
                );
              })}

            {/**cart items */}

            {cart !== null && cart.items.length > 0 && (
              <>
                <div className="cartSummary">
                  <span className="cartSummaryTitle">Total</span>
                  <span className="cartSummaryData">
                    <span>{symbol} </span>
                    <span className="cartSubtotal">{subtotal.toFixed(2)}</span>

                    <span>({label})</span>
                  </span>
                </div>

                <div className="cartOverlayButton">
                  <Link to="/cart" className="viewCart">
                    View Cart
                  </Link>

                  <Link to="" className="checkoutCart">
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
        </div>
        <div className="backdrop"></div>
      </>
    );
  }
}

export default CartOverlay;
