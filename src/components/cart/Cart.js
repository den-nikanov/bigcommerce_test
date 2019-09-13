import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Cart.scss';

class Cart extends Component {
    render() {
        const { orderedProducts, currency, totalPrice, totalCount, productAdded, productRemoved } = this.props;
        const cartData =
            <div className="Cart-data">
                <div className="Cart-table">
                    <div className="Cart-table-row Cart-table-row-title">
                        <div className="Cart-table-cell Cart-table-cell-product">
                            <div className="Cart-table-cell-title">Product</div>
                        </div>
                        <div className="Cart-table-cell Cart-table-cell-quantity">
                            <div className="Cart-table-cell-title">Quantity</div>
                        </div>
                        <div className="Cart-table-cell Cart-table-cell-total">
                            <div className="Cart-table-cell-title">Total</div>
                        </div>
                        <div className="Cart-table-cell Cart-table-cell-action">
                            <div className="Cart-table-cell-title">Action</div>
                        </div>
                    </div>
                    {orderedProducts
                        .map((orderedProduct, index) =>
                            <div className="Cart-table-row" key={index}>
                                <div className="Cart-table-cell Cart-table-cell-product">
                                    <img
                                        className="Cart-product-image"
                                        src={require(`../../assets/images/products/${orderedProduct.product.image}`)} alt={orderedProduct.product.title}
                                    />
                                    <div className="Cart-product-info">
                                        <div className="Cart-product-brand">
                                            {orderedProduct.product.brand}
                                        </div>
                                        <div className="Cart-product-title">
                                            {orderedProduct.product.title}
                                        </div>
                                    </div>
                                </div>
                                <div className="Cart-table-cell Cart-table-cell-quantity">
                                    <div className="Cart-product-add-to-cart">
                                        <div className="Cart-product-count">
                                            {orderedProduct.count}
                                        </div>
                                        <div className="Cart-product-buttons">
                                            <button className="Cart-product-count-change Cart-product-count-change-increase" onClick={(e) => productAdded(e, orderedProduct.product.id, 1)}>
                                                +
                                            </button>
                                            <button className="Cart-product-count-change Cart-product-count-change-decrease" onClick={(e) => orderedProduct.count > 0 ? productAdded(e, orderedProduct.product.id, -1) : productRemoved}>
                                                -
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="Cart-table-cell Cart-table-cell-total">
                                    <div className="Cart-product-price">
                                        {currency}{orderedProduct.product.price.toFixed(2)}
                                    </div>
                                </div>
                                <div className="Cart-table-cell Cart-table-cell-action">
                                    <i className="Cart-icon Cart-icon-remove fa-cancel-thin" onClick={() => productRemoved(orderedProduct.product.id)} />
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="Cart-overview">
                        <div className="Cart-overview-table">
                        <div className="Cart-overview-row">
                        <div className="Cart-overview-title">
                        Cart Overview
                    </div>
                </div>
                <div className="Cart-overview-row">
                        <div className="Cart-overview-title">
                        Subtotal
                        </div>
                    <div className="Cart-overview-sum">
                        {currency}{totalPrice.toFixed(2)}
                    </div>
                    </div>
                    <div className="Cart-overview-row">
                        <div className="Cart-overview-title">
                            Total
                        </div>
                        <div className="Cart-overview-sum-cad">
                            {currency}{totalPrice.toFixed(2)} CAD
                        </div>
                    </div>
                    </div>
                </div>
                <div className="Cart-action-buttons">
                    <Link className="Cart-action-button Cart-action-button-continue" to="/">
                        Continue shopping
                    </Link>
                    <Link className="Cart-action-button Cart-action-button-checkout" to="#">
                        Checkout ({currency}{totalPrice.toFixed(2)})
                    </Link>
                </div>
            </div>;
        const emptyCart = <div className="Cart-empty">Your shopping cart is empty.</div>
        return (
            <div className="Cart">
                <Container>
                    <Row>
                        <Col md="12">
                            <h1 className="Cart-title">Shopping Cart</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <div className="Cart-content">
                                {totalCount ? cartData : emptyCart}

                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Cart;
