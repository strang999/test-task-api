import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";

class ProductListScreen extends Component {
  state = {
    products: [],
    value: "",
    results: null,
    loading: false,
    categoryId: null,
  };
  componentDidMount() {
    this.setState({ categoryId: this.props.match.params.id });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.categoryId !== this.props.match.params.id) {
      Axios.get(
        `https://6788c3e3d2a8.ngrok.io/v1/market/product_list?category=${this.props.match.params.id}&limit=100`
      )
        .then((res) => {
          this.setState({ loading: false, products: [...res.data.results] });
        })
        .catch((err) => {
          this.setState({ loading: false, error: true });
        });
    }
  }

  search = async (val) => {
    this.setState({ loading: true });
    const res = await Axios(
      `https://6788c3e3d2a8.ngrok.io/v1/market/product_list?category=${this.props.match.params.id}&searchkey=${val}&limit=100`
    );
    const results = await res.data.results;
    const resultsLow = results.map((item) => item.toLowerCase());
    console.log(resultsLow);
    this.setState({ results, loading: false });
  };

  onChangeHandler = async (e) => {
    let capitalize = (str, lower = false) =>
      (lower ? str.toLowerCase() : str).replace(
        /(?:^|\s|["'([{])+\S/g,
        (match) => match.toUpperCase()
      );
    this.search(capitalize(e.target.value) || e.target.value);
    this.setState({ value: e.target.value });
  };

  get renderProducts() {
    let products = <h3>Ничего не найдено...</h3>;
    products = !this.state.results ? this.state.products : this.state.results;
    let rendered = products.map((product) => (
      <li key={product.id}>
        <div className="product">
          <Link to={"/category/" + product.id}>
            <img className="product__image" src={product.image} alt="product" />
          </Link>
          <div className="product__name">
            <Link to={"/product/" + product.id}>{product.name}</Link>
          </div>
          <div className="product__price"> Цена: {product.price} грн.</div>
        </div>
      </li>
    ));

    return rendered;
  }

  render() {
    return (
      <>
        <div className="subheader">
          <div className="subheader__back-to-result">
            <Link to="/">Вернуться к категориям</Link>
          </div>
          <div className="subheader__search">
            <input
              value={this.state.value}
              onChange={(e) => this.onChangeHandler(e)}
              placeholder="Что желаете?"
            />
          </div>
        </div>
        <ul className="products">{this.renderProducts}</ul>
      </>
    );
  }
}

export default withRouter(ProductListScreen);
