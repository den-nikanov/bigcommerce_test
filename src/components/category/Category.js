import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import CategoryProduct from '../categoryProduct/CategoryProduct';
import './Category.scss';

class Category extends Component {
    render() {
        const { products, productAdded, currency } = this.props;
        let heading = <div className="Category-heading">
                          <div className="Category-info">
                              <h1 className="Category-title">Plates</h1>
                              <p className="Category-description">
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam rutrum sagittis metus a feugiat. Nulla facilisi. Ut a suscipit nisl, sed congue felis. Etiam pharetra cursus enim.
                              </p>
                          </div>
                      </div>;
        let productList = <div className="Category-products">
                            <Container className="Category-container">
                                <Row className="Category-row">
                                    {products.map((product, index) =>
                                        <Col md="4" key={index}>
                                            <CategoryProduct product={product} id={product.id} productAdded={productAdded} currency={currency} />
                                        </Col>)}
                                </Row>
                            </Container>
                        </div>;
        return (
            <div className="Category">
                {heading}
                {productList}
            </div>
        );
    }
}

export default Category;
