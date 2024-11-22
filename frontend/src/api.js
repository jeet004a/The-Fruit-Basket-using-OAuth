import axios from 'axios'

const api = axios.create({
    // baseURL: 'http://localhost:8000/auth/'
    baseURL: 'http://localhost:8001/signup/'
})

export const googleAuth = (code) => api.get(`/google?code=${code}`)