import { QueryResult } from "@apollo/client";
import { Query } from "@apollo/react-components";
import { ChangeEvent, Component } from "react";
import { withRouter } from "react-router-dom";
import { GET_PRODUCT } from "../../../app/api/queries";
import "./productDetails.scss";
import { Product } from "../../../app/model/Product";

import {
  getAttribute,
  getCurrency,
  getProductAttribute,
  productExistInCart,
} from "../../../app/util/util";
import parse from "html-react-parser";
import ProductAttributeComponent from "./productAttributeComponent";
import { coreAttr } from "../../../app/api/data";
import CartControls from "../../Cart/cartControls";
import ImageSwitcher from "./ImageSwitcher";
import { DetailsProps, ProductState } from "../productState";


class ProductDetails extends Component<DetailsProps, ProductState> {
  constructor(props: any) {
    super(props);

    //verImportant

    this.handleAttributeChange = this.handleAttributeChange.bind(this);
  }

  state: ProductState = {
    id: "",
    currency: 0,
    color: "",
    size: "",
    capacity: "",
    imageIndex: 0,
  };

  componentDidMount() {
    const id = this.props.match.params;

    this.setState(id);
  }

  handleAttributeChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    if (Object.keys(this.state).includes(name)) {
      this.setState({ [name]: value } as unknown as Pick<
        ProductState,
        keyof ProductState
      >);
    }
  }

  render() {
    const { id, color, size, capacity, imageIndex } = this.state;

    const { addCart, cart, removeFromCart } = this.props;
    const currency = getCurrency();

    if (id !== "") {
      return (
        <>
          <Query query={GET_PRODUCT} variables={{ id: id }}>
            {({ loading, error, data }: QueryResult) => {
              if (error) {
                console.log(error);
                return <h1>Error...</h1>;
              }
              if (loading || !data) return <h1>Loading...</h1>;

              const productData = data.product as Product;

              const productAttr = getProductAttribute(
                productData,
                size,
                color,
                capacity
              );

              const { defaultColor, defaultCapacity, defaultSize } =
                productAttr;

              const productInCart = productExistInCart(
                cart,
                productData.id,
                defaultCapacity,
                defaultColor,
                defaultSize
              );

              const prodAtr = getAttribute(productData, size, color, capacity);

              return (
                <>
                  <div className="productDetails">
                    <div className="productImages">
                    <div className="miniImages">
                      {productData.gallery.map((value, index) => (
                        <ImageSwitcher
                          key={index}
                          index={index}
                          value={value}
                          imageIndex={imageIndex}
                          onClick={() => this.setState({ imageIndex: index })}
                        />
                      ))}
                    </div>
                    <div className="mainImage">
                      <img
                        alt="product-main"
                        src={productData.gallery[imageIndex]}
                      />
                    </div>
                    </div>
                    
                    <div className="productAttributes">
                      <h1>{productData.brand}</h1>
                      <p className="productName">{productData.name}</p>

                      {productData.attributes.map((value, index) => {
                        return (
                          <ProductAttributeComponent
                            key={index}
                            //productData={productData}
                            attribute={prodAtr[index]!}
                            handleAttributeChange={this.handleAttributeChange}
                            input={coreAttr.includes(value.name) ? true : false}
                            // name={name}
                            attributeX={value}
                          />
                        );
                      })}

                      <div className="productPriceBox">
                        <h4 className="cartQTitle">PRICE:</h4>

                        <span>
                          {productData.prices[currency].currency.symbol}

                          {productData.prices[0].amount}
                        </span>
                      </div>

                      {productData.inStock ? (
                        productInCart < 0 ? (
                          <div className="AddCartButton">
                            <button
                              type="submit"
                              onClick={() => {
                                addCart({
                                  product: productData,
                                  selectedSize: defaultSize,
                                  selectedColor: defaultColor,
                                  selectedCapacity: defaultCapacity,
                                });
                              }}
                            >
                              Add to Cart
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="cartQ">
                              <h4 className="cartQTitle">QUANTITY </h4>
                              <CartControls
                                item={cart!.items[productInCart]}
                                addCart={addCart}
                                removeFromCart={removeFromCart}
                              />
                            </div>
                          </>
                        )
                      ) : (
                        <div className="cartQ">
                          <h4 className="cartQTitle">QUANTITY </h4>

                          <p className="outOfStock">OUT OF STOCK </p>
                        </div>
                      )}

                      <div className="productDescription">
                        {parse(productData.description)}
                      </div>
                    </div>
                  </div>
                </>
              );
            }}
          </Query>
        </>
      );
    }

    return (
      <>
        <h1>No Product Found</h1>
      </>
    );
  }
}

export default withRouter(ProductDetails);
