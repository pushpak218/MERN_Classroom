import axios from 'axios';

const API_URL = 'https://mern-classroom-backend.onrender.com';

export const api = axios.create({
  baseURL: API_URL,
});
