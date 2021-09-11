import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import SearchBar from "../components/searchBar";
import BusinessList from "../components/businessList";
import useSearch from "../hooks/useSearch";

const HomeScreen = () => {
    const [searchText, setSearchText] = useState("");
    const [searchAPI, business, error] = useSearch();

    console.log(business);

    const filterByPrice = (price) => business.filter((x) => x.price === price);

    return (
        <View>
            <SearchBar
                searchText={searchText}
                setSearchText={setSearchText}
                onSubmit={searchAPI}
            />
            {error ? <Text>{error}</Text> : null}
            <BusinessList
                business={filterByPrice("$")}
                title="Pocket Friendly Picks"
            />
            <BusinessList
                business={filterByPrice("$$")}
                title="Savoury Delight Picks"
            />
            <BusinessList
                business={filterByPrice("$$$")}
                title="Gourmet Picks"
            />
            <BusinessList
                business={filterByPrice("$$$$")}
                title="Gourmet Ultime Picks"
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default HomeScreen;
