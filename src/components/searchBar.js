import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const SearchBar = ({
    searchText,
    setSearchText,
    location,
    setLocation,
    onSubmit,
}) => {
    return (
        <>
            <View style={{ ...styles.background, height: 40 }}>
                <FontAwesome5
                    name="location-arrow"
                    style={{ ...styles.searchIcon, fontSize: 18 }}
                />
                <TextInput
                    style={styles.placeholderText}
                    placeholder="Location"
                    value={location}
                    onChangeText={setLocation}
                />
            </View>
            <View style={{ ...styles.background, height: 50 }}>
                <FontAwesome name="search" style={styles.searchIcon} />
                <TextInput
                    autoCapitalize="none"
                    style={styles.placeholderText}
                    placeholder="Search"
                    value={searchText}
                    onChangeText={setSearchText}
                    onEndEditing={() => onSubmit(searchText, location)}
                />
            </View>
        </>
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

export default SearchBar;
