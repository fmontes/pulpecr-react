module.exports = {
    format: function(n, symbol) {
        return symbol + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }
}