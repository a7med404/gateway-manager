const Gateway = require('../models/Gateway');
const Joi = require('joi');

class GatewayController {
  static async getAllGateways(req, res) {
    try {
      const gateways = await Gateway.find().populate('devices');
      res.json(gateways);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async getGateway(req, res) {
    const { id } = req.params;

    try {
      const gateway = await Gateway.findById(id).populate('devices');
      if (!gateway) {
        return res.status(404).json({ message: 'Gateway not found' });
      }
      res.json(gateway);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async createGateway(req, res) {
    try {
      const gatewaySchema = Joi.object({
        serialNumber: Joi.string().required(),
        name: Joi.string().required(),
        ipv4Address: Joi.string().ip({ version: 'ipv4' }).required(),
      });

      const { error } = gatewaySchema.validate(req.body);
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }
      const { serialNumber, name, ipv4Address } = req.body;

      const gatewayExist = await Gateway.exists({ serialNumber: serialNumber });
      if (gatewayExist) {
        return res.status(400).send({ message: `Gateway with this serial number [${serialNumber}] already exist `});
      }

      const gateway = new Gateway({
        serialNumber,
        name,
        ipv4Address,
      });
      await gateway.save();
      res.status(201).json(gateway);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async deleteGateway(req, res) {
    const { id } = req.params;

    try {
      const gateway = await Gateway.findById(id);
      if (!gateway) {
        return res.status(404).json({ message: 'Gateway not found' });
      }
      await Gateway.findByIdAndDelete(id);
      res.json({ message: 'Gateway deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = GatewayController;
