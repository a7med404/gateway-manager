const express = require('express');
const router = express.Router({ mergeParams: true });
const DeviceController = require('../controllers/deviceController');

router.post('/', DeviceController.addDevice);

router.delete('/:deviceId', DeviceController.removeDevice);

module.exports = router;
