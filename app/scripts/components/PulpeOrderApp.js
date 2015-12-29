var _ = require('underscore');
var React = window.React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var productsApi = require('../../rest/index');
var HomePage = require('../pages/Home');
var CartPage = require('../pages/Cart');

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

  clearCart: function() {
    this.setState({
      cart: []
    })
  },

  goTo: function(event, page) {
    this.setState({
      route: page
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
    $.subscribe('goto', this.goTo);
    $.subscribe('cart:add', this.updateCart);
    $.subscribe('cart:remove', this.updateCart);
    $.subscribe('cart:clear', this.clearCart);
  },

  componentWillUnmount: function() {
    $.unsubscribe('goto', this.goTo);
    $.unsubscribe('cart:add', this.updateCart);
    $.unsubscribe('cart:remove', this.updateCart);
    $.unsubscribe('cart:clear', this.clearCart);
  },

  renderCart: function() {
    return (
      <ReactCSSTransitionGroup transitionName="layout-animation" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
        <CartPage items={this.state.cart} key="cartPage" />
      </ReactCSSTransitionGroup>
    )
  },

  renderHome: function() {
    return (
      <ReactCSSTransitionGroup transitionName="layout-animation" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
        <HomePage products={this.state.products} cartItems={this.state.cart} key="homePage" />
      </ReactCSSTransitionGroup>
    )
  },

  render: function() {
    return (
      this.state.route === 'cart' ? this.renderCart() : this.renderHome()
    );
  }
});

module.exports = PulpeOrderApp;
