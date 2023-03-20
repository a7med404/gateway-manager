require('dotenv').config();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Gateway = require('./models/Gateway');
const Device = require('./models/Device');

const clearDB = async function() {
  mongoose.connection.db.dropDatabase();
  console.log('Database cleared successfully.')
}
const seedDB = async function() {
  for(let i = 0; i < 5; i++) {
    let createdGateway = new Gateway({
      serialNumber: faker.finance.routingNumber(),
      name: faker.internet.domainWord(),
      ipv4Address: faker.internet.ipv4()
    });
    for(let i = 0; i < Math.random() * (10 - 0) + 0; i++) {
        const createdDevice = new Device({
          uid: faker.random.numeric(8),
          vendor: faker.name.fullName(),
          createdDate: faker.date.past(),
          status: faker.helpers.arrayElement(['online', 'offline']),
          gateway: createdGateway._id.toHexString()
        });
        await createdDevice.save();
        createdGateway.devices.push(createdDevice._id);
    };
    await createdGateway.save();
  }
  console.log('Database seeded successfully.')
}


mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true })
  .then(async () => {
    console.log('Connected to MongoDB ...')
    await clearDB()
    await seedDB()
  })
  .then(() => mongoose.connection.close())
  .then(() => process.exit(0))
  .catch((err) => console.error(err));
