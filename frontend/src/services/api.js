import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const apiService = {
  async getMetrics() {
    const response = await axiosInstance.get('/api/metrics')
    return response.data
  },

  async predict(data) {
    const response = await axiosInstance.post('/api/predict', data)
    return response.data
  },

  async getRecommendations(studentId, topN = 5) {
    const response = await axiosInstance.post('/api/recommend', {
      student_id: studentId,
      top_n: topN,
    })
    return response.data
  },

  async getStudents() {
    const response = await axiosInstance.get('/api/students')
    return response.data
  },
}

export const api = apiService

