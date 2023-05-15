import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import ButtonBot from "../components/buttons/ButtonBot";
const { width, height } = Dimensions.get("screen");
const ChangeMode = ({ navigation }) => {
  const [loaded] = useFonts({
    SansCasualSemiBold: require("../../assets/fonts/RecursiveSansCslSt-SemiBd.ttf"),
    SansCasualMedium: require("../../assets/fonts/RecursiveSansCslSt-Med.ttf"),
    SansCasualBold: require("../../assets/fonts/RecursiveSansCslSt-Bold.ttf"),
  });
  if (!loaded) {
    return <AppLoading />;
  }
  return (
    <View styles={styles.container}>
      <ImageBackground
        style={styles.img}
        resizeMode={"cover"}
        source={require("../../assets/images/alex-lvrs-ZRTd9_Fk6rc-unsplash.png")}
      >
        <Text style={styles.textHeader}> Chọn Chế Độ </Text>
        <View style={styles.modeContainerSun}>
          <View style={styles.iconContainer}>
            <Fontisto name="day-sunny" size={35} style={styles.iconSun} />
            <Text style={styles.iconDescSun}>Sáng</Text>
          </View>
        </View>
        <View style={styles.modeContainerMoon}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="md-moon-outline"
              size={35}
              style={styles.iconMoon}
            />
            <Text style={styles.iconDescMoon}>Tối</Text>
          </View>
        </View>
        <View style={{ marginTop: 195 }}>
          <ButtonBot
            text="TIẾP TỤC"
            navigation={() => navigation.navigate("Selected Screen")}
          ></ButtonBot>
        </View>
      </ImageBackground>
    </View>
  );
};
export default ChangeMode;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  img: {
    width: width,
    height: height,
  },
  textHeader: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 20,
    marginTop: 95,
    textAlign: "center",
    fontFamily: "SansCasualSemiBold",
  },
  modeContainerSun: {
    flexDirection: "row",
    marginLeft: 70,
    marginTop: 138,
  },
  modeContainerMoon: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 70,
    marginTop: 65,
  },
  iconContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  iconSun: {
    color: "#FBFBFB",
    padding: 15,
  },
  iconMoon: {
    color: "#000000",
    padding: 15,
  },
  iconDescSun: {
    textAlign: "center",
    color: "#FBFBFB",
    fontWeight: "500",
    fontSize: 18,
    fontFamily: "SansCasualMedium",
  },
  iconDescMoon: {
    textAlign: "center",
    color: "#000000",
    fontWeight: "500",
    fontSize: 18,
    fontFamily: "SansCasualMedium",
  },
  img: {
    width: width,
    height: height,
  },
});
