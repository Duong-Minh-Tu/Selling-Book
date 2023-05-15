import { Image, StyleSheet, View } from "react-native";
const Loading = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/icons8-shopping-bag.gif")}
        style={styles.img}
      />
    </View>
  );
};
export default Loading;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 205,
    height: 203,
  },
});
