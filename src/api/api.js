import axios from "axios";

const api_axios = axios.create({
    baseURL: "https://cs4261project.herokuapp.com",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api_axios;
