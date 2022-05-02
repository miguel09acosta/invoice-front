import axios from 'axios'

const getToken = function () {
  if (process.server){
    //server side
    return
  }
  if (window.$nuxt){
    return window.$nuxt.$auth.getToken('local')
  }
}

export async function request(method, url, data, auth = false, params = {}) {
  const headers = {}
  if (auth){
    headers['Authorization'] = getToken()
    headers['Accept'] = 'application/json'
  }
  try {
    //call api
    return await axios({
      params,
      method,
      url,
      data,
      headers
    })
  } catch (e) {
    console.log('error: ',e)
  }
}
