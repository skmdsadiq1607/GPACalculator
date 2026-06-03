import axios from 'axios'

const API = axios.create({ baseURL: '/api' })

const injectUser = (data) => {
  const stored = localStorage.getItem('gpa_user')
  if (stored) {
    try {
      const user = JSON.parse(stored)
      return { ...data, userId: user.userId, userEmail: user.email, studentName: user.name }
    } catch (e) { }
  }
  return data
}

export const getCurriculum = () => API.get('/curriculum')
export const getBranchCurriculum = (branch) => API.get(`/curriculum/${branch}`)
export const saveRecord = (data) => API.post('/records', injectUser(data))
export const getRecords = () => API.get('/records')
export const getUserRecords = (userId) => API.get(`/records/user/${userId}`)
export const getRecord = (id) => API.get(`/records/${id}`)
export const updateRecord = (id, data) => API.put(`/records/${id}`, injectUser(data))
export const deleteRecord = (id) => API.delete(`/records/${id}`)
