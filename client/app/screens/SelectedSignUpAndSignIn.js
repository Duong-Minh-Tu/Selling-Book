import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as React from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import BackIcon from "../components/buttons/BackIcon";

const SelectedScreen = ({ navigation }) => {
  const [loaded] = useFonts({
    SansCasualBlackItalic: require("../../assets/fonts/RecursiveSansCslSt-SmBdItalic.ttf"),
    SansLinear: require("../../assets/fonts/RecursiveSansLnrSt-Regular.ttf"),
    SansCasualBold: require("../../assets/fonts/RecursiveSansCslSt-Bold.ttf"),
  });
  if (!loaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50 }}>
        <BackIcon navigation={() => navigation.goBack()} />
      </View>
      <View style={styles.iconTop}>
        <Image
          resizeMode="contain"
          source={require("../../assets/icons/line-top.png")}
        ></Image>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Tận hưởng mua sắm</Text>
        <Text style={styles.detail}>
          Book store giúp bạn thỏa thích lựa chọn đầu sách. Tích kiệm chi phí đi
          lại, đa dạng đầu sách giúp mọi người tìm mua dễ dàng ngay tại nhà
        </Text>
        <View style={styles.boxBnt}>
          <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
            <View style={[styles.btn, styles.btnResister]}>
              <Text style={[styles.btnText, styles.btnTextResister]}>
                ĐĂNG KÝ
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
            <View style={[styles.btn, styles.btnLogin]}>
              <Text style={[styles.btnText]}>ĐĂNG NHẬP</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.iconBot}>
        <View style={styles.iconBotLeft}>
          <Image
            style={styles.imageBook}
            resizeMode="contain"
            source={require("../../assets/icons/book.png")}
          ></Image>
          <Image
            style={styles.imageSpring}
            resizeMode="contain"
            source={require("../../assets/icons/spring.png")}
          ></Image>
        </View>
        <View style={styles.iconBotLeft}>
          <Image
            style={styles.lineBot}
            resizeMode="contain"
            source={require("../../assets/icons/line-bot.png")}
          ></Image>
        </View>
      </View>
    </View>
  );
};

export default SelectedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 30,
    marginRight: 30,
  },
  iconTop: {
    flex: 3,
    alignItems: "flex-end",
    marginRight: -30,
    marginTop: -65,
  },
  content: {
    flex: 4,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 40,
    fontStyle: "italic",
    textAlign: "center",
    color: "#000",
    fontFamily: "SansCasualBlackItalic",
  },

  detail: {
    fontSize: 18,
    fontWeight: "400",
    lineHeight: 22,
    marginTop: 40,
    textAlign: "center",
    fontFamily: "SansLinear",
  },

  boxBnt: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
  },

  btn: {
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 30,
    // width: 190,
    // height: 70
  },
  btnResister: {
    backgroundColor: "#CAC659",
  },
  btnText: {
    fontSize: 19,
    fontWeight: "700",
    lineHeight: 22,
    fontFamily: "SansCasualBold",
  },
  btnTextResister: {
    color: "white",
    fontFamily: "SansCasualBold",
  },
  iconBot: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageBook: {
    marginLeft: 50,
    marginBottom: -20,
    width: 120,
    height: 120,
  },
  imageSpring: {
    width: 100,
    height: 100,
  },
  lineBot: {
    marginRight: -30,
    alignItems: "flex-end",
  },
  iconBotLeft: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
});
