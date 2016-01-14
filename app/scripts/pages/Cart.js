var _ = require('underscore');
var utils = require('../utils/index');
var CartItem = require('../components/CartItem');
var TextField = require('../components/TextField');

var Cart = React.createClass({
  getInitialState: function() {
    return {};
  },

  goToHome: function() {
    $.publish('goto', 'home');
  },

  componentDidMount: function() {
    componentHandler.upgradeDom();
  },

  validateForm: function() {
    return _.chain(this.refs)
      .filter(function(item) {
        return item.constructor.displayName === 'TextField';
      })
      .every(function(item) {
         return item.isValid();
      })
      .value()
  },

  handleSubmitForm: function(e) {
    e.preventDefault();
    if (this.validateForm()) {
      this.submitOrder();
    }
  },

  createOrderMessage: function() {
    var result = '';
    var items = this.props.items;
    _.each(items, function(item, i) {
      result += '(' + item.q + ')' + ' ' + item.displayName + (i < items.length - 1 ? '\n' : '');
    });

    return result;
  },

  submitOrder: function() {
    var self = this;
    var result = {
      orderSubmitted: true
    };
    $.ajax({
      url: 'https://docs.google.com/forms/d/12Ppy1-Ax27tco25fXKdTcJ8Evf69pFzblxiNPa4gOf4/formResponse',
      data: {
        'entry.1040758327': this.refs.name.getValue(),
        'entry.414133092' : this.refs.phone.getValue(),
        'entry.302286904': this.createOrderMessage(),
        'entry.692865967': utils.getTotal(this.props.items)
      }
    }).done(function(data) {
      // Sadly there I don't know a better way to confirm the request to Google Forms.
      // If anybody know please let me know.
      var confirmMessage = $(document.createElement('div').innerHTML = data).find('.freebirdFormviewerViewResponseConfirmationMessage').text();
      if (confirmMessage === 'Se ha registrado tu respuesta.') {
        result.error = false;
        $.publish('cart:clear');
      } else {
        result.error = true;
      }
      self.setState(result);
    }).fail(function() {
      result.error = true;
      self.setState(result);
    })
  },

  renderCart: function() {
    return (
      <div>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--12-col">
            <h5 className="cart__subtotal">
              {'Subtotal: ' + utils.getTotal(this.props.items)}
            </h5>
          </div>
        </div>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--12-col">
            <form onSubmit={this.handleSubmitForm}>
              <TextField label="Nombre" id="name" required="true" ref="name" />
              <TextField label="Télefono" id="phone" required="true" type="tel" ref="phone" />
              <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored cart__submit-button">Hacer Pedido</button>
            </form>
          </div>
        </div>
      </div>
    );
  },

  renderMessage: function() {
    var message = this.state.error ? 'Hubo un problema con su pedido, favor llamar al 1234-5678' : 'Su pedido ha sido realizado';
    var className = 'alert ' + (this.state.error ? 'is-error' : 'is-success');

    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--12-col">
          <div className="cart__result">
            <div className={className}>{message}</div>
            <p className="cart__go-home-button-wrapper">
              <a onClick={this.goToHome} className="mdl-button mdl-button--colored mdl-button--raised mdl-js-button mdl-js-ripple-effect">Ir al inicio</a>
            </p>
          </div>
        </div>
      </div>
    );
  },

  render: function() {
    if (this.props.items.length) {
      var items = _.map(this.props.items, function(cartItem, i) {
        return (
          <CartItem item={cartItem} key={i} />
        )
      });
      return (
        <div className="mdl-layout mdl-layout--fixed-header">
          <header className="mdl-layout__header is-casting-shadow">
            <div className="mdl-layout__drawer-button" onClick={this.goToHome}><i className="material-icons cart__back-button">arrow_back</i></div>
            <div className="mdl-layout__header-row">
              <span className="mdl-layout-title">Carro de compras</span>
            </div>
          </header>
          <main className="mdl-layout__content">
            <div className="page-content">
              <table className="cart__list-items">
                <tbody>
                {items}
                </tbody>
              </table>
              { !this.state.orderSubmitted ? this.renderCart() : this.renderMessage() }
            </div>
          </main>
        </div>
      );
    } else {
      this.goToHome();
    }
  }
});

module.exports = Cart;
