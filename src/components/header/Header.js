import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import CartPopup from '../cartPopup/CartPopup';
import logo from '../../assets/images/logo.png';
import './Header.scss';

class Header extends Component {
    state = {
        myCartClicked: false
    };
    render() {
        const { totalCount, currency, orderedProducts, totalPrice, productRemoved } = this.props;
        const { myCartClicked } = this.state;
        const toggleCartPopupItem = (e) => {
            let myCartIsClicked = myCartClicked;
            this.setState({
                myCartClicked: !myCartIsClicked
            });
        };
        const navMenu = [
            {
                title: 'Home',
                url: '/',
                hasChildren: false
            },
            {
                title: 'Shop',
                url: '/',
                hasChildren: true
            },
            {
                title: 'Journal',
                url: '#',
                hasChildren: false
            },
            {
                title: 'More',
                url: '#',
                hasChildren: true
            }
        ];
        return (
            <header className="Header">
                <Container fluid className="Header-container">
                    <Row className="Header-row">
                        <Col className="Logo" md="2">
                            <Link className="Logo-link" to='/'>
                                <img src={logo} className="Logo-image" alt="logo" />
                            </Link>
                        </Col>
                        <Col className="Nav" md="8">
                            {navMenu.map((item, index) => {
                                return <Link className="Nav-item" to={item.url} key={index}>
                                    <span className="Nav-item-title">{item.title}</span>
                                    {item.hasChildren ? <i className="Nav-item-icon fa-down-dir" /> : null}
                                </Link>
                            })}
                        </Col>
                        <Col className="MyCart" md="2">
                            <Link className={`MyCart-link ${myCartClicked ? 'MyCart-link-clicked' : ''}`} to="#" onClick={toggleCartPopupItem}>
                                <span className="MyCart-link-title">My Cart {totalCount > 0 ? `(${totalCount})` : null}</span>
                                <i className="MyCart-link-icon fa-down-dir" />
                            </Link>
                            <CartPopup currency={currency} orderedProducts={orderedProducts} totalCount={totalCount} totalPrice={totalPrice} productRemoved={productRemoved} isOpened={myCartClicked} toggleCartPopupItem={toggleCartPopupItem} />
                        </Col>
                    </Row>
                </Container>
            </header>
        );
    }
}

export default Header;
