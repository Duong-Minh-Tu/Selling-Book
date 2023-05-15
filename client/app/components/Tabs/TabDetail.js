import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
const w = Dimensions.get("screen").width;

const TabDetail = ({ data }) => {
  const [loaded] = useFonts({
    SansCasual: require("../../../assets/fonts/RecursiveSansCslSt-Regular.ttf"),
    SansCasualMedium: require("../../../assets/fonts/RecursiveSansCslSt-Med.ttf"),
    SansCasualBold: require("../../../assets/fonts/RecursiveSansCslSt-Bold.ttf"),
  });
  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.itemScroll}>
        return (
          <View key={item.id} style={styles.itemContainer}>
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                marginBottom: 9,
              }}
            >
            <Text style={styles.textCa}>Danh mục: {item.category}</Text>
            </View>
            <Text style={styles.textItem}>
              Công ty sản xuất: {item.productCompany}
            </Text>
            <Text style={styles.textItem}>
              Ngày xuất bản: {item.releaseDate}
            </Text>
            <Text style={styles.textItem}>Dịch giả: {item.translator}</Text>
            <Text style={styles.textItem}>Loại bìa: {item.coverType}</Text>
            <Text style={styles.textItem}>Số trang: {item.numberOfPage}</Text>
            <Text style={styles.textItem}>
              Nhà xuất bản: {item.editionCompany}
            </Text>
          </View>
        );
    </View>
  );
};

export default TabDetail;

const styles = StyleSheet.create({
  itemScroll: {
    width: w,
  },
  itemContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
  textCa: {
    fontFamily: "SansCasual",
    fontSize: 15,
  },
  textItem: {
    fontFamily: "SansCasual",
    fontSize: 15,
    marginVertical: 5,
  },
});
