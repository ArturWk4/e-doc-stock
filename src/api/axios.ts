import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});