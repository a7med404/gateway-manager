const Gateway = require('../../src/models/Gateway');
const Device = require('../../src/models/Device');

const addDeviceMock = jest.fn((gateway, device) => {
  gateway.devices.push(device);
});

const removeDeviceMock = jest.fn((gateway, deviceId) => {
  gateway.devices = gateway.devices.filter(device => device.uid !== deviceId);
});


// Device model unit tests
describe('Device model', () => {
  const validGateway = {
    serialNumber: '9834556',
    name: 'test gateway name',
    ipv4Address: '192.168.0.1',
    devices: [],
  };

  const validDevice = {
    uid: '9834556',
    vendor: 'test device vendor',
    status: 'offline'
  };

  // Test the validation of a device object with missing required fields
  test('Validate a device with missing required fields', async () => {
    const deviceData = { ...validDevice };
    delete deviceData.serialNumber;
    const device = new Device(deviceData);
    await expect(device.validate()).rejects.toThrow();
  });

  // Test the validation of a device object with an invalid status
  test('Validate a device with an invalid status', async () => {
    const deviceData = { ...validDevice, status: 'invalid-status' };
    const device = new Device(deviceData);
    await expect(device.validate()).rejects.toThrow();
  });

  test('should add a new device to the gateway', async () => {
    const deviceToAdd = { uid: '112233', vendor: 'ACME', createdDate: new Date(), status: 'online' };
    await addDeviceMock(validGateway, deviceToAdd);
    expect(validGateway.devices.length).toBe(1);
    await expect(validGateway.devices[0]).toBe(deviceToAdd);
  });

  
  test('should throw an error if device UID is already in use', async () => {
    const gateway = new Gateway(validGateway);
    const deviceData = { uid: '112233', vendor: 'test-device-vendor' };
    addDeviceMock(validGateway, deviceData);
    await expect(deviceData.validate()).rejects.toThrow();
  });
});
