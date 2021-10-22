const express = require('express');
const router = express.Router();
const data = require('../data');
const stockdata = data.stocks;

router.get('/:id', async (req, res) => {
    try {
        const stock = await stockdata.getStockById(req.params.id);
        res.json(stock);
    } catch (e) {
        res.status(404).json({ message: 'stock not found' });
    }
});
router.get('/', async (req, res) => {
    try {
        const stocklist = await stockdata.getStocks();
        res.json(stocklist);
    } catch (e) {
        res.status(500).send();
    }
});
module.exports = router;
