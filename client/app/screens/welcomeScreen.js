import { View, Text, ImageBackground, StyleSheet } from "react-native";
import ButtonBot from "../components/buttons/ButtonBot";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
const WelcomeScreen = ({ navigation }) => {
  const [loaded] = useFonts({
    // SansCasualBold: require("../../../assets/fonts/RecursiveSansCslSt-Bold.ttf"),
    SansCasualBold: require("../../assets/fonts/RecursiveSansCslSt-Bold.ttf"),
    MonoCasualExtraBlack: require("../../assets/fonts/RecursiveMonoCslSt-XBlk.ttf"),
  });
  if (!loaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/images/get-start.png")}
      >
        <Text style={styles.text}>CHÀO MỪNG ĐẾN VỚI BOOK STORE 64CS2</Text>
        <ButtonBot
          text="BẮT ĐẦU"
          navigation={() => navigation.navigate("SelectedScreen")}
        ></ButtonBot>
      </ImageBackground>
    </View>
  );
};
export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "space-between",
  },
  text: {
    color: "#C8C23C",
    fontSize: 40,
    fontFamily: 'MonoCasualExtraBlack',
    lineHeight: 55,
    fontWeight: "bold",
    marginTop: 200,
    textAlign: "center",
    marginLeft: 30,
    marginRight: 30,
  },
});
