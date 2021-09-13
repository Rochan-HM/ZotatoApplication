import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { View, StyleSheet, FlatList } from "react-native";

const StarRating = ({ rating, starSize }) => {
    const base = Math.floor(rating);
    const half = rating - base;

    const ratings_arr = [...Array(base).keys(), half];

    return (
        <View style={styles.containerStyle}>
            <FlatList
                numColumns={ratings_arr.length}
                keyExtractor={(b) => b.toString()}
                data={ratings_arr}
                renderItem={({ item }) => {
                    if (item === 0.5) {
                        return (
                            <FontAwesome
                                name="star-half"
                                size={starSize || 16}
                                style={styles.starStyle}
                            />
                        );
                    } else {
                        return (
                            <FontAwesome
                                name="star"
                                size={starSize || 16}
                                style={styles.starStyle}
                            />
                        );
                    }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
    },
    starStyle: {
        color: "gold",
        alignSelf: "flex-start",
    },
});

export default StarRating;
