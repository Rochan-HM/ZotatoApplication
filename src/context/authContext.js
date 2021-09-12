import api_axios from "../api/api";
import createDataContext from "./createDataContext";

import AsyncStorage from "@react-native-async-storage/async-storage";

const authReducer = (state, action) => {
    switch (action.type) {
        case "add_error":
            return { ...state, errorMessage: action.payload };

        case "signin":
            return { errorMessage: "", token: action.payload };

        default:
            return state;
    }
};

const signup =
    (dispatch) =>
    async ({ email, password }) => {
        try {
            const response = await api_axios.post("/signup", {
                email,
                password,
            });
            await AsyncStorage.setItem("token", response.data.token);

            dispatch({
                type: "signin",
                payload: response.data.token,
            });
        } catch (e) {
            dispatch({
                type: "add_error",
                payload: "Something went wrong or email already exists!",
            });
        }
    };

const signin =
    (dispatch) =>
    async ({ email, password }) => {
        try {
            const response = await api_axios.post("/signin", {
                email,
                password,
            });
            await AsyncStorage.setItem("token", response.data.token);

            dispatch({
                type: "signin",
                payload: response.data.token,
            });
        } catch (e) {
            dispatch({
                type: "add_error",
                payload: "Something went wrong or email already exists!",
            });
        }
    };

const signout = (dispatch) => {
    async ({ email, password }) => {};
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup },
    { token: null, errorMessage: "" }
);
