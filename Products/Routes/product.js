const express = require('express');
const router = express.Router();
const Product = require('../Controllers/product');

module.exports = () => {
    //routes
    router.get('/', Product.getAll),
        router.get('/:id', Product.getById),
        router.post('/', Product.create),
        router.put('/:id', Product.update),
        router.delete('/:id', Product.remove)
    return router;
}