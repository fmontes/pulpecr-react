var _ = require('underscore');
var utils = require('../utils/index');

var CartItem = React.createClass({
  updateCart: function(e) {
    var data = e.currentTarget.dataset;
    data.cartAction === 'add' ? $.publish('cart:add', this.props.item) : $.publish('cart:remove', this.props.item);
  },

  render: function() {
    var item = this.props.item;
    return (
      <tr key={item.id} className="cart-item">
        <td className="cart-item__image"><img src={item.image} width="40" /></td>
        <td className="cart-item__info">
          <h5 className="cart-item__name">{item.displayName}</h5>
          <p className="cart-item__price">{utils.formatCurrency((item.q * item.price), '₡')}</p>
        </td>
        <td className="cart-item__actions">
          <button className="mdl-button cart-item__action-btn" data-cart-action="remove" onClick={this.updateCart}>
            <i className="material-icons">{item.q === 1 ? 'delete' : 'remove'}</i>
          </button>
          <input type="text" className="cart-item__action-qty" value={item.q} readOnly ref="qty" />
          <button className="mdl-button cart-item__action-btn" type="button" data-cart-action="add" onClick={this.updateCart}>
            <i className="material-icons">add</i>
          </button>
        </td>
      </tr>
    );
  }
});

module.exports = CartItem;
