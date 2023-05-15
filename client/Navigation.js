import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome5 } from "@expo/vector-icons";

import SignUpScreen from "./app/screens/SignUpScreen";
import SignInScreen from "./app/screens/SignInScreen";
import Loading from "./app/screens/Loading";
import WelcomeScreen from "./app/screens/welcomeScreen";
import ChangeMode from "./app/screens/ChangeMode";
import SelectedScreen from "./app/screens/SelectedSignUpAndSignIn";
import HomePage from "./app/screens/HomePage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import AccountInfo from "./app/screens/AccountInfo";
import Setting from "./app/screens/Setting";
import Cart from "./app/screens/Cart";
import Payment from "./app/screens/Payment";
import EventsList from "./app/screens/EventsList";
import EventsListDetails from "./app/screens/EventsListDetails";
import ListProductPage from "./app/screens/ListProductPage";

import ProductElement from "./app/screens/ProductElement";
import ListBillByStatus from "./app/screens/ListBillByStatus";
import ListBillProcesing from "./app/screens/ListBillProcesing";
import ListBillWait from "./app/screens/ListBillWait";
import ListBillReview from "./app/screens/ListBillReview";
import ReviewsScreen from "./app/screens/ReviewsScreen";

import DetailPage from "./app/screens/DetailPage";
import EditProfile from "./app/screens/EditProfile";
import AddressScreen from "./app/screens/AddressScreen";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();
const TabBottom = createBottomTabNavigator();
const TabTop = createMaterialTopTabNavigator();
function MyTabs() {
  return (
    <TabBottom.Navigator screenOptions={{ headerShown: false }}>
      <TabBottom.Screen
        name="Trang chủ"
        component={HomePage}
        options={{
          tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
        }}
      />
      <TabBottom.Screen
        name="Nổi bật"
        component={EventsList}
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="hotjar" size={24} color="black" />
          ),
        }}
      />
      <TabBottom.Screen
        name="Cá nhân"
        component={AccountInfo}
        options={{
          tabBarIcon: () => (
            <Ionicons name="ios-person-outline" size={24} color="black" />
          ),
        }}
      />
    </TabBottom.Navigator>
  );
}
// function TopTab({ state, descriptors, navigation, position }) {
//   return (
//     <View>
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;
//         const isFocused = state.index === index;
//         const onPress = () => {
//           const event = navigation.emit({
//             type: "tabPress",
//             target: route.key,
//           });
//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name);
//           }
//         };
//         const inputRange = state.routes.map((_, i) => i);
//         const opacity = Animated.interpolate(position, {
//           inputRange,
//           outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
//         });
//         return (
//           <TouchableOpacity
//             accessibilityRole="button"
//             accessibilityState={isFocused ? { selected: true } : {}}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarTestID}
//             onPress={onPress}
//             style={{ flex: 1 }}
//           >
//             <Animated.Text style={{ opacity }}>{label}</Animated.Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

function ListBillStatusWait() {
  return <ListBillByStatus statusDisplay={1} />;
}
function ListBillStatusGetGoods() {
  return <ListBillByStatus statusDisplay={2} />;
}
function ListBillStatusDelivering() {
  return <ListBillByStatus statusDisplay={3} />;
}

function ListBillStatusDelivered() {
  return <ListBillByStatus statusDisplay={4} />;
}
function MyTopTabs() {
  return (
    <TabTop.Navigator
      tabBar={(props) => <TopTab {...props} />}
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarItemStyle: { width: 100 },
        tabBarStyle: { backgroundColor: "powderblue" },
      }}
    >
      <TabTop.Screen name="Chờ xác nhận" component={ListBillStatusWait} />
      <TabTop.Screen name="Chờ lấy hàng" component={ListBillStatusGetGoods} />
      <TabTop.Screen name="Đang giao" component={ListBillStatusDelivering} />
      <TabTop.Screen name="Đã giao" component={ListBillStatusDelivered} />
      <TabTop.Screen />
    </TabTop.Navigator>
  );
}
// function ListBillStatusWait() {
//   return <ListBillByStatus statusDisplay={1} />;
// }
// function ListBillStatusGetGoods() {
//   return <ListBillByStatus statusDisplay={2} />;
// }
// function ListBillStatusDeliver() {
//   return <ListBillByStatus statusDisplay={3} />;
// }

// function ListBillStatusDelivered() {
//   return <ListBillByStatus statusDisplay={4} />;
// }
// function MyTopTabs() {
//   return (
//     <TabTop.Navigator
//       tabBar={(props) => <TopTab {...props} />}
//       screenOptions={{
//         tabBarLabelStyle: { fontSize: 12 },
//         tabBarItemStyle: { width: 100 },
//         tabBarStyle: { backgroundColor: "powderblue" },
//       }}
//     >
//       <TabTop.Screen name="Chờ xác nhận" component={ListBillStatusWait} />
//       <TabTop.Screen name="Chờ lấy hàng" component={ListBillStatusGetGoods} />
//       <TabTop.Screen name="Đang giao" component={ListBillStatusDeliver} />
//       <TabTop.Screen name="Đã giao" component={ListBillStatusDelivered} />
//       <TabTop.Screen />
//     </TabTop.Navigator>
//   );
// }
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome Screen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Welcome Screen" component={WelcomeScreen} />
        <Stack.Screen name="Change Mode" component={ChangeMode} />
        <Stack.Screen name="SelectedScreen" component={SelectedScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />

        <Stack.Screen name="Chờ xác nhận" component={MyTopTabs} />
        <Stack.Screen name="Chờ lấy hàng" component={MyTopTabs} />
        <Stack.Screen name="Đang giao" component={MyTopTabs} />
        <Stack.Screen name="Đã giao" component={MyTopTabs} />

        <Stack.Screen name="EventsListDetails" component={EventsListDetails} />
        <Stack.Screen name="ListProductsPage" component={ListProductPage} />
        <Stack.Screen name="ProductElement" component={ProductElement} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="DetailPage" component={DetailPage} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="AddressScreen" component={AddressScreen} />
        <Stack.Screen name="ReviewsScreen" component={ReviewsScreen}/>
        <Stack.Screen name="ListBillByStatus" component={ListBillByStatus}/>
        <Stack.Screen name="ListBillProcesing" component={ListBillProcesing}/>
        <Stack.Screen name="ListBillWait" component={ListBillWait}/>
        <Stack.Screen name="ListBillReview" component={ListBillReview}/>
        <Stack.Screen name="AccountInfo" component={AccountInfo}/>

        <Stack.Screen name="HomePage" component={MyTabs} />
        <Stack.Screen name="Trang chủ" component={MyTabs} />
        <Stack.Screen name="EventsList" component={MyTabs} />
        <Stack.Screen name="Cá nhân" component={MyTabs} />

        {/* <Stack.Screen name="Chờ xác nhận" component={MyTopTabs} />
        <Stack.Screen name="Chờ lấy hàng" component={MyTopTabs} />
        <Stack.Screen name="Đang giao" component={MyTopTabs} />
        <Stack.Screen name="Đã giao" component={MyTopTabs} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
