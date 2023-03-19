<template>
  <section class="antialiased bg-gray-100 text-gray-600 h-screen px-4">
    <div class="flex flex-col justify-center h-full">
      <div
        class="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200"
      >
        <header
          class="border-b border-gray-100 flex items-center justify-between px-5 py-4"
        >
          <h2 class="font-semibold text-gray-800">Gateways</h2>
          <button
            class="uppercase font-semibold tracking-wide bg-green-100 text-green-700 px-4 py-2 rounded-lg mt-2 focus:outline-none hover:bg-green-200"
            @click="dailog = !dailog"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 inline"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Add Gateway
          </button>
        </header>
        <div class="p-3">
          <div class="overflow-x-auto">
            <table class="table-auto w-full">
              <thead
                class="text-xs font-semibold uppercase text-gray-500 bg-gray-50"
              >
                <tr>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-left">Name</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-left">Serial Number</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-left">IP Address</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-center">devices number</div>
                  </th>
                  <th class="p-2 whitespace-nowrap text-center">
                    <div class="font-semibold text-center">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody
                v-if="gateways.length"
                class="text-sm divide-y divide-gray-100"
              >
                <tr v-for="gateway in gateways" :key="gateway._id">
                  <td class="p-2 whitespace-nowrap">
                    <div class="flex items-center">
                      <div
                        class="font-medium text-blue-500"
                      >
                      <nuxt-link
                        tag="a"
                        class="dropdown-item"
                        :to="{
                          name: 'gateways-id-show',
                          params: { id: gateway._id },
                        }"
                        v-text="gateway.name"
                      />
                      </div>
                    </div>
                  </td>
                  <td class="p-2 whitespace-nowrap">
                    <div class="text-left" v-text="gateway.serialNumber"></div>
                  </td>
                  <td class="p-2 whitespace-nowrap">
                    <div class="text-left" v-text="gateway.ipv4Address"></div>
                  </td>
                  <td class="p-2 whitespace-nowrap">
                    <div
                      class="text-center font-medium"
                      :class="gateway.devices.length == 10 ? 'text-red-500' : 'text-green-500'"
                      v-text="gateway.devices.length"
                    ></div>
                  </td>
                  <td class="flex justify-evenly text-center">
                    <nuxt-link
                      tag="a"
                      class="dropdown-item"
                      :to="{
                        name: 'gateways-id-show',
                        params: { id: gateway._id },
                      }"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fill-rule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </nuxt-link>
                    -
                    <a
                      class="dropdown-item"
                      href="#"
                      @click.prevent="tryToDeleteGateway(gateway._id)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="red"
                        style="color: antiquewhite"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </a>
                  </td>
                </tr>
              </tbody>
              <tbody v-if="loading" class="text-sm divide-y divide-gray-100">
                <tr>
                  <td colspan="4" class="p-2 whitespace-nowrap text-center">
                    <div class="flex items-center mx-auto my-6">
                      <div class="font-medium mx-auto text-gray-400">
                        Loading please wait...
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody
                v-if="!gateways.length && !loading"
                class="text-sm divide-y divide-gray-100"
              >
                <tr>
                  <td colspan="4" class="p-2 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="font-medium mx-auto text-gray-400">
                        No Gateways please add some!
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div
      id="modal"
      :class="{ hidden: !dailog }"
      class="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4"
    >
      <div
        class="relative top-40 mx-auto shadow-lg rounded-md bg-white max-w-md"
      >
        <div
          class="flex justify-between items-center bg-green-500 text-white text-xl rounded-t-md px-4 py-2"
        >
          <h3>Gateway Details</h3>
          <button @click="dailog = !dailog">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <div
          class="border relative px-4 pt-7 pb-8 bg-white shadow-xl w-full max-w-md mx-auto sm:px-10 rounded-b-md"
        >
          <form @submit.prevent="onSubmit">
            <label class="block">Serial Number</label>
            <input
              v-model="gatewayForm.serialNumber"
              type="text"
              class="border w-full h-10 px-3 mb-5 rounded-md"
              placeholder="Serial Number"
            />
            <label class="block">Name</label>
            <input
              v-model="gatewayForm.name"
              type="text"
              class="border w-full h-10 px-3 mb-5 rounded-md"
              placeholder="name"
            />
            <label class="block">IP Address</label>
            <input
              v-model="gatewayForm.ipv4Address"
              type="text"
              class="border w-full h-10 px-3 mb-5 rounded-md"
              placeholder="127.0.0.1"
            />
            <button
              type="submit"
              :disabled="loading"
              class="mt-5 bg-green-500 hover:bg-blue-700 shadow-xl text-white uppercase text-sm font-semibold px-14 py-3 rounded"
            >
              {{ loading ? 'Creating...' : 'Save Gateway' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      dailog: false,
      gatewayForm: {
        serialNumber: '',
        ipv4Address: '',
        name: '',
      },
    }
  },

  head() {
    return {
      title: 'Gateways',
    }
  },

  computed: {
    ...mapGetters({ gateways: 'gateway/gateways' }),
  },

  async created() {
    this.loading = await true
    await this.fetchGateways()
    this.loading = await false
  },

  methods: {
    ...mapActions({
      fetchGateways: 'gateway/fetchGateways',
      deleteGateway: 'gateway/deleteGateway',
      createGateway: 'gateway/createGateway',
    }),

    async onSubmit() {
      this.loading = await true
      this.gatewayForm.gateway = this.$route.params.id
      const res = await this.createGateway(this.gatewayForm)
      this.loading = await false
      if (res) {
        this.gatewayForm = {}
        this.$toast.success('Gateway created successfully.')
        this.dailog = !this.dailog
      }
    },

    async tryToDeleteGateway(id) {
      await this.deleteGateway(id)
    },

    showGateway(id) {
      this.$router.push({ name: 'show-gateway', params: { id } })
    },
  },
}
</script>
