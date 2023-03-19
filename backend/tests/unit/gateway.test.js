const Gateway = require('../../src/models/Gateway');
const Device = require('../../src/models/Device');

// Gateway model unit tests
describe('Gateway model', () => {
  const validGateway = {
    serialNumber: '9834556',
    name: 'test gateway name',
    ipv4Address: '192.168.0.1',
    devices: [],
  };

  // Test the validation of a valid gateway object
  test('Validate a valid gateway', async () => {
    const gateway = new Gateway(validGateway);
    await expect(gateway.validate()).resolves.toBeUndefined();
  });

  // Test the validation of a gateway object with missing required fields
  test('Validate a gateway with missing required fields', async () => {
    const gatewayData = { ...validGateway };
    delete gatewayData.serialNumber;
    const gateway = new Gateway(gatewayData);
    await expect(gateway.validate()).rejects.toThrow();
  });

  // Test the validation of a gateway object with an invalid IP address
  test('Validate a gateway with an invalid IP address', async () => {
    const gatewayData = { ...validGateway, ipv4Address: 'invalid-ipv4-address' };
    const gateway = new Gateway(gatewayData);
    await expect(gateway.validate()).rejects.toThrow();
  });

  test('should throw an error if devices count exceeds 10', async () => {
    const gatewayData = {
      ...validGateway,
      devices: Array.from({ length: 11 }, (_, i) => ({ uid: i, vendor: `vendor-${i}` })),
    };
    await expect(() => new Gateway(gatewayData)).toThrow('Gateway device limit exceeded');
  });
});
