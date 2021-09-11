import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/homeScreen";

const nav = createStackNavigator(
    {
        Home: HomeScreen,
    },
    {
        initialRouteName: "Home",
        defaultNavigationOptions: {
            title: "Zotato",
        },
    }
);

export default createAppContainer(nav);
