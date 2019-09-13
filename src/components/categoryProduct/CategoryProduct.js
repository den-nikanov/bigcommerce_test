import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CategoryProduct.scss';

class CategoryProduct extends Component {
    render() {
        const { product, productAdded, id, currency } = this.props;
        return (
            <div className="CategoryProduct">
                <div className="CategoryProduct-info">
                    <img className="CategoryProduct-image" src={require(`../../assets/images/products/${product.image}`)} alt={product.title} />
                    <div className="CategoryProduct-buttons">
                        <Link className="CategoryProduct-button CategoryProduct-button-view-details" to={`product/${product.id}`}>
                            View Details
                        </Link>
                        <Link className="CategoryProduct-button CategoryProduct-button-add-to-cart" to='/' onClick={(e) => productAdded(e, id)}>
                            Add to cart
                        </Link>
                    </div>
                </div>
                <div className="CategoryProduct-brand">{product.brand}</div>
                <div className="CategoryProduct-title">{product.title}</div>
                <div className="CategoryProduct-price">{currency}{product.price.toFixed(2)}</div>
            </div>
        );
    }
}

export default CategoryProduct;
