import * as _API_ from '~/api/GatewayRepository'

export const state = () => ({
    gateways: [],
    gateway: null
})

export const mutations = {

    SET_GATEWAYS: (state, gateways) => (state.gateways = gateways),

    SET_GATEWAY: (state, gateway) => (state.gateway = gateway),

    SET_NEW_GATEWAY: (state, gateway) => (state.gateways.unshift(gateway)),

    SET_NEW_DEVICE: (state, gateway) => (state.gateway.devices.unshift(gateway)),

    DELETE_GATEWAY: (state, id) => (state.gateways = state.gateways.filter((gateway) => gateway._id !== id)),

    DELETE_DEVICE: (state, id) => (state.gateway.devices = state.gateway.devices.filter((device) => device._id !== id))
}


export const getters = {
    gateways: (state) => state.gateways,
    gateway: (state) => state.gateway
}


export const actions = {
  async fetchGateways({ commit }) {
      const gateways = await _API_.fetchGateways(this)
      commit('SET_GATEWAYS', gateways)
  },

  async createGateway({ commit }, data) {
    const gateway = await _API_.createGateway(data, this)
    if(gateway){
      commit('SET_NEW_GATEWAY', gateway)
    }
    return gateway
  },

  async fetchGateway({ commit }, id) {
      const gateway = await _API_.fetchGateway(id, this)
      commit('SET_GATEWAY', gateway)
  },

  async deleteGateway({ commit }, id) {
    const check = confirm('Are You Sure Do You Want Delete This gateway?')
    if (check) {
        await _API_.deleteGateway(id, this)
        commit('DELETE_GATEWAY', id)
            // this.$toast.success('Post Has Been Deleted Successfuly')
    }
  },

  async createDevice({ commit }, data) {
    const device = await _API_.createDevice(data, this)
    if(device){
      commit('SET_NEW_DEVICE', device)
    }
    return device
  },

  async deleteDevice({ commit }, data) {
      const check = confirm('Are You Sure Do You Want Delete This Device?')
      if (check) {
          await _API_.deleteDevice(data, this)
          await commit('DELETE_DEVICE', data.id)
      }
  },

}

export default {
    state,
    getters,
    mutations,
    actions
}
