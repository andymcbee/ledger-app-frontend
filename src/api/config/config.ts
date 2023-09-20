import axios from "axios";



console.log("Test.................................")
console.log(import.meta.env.VITE_BACKEND_API_ROOT_URL)

const test = process.env.VITE_BACKEND_API_ROOT_URL || import.meta.env.VITE_BACKEND_API_ROOT_URL
console.log("Or logic for env var:::::::")
console.log(test)

// initializing the axios instance with custom configs
export const api = axios.create({
  withCredentials: true,
  // adding a custom language header
  headers: {
    "Custom-Language": "en",
  },
});

const baseApiUrl = `${import.meta.env.VITE_BACKEND_API_ROOT_URL}/api/v1`

export const userRoute = `${baseApiUrl}/user`;

export const organizationRoute = `${baseApiUrl}/organization`;
