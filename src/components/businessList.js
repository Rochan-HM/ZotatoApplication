import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { withNavigation } from "react-navigation";
import SingleListing from "./singleListing";
import { FontAwesome } from "@expo/vector-icons";

const BusinessList = ({ title, business, stars, navigation }) => {
    if (business.length === 0) return null;

    const arr = [...Array(stars).keys()];

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.titleStyle}>{title}</Text>
            <View style={{ marginLeft: 8 }}>
                <FlatList
                    horizontal
                    keyExtractor={(b) => b.toString()}
                    data={arr}
                    renderItem={({ _ }) => (
                        <FontAwesome name="dollar" style={styles.iconStyle} />
                    )}
                />
            </View>
            <FlatList
                keyExtractor={(b) => b.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={business}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("Restaurant", { id: item.id })
                        }
                    >
                        <SingleListing listing={item} />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        marginBottom: 20,
    },
    titleStyle: {
        fontSize: 20,
        marginLeft: 10,
        fontWeight: "bold",
        // marginBottom: 10,
    },
    iconStyle: { marginHorizontal: 2, fontSize: 16, marginBottom: 10 },
});

export default withNavigation(BusinessList);
