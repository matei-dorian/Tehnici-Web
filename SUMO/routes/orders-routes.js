const express = require('express');
const ordersController = require('../controllers/orders-controller');
const router = express.Router();

router.post('/', ordersController.saveOrder);
router.get('/', ordersController.getAllOrders);
router.get('/last', ordersController.getLastOrder); /// asta prima sa nu intre pe id
router.get('/:id', ordersController.getOrderById);
router.get('/:nume/:prenume', ordersController.getOrdersByName);

module.exports = router;
