import axios from 'axios'
import { store } from '@store/store'
axios.defaults.baseURL = process.env.API_BASE_URL
export const axiosConfig = () => {
  const token = store.getState().auth.token
  axios.defaults.headers.common['x-auth-token'] =
    `${token}` || (localStorage.getItem('token') as string)
}
