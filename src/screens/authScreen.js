import React, { useState, useEffect } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
} from "react-native";
import api_axios from "../api/api";
import { withNavigation } from "react-navigation";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [token, setToken] = useState("");

    const signup = async (email, password) => {
        if (!email || !password) return;

        try {
            const response = await api_axios.post("/signup", {
                email,
                password,
            });
            await AsyncStorage.setItem("token", response.data.token);

            console.log("Signup Done");
            setError("");
            navigation.navigate("Home");
        } catch (e) {
            console.error(e.response.data.error);
            setError(e.response.data.error);
            navigation.navigate("Home");
        }
    };

    const signin = async (email, password) => {
        if (!email || !password) return;

        try {
            const response = await api_axios.post("/signin", {
                email,
                password,
            });
            await AsyncStorage.setItem("token", response.data.token);

            console.log("Signin Done");
            setError("");
            navigation.navigate("Home");
        } catch (e) {
            console.error(e.response.data.error);
            setError(e.response.data.error);
            navigation.navigate("Home");
        }
    };

    const signout = async () => {
        await AsyncStorage.removeItem("token");
        navigation.navigate("Home");
    };

    const checkSignIn = async () => {
        const token = await AsyncStorage.getItem("token");
        setToken(token);
    };

    useEffect(() => {
        checkSignIn();
    }, []);

    return (
        <View
            style={{
                flex: 1,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                justifyContent: "center",
            }}
        >
            {!token ? (
                <View>
                    <View style={styles.background}>
                        <FontAwesome
                            name="user"
                            style={{ ...styles.searchIcon, fontSize: 20 }}
                        />
                        <TextInput
                            style={styles.placeholderText}
                            autoCorrect={false}
                            autoCapitalize="none"
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>
                    <View style={styles.background}>
                        <FontAwesome5
                            name="key"
                            style={{ ...styles.searchIcon, fontSize: 20 }}
                        />
                        <TextInput
                            autoCapitalize="none"
                            secureTextEntry
                            autoCorrect={false}
                            autoCapitalize="none"
                            style={styles.placeholderText}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    {error ? (
                        <Text
                            style={{
                                color: "red",
                                marginLeft: 10,
                                fontSize: 16,
                            }}
                        >
                            {error}
                        </Text>
                    ) : null}

                    <TouchableOpacity
                        style={{
                            marginVertical: 20,
                            justifyContent: "center",
                            backgroundColor: "brown",
                            marginHorizontal: 10,
                            height: 50,
                        }}
                        onPress={() => {
                            signin(username.trim(), password.trim());
                        }}
                    >
                        <Text
                            style={{
                                alignSelf: "center",
                                fontSize: 15,
                                fontWeight: "bold",
                                textTransform: "uppercase",
                            }}
                        >
                            Sign In
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            marginVertical: 10,
                            justifyContent: "center",
                            backgroundColor: "brown",
                            marginHorizontal: 10,
                            height: 50,
                        }}
                        onPress={() => {
                            signup(username.trim(), password.trim());
                        }}
                    >
                        <Text
                            style={{
                                alignSelf: "center",
                                fontSize: 15,
                                fontWeight: "bold",
                                textTransform: "uppercase",
                            }}
                        >
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity
                    style={{
                        marginVertical: 10,
                        justifyContent: "center",
                        backgroundColor: "brown",
                        marginHorizontal: 10,
                        height: 50,
                    }}
                    onPress={() => {
                        signout();
                    }}
                >
                    <Text
                        style={{
                            alignSelf: "center",
                            fontSize: 15,
                            fontWeight: "bold",
                            textTransform: "uppercase",
                        }}
                    >
                        Sign Out
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#ccc",
        borderRadius: 10,
        marginVertical: 13,
        marginHorizontal: 10,
        display: "flex",
        flexDirection: "row",
        height: 50,
    },
    placeholderText: {
        flex: 2,
        fontSize: 18,
    },
    searchIcon: {
        fontSize: 25,
        color: "black",
        alignSelf: "center",
        marginHorizontal: 8,
    },
});

export default withNavigation(AuthScreen);
