const express = require('express');
const router = express.Router();
const GatewayController = require('../controllers/gatewayController');
const DeviceRoutes = require('./deviceRoutes');

router.use('/:gatewayId/devices', DeviceRoutes);

router.get('/', GatewayController.getAllGateways);

router.get('/:id', GatewayController.getGateway);

router.post('/', GatewayController.createGateway);

router.delete('/:id', GatewayController.deleteGateway);

module.exports = router;
