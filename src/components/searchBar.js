import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

import { FontAwesome } from "@expo/vector-icons";

const SearchBar = ({ searchText, setSearchText, onSubmit }) => {
    return (
        <View style={styles.background}>
            <FontAwesome name="search" style={styles.searchIcon} />
            <TextInput
                autoCapitalize="none"
                style={styles.searchText}
                placeholder="Search"
                value={searchText}
                onChangeText={setSearchText}
                onEndEditing={() => onSubmit(searchText)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#ccc",
        height: 50,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        display: "flex",
        flexDirection: "row",
    },
    searchText: {
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

export default SearchBar;
