import { request } from './api'
import {confApi} from "@/utils/environments";


const HOSTNAME = confApi.URL_API

export function index(params = {}) {
  const url = `${HOSTNAME}/api/admincategories`
  return request('get',url,{},true, params)
}


