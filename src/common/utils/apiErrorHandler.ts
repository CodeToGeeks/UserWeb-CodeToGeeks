import axios, { AxiosError } from 'axios'

interface BackendError {
  message: string
}

export const apiErrorHandler = (error: Error | AxiosError): string => {
  if (axios.isAxiosError(error)) {
    const e = error as AxiosError
    const backendError = e.response?.data as BackendError
    console.log({ backendError })
    return backendError.message
  }
  return ''
}
