import axios from "axios";

const API = axios.create({
  baseURL: "https://inventory-managment-system-with-docker.onrender.com",
});

export default API;