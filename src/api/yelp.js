import axios from "axios";

const yelp_axios = axios.create({
    baseURL: "https://api.yelp.com/v3/businesses",
    headers: {
        Authorization:
            "Bearer a4rQk2e8DjligH1Mq6Q5kZuDBbGCjsA5XiJmLqvE_M5u_QBTMykQl_eVO7b8oWEdII_e1QkrINzqg8myRaYFQBZxzT-P0fGngPyEVu3QzPwpmEsQ7YlGwtLWnRc9YXYx",
    },
});

export default yelp_axios;
