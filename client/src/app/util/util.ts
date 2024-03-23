import { Cart, CartItems, CartParams } from "../model/Cart";
import { DefaultAttribute, Product } from "../model/Product";

export function getCookie(key: string) {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

export function CartToCartParams(item: CartItems) {
  let product: Product = {
    id: item.productId,

    name: item.name,
    prices: item.prices,
    category: item.category,
    description: item.description,
    gallery: item.gallery,
    attributes: item.attributes,
    inStock: item.inStock,
    brand: item.brand,
  };

  let cartParams: CartParams = {
    product: product,
    selectedColor: item.selectedColor,
    selectedCapacity: item.selectedCapacity,
    selectedSize: item.selectedSize,
  };

  return cartParams;
}

export function getSubtotal(cart: Cart | null, currency: number) {
  return (
    cart?.items.reduce(
      (sum, item) => sum + item.quantity * item.prices[currency].amount,
      0
    ) ?? 0
  );
}

export function getQuantity(cart: Cart | null) {
  return cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
}

export function calculateTax(subtotal: number) {
  return (21 / 100) * subtotal;
}

export function removeTags(str: string) {
  if (str === null || str === "") return false;
  else str = str.toString();

  // Regular expression to identify HTML tags in
  // the input string. Replacing the identified
  // HTML tag with a null string.
  return str.replace(/(<([^>]+)>)/gi, "");
}

export function getAttribute(
  productData: Product,
  size?: string,
  color?: string,
  capacity?: string
) {
  let defaultAttr = [];

  for (let x in productData.attributes) {
    const name = productData.attributes[x].name;

    if (name === "Size") {
      defaultAttr.push(
        size === "" ? productData.attributes[x].items[1].value! : size
      );
    } else if (name === "Color") {
      defaultAttr.push(
        color === "" ? productData.attributes[x].items[1].value! : color
      );
    } else if (name === "Capacity") {
      defaultAttr.push(
        capacity === "" ? productData.attributes[x].items[1].value! : capacity
      );
    } else {
      defaultAttr.push(productData.attributes[x].items[0].value!);
    }
  }

  return defaultAttr;
}

export function getProductAttribute(
  productData: Product,
  size?: string,
  color?: string,
  capacity?: string
) {
  let defaultSize = "";
  let defaultColor = "";
  let defaultCapacity = "";

  for (let x in productData.attributes) {
    let name = productData.attributes[x].name;

    if (name === "Size") {
      defaultSize = productData.attributes[x].items[1].value!;
    } else if (name === "Color") {
      defaultColor = productData.attributes[x].items[1].value!;
    } else if (name === "Capacity") {
      defaultCapacity = productData.attributes[x].items[1].value!;
    }
  }

  const theColor = color === "" || color === undefined ? defaultColor : color;
  const theCapacity =
    capacity === "" || capacity === undefined ? defaultCapacity : capacity;
  const theSize = size === "" || size === undefined ? defaultSize : size;

  let defaultAttr: DefaultAttribute = {
    defaultColor: theColor!,
    defaultCapacity: theCapacity!,
    defaultSize: theSize!,
  };

  return defaultAttr;
}

export function getCartAttr(cartItem: CartItems) {
  let cartAttr = [];
  for (let x in cartItem.attributes) {
    const name = cartItem.attributes[x].name;

    if (name === "Size") {
      cartAttr.push(cartItem.selectedSize);
    } else if (name === "Color") {
      cartAttr.push(cartItem.selectedColor);
    } else if (name === "Capacity") {
      cartAttr.push(cartItem.selectedCapacity);
    } else {
      cartAttr.push(cartItem.attributes[x].items[0].value!);
    }
  }

  return cartAttr;
}

export function productExistInCart(
  cart: Cart | null,
  productId: string,
  capacity: string,
  color: string,
  size: string
) {
  let productInCart = -1;

  if (cart !== null) {
    productInCart = cart.items.findIndex(
      (x) =>
        x.productId === productId &&
        x.selectedCapacity === capacity &&
        x.selectedColor === color &&
        x.selectedSize === size
    );
    return productInCart;
  }

  return productInCart;
}

export function SlideShow(
  galleryLength: number,
  slideNum: number,
  index: number,
  slide: number[]
) {
  if (slide[index] !== undefined) {
    //   let a = slide.slice(); //creates the clone of the state

    let currentSLide = slide[index];

    const slideIndex = currentSLide + slideNum;

    if (slideIndex > galleryLength - 1) {
      slide[index] = 0;
    } else if (slideIndex < 0) {
      slide[index] = galleryLength - 1;
    } else {
      slide[index] = slideIndex;
    }

    // slide[index] = indexSet;

    return slide;
  } else {
    console.log("error on changing slide");
    return [];
  }
}

export const getCurrency = () => {
  const currstr = getCookie("currency");

  const currencyNum =
    currstr !== undefined && currstr !== "" ? parseInt(currstr) : 0;

  return currencyNum;
};

export const getCurrencySymbol = (cart: Cart | null, currency: number) => {
  let symbol = "";
  let label = "";

  if (cart !== null && cart?.items.length > 0) {
    symbol = cart?.items[0].prices[currency].currency.symbol;

    label = cart?.items[0].prices[currency].currency.label;
  }

  return { symbol, label };
};
