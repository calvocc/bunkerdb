import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    timeout: 50000,
})

export default clienteAxios;