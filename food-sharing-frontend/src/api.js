import axios from 'axios';

const api = axios.create({
  baseURL: 'const API_URL = 'http://3.22.224.142:8000/api/food_items/',
  timeout: 5000,
  headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`,
  },
});

