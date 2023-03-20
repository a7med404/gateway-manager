require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import the gateway and device routes
const gatewayRoutes = require('./routes/gatewayRoutes');
const deviceRoutes = require('./routes/deviceRoutes');

// Set up middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB ...'))
  .catch((err) => console.error(err));

app.get('/', (req, res) => {
  return res.json({ message: 'API gateway manager is running' });
});

// Mount the gateway and device routes
app.use('/api/v1/gateways', gatewayRoutes);
app.use('/api/v1/devices', deviceRoutes);

app.get('*', function(req, res){
  res.status(404).json({ message: 'Not Found, Unable to find the requested resource!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT} ...`));
