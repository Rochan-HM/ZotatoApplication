import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/homeScreen";
import RestaurantScreen from "./src/screens/restaurantScreen";
import authScreen from "./src/screens/authScreen";

const nav = createStackNavigator(
    {
        Home: HomeScreen,
        Restaurant: RestaurantScreen,
        Auth: authScreen,
    },
    {
        initialRouteName: "Home",
        defaultNavigationOptions: {
            title: "Zotato",
            // headerStyle: {backgroundColor: 'red'},
        },
    }
);

const App = createAppContainer(nav);

export default () => {
    return <App />;
};
