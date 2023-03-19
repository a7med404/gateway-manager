<template>
  <!-- component -->
  <section class="antialiased bg-gray-100 text-gray-600 h-screen px-4">
    <div class="flex flex-col justify-center h-full">
      <!-- Table -->
      <!-- component -->

      <div
        v-if="gateway"
        class="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200"
      >
        <!-- component -->
        <div class="py-4 px-8 bg-white shadow-lg rounded-lg my-5">
          <div>
          </button>
            <h2 class="text-gray-800 text-3xl font-semibold">
              Gateway [{{ gateway.name }}] Details
            </h2>
            <p
              class="mt-2 text-gray-600"
              v-text="`IP Address: ${gateway.iPv4Address}`"
            ></p>
          </div>
          <div class="flex justify-between mt-4">
            <nuxt-link to="/">
            <button
              class="uppercase font-semibold tracking-wide bg-blue-100 text-blue-700 px-4 py-2 rounded-lg mt-2 focus:outline-none hover:bg-blue-200"
              @click="dailog = !dailog"
            >
              Back
            </button>
            </nuxt-link>
            <button
              class="uppercase font-semibold tracking-wide bg-green-100 text-green-700 px-4 py-2 rounded-lg mt-2 focus:outline-none hover:bg-green-200"
              @click="dailog = !dailog"
            >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
              Add Device
            </button>
          </div>
        </div>

        <header v-if="gateway" class="px-5 py-4 border-b border-gray-100">
          <h2 class="font-semibold text-gray-800">
            Gateway's devices [{{ gateway.devices.length }}]
          </h2>
        </header>
        <div class="max-h-72 overflow-y-scroll p-3">
          <div class="overflow-x-auto">
            <table class="table-auto w-full">
              <thead

                v-if="gateway.devices.length"
                class="text-xs font-semibold uppercase text-gray-500 bg-gray-50"
              >
                <tr>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-left">Vendor</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-center">Status</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-left">Created At</div>
                  </th>
                  <th class="p-2 whitespace-nowrap  text-center">
                    <div class="font-semibold">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody v-if="gateway" class="text-sm divide-y divide-gray-100">
                <tr v-for="device in gateway.devices" :key="device.id">
                  <td class="p-2 whitespace-nowrap">
                    <div class="flex items-center">
                      <div
                        class="font-medium text-gray-800"
                        v-text="device.vendor"
                      ></div>
                    </div>
                  </td>
                  <td class="p-2 whitespace-nowrap">
                    <div
                      class="text-center font-medium"
                      :class="
                        device.status == 'OFFLINE'
                          ? 'text-red-500'
                          : 'text-green-500'
                      "
                      v-text="device.status"
                    ></div>
                  </td>
                  <td class="p-2 whitespace-nowrap">
                    <div class="text-left" v-text="device.createdAt"></div>
                  </td>
                  <td class="p-2 whitespace-nowrap text-center">
                    <div class="text-lg text-center">
                      <a
                        class="dropdown-item mx-auto"
                        href="#"
                        @click.prevent="tryToDeleteDevice(device.id)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-6 mx-auto w-6"
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
                    </div>
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
                v-if="!gateway.devices.length && !loading"
                class="text-sm divide-y divide-gray-100"
              >
                <tr>
                  <td colspan="4" class="p-2 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="font-medium mx-auto text-gray-400">
                        No devices please add some!
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

    <!-- component -->
    <div
      id="modal"
      :class="{ hidden: !dailog }"
      class="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4"
    >
      <div
        class="relative top-40 mx-auto shadow-lg rounded-md bg-white max-w-md"
      >
        <!-- Modal header -->
        <div
          class="flex justify-between items-center bg-green-500 text-white text-xl rounded-t-md px-4 py-2"
        >
          <h3>Device Details</h3>
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
            <label class="block">Vendor</label>
            <input
              v-model="deviceForm.vendor"
              type="text"
              class="border w-full h-10 px-3 mb-5 rounded-md"
              placeholder="vendor"
            />
            <div class="flex items-start w-full">
              <div class="flex items-start w-full">
                <div class="flex items-center w-full">
                  <div class="col-span-6 sm:col-span-3 w-full">
                    <label
                      for="country"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Status</label
                    >
                    <select
                      id="country"
                      v-model="deviceForm.status"
                      autocomplete="country"
                      class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="ONLINE">Online</option>
                      <option value="OFFLINE">Offline</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              :disabled="loading"
              class="mt-5 bg-green-500 hover:bg-blue-700 shadow-xl text-white uppercase text-sm font-semibold px-14 py-3 rounded"
            >
              {{ loading ? 'Creating...' : 'Save Device' }}
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
  components: {},
  data() {
    return {
      loading: false,
      dailog: false,
      deviceForm: {
        gateway: '',
        vendor: '',
        status: 'OFFLINE',
      },
    }
  },

  head() {
    return {
      title: 'Show Gateway',
    }
  },

  computed: {
    ...mapGetters({ gateway: 'gateway/gateway' }),
  },

  async created() {
    this.loading = await true
    await this.fetchGateway(this.$route.params.id)
    this.loading = await false
  },

  methods: {
    ...mapActions({
      fetchGateway: 'gateway/fetchGateway',
      deleteDevice: 'gateway/deleteDevice',
      createDevice: 'gateway/createDevice',
    }),

    async onSubmit() {
      this.loading = await true
      this.deviceForm.gateway = this.$route.params.id
      const res = await this.createDevice(this.deviceForm)
      this.loading = await false
      if (res) {
        this.deviceForm.vendor = ''
        this.$toast.success('Device created successfully.')
        this.dailog = !this.dailog
      }
    },

    async tryToDeleteDevice(id) {
      await this.deleteDevice(id)
    },
  },
}
</script>
