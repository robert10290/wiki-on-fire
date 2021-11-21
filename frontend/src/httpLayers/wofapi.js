import axios from "axios";

const wofApi = axios.create({
  baseURL: "http://localhost/api/",
  timeout: 5000
})

export default wofApi;