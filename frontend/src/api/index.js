import axios from 'axios';

const service = axios.create({
    baseURL: process.env.API_URL || 'http://localhost:8000/api',
});

service.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    });


export default service;

