const mongoose = require('mongoose');

const gatewaySchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  ipv4Address: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^(\d{1,3}\.){3}\d{1,3}$/.test(v);
      },
      message: props => `${props.value} is not a valid ipv4 address`
    }
  },
  devices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device'
  }]
}, { versionKey: false });

module.exports = mongoose.model('Gateway', gatewaySchema);
