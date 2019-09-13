import React, { Component } from 'react';
import { Link, } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import './CartPopup.scss';

class CartPopup extends Component {
    render() {
        const { orderedProducts, currency, productRemoved, totalPrice, totalCount, isOpened, toggleCartPopupItem } = this.props;
        let orderedProductsList =
            <div className="CartPopup-products">
                {orderedProducts
                    .map((orderedProduct, index) =>
                        <div className="CartPopup-product" key={index}>
                            <div className="CartPopup-product-view">
                                <img className="CartPopup-product-image" src={require(`../../assets/images/products/${orderedProduct.product.image}`)} alt={orderedProduct.product.title} />
                            </div>
                            <div className="CartPopup-product-info">
                                <div className="CartPopup-product-title">
                                    {orderedProduct.product.title}
                                    <span className="CartPopup-product-count">
                                        <i className="CartPopup-product-icon CartPopup-product-icon-multiply fa-cancel" />
                                        {orderedProduct.count}
                                    </span>
                                </div>
                                <div className="CartPopup-product-brand">
                                    {orderedProduct.product.brand}
                                </div>
                                <div className="CartPopup-product-price">
                                    {currency}{orderedProduct.product.price.toFixed(2)}
                                </div>
                            </div>
                            <div className="CartPopup-product-remove">
                                <i className="CartPopup-product-icon CartPopup-product-remove fa-cancel" onClick={() => productRemoved(orderedProduct.product.id)} />
                            </div>
                        </div>
                    )}
            </div>;
        let totalPriceBlock =
            <div className="CartPopup-total-price">
                <div className="CartPopup-total-price-title">Total</div>
                <div className="CartPopup-total-price-amount">{currency}{totalPrice.toFixed(2)}</div>
            </div>;
        let actionButtons =
            <div>
                <div className="CartPopup-buttons">
                    <Link className="CartPopup-button CartPopup-button-view-cart" to="/cart" onClick={toggleCartPopupItem}>
                        View Cart
                    </Link>
                    <Link className="CartPopup-button CartPopup-button-checkout" to="#">
                        Checkout
                    </Link>
                </div>
            </div>;
        let cartWithOrders =
            <div className="CartPopup-cart-with-orders">
                {orderedProductsList}
                {totalPriceBlock}
                {actionButtons}
            </div>;
        let emptyCart = <div className="CartPopup-empty-cart">Your cart is empty.</div>;
        return (
            <div className={`CartPopup ${isOpened ? 'CartPopup-opened' : ''}`}>
                {isOpened ?
                    <OutsideClickHandler onOutsideClick={toggleCartPopupItem}>{totalCount > 0 ? cartWithOrders : emptyCart}</OutsideClickHandler> :
                    null
                }
            </div>
        );
    }
}

export default CartPopup;
