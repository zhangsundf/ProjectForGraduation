import axios from 'axios'

export const checkLogin = params => { return axios.post(`http://127.0.0.1/login`,params).then(res => res.data )}
export const getUserInfo = params => { return axios.post(`http://127.0.0.1/`)}
