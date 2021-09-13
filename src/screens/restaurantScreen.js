import React, { useState, useEffect, useContext } from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    FlatList,
    Linking,
    TouchableOpacity,
    LogBox,
    ScrollView,
    TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import openMap from "react-native-open-maps";

import api_axios from "../api/api";
import LoadingIcon from "../components/loadingIcon";
import StarRating from "../components/starRating";
import { Context } from "../context/authContext";

const RestaurantScreen = ({ navigation }) => {
    const id = navigation.getParam("id");
    const [result, setResult] = useState(null);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState("");
    const [newComment, setNewComment] = useState("");

    const { state } = useContext(Context);
    const isSignedIn = state.token;
    // const isSignedIn = true;

    const fetchData = async () => {
        try {
            const res = await api_axios.get(`/details/${id}`);
            const res2 = await api_axios.get(`/reviews/${id}`);
            setResult(res.data);
            setComments(res2.data);
            setError("");
        } catch (e) {
            setError(e.message);
        }
    };

    const submitReview = async () => {
        if (!isSignedIn) return;
        try {
            await api_axios.post("/reviews", {
                businessID: id,
                review: newComment,
            });

            setError("");
        } catch (e) {
            setError(e.message);
        }
    };

    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
        fetchData();
    }, []);

    if (error) return null;

    if (!result) {
        return <LoadingIcon size="large" color="brown" />;
    }

    return (
        <ScrollView>
            {/* Name of Business */}
            <Text style={styles.listingTitle}>{result.name}</Text>

            {/* Whether Open or Not */}
            {result.hours[0].is_open_now ? (
                <Text
                    style={{
                        ...styles.hoursText,
                        color: "green",
                    }}
                >
                    Open Now
                </Text>
            ) : (
                <Text
                    style={{
                        ...styles.hoursText,
                        color: "red",
                    }}
                >
                    Closed Now
                </Text>
            )}

            {/* Meta Data  */}
            <View style={styles.metaContainer}>
                {/* Reviews */}
                <View style={styles.starRatingContainer}>
                    <StarRating rating={result.rating} starSize={24} />
                    <Text style={styles.reviewNumber}>
                        {result.review_count} Reviews
                    </Text>
                </View>

                {/* Phone Number */}
                <TouchableOpacity
                    onPress={() => {
                        Linking.openURL(`tel:${result.phone}`);
                    }}
                >
                    <View style={{ flexDirection: "row", marginVertical: 10 }}>
                        <Ionicons name="call" size={18} color="blue" />
                        <Text style={styles.subMetaText}>
                            {result.display_phone}
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* Address */}
                <TouchableOpacity
                    onPress={() => {
                        openMap({
                            latitude: result.coordinates.latitude,
                            longitude: result.coordinates.longitude,
                            zoom: 30,
                        });
                    }}
                >
                    <View style={{ flexDirection: "row", marginVertical: 5 }}>
                        <Entypo name="location" size={18} color="orange" />
                        <Text style={styles.subMetaText}>
                            {result.location.display_address.join(" ")}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Images */}
            <View style={styles.imageContainer}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item}
                    data={result.photos}
                    renderItem={({ item }) => {
                        return (
                            <Image
                                style={styles.listingImage}
                                source={{ uri: item }}
                            />
                        );
                    }}
                />
            </View>

            {/* Cuisines */}
            <View
                style={{
                    marginLeft: 5,
                    flexDirection: "row",
                    marginVertical: 5,
                }}
            >
                <Ionicons name="leaf-sharp" size={24} color="gold" />
                <Text
                    style={{ marginLeft: 5, fontSize: 22, fontWeight: "bold" }}
                >
                    Cuisines
                </Text>
            </View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.alias}
                data={result.categories}
                renderItem={({ item }) => (
                    <Text
                        style={{
                            marginLeft: 36,
                            fontSize: 18,
                            color: "blue",
                        }}
                    >
                        {item.title}
                    </Text>
                )}
            />

            {/* Reviews */}
            <View
                style={{
                    marginLeft: 5,
                    flexDirection: "row",
                    marginVertical: 20,
                }}
            >
                <MaterialIcons name="rate-review" size={24} color="gold" />
                <Text
                    style={{ marginLeft: 5, fontSize: 22, fontWeight: "bold" }}
                >
                    Reviews
                </Text>
            </View>
            <FlatList
                keyExtractor={(item) => item.id.toString()}
                data={comments}
                renderItem={({ item }) => (
                    <>
                        <FontAwesome
                            name="quote-left"
                            size={22}
                            color="gold"
                            style={{ marginLeft: 10 }}
                        />
                        <Text
                            style={{
                                marginLeft: 36,
                                fontStyle: "italic",
                                textTransform: "uppercase",
                                color:
                                    item.source === "zotato" ? "green" : "red",
                            }}
                        >
                            {item.source === "zotato" ? "Zotato User" : null}
                        </Text>
                        <Text
                            style={{
                                marginLeft: 36,
                                fontSize: 15,
                                marginBottom: 10,
                                marginRight: 15,
                                fontStyle: "italic",
                            }}
                        >
                            {item.text}
                        </Text>
                    </>
                )}
            />

            {/* Write a Review */}
            <View
                style={{
                    marginLeft: 5,
                    flexDirection: "row",
                    marginVertical: 20,
                }}
            >
                <FontAwesome name="pencil-square" size={24} color="gold" />
                <Text
                    style={{ marginLeft: 5, fontSize: 22, fontWeight: "bold" }}
                >
                    Write a Review
                </Text>
            </View>

            <View style={styles.textAreaContainer}>
                <TextInput
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                    placeholder="Write your review here!"
                    placeholderTextColor="gray"
                    numberOfLines={10}
                    multiline
                    disabled={!isSignedIn}
                    onChangeText={setNewComment}
                />
            </View>
            <TouchableOpacity
                style={{
                    marginVertical: 20,
                    justifyContent: "center",
                    backgroundColor: isSignedIn ? "brown" : "grey",
                    marginHorizontal: 20,
                    height: 50,
                }}
                disabled={!isSignedIn}
                onPress={submitReview}
            >
                <Text
                    style={{
                        alignSelf: "center",
                        fontSize: 15,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                    }}
                >
                    {isSignedIn ? "Submit" : "Log In To Submit a Review"}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    textAreaContainer: {
        borderColor: "black",
        borderWidth: 1,
        marginHorizontal: 10,
        padding: 20,
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start",
        textAlignVertical: "top",
    },
    listingTitle: {
        fontWeight: "bold",
        fontSize: 30,
        margin: 10,
    },
    subMetaText: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: "bold",
    },
    listingImage: {
        width: 300,
        height: 300,
        borderRadius: 10,
        margin: 10,
        borderWidth: 2,
        borderColor: "black",
    },
    hoursText: {
        marginLeft: 10,
        marginBottom: 10,
        fontSize: 16,
        fontWeight: "bold",
    },
    reviewNumber: {
        fontSize: 16,
    },
    metaContainer: {
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        alignContent: "space-between",
        left: 0,
        right: 0,
        marginLeft: 10,
    },
});

export default RestaurantScreen;
