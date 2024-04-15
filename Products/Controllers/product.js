const { validationResult } = require('express-validator');
const db = require('../Config/db');


const getAll = (req, res) => {
    db.query('SELECT * FROM products', (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        res.send(result);
    }
    );
}
const getById = (req, res) => {
    db.query('SELECT * FROM products WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            res.status(404).json({ message: 'product not found' });
            return;
        }
        res.send(result[0]);


    }
    );
}
const create = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newProduct = [req.body.name, req.body.price, req.body.description];
    db.query('INSERT INTO products (name,price,description) VALUES (?,?,?)', newProduct, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        res.json({ message: 'success', id: result.insertId });


    }
    );
}
const update = (req, res) => {
    const productId = req.params.id;
    const { name, price, description } = req.body;
    const update = 'UPDATE products SET ';
    const set = [];
    const values = [];
    if (name) {
        set.push('name = ?');
        values.push(name);
    }
    if (price) {
        set.push('price = ?');
        values.push(price);
    }
    if (description) {
        set.push('description = ?');
        values.push(description);
    }

    if (set.length === 0) {
        res.status(400).json({ error: 'bad request' });
        return;
    }
    values.push(productId);


    db.query(update + set + ' WHERE id = ?', values, (error, result) => {
        if (error) {
            console.error('Erro:', error);
            res.status(500).json({ error: error.message });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'product not found' });
            return;
        }
        res.json({ message: 'success' });
    });
}

const remove = (req, res) => {
    db.query('DELETE FROM products WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'product not found' });
            return;
        }
        res.json({ message: 'success' });
    }

    );
}
module.exports = { getAll, getById, create, update, remove };