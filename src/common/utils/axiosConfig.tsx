import axios from 'axios'

axios.defaults.baseURL = process.env.API_BASE_URL
export const axiosConfig = (token: string) => {
  axios.defaults.headers.common['token'] = `Bearer ${token}`
}
