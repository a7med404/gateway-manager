const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  uid: {
    type: Number,
    required: true,
    unique: true
  },
  vendor: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['online', 'offline'],
    default: 'online'
  },
  gateway: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gateway',
    required: true
  }
}, { versionKey: false });

module.exports = mongoose.model('Device', deviceSchema);
