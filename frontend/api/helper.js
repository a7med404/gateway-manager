const _handleError = (error, _this) => {
  if (error.response) {
    if (error.response.status === 400 || error.response.status === 404) {
      _this.$toast.error(error.response.data.message)
      return true
    }
  }

  const errorMessage = error.message
  _this.$toast.error(errorMessage)
  console.error(`You Have an Error => ${errorMessage}`, error)
}

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

export const del = (url, _this) => {
  try {
    _this.$axios.delete(url)
    _this.$toast.success('Item Deleted successfuly')
  } catch (error) {
    _handleError(error, _this)
  }
}
