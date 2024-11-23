export const interceptor = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken')

      config.headers = {
        Authorization: token ? `Bearer ${token}` : null,
      }
      return config
    },
    (error) => Promise.reject(error.response)
  )
  return instance
}