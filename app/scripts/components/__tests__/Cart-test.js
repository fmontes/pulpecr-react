jest.dontMock('../Cart');
jest.dontMock('../CartItem');
jest.dontMock('underscore');
jest.dontMock('../../utils/currency');
global.React = require('react');

describe('Cart Component', function () {
  var Cart = require('../Cart');
  var CartItem = require('../CartItem');
  var TestUtils = require('react-addons-test-utils');

  it('should render correctly', function () {
    var products = [
      {
        id: 1,
        displayName: 'Hello World',
        price: 1000,
        image: 'image.jpg',
        description: 'This is a test',
        q: 4
      },
      {
        id: 2,
        displayName: 'Hello World',
        price: 1000,
        image: 'image.jpg',
        description: 'This is a test',
        q: 5
      }
    ];

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<Cart items={products} />);
    var cart = shallowRenderer.getRenderOutput();

    expect(cart.type).toEqual('div');
    expect(cart.props.className).toContain('js-cart-block');

    var table = cart.props.children;
    var thead = table.props.children[0];
    var totalCell = thead.props.children.props.children[0];
    expect(totalCell.props.children).toBe('₡9,000.00');

    var tbody = table.props.children[1];
    tbody.props.children.forEach(function(item, i) {
      expect(item).toEqual(<CartItem key={i} item={products[i]} />);
    });

    //TODO: test the item click
  });
});
