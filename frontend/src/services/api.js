import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-real-estate-crm.onrender.com/api",
});

export default API;