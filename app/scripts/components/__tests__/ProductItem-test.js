jest.dontMock('../ProductItem');
jest.dontMock('../../utils/currency');
global.React = require('react');

describe('ProductItem Component', function () {
  var ProductItem = require('../ProductItem');
  var TestUtils = require('react-addons-test-utils');

  it('should render correctly', function () {
    var product = {
      displayName: 'Hello World',
      price: 1000,
      image: 'image.jpg',
      description: 'This is a test'
    };

    var productItem = TestUtils.renderIntoDocument(<ProductItem product={product} />);
    var refs = productItem.refs;

    expect(refs.productTitle.textContent).toEqual('Hello World');
    expect(refs.productPrice.textContent).toEqual('₡1,000.00');
    expect(refs.productImage.src).toEqual('image.jpg');
    expect(refs.productDescription.textContent).toEqual('This is a test');

    //TODO: test the item click
  });
});
