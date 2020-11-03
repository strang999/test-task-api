import React, { Component } from "react";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter, Route, Link } from "react-router-dom";
import ProductListScreen from "./screens/ProductListScreen";
import Axios from "axios";
import ProductDetailsPage from "./screens/ProductDetailsPage";
class App extends Component {
  state = {
    categories: [],
    loading: true,
    error: false,
  };
  componentDidMount() {
    Axios.get("https://6788c3e3d2a8.ngrok.io/v1/generic/category/")
      .then((res) => {
        this.setState({ loading: false, categories: [...res.data.results] });
      })
      .catch((err) => {
        this.setState({ loading: false, error: true });
        console.log(err.message);
      });
  }

  render() {
    let openMenu = () => {
      document.querySelector(".sidebar").classList.add("open");
    };
    const closeMenu = () => {
      document.querySelector(".sidebar").classList.remove("open");
    };
    return (
      <BrowserRouter>
        <div className="grid-container">
          <header className="header">
            <div className="header__brand">
              <button className="header__button" onClick={openMenu}>
                &#9776;
              </button>
              <Link to="/">Гловос</Link>
            </div>
          </header>
          <aside className="sidebar">
            <h3 className="sidebar__header">Категории</h3>
            <button className="sidebar__close-btn" onClick={closeMenu}>
              x
            </button>
            <ul className="sidebar__list">
              {this.state.categories.map((category) => (
                <li className="sidebar__items" key={category.id}>
                  <Link to={"/category/" + category.id}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </aside>
          <main className="main">
            <div className="content">
              <Route
                path="/product/:id"
                render={(props) => (
                  <ProductDetailsPage
                    loading={this.state.loading}
                    error={this.state.error}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/category/:id"
                render={(props) => (
                  <ProductListScreen
                    loading={this.state.loading}
                    error={this.state.error}
                    categories={this.state.categories}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/"
                // exact={true}
                render={(props) => (
                  <HomeScreen
                    categories={this.state.categories}
                    loading={this.state.loading}
                    error={this.state.error}
                    {...props}
                  />
                )}
              />
            </div>
          </main>
          <footer className="footer">
            All rights. reserved. Made by Anton Shumeiko
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
