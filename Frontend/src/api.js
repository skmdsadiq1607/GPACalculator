import axios from 'axios'

const API = axios.create({ baseURL: '/api' })

export const getCurriculum = () => API.get('/curriculum')
export const getBranchCurriculum = (branch) => API.get(`/curriculum/${branch}`)
export const saveRecord = (data) => API.post('/records', data)
export const getRecords = () => API.get('/records')
export const getRecord = (id) => API.get(`/records/${id}`)
export const updateRecord = (id, data) => API.put(`/records/${id}`, data)
export const deleteRecord = (id) => API.delete(`/records/${id}`)
