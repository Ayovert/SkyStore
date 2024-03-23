import { Component } from "react";
import "./productAttribute.scss";
import CustomRadioInput from "../../../app/reUse/customRadioInput";
import { coreAttr } from "../../../app/api/data";
import { AttributeProps } from "../productState";


class ProductAttributeComponent extends Component<AttributeProps> {
  render() {
    const {
      //productData,
      //cartItems,
      handleAttributeChange,
      attribute,
      input,
      // name,
      alt,
      attributeX,
    } = this.props;

    /*const attributesData =
      productData && productData.attributes.length > 0
        ? productData.attributes
        : cartItems && cartItems.attributes.length > 0
        ? cartItems.attributes
        : [];*/

    return (
      <>
        <p
          className={`${
            coreAttr.includes(attributeX.name)
              ? "attributeTitle"
              : "attributeTitle2"
          }`}
        >
          {attributeX.name}
        </p>
        <div className={`${`product${attributeX.name}`}${alt ?? ""}List`}>
          {attributeX.items
            .filter((items) => items.value !== "Yes" && items.value !== "No")
            .map(({ value }, index) => {
              const selected = attribute !== "" && value === attribute;

              const altBackground = selected ? "black" : "white";
              const altColor = selected ? "white" : "black";

              const backgroundColor =
                attributeX.type === "swatch" ? value : altBackground;
              return (
                <div
                  className={`${`product${attributeX.name}`}Box`}
                  key={value}
                >
                  <div
                    className={`${`product${attributeX.name}`}`}
                    style={{
                      backgroundColor: `${backgroundColor}`,
                      color: `${altColor}`,
                      border: `${
                        attributeX.name === "Color" &&
                        value === "#FFFFFF" &&
                        "1px solid #b1b1b1"
                      } `,
                    }}
                  >
                    {attributeX.type === "swatch" ? (
                      <span
                        className="check"
                        style={{
                          display: `${selected ? "block" : "none"}`,
                        }}
                      ></span>
                    ) : (
                      <span>{value}</span>
                    )}

                    {input && (
                      <CustomRadioInput
                        checked={selected}
                        onChange={(e) => {
                          handleAttributeChange!(e);
                        }}
                        value={value}
                        id={`${attributeX.name.toLowerCase()}${index}`}
                        name={attributeX.name.toLowerCase()}
                      />
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </>
    );
  }
}

export default ProductAttributeComponent;
