import React, { useState, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Button,
} from "react-native";
import { withNavigation } from "react-navigation";

import SearchBar from "../components/searchBar";
import BusinessList from "../components/businessList";
import useSearch from "../hooks/useSearch";
import { Context } from "../context/authContext";

const HomeScreen = ({ navigation }) => {
    const [location, setLocation] = useState("Atlanta, GA");
    const [searchText, setSearchText] = useState("");
    const [searchAPI, business, error] = useSearch();

    const filterByPrice = (price) => business.filter((x) => x.price === price);

    const { state } = useContext(Context);
    const isSignedIn = state.token;

    return (
        <>
            <Button
                onPress={() => navigation.navigate("Auth")}
                title={isSignedIn ? "Sign Out" : "Sign In"}
                color={isSignedIn ? "red" : "green"}
            />

            <SearchBar
                searchText={searchText}
                setSearchText={setSearchText}
                location={location}
                setLocation={setLocation}
                onSubmit={searchAPI}
            />
            {error ? <Text>{error}</Text> : null}
            <ScrollView>
                <BusinessList
                    business={filterByPrice("$")}
                    title="Pocket Friendly Picks"
                    stars={1}
                />
                <BusinessList
                    business={filterByPrice("$$")}
                    title="Savoury Delight Picks"
                    stars={2}
                />
                <BusinessList
                    business={filterByPrice("$$$")}
                    title="Gourmet Picks"
                    stars={3}
                />
                <BusinessList
                    business={filterByPrice("$$$$")}
                    title="Ultimate Gourmet Picks"
                    stars={4}
                />
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    authBtn: {
        margin: 30,
    },
});

export default withNavigation(HomeScreen);
