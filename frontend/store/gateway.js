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


    SET_UPDATED_GATEWAY_DATA: (state, updatedGateway) => {
      const index = state.gateways.findIndex((gateway) => gateway.id === updatedGateway.id)
      if (index !== -1) {
          state.gateways.splice(index, 1, updatedGateway)
      }
  },

    DELETE_GATEWAY: (state, id) => (state.gateways = state.gateways.filter((gateway) => gateway.id !== id)),

    DELETE_DEVICE: (state, id) => (state.gateway.devices = state.gateway.devices.filter((device) => device.id !== id))
}


export const getters = {
    gateways: (state) => state.gateways,
    gateway: (state) => state.gateway
}


export const actions = {
    /**
     * Registers the gateway with given details
     *
     * @param {*} { commit }
     * @param {gateway Object} data => gateway
     */
    async fetchGateways({ commit }) {
        const gateways = await _API_.fetchGateways(this)
        commit('SET_GATEWAYS', gateways.gateways)
    },

    /**
     * Send item data to the database
     * @param item object
     */
     async createGateway({ commit }, data) {
      const res = await _API_.createGateway(data, this)
      if(res){
        commit('SET_NEW_GATEWAY', res.gateway)
      }
      return res
  },
  /**
   * Send item data to the database
   * @param item object
   */
  async createDevice({ commit }, data) {
      const res = await _API_.createDevice(data, this)
      console.log(res)
      if(res){
        commit('SET_NEW_DEVICE', res.device)
      }
      return res
  },

    /**
     * Send item data to the database
     * @param item object
     */
    async updateGateway({ commit }, data) {
        const res = await _API_.updateGateway(data, this)
        commit('SET_UPDATED_GATEWAY_DATA', res.data)
        return res
    },

    /**
     * Registers the gateway with given details
     *
     * @param {*} { commit }
     * @param {gateway Object} data => gateway
     */
    async fetchGateway({ commit }, id) {
        const gateway = await _API_.fetchGateway(id, this)
        commit('SET_GATEWAY', gateway.gateway)
    },


    /**
     * Send Post data to the database
     * @param id object
     */
     async deleteGateway({ commit }, id) {
      const check = confirm('Are You Sure Do You Want Delete This gateway?')
      if (check) {
          await _API_.deleteGateway(id, this)
          commit('DELETE_GATEWAY', id)
              // this.$toast.success('Post Has Been Deleted Successfuly')
      }
  },

  /**
   * Send Post data to the database
   * @param id object
   */
  async deleteDevice({ commit }, id) {
      const check = confirm('Are You Sure Do You Want Delete This Device?')
      if (check) {
          await _API_.deleteDevice(id, this)
          commit('DELETE_DEVICE', id)
      }
  },

}

export default {
    state,
    getters,
    mutations,
    actions
}
