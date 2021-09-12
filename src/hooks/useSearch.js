import React, { useState, useEffect } from "react";
import api_axios from "../api/api";

export default () => {
    const [business, setBusiness] = useState([]);
    const [error, setError] = useState("");

    const searchAPI = async (term, location) => {
        try {
            const res = await api_axios.get("/search", {
                params: {
                    term,
                    location,
                },
            });
            setBusiness(res.data);
            setError("");
        } catch (e) {
            console.log(e);
            setError("Oops... Something went wrong!");
        }
    };

    useEffect(() => {
        searchAPI("", "Atlanta, GA");
    }, []);

    return [searchAPI, business, error];
};
