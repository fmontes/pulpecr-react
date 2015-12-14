var _ = require('underscore');
var ProductItem = require('./ProductItem');

var ProductList = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    var products = _.map(this.props.products, function(item) {
      return (
        <ProductItem key={item.id} product={item} />
      )
    });
    return (
      <ul className="products-list" ref="productsLists">
        {products}
      </ul>
    )
  }
});

module.exports = ProductList;
