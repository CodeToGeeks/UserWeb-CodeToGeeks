import axios, { AxiosError } from 'axios'
interface BackendError {
  message: string
}

export const apiErrorHandler = (error: Error | AxiosError): string => {
  if (axios.isAxiosError(error)) {
    const e = error as AxiosError
    if (e.response?.status === 401) {
      return 'The authentication session has expired. Please sign-in again'
    }
    const backendError = e.response?.data as BackendError
    return backendError.message
  }

  return ''
}
