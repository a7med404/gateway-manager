const _handleError = (error, _this) => {
  if (error.response) {
    if (error.response.status === 400) {
      for (const [key, value] of Object.entries(error.response.data.message)) {
        _this.$toast.error(value)
      }
      return true
    }
  }

  const errorMessage = error.message
  _this.$toast.error(errorMessage)
  console.error(`You Have an Error => ${errorMessage}`, error)
}

export const makeQueryString = async (query) =>
  await Object.keys(query)
    .map((key) => key + '=' + query[key])
    .join('&')

export const get = async (url, _this) => {
  try {
    const res = await _this.$axios.get(url)
    if (res.data.data) {
      return res.data.data
    }
    return res.data
  } catch (error) {
    _handleError(error, _this)
  }
}

export const post = async (url, data = {}, _this) => {
  try {
    const res = await _this.$axios.post(url, data)
    if (res.data.data) {
      return res.data.data
    }
    return res.data
  } catch (error) {
    _handleError(error, _this)
  }
}

/**
 * Handle update
 * @param {string} url => api url
 * @param {*} data => user data
 */
export const update = async (url, data, _this) => {
  try {
    const res = await _this.$axios.put(url, data)
    if (res.data) {
      return res.data.data || res.data
    }
    return res.data || res
  } catch (error) {
    _handleError(error, _this)
  }
}

/**
 * Handle delete
 * @param {string} url => api url
 * @param {*} data => user data
 */
export const del = (url, _this) => {
  try {
    _this.$axios.delete(url)
    _this.$toast.success('Item Deleted successfuly')
  } catch (error) {
    _handleError(error, _this)
  }
}
