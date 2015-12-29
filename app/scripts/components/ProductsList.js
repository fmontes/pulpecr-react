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
      <section className="products-list mdl-grid" ref="productsList">
        {products}
      </section>
    )
  }
});

module.exports = ProductList;
