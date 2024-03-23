import "./products.scss";

import { GET_CATEGORY } from "../../app/api/queries";
import { QueryResult } from "@apollo/client";
import { Product } from "../../app/model/Product";
import { Link } from "react-router-dom";
import { ReactComponent as CartIcon } from "../../images/cart.svg";
import { Component } from "react";
import { Query } from "@apollo/react-components";
import { getProductAttribute } from "../../app/util/util";
import { ProductProps } from "./productState";



class ProductListPage extends Component<ProductProps> {
  render() {
    const { categoryName, pageTitle, addCart, currency } = this.props;

    return (
      <>
        <Query
          query={GET_CATEGORY}
          variables={{ input: { title: categoryName } }}
        >
          {({ loading, error, data }: QueryResult) => {
            if (error) {
              console.log(error);
              return <h1>Error...</h1>;
            }
            if (loading || !data) return <h1>Loading...</h1>;

            return (
              <>
                <h1>{pageTitle}</h1>

                <div className="product">
                  {data?.category.products.map((product: Product) => {
                    const defaultAttr = getProductAttribute(product);
                    const { defaultCapacity, defaultColor, defaultSize } =
                      defaultAttr;

                    return (
                      <div
                        key={product.id}
                        className="productCard"
                        style={{
                          opacity: `${product.inStock ? 1 : 0.5}`,
                        }}
                      >
                        <div className="productCardAction">
                          <Link to={`${pageTitle.toLowerCase()}/${product.id}`}>
                            <img alt="product" src={product.gallery[0]} />

                            {!product.inStock && (
                              <div className="outOfStock">
                                <h2>OUT OF STOCK</h2>
                              </div>
                            )}
                          </Link>
                        </div>

                        {product.inStock && (
                          <span
                            className="cartButton"
                            onClick={() => {
                              addCart({
                                product: product,
                                selectedColor: defaultColor,
                                selectedCapacity: defaultCapacity,
                                selectedSize: defaultSize,
                              });
                            }}
                          >
                            <CartIcon className="cartIcon" />
                          </span>
                        )}

                        <p className="productName">
                          {product.brand} {product.name}
                        </p>

                        <span className="productPrice">
                          {product.prices[currency].currency.symbol}

                          {product.prices[currency].amount}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </>
            );
          }}
        </Query>
      </>
    );
  }
}

export default ProductListPage;
