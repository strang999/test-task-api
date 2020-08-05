import React from "react";
import { Link, withRouter } from "react-router-dom";

const HomeScreen = (props) => {
  return (
    <>
      <h3 className="categories__header">Выберите категорию:</h3>
      <ul className="categories">
        {props.categories.map((product) => (
          <li key={product.id}>
            <div className="categories__item">
              <Link to={"/category/" + product.id}>{product.name}</Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default withRouter(HomeScreen);
