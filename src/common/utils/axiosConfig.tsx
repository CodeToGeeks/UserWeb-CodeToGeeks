import axios from 'axios'

axios.defaults.baseURL = process.env.API_BASE_URL
export const axiosConfig = (token: string) => {
  console.log({ axiosToken: token })
  axios.defaults.headers.common['x-auth-token'] =
    `${token}` || (localStorage.getItem('token') as string)
}
