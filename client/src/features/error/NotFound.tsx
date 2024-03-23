import { PureComponent, ReactNode } from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

export default class NotFound extends PureComponent {
  render(): ReactNode {
    return (
      <div className="container">
        <h3 className="notFoundMessage">
          Oops, we could not find what you are looking for
        </h3>
        <Link to="/" className="storeLink">
          <button type="button">Go back to the store</button>
        </Link>
      </div>
    );
  }
}
