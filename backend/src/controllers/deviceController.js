const Device = require('../models/Device');
const Gateway = require('../models/Gateway');
const Joi = require('joi');

class DeviceController {
  static async addDevice(req, res) {
    try {
      const deviceSchema = Joi.object({
        uid: Joi.number().required(),
        vendor: Joi.string().required(),
        createdDate: Joi.date(),
        status: Joi.string().valid('online', 'offline'),
      });

      const { error } = deviceSchema.validate(req.body);
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }

      const { uid, vendor, createdDate, status } = req.body;
      const { gatewayId } = req.params;

      const gateway = await Gateway.findById(gatewayId);
      if (!gateway) {
        return res.status(404).send({ message: 'Gateway not found' });
      }

      const deviceExist = await Device.exists({ uid: uid });
      if (deviceExist) {
        return res.status(400).send({ message: `Device with this UID [${uid}] already exist `});
      }

      if (gateway.devices.length >= 10) {
        return res.status(400).send({ message: 'Gateway device limit exceeded' });
      }

      const device = new Device({
        uid,
        vendor,
        createdDate,
        status,
        gateway: gatewayId,
      });

      await device.save();
      gateway.devices.push(device._id);
      await gateway.save();

      res.status(201).json(device);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async removeDevice(req, res) {
    const { gatewayId, deviceId } = req.params;

    try {
      const gateway = await Gateway.findById(gatewayId);
      if (!gateway) {
        return res.status(404).json({ message: 'Gateway not found' });
      }

      const deviceIndex = gateway.devices.indexOf(deviceId);
      if (deviceIndex === -1) {
        return res.status(404).json({ message: 'Device not found' });
      }

      gateway.devices.splice(deviceIndex, 1);
      await gateway.save();

      await Device.findByIdAndDelete(deviceId);

      res.json({ message: 'Device removed successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = DeviceController;
