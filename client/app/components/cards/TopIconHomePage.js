import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AntDesign, Entypo  } from "@expo/vector-icons";

const TopIconHomePage = ({ navigation }) => {
    return(
        <View style={styles.boxIcon}>
            <View style={styles.searchIcon}>
                <AntDesign name="search1" size={26} color="black" />
            </View>
            <View style={styles.iconRight}>
                <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                    <AntDesign style={{ marginRight: 12}} name="shoppingcart" size={26} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Entypo name="dots-three-vertical" size={26} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}


export default TopIconHomePage;

const styles = StyleSheet.create({
  boxIcon: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
  },
  searchIcon: {},
  iconRight: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
});
