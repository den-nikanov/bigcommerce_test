import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import './Product.scss';

class Product extends Component {
    state = {
        id: +this.props.match.params.id,
        count: 1
    };

    findProduct(products) {
        const { id } = this.state;
        return products.find(product => product.id === id);
    }

    componentWillMount() {
        const { products } = this.props;
        if (products.length) {
            let product = this.findProduct(this.props.products);
            this.setState(
                {product: product}
            );
        }
    }

    render() {
        let { product, id, count } = this.state;
        const { productAdded, currency } = this.props;
        const increaseProductCount = () => {
            const { count } = this.state;
            return this.setState({
                count: count + 1
            })
        };
        const decreaseProductCount = () => {
            const { count } = this.state;
            return count > 1 ? this.setState({count: count - 1}) : null;
        };
        return (
            product ?
                <div className="Product">
                    <Container className="Product-container">
                        <Row>
                            <Col md="12">
                                <Breadcrumbs mainPage="Home" brand={product.brand} title={product.title} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="7" className="Product-left">
                                <img className="Product-image" src={require(`../../assets/images/products/${product.image}`)} alt={product.title} />
                            </Col>
                            <Col md="5" className="Product-right">
                                <div className="Product-info">
                                    <div className="Product-brand">{product.brand}</div>
                                    <h1 className="Product-title">{product.title}</h1>
                                    <div className="Product-price">{currency}{product.price.toFixed(2)}</div>
                                    <div className="Product-description">{product.description}</div>
                                </div>
                                <div className="Product-add-to-cart">
                                    <div className="Product-count">
                                        {count}
                                    </div>
                                    <div className="Product-count-buttons">
                                        <button className="Product-count-change Product-count-change-increase" onClick={increaseProductCount}>
                                            +
                                        </button>
                                        <button className="Product-count-change Product-count-change-decrease" onClick={decreaseProductCount}>
                                            -
                                        </button>
                                    </div>
                                    <Link className="Product-button" to='/' onClick={(e) => productAdded(e, id, count)}>
                                        Add to cart
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                  </div> :
                <div>Product is not found</div>
        );
    }
}

export default Product;
