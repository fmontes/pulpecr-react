var _ = require('underscore');
var currency = require('../utils/currency');
var CartItem = require('./CartItem');

var Cart = React.createClass({
  getInitialState: function() {
    return {
      open: false
    };
  },

  getTotal: function() {
    var total = 0;
    _.each(this.props.items, function(item) {
      total += item.price * item.q;
    });
    return currency.format(total, '₡');
  },

  updateCart: function(e) {
    var data = e.target.dataset;
    var item = _.filter(this.props.items, {id: parseInt(data.itemId)});
    data.cartAction === 'add' ? $.publish('cart:add', item) : $.publish('cart:remove', item);
  },

  toggleCart: function() {
    this.setState({
      open: !this.state.open
    })
  },

  render: function() {
    var items = _.map(this.props.items, function(cartItem, i) {
      return (
        <CartItem item={cartItem} key={i} />
      )
    });
    return (
      <div className={'js-cart-block cart-block' + (this.state.open ? ' open' : '')}>
        <table className="table">
          <thead>
            <tr>
              <th colSpan="3" className="cart-total">{this.getTotal()}</th>
              <th colSpan="1" className="cart-toggle-button">
                <button type="button" className="btn btn-default" aria-label="Left Align" onClick={this.toggleCart}>
                  <span className={'glyphicon glyphicon-menu-' + (this.state.open ? 'down' : 'up')} aria-hidden="true"></span>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>
      </div>
    )
  }
});

module.exports = Cart;
