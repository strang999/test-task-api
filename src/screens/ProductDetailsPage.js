import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

class ProductDetailsPage extends Component {
  state = {
    productDetails: [],
    loading: false,
    error: false,
    totalPrice: 0,
    price: 0,
  };
  componentDidMount() {
    Axios.get(
      `http://6788c3e3d2a8.ngrok.io/v1/market/product_list?limit=1&offset=${
        this.props.match.params.id - 1
      }`
    )
      .then((res) => {
        this.setState({
          loading: false,
          productDetails: [...res.data.results],
          price: res.data.results[0].price,
        });
      })
      .catch((err) => {
        this.setState({ loading: false, error: true });
      });
  }

  changeHandler = (e) => {
    this.setState({ totalPrice: this.state.price * e.target.value });
  };
  render() {
    return (
      <div className="subheader">
        <div className="subheader__back-to-result">
          <Link to="/">Вернуться к категориям</Link>
        </div>
        {this.state.productDetails.map((product) => (
          <div key={product.id} className="details">
            <div className="details__image">
              <img src={product.image} alt="product" />
            </div>

            <div className="details__info">
              <ul>
                <li>
                  <h4>{product.name}</h4>
                </li>
                <li>
                  <b> Цена за порцию: {product.price} грн.</b>
                </li>
                <li>
                  Состав:
                  <div>{product.consist}</div>
                </li>
              </ul>
            </div>
            <div className="details__action">
              <ul>
                <li>Сумма {this.state.totalPrice}</li>
                <li>Статус: {product.status}</li>
                <li>
                  К-во:
                  <select
                    onChange={this.changeHandler}
                    value={this.state.value}
                    name="qty"
                    id="qty"
                  >
                    <option value="1">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </li>
                <li>
                  <button className="button primary">Добавить в корзину</button>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default ProductDetailsPage;
