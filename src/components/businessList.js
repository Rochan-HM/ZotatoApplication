import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import SingleBusiness from "./singleBusiness";

const BusinessList = ({ title, business }) => {
    return (
        <View>
            <Text style={styles.titleStyle}>{title}</Text>
            <FlatList
                keyExtractor={(b) => b.id}
                horizontal
                data={business}
                renderItem={({ item }) => <SingleBusiness listing={item} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 20,
    },
});

export default BusinessList;
