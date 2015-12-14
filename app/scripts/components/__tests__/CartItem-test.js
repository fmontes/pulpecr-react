jest.dontMock('../CartItem');
jest.dontMock('../../utils/currency');
global.React = require('react');

describe('CartItem Component', function () {
  var CartItem = require('../CartItem');
  var TestUtils = require('react-addons-test-utils');

  it('should render correctly', function () {
    var product = {
      displayName: 'Hello World',
      price: 1000,
      image: 'image.jpg',
      description: 'This is a test',
      q: 2
    };

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<CartItem item={product} />);
    var cartItem = shallowRenderer.getRenderOutput();
    expect(cartItem.type).toEqual('tr');
    cartItem.props.children.forEach(function(item) {
      expect(item.type).toEqual('td');
    });

    expect(cartItem.props.children[1]).toEqual(<td><img src="image.jpg" width="50" /></td>);
    expect(cartItem.props.children[2]).toEqual(<td>Hello World</td>);
    expect(cartItem.props.children[3]).toEqual(<td>₡2,000.00</td>);

    //TODO: test the item click
    //TODO: test cartItem.props.children[1]

  });
});
