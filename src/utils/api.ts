// src/utils/api.ts
import type { LoginFormData } from '@/types/auth'
import axios from 'axios'
// import auth from './auth'
// Create a centralized Axios instance with token handling
const apiClient = axios.create({
  baseURL: 'http://localhost:8080', // Set the base URL for all requests
  withCredentials: true // Include cookies with cross-site requests
})

// Add an interceptor to automatically include the Authorization token
// apiClient.interceptors.request.use(
//   config => {
//     const token = auth.getToken()
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`
//     } else {
//       console.error('No token found')
//       throw new Error('Authorization token is missing')
//     }
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

// API functions using the centralized axios instance

export const getdocsLogin = async (doctorData: LoginFormData) => {
  try {
    const response = await apiClient.post(`/api/doctors/login`, doctorData)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { error: error.response.data.message }
    } else {
      return { error: 'An unexpected error occurred' }
    }
  }
}

export const getdocs = async id => {
  return apiClient.get(`/api/doctors/list`)
}

export const getDoctorById = async (id: number) => {
  return apiClient.get(`/api/doctors/${id}`)
}

export const deletedoc = async (id: number) => {
  return apiClient.delete(`/api/doctors/${id}`)
}

export const updatedoc = async (id: number, doctorData: any) => {
  return apiClient.put(`/api/doctors/${id}`, doctorData)
}

export const adddoc = async (doctorData: FormData) => {
  return apiClient.post(`/api/doctors/add`, doctorData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getpatients = async => {
  return apiClient.get(`/api/users`)
}

export const deletepatient = async (id: number) => {
  return apiClient.delete(`/api/users/${id}`)
}

export const addpatient = async (patientData: FormData) => {
  return apiClient.post(`/api/users/add`, patientData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const updateUser = async (id: number, userData: any) => {
  return apiClient.put(`/api/users/${id}`, userData)
}

export const getPackages = async () => {
  return apiClient.get(`/api/package`)
}

export const createMedicalPackage = async (packageData: {
  name: string
  imageBase64: string
  tests: { name: string; icon: string }[]
}) => {
  return apiClient.post(`/api/package`, packageData, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
