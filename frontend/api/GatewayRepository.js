import * as helper from './helper'

const GATEWAY_END_POINT = '/gateways';
const DEVICE_END_POINT = '/devices'


/**
 *
 * @return Array[]
 */
 export const fetchGateways = (_this) => helper.get(`${GATEWAY_END_POINT}`, _this)


 /**
  *
  * @return Object
  */
 export const fetchGateway = (id, _this) => helper.get(`${GATEWAY_END_POINT}/${id}`, _this)


/**
 *
 *
 * @param { * }
 * @return Object
 */
 export const createGateway = (data, _this) => helper.post(`${GATEWAY_END_POINT}`, data, _this)

/**
 *
 *
 * @param {*} data
 */
 export const deleteGateway = (id, _this) => helper.del(`${GATEWAY_END_POINT}/${id}`, _this)


/**
 *
 *
 * @param { * }
 * @return Object
 */
 export const createDevice = (data, _this) => {
  const gatewayId = data.gatewayId
  delete data.gatewayId
  return helper.post(`${GATEWAY_END_POINT}/${gatewayId}${DEVICE_END_POINT}`, data, _this)
 }

/**
 *
 *
 * @param {*} data
 */
 export const deleteDevice = (data, _this) =>
 helper.del(`${GATEWAY_END_POINT}/${data.gatewayId}${DEVICE_END_POINT}/${data.id}`, _this)
