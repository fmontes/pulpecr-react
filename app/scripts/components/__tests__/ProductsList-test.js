jest.dontMock('../ProductsList');
jest.dontMock('../ProductItem');
jest.dontMock('underscore');
global.React = require('react');

describe('ProductsList Component', function () {
  var ProductsList = require('../ProductsList');
  var TestUtils = require('react-addons-test-utils');

  it('should render correctly', function () {
    var products = [
      {
        id: 1,
        displayName: 'Hello World',
        price: 1000,
        image: 'image.jpg',
        description: 'This is a test'
      },
      {
        id: 2,
        displayName: 'Hello World',
        price: 1000,
        image: 'image.jpg',
        description: 'This is a test'
      }
    ];

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<ProductsList products={products} />);
    var productsLists = shallowRenderer.getRenderOutput();
    expect(productsLists.type).toEqual('ul');
    expect(productsLists.props.children.length).toEqual(2);
    productsLists.props.children.map(function(item) {
      expect(item.type.displayName).toEqual('ProductItem');
    })
  });
});
