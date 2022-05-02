import { request } from './api'
import { confApi } from './environments'

const HOSTNAME =  confApi.URL_API

export function index(params = {}) {
  const url = `${HOSTNAME}/api/transactions`
  return request('get',url,{},true, params)
}

export function show(id, params = {}) {
  const url = `${HOSTNAME}/api/transactions/${id}`
  return request('get',url,{},true, params)
}

export function update(id, data, params = {}) {
  const url = `${HOSTNAME}/api/transactions/${id}`
  return request('put', url, data,true, params)
}

export function create(data, params = {}) {
  const url = `${HOSTNAME}/api/transactions`
  return request('post', url, data,true, params)
}

export function destroy(id, params = {}) {
  const url = `${HOSTNAME}/api/transactions/${id}`
  return request('delete', url, {},true, params)
}


