var utils = require('../utils/index');

var ProductItem = React.createClass({
  getInitialState: function() {
    return {};
  },

  addItemToCart: function() {
    $.publish('cart:add', this.props.product);
  },

  render: function() {
    var product = this.props.product;
    return (
      <div className="product-item mdl-cell">
        <div className="mdl-card mdl-shadow--2dp product-item__card">
          <div className="mdl-card__media">
            <img src={product.image} ref="productImage" />
          </div>
          <div className="mdl-card__title product-item__title">
            <h2 className="mdl-card__title-text product-item__title-text">{product.displayName}</h2>
            <p className="product-item__price" ref="productPrice">{utils.formatCurrency(product.price, '₡')}</p>
          </div>
          <div className="mdl-card__supporting-text">
            <p className="product-description" ref="productDescription">{product.description}</p>
          </div>
          <div className="mdl-card__actions mdl-card--border product-item__actions">
            <a onClick={this.addItemToCart} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
              Agregar
            </a>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = ProductItem;
