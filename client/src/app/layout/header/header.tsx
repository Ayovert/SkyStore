import { NavLink } from "react-router-dom";
import CartDropdown from "./cartDropdown";
import CurrencyDropdown from "./currencyDropdown";
import "./header.scss";
import { ReactComponent as CloudIcon } from "../../../images/clouds3.svg";
import { PureComponent, ReactNode } from "react";
import { HeaderProps } from "./headerState";

class HeaderComponent extends PureComponent<HeaderProps> {
  render(): ReactNode {
    const {
      cart,
      setCurrency,
      addCart,
      removeFromCart,
      currency = 0,
      categories,
    } = this.props;

    return (
      <header className="navHeader" id="section-1">
        <div className="subHeader">
          <nav>
            <ul className="navList">
              {categories.map((values, index) => {
                return (
                  <li key={index}>
                    <NavLink to={`/${values.name}`} className="navItem">
                      {values.name.toUpperCase()}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="homeHeader">
            <NavLink to="/">
              <CloudIcon className="cloudLogo" width={45} height={45} />
            </NavLink>
          </div>
          <div className="rightNav">
            <CurrencyDropdown setCurrency={setCurrency} currencyActive={currency} />

            <CartDropdown
              cart={cart}
              addCart={addCart}
              removeFromCart={removeFromCart}
              currency={currency}
            />
          </div>
        </div>
      </header>
    );
  }
}
export default HeaderComponent;
