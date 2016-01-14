var Utils = {
  formatCurrency: function(n, symbol) {
    return symbol + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  },
  getTotal: function(items) {
    var total = 0;
    items.forEach(function(item) {
      total += item.price * item.q;
    });
    return Utils.formatCurrency(total, '₡');
  }
};

module.exports = Utils;
