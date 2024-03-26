import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT } from '../../../app/api/queries';
import './productDetails.scss';
import { getProductAttribute, getCurrency, productExistInCart, getAttribute } from '../../../app/util/util';
import parse from 'html-react-parser';
import ProductAttributeComponent from './productAttributeComponent';
import { coreAttr } from '../../../app/api/data';
import CartControls from '../../Cart/cartControls';
import ImageSwitcher from './ImageSwitcher';
import { DetailsProps, ProductState } from '../productState';

const ProductDetails = ({ match, addCart, cart, removeFromCart }: DetailsProps) => {

  const param = useParams<{ id: string }>();

  const [details, setDetails] = useState<ProductState>({
    id: '',
    currency: 0,
    color: '',
    size: '',
    capacity: '',
    imageIndex: 0,
  });
  

  useEffect(() => {
    setDetails((prevState) => ({ ...prevState, id: param.id }));
  }, [param.id]);

  const handleAttributeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDetails({ ...details, [name]: value });
  };

  const { id, color, size, capacity, imageIndex } = details;
  const currency = getCurrency();



  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables:{ id: id },
  })



  
  if (id !== '') {



    if (error) {
      console.error('Error:', error);
      return <h1>Error...</h1>;
    }

    if (loading || !data) return <h1>Loading...</h1>;

    const productData = data.product;
    const productAttr = getProductAttribute(productData, size, color, capacity);
    const { defaultColor, defaultCapacity, defaultSize } = productAttr;
    const productInCart = productExistInCart(cart, productData.id, defaultCapacity, defaultColor, defaultSize);
    const prodAtr = getAttribute(productData, size, color, capacity);

    return (
      <>
        <div className="productDetails">
          <div className="productImages">
            <div className="miniImages">
              {productData.gallery.map((value: string, index: number) => (
                <ImageSwitcher
                  key={index}
                  index={index}
                  value={value}
                  imageIndex={imageIndex}
                  onClick={() => setDetails({ ...details, imageIndex: index })}
                />
              ))}
            </div>
            <div className="mainImage">
              <img alt="product-main" src={productData.gallery[imageIndex]} />
            </div>
          </div>

          <div className="productAttributes">
            <h1>{productData.brand}</h1>
            <p className="productName">{productData.name}</p>

            {productData.attributes.map((value: any, index: number) => (
              <ProductAttributeComponent
                key={index}
                attribute={prodAtr[index] ?? ""}
                handleAttributeChange={handleAttributeChange}
                input={coreAttr.includes(value.name)}
                attributeX={value}
              />
            ))}

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
                    onClick={() =>
                      addCart({
                        product: productData,
                        selectedSize: defaultSize,
                        selectedColor: defaultColor,
                        selectedCapacity: defaultCapacity,
                      })
                    }
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

            <div className="productDescription">{parse(productData.description)}</div>
          </div>
        </div>
      </>
    );
  }

     
   
  

return (
  <>
    <h1>No Product Found</h1>
  </>
);
};

export default withRouter(ProductDetails);
