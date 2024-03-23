import { Component, ReactNode } from "react";
import { ImageState, ImageSwitcherProps } from "../productState";

class ImageSwitcher extends Component<ImageSwitcherProps, ImageState> {
  state: ImageState = {
    imageIndex: 0,
  };
  render(): ReactNode {
    // const { imageIndex } = this.state;

    const { value, index, imageIndex, onClick } = this.props;
    return (
      <img
        className="miniImagesItem"
        alt="product-mini"
        key={index}
        src={value}
        onClick={onClick}
        style={{
          border: `${imageIndex === index ? "3px solid #5ece7b" : ""}`,
        }}
      />
    );
  }
}

export default ImageSwitcher;
