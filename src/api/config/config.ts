import axios from "axios";


//If prod detected, set production backend url otherwise always assume it is dev
let backendApiRootUrl
if(import.meta.env.MODE === 'production'){
  backendApiRootUrl = 'https://ledger-app-nodejs-1.drewmcburney.com'
}else {
  backendApiRootUrl = 'http://localhost:3000'
}

console.log(`Backend url:: ${backendApiRootUrl}`)



// initializing the axios instance with custom configs
export const api = axios.create({
  withCredentials: true,
  // adding a custom language header
  headers: {
    "Custom-Language": "en",
  },
});

const baseApiUrl = `${backendApiRootUrl}/api/v1`

export const userRoute = `${baseApiUrl}/user`;

export const organizationRoute = `${baseApiUrl}/organization`;
