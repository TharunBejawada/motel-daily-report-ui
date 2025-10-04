import axios, { type AxiosInstance } from 'axios'

export default defineNuxtPlugin((_nuxtApp) => {
  const config = useRuntimeConfig()

  const instance: AxiosInstance = axios.create({
    baseURL: config.public.apiBase,
    timeout: 30000
  })

  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      // Optional: expose backend message
      const msg = err?.response?.data?.detail || err.message
      console.error('[API ERROR]', msg)
      return Promise.reject(err)
    }
  )

  return {
    provide: {
      api: instance
    }
  }
})

declare module '#app' {
  interface NuxtApp {
    $api: import('axios').AxiosInstance
  }
}
declare module 'vue' {
  interface ComponentCustomProperties {
    $api: import('axios').AxiosInstance
  }
}
