var _ = require('underscore');
var productsData = {
    count: 6,
    content: [
        {
            id: 1,
            displayName: 'Club Sandwich',
            description: 'Lorem ipsum Exercitation ullamco commodo in minim consectetur voluptate tempor dolor et ullamco nulla sed velit enim dolor ullamco sunt labore.',
            image: 'http://www.expressocarwash.com.au/wp-content/uploads/2012/11/gachi-club-sandwich.jpg',
            price: 1500
        },
        {
            id: 2,
            displayName: 'Gallo Pinto',
            description: 'Lorem ipsum Exercitation ullamco commodo in minim consectetur voluptate tempor dolor et ullamco nulla sed velit enim dolor ullamco sunt labore.',
            image: 'http://culturacr.net/images/2013/GalloPinto.jpg',
            price: 1500
        },
        {
            id: 3,
            displayName: 'Sandwich Cubano',
            description: 'Lorem ipsum Exercitation ullamco commodo in minim consectetur voluptate tempor dolor et ullamco nulla sed velit enim dolor ullamco sunt labore.',
            image: 'http://www.impactony.com/wp-content/uploads/2012/04/cuban-sandwich1-400x3001.jpg',
            price: 2500
        },
        {
            id: 4,
            displayName: 'Burrito Desayuno',
            description: 'Lorem ipsum Exercitation ullamco commodo in minim consectetur voluptate tempor dolor et ullamco nulla sed velit enim dolor ullamco sunt labore.',
            image: 'http://www.pronaca.com/fotos/images/thumbnails/6084%20-%20Burrito%20de%20desayuno.jpg',
            price: 2500
        },
        {
            id: 5,
            displayName: 'Arroz con pollo',
            description: 'Lorem ipsum Exercitation ullamco commodo in minim consectetur voluptate tempor dolor et ullamco nulla sed velit enim dolor ullamco sunt labore.',
            image: 'http://cdn.iowagirleats.com/wp-content/uploads/2012/08/DSC_0101_thumb.jpg',
            price: 2500
        },
        {
            id: 6,
            displayName: 'Ensalada de frutas',
            description: 'Lorem ipsum Exercitation ullamco commodo in minim consectetur voluptate tempor dolor et ullamco nulla sed velit enim dolor ullamco sunt labore.',
            image: 'http://static.mejorconsalud.com/wp-content/uploads/2015/05/ensalada-de-frutas-500x334.jpg',
            price: 2500
        }
    ]
};

module.exports = {
    getProducts: function() {
        return new Promise(function(resolve, reject) {
            resolve(productsData);
        });
    },
    getProductItem: function(id) {
        return new Promise(function(resolve, reject) {
            resolve(_.filter(productsData.content, {id: id}));
        });
    }
}