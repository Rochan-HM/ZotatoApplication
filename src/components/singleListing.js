import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import StarRating from "./starRating";

const SingleBusiness = ({ listing }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.listingImage}
                source={{ uri: listing.image_url }}
            />
            <Text style={styles.listingName}>{listing.name}</Text>
            <View style={styles.metaInfo}>
                <StarRating rating={listing.rating} />
                <Text>{listing.review_count} Reviews</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
    },
    listingImage: {
        width: 200,
        height: 150,
        borderRadius: 10,
    },
    listingName: {
        fontWeight: "bold",
        fontSize: 16,
    },
    metaInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default SingleBusiness;
