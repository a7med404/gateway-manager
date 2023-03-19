import * as helper from './helper'

const GATEWAY_END_POINT = '/gateways'; const DEVICE_END_POINT = '/devices'


/**
 *
 * @return Array[]
 */
 export const fetchGateways = (_this) => helper.get(`${GATEWAY_END_POINT}`, _this)


 /**
  *
  * @return Array[get]
  */
 export const fetchGateway = (id, _this) => helper.get(`${GATEWAY_END_POINT}/${id}`, _this)


/**
 *
 *
 * @param { * }
 credentials
 */
 export const createGateway = (data, _this) =>
 helper.post(`${GATEWAY_END_POINT}`, data, _this)

/**
 *
 *
 * @param { * }
 credentials
 */
export const updateGateway = (data, _this) =>
    helper.update(`${GATEWAY_END_POINT}/${id}`, data, _this)

/**
 *
 *
 * @param {*} data
 */
 export const deleteGateway = (id, _this) =>
 helper.del(`${GATEWAY_END_POINT}/${id}`, _this)




/**
 *
 *
 * @param { * }
 credentials
 */
 export const createDevice = (data, _this) =>
 helper.post(`${DEVICE_END_POINT}`, data, _this)



/**
 *
 *
 * @param {*} data
 */
 export const deleteDevice = (id, _this) =>
 helper.del(`${DEVICE_END_POINT}/${id}`, _this)
