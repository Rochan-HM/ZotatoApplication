import React, { useState, useEffect } from "react";
import yelp_axios from "../api/yelp";

export default () => {
    const [business, setBusiness] = useState([]);
    const [error, setError] = useState("");

    const searchAPI = async (term) => {
        try {
            const res = await yelp_axios.get("/search", {
                params: {
                    term,
                    limit: 50,
                    price: [1, 2, 3, 4],
                    location: "North Ave NW, Atlanta, GA 30332",
                },
            });
            setBusiness(res.data.businesses);
            setError("");
        } catch (e) {
            console.log(e);
            setError("Oops... Something went wrong!");
        }
    };

    useEffect(() => {
        searchAPI("Pasta");
    }, []);

    return [searchAPI, business, error];
};
