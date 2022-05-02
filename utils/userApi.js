import { request } from './api'
import { confApi } from './environments'

const HOSTNAME =  confApi.URL_API

export function index(params = {}) {
  const url = `${HOSTNAME}/api/users`
  return request('get',url,{},true, params)
}

export function show(id, params = {}) {
  const url = `${HOSTNAME}/api/users/${id}`
  return request('get',url,{},true, params)
}

export function update(id, data, params = {}) {
  const url = `${HOSTNAME}/api/users/${id}`
  return request('put', url, data,true, params)
}

export function create(data, params = {}) {
  const url = `${HOSTNAME}/api/users`
  return request('post', url, data,true, params)
}


export function userget() {
  const url = `${HOSTNAME}/api/userget`
  return request('get',url,{},true)
}


