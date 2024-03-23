import { gql } from "@apollo/client";
import { Currency } from "../model/Product";
import { client } from "./apolloClient";

export const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

export const GET_CATEGORY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      name
      products {
        id
        name
        prices {
          amount
          currency {
            symbol
            label
          }
        }
        category
        description
        gallery
        attributes {
          name
          type

          items {
            displayValue
            value
          }
        }
        inStock
        brand
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query categories {
    categories {
      name
    }
  }
`;

export const GET_CURRENCIES = gql`
  query categories {
    currencies {
      label
      symbol
    }
  }
`;

export const GET_PRODUCT = gql`
  query product($id: String!) {
    product(id: $id) {
      id
      name
      prices {
        amount
        currency {
          symbol
          label
        }
      }
      category
      description
      gallery
      attributes {
        id
        name
        type

        items {
          displayValue
          value
        }
      }
      inStock
      brand
    }
  }
`;

export const getCurrencies = () => {
  return client.query({
    query: gql`
      query getCurrencies {
        currencies {
          symbol
          label
        }
      }
    `
  }).then((i => i.data.currencies as Currency[]))
}