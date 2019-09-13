import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/header/Header';
import Category from './components/category/Category';
import Product from './components/product/Product';
import Cart from './components/cart/Cart';
import axios from "axios/index";
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';

class App extends Component {
  state = {
      currency: '$',
      products: [],
      orderedProducts: [],
      totalCount: 0,
      totalPrice: 0
  };

  componentDidMount() {
      axios.get('http://localhost:3000/products.json')
          .then(response => {
              let products = response.data.map((product, index) => Object.defineProperty(product, 'id', {
                  enumerable: true,
                  value: index
              }));
              this.setState({
                  products: products
              });
          })
          .catch(error => {
              console.log('error', error);
          })
  }

  render() {
    const { currency, orderedProducts, totalCount, totalPrice, products } = this.state;
    const addProductHandler = (e, id, productCount=1) => {
        e.preventDefault();
        const { orderedProducts, products, totalCount, totalPrice } = this.state;
        const updatedOrderedProducts = [...orderedProducts];
        const orderedProduct = {product: products[id], count: productCount};
        const isUniqueProduct = updatedOrderedProducts.every(updatedOrderedProduct => updatedOrderedProduct.product.id !== orderedProduct.product.id);
        const updatedCount = totalCount + productCount;
        const updatedTotalPrice = totalPrice + orderedProduct.count * orderedProduct.product.price;
        if (!updatedOrderedProducts.length || isUniqueProduct) {
            updatedOrderedProducts.push(orderedProduct);
        }
        if (!isUniqueProduct) {
            updatedOrderedProducts
                .map(updatedOrderedProduct => updatedOrderedProduct.product.id === id ? updatedOrderedProduct.count += productCount : null);

        }
        this.setState({
            orderedProducts: updatedOrderedProducts,
            totalCount: updatedCount,
            totalPrice: updatedTotalPrice
        });
    };
    const removeProductHandler = (id) => {
        const { orderedProducts, totalCount, totalPrice } = this.state;
        let updatedOrderedProducts = [...orderedProducts];
        const removedProduct = updatedOrderedProducts.find(orderedProduct => orderedProduct.product.id === id);
        updatedOrderedProducts = updatedOrderedProducts.filter(updatedOrderedProduct => updatedOrderedProduct.product.id  !== removedProduct.product.id);
        const updatedCount = totalCount - removedProduct.count;
        const updatedTotalPrice = totalPrice - removedProduct.count * removedProduct.product.price;
        this.setState({
            orderedProducts: updatedOrderedProducts,
            totalCount: updatedCount,
            totalPrice: updatedTotalPrice
        });
    };
    return (
      <div className="App">
        <Header currency={currency} orderedProducts={orderedProducts} totalCount={totalCount} totalPrice={totalPrice} productRemoved={removeProductHandler} />
        <Route exact path="/" component={() => <Category currency={currency} productAdded={addProductHandler} products={products} />} />
        <Route path="/cart" component={() => <Cart orderedProducts={orderedProducts} currency={currency} totalPrice={totalPrice} totalCount={totalCount} productAdded={addProductHandler} productRemoved={removeProductHandler} />}/>
        <Route path="/product/:id" component={(props) => <Product {...props} products={products} productAdded={addProductHandler} currency={currency} />}/>
      </div>
    );
  }
}

export default App;



