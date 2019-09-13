import React, { Component } from 'react';
import './Breadcrumbs.scss';

class Breadcrumbs extends Component {
    render() {
        const { mainPage, brand, title } = this.props;
        return (
            <div className="Breadcrumbs">
                {mainPage} / {brand} / <span className="Breadcrumbs-breadcrumb-last"> {title}</span>
            </div>
        );
    }
}

export default Breadcrumbs;
