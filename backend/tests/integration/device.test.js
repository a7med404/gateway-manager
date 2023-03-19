const request = require('supertest');
const app = require('../../src/index');
const mongoose = require('mongoose');

describe('Gateways API', () => {
  let gatewayId;
  let deviceUid;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /gateways', () => {
    test('should create a new gateway', async () => {
      const res = await request(app)
        .post('/gateways')
        .send({
          serialNumber: 'SN001',
          name: 'Gateway 1',
          ipv4Address: '192.168.1.1',
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body.serialNumber).toEqual('SN001');

      gatewayId = res.body._id;
    });

    test('should return error if serialNumber is missing', async () => {
      const res = await request(app)
        .post('/gateways')
        .send({
          name: 'Gateway 2',
          ipv4Address: '192.168.1.2',
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
    });

    // add more tests to validate other fields
  });

  describe('PUT /gateways/:id', () => {
    it('should update a gateway by ID', async () => {
      const res = await request(app)
        .put(`/gateways/${gatewayId}`)
        .send({
          name: 'Gateway 2',
          ipv4Address: '192.168.0.2',
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.serialNumber).toEqual('SN001');
      expect(res.body.name).toEqual('Gateway 2');
      expect(res.body.ipv4Address).toEqual('192.168.0.2');
    });
  });

  describe('GET /gateways', () => {
    test('should get all gateways with their devices', async () => {
      const res = await request(app)
        .get('/gateways');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe('GET /gateways/:id', () => {
    test('should get details of a specific gateway', async () => {
      const res = await request(app)
        .get(`/gateways/${gatewayId}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.serialNumber).toEqual('SN001');
    });

    test('should return 404 error if gateway is not found', async () => {
      const res = await request(app)
        .get(`/gateways/${mongoose.Types.ObjectId()}`);
      
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('DELETE /gateways/:id', () => {
    it('should delete a gateway by ID', async () => {
      const res = await request(app).delete(`/gateways/${gatewayId}`);
      expect(res.statusCode).toEqual(204);
    });
  });


  describe('PUT /gateways/:id/devices', () => {
    test('should add a new device to a specific gateway', async () => {
      const res = await request(app)
        .put(`/gateways/${gatewayId}/devices`)
        .send({
          uid: 12345,
          vendor: 'Device 1',
          status: 'online',
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body.devices).toHaveLength(1);
      
      deviceUid = res.body.devices[0].uid;
    });
  });
    // test('should return error if device uid already exists', async () => {
    //   const res = await request(app)
    //     .put(`/gateways
});