import axios from "axios";
import dotenv from "dotenv"

// Load environment variables from a .env file in the current directory
let dotenv2 = dotenv.config();
console.log(dotenv2)


console.log("Test.................................")
console.log(import.meta.env.VITE_BACKEND_API_ROOT_URL)

console.log("Or logic..")

const test = process.env.VITE_BACKEND_API_ROOT_URL || import.meta.env.VITE_BACKEND_API_ROOT_URL
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
