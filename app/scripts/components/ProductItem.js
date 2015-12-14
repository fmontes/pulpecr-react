var currency = require('../utils/currency');

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
      <li onClick={this.addItemToCart} className="product-list-item">
        <header className="header">
          <h3 className="product-title" ref="productTitle">{product.displayName}</h3>
          <p className="product-price" ref="productPrice">{currency.format(product.price, '₡')}</p>
        </header>
        <div className="product-list-item-image">
          <img className="product-image" src={product.image} ref="productImage" />
        </div>
        <section className="body">
          <p className="product-description" ref="productDescription">{product.description}</p>
        </section>
        <ul className="actions">
          <li><a href="#">Agregar</a></li>
        </ul>
      </li>
    )
  }
});

module.exports = ProductItem;
