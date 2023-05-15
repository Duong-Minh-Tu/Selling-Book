import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

function ButtonBot(props) {
  const [loaded] = useFonts({
    SansCasualBold: require("../../../assets/fonts/RecursiveSansCslSt-Bold.ttf"),
  });
  if (!loaded) {
    return <AppLoading />;
  }
  return (
    <TouchableOpacity onPress={props.navigation}>
      <View style={styles.btnStart}>
        <Text style={styles.textStart}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default ButtonBot;

const styles = StyleSheet.create({
  btnStart: {
    margin: 8,
    padding: 22,
    borderRadius: 30,
    backgroundColor: "#C8C23C",
    opacity: 0.81,
    marginBottom: 50,
    marginHorizontal: 30
  },
  textStart: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "SansCasualBold",
    textAlign: "center",
    lineHeight: 30,
  },
});
