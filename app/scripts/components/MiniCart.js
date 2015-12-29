var _ = require('underscore');
var utils = require('../utils/index');
var CartItem = require('./CartItem');

var MiniCart = React.createClass({
  getInitialState: function() {
    return {
      open: false
    };
  },

  updateCart: function(e) {
    var data = e.target.dataset;
    var item = _.filter(this.props.items, {id: parseInt(data.itemId)});
    data.cartAction === 'add' ? $.publish('cart:add', item) : $.publish('cart:remove', item);
  },

  goToCart: function() {
    $.publish('goto', 'cart');
  },

  render: function() {
    var items = _.map(this.props.items, function(cartItem, i) {
      return (
        <CartItem item={cartItem} key={i} />
      )
    });
    return (
      <div className="mini-cart">
        <div className={'mini-cart__wrapper' + (this.state.open ? ' open' : '')}></div>
        <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored mini-cart__button" onClick={this.goToCart}>
          <i className="material-icons">shopping_cart</i>
        </button>
        <div className="mini-cart__teaser-total">
          <span className="mini-cart__teaser-total-tooltip">{'Sub-Total: ' + utils.getTotal(this.props.items)}</span>
        </div>
      </div>
    )
  }
});

module.exports = MiniCart;
