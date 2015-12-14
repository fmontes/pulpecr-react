var _ = require('underscore');
var React = window.React = require('react');
var productsApi = require('../../rest/index');
var ProductsList = require('./ProductsList');
var Cart = require('./Cart');

var PulpeOrderApp = React.createClass({
  updateCart: function(event, product) {
    console.log(event.type + ': ' + product.id);
    var items = this.state.cart;

    var existingItem = _.findWhere(items, {id: product.id});
    if (!items.length || !existingItem) {
      product.q = 1;
      items.push(product);
    } else {
      if (event.type === 'cart:remove') {
        existingItem.q--;
        if (existingItem.q === 0) {
          items = _.reject(items, function(item) {
            return item.id === existingItem.id;
          })
        }
      } else {
        existingItem.q++
      }
    }

    this.setState({
      cart: items
    })
  },

  getInitialState: function() {
    return {
      cart: []
    };
  },

  componentDidMount: function() {
    var self = this;
    productsApi.getProducts().then(function(data) {
      self.setState({
        products: data.content
      })
    });
    $.subscribe('cart:add', this.updateCart);
    $.subscribe('cart:remove', this.updateCart);
  },

  componentWillUnmount: function() {
    $.unsubscribe('cart:add', this.updateCart);
    $.unsubscribe('cart:remove', this.updateCart);
  },

  render: function() {
    return (
      <div className="pulpecr">
        <div className="container-fluid">
          {!_.isEmpty(this.state.products) && <ProductsList products={this.state.products} />}
        </div>
        {!_.isEmpty(this.state.cart) && <Cart items={this.state.cart} />}
      </div>
    );
  }
});


module.exports = PulpeOrderApp;
