import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";

export default function App() {
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />
            <TouchableOpacity
                onPress={() => {
                    console.log("Hello world!");
                }}
            >
                <Text> Hello testing 123!</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
