import axios from "axios";

const api_axios = axios.create({
    baseURL: "https://cs4261project.herokuapp.com/",
    headers: {},
});

export default api_axios;
