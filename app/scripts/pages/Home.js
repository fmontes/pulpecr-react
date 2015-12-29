var _ = require('underscore');
var React = window.React = require('react');
var ProductsList = require('../components/ProductsList');
var MiniCart = require('../components/MiniCart');

var Home = React.createClass({
  componentDidMount: function() {
    componentHandler.upgradeDom();
  },

  render: function() {
    return (
      <div className="home" key="home">
        <header className="main-header">
          <a href="#" className="logo">La Pulpe</a>
        </header>
        {!_.isEmpty(this.props.products) && <ProductsList products={this.props.products} />}
        {!_.isEmpty(this.props.cartItems) && <MiniCart items={this.props.cartItems} />}
      </div>
    )
  }
});

module.exports = Home;
