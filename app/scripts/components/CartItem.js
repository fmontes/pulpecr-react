var currency = require('../utils/currency');

var CartItem = React.createClass({
  render: function() {
    var item = this.props.item;
    return (
      <tr key={item.id}>
        <td width="120">
          <div className="input-group">
              <span className="input-group-btn">
                <button className="btn btn-default" type="button" data-item-id={item.id} data-cart-action="remove" onClick={self.updateCart}>-</button>
              </span>
              <input type="text" className="form-control" value={item.q} readOnly ref="qty" />
              <span className="input-group-btn">
                <button className="btn btn-default" type="button" data-item-id={item.id} data-cart-action="add" onClick={self.updateCart}>+</button>
              </span>
          </div>
        </td>
        <td><img src={item.image} width="50" /></td>
        <td>{item.displayName}</td>
        <td>{currency.format((item.q * item.price), '₡')}</td>
      </tr>
    );
  }
});

module.exports = CartItem;
