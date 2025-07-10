import axios from "axios"

const API_BASE_URL = "http://localhost:3000"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const jobsApi = {
  getAll: async () => {
    const response = await api.get("/jobs/list")
    return response.data
  },

  create: async (jobData) => {
    const response = await api.post("/jobs", jobData)
    return response.data
  },

  update: async (id, jobData) => {
    const response = await api.put(`/jobs/${id}`, jobData)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/jobs/${id}`)
    return response.data
  },

  getStats: async () => {
    const response = await api.get("/jobs/stats")
    return response.data
  },
}
