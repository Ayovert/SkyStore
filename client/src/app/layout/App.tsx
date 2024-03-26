import "./App.scss";
import { Route, Switch } from "react-router-dom";
import ProductDetails from "../../features/product/productDetails/productDetails";
import NotFound from "../../features/error/NotFound";
import CartPage from "../../features/Cart/cartPage";
import ProductListPage from "../../features/product/productsComponent";
import { connect} from "react-redux";
import { PureComponent } from "react";
import HeaderComponent from "./header/header";
import { getCurrency } from "../util/util";
import { Query} from '@apollo/client/react/components';


import { GET_CATEGORIES } from "../api/queries";
import { Category } from "../model/Product";
import { PropRedux, AppState, mapDispatchToProps, mapStateToProps } from "./AppState";




class App extends PureComponent<PropRedux, AppState> {
  state: AppState = {
    currency: getCurrency(),
  };

  setCurrency = () => {
    const currency = getCurrency();

    this.setState({ currency: currency });
  };

  componentDidMount() {
    this.setCurrency();
  }
  render() {
    const { currency } = this.state;
    const { addToCart, cart, removeFromCart} = this.props as any;

    //const result = useQuery(GET_CATEGORIES)


    return (
      <>
        <Query query={GET_CATEGORIES}>
          {({ loading, errors, data } : any) => {
            if (errors && errors?.length > 0) {
                 errors.forEach((error:any) => {
                  console.log(error.message);
              });
             
              return <h1>Error...</h1>;
            }
            if (loading || !data) return <h1>Loading...</h1>;

            const categoryData = data.categories as Category[];

            return (
              <div className="App">
                <HeaderComponent
                  cart={cart}
                  categories={categoryData}
                  setCurrency={this.setCurrency}
                  addCart={addToCart}
                  removeFromCart={removeFromCart}
                  currency={currency}
                />
                <div className="AppBody">
                  <Switch>
                    <Route
                      exact
                      path="/"
                      render={() => (
                        <ProductListPage
                          categoryName={categoryData[0].name}
                          pageTitle={categoryData[0].name.toUpperCase()}
                          addCart={addToCart}
                          currency={currency}
                        />
                      )}
                    />

                    {categoryData.map((values, index) => (
                      <Route key={index} path={`/${values.name}`}>
                        <Route exact path={`/${values.name}`}>
                          <ProductListPage
                            categoryName={values.name}
                            pageTitle={values.name.toUpperCase()}
                            addCart={addToCart}
                            currency={currency}
                          />
                        </Route>

                        <Route
                          path={`/${values.name}/:id`}
                          render={() => (
                            <ProductDetails
                              addCart={addToCart}
                              removeFromCart={removeFromCart}
                              cart={cart}
                            />
                          )}
                        />
                      </Route>
                    ))}

                    <Route
                      path="/cart"
                      render={() => (
                        <CartPage
                          currency={currency}
                          cart={cart}
                          addCart={addToCart}
                          removeFromCart={removeFromCart}
                        />
                      )}
                    />

                    <Route path="*" render={() => <NotFound />} />
                  </Switch>
                </div>
              </div>
            );
          }}
        </Query>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

/**
 * 
 * 
 *   Line 38:38:  React Hook "useQuery" cannot be called in a class component. React Hooks must be called in a React function component or a custom React Hook function  react-hooks/rules-of-hooks

 */
