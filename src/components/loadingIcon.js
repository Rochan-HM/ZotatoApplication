import React from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";

const LoadingIcon = ({ size, color }) => (
    <View style={[styles.loadingContainer, styles.horizontal]}>
        <ActivityIndicator size={size} color={color} />
    </View>
);

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
    },
});

export default LoadingIcon;
