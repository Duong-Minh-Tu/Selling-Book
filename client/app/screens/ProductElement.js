import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import themes from "../shared/utils/themes";
import { useState, useEffect } from "react";
import { formatNumberDot } from "../shared/utils/moneyUtil";
// import axios from "axios";
// import Api from "../shared/Api";
const w = Dimensions.get("screen").width;
const ProductElement = ({ navigation, route, data }) => {
  const [color, setColor] = useState("#B4B4B4");
  const [loaded] = useFonts({
    SansCasual: require("../../assets/fonts/RecursiveSansCslSt-Regular.ttf"),
    SansCasualMedium: require("../../assets/fonts/RecursiveSansCslSt-Med.ttf"),
    SansCasualBold: require("../../assets/fonts/RecursiveSansCslSt-Bold.ttf"),
  });

  const checkNull = (item) => {
    if (item == null) {
      return 0;
    } else return item;
  };

  if (!loaded) {
    return <AppLoading />;
  }
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemProduct}
        onPress={() => {
          navigation.navigate("DetailPage", { id: item.id });
        }}
        // onPress={onPress}
      >
        <ImageBackground
          style={styles.imageProduct}
          imageStyle={{ borderRadius: 16 }}
          source={{
            uri: `data:image/png;base64,${item.image}`,
          }}
        >
          <TouchableOpacity style={styles.buttonHeart}>
            <AntDesign
              name="heart"
              size={20}
              color={color}
              onPress={() => setColor("red")}
            />
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.bodyProduct}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.titleItemProduct}>{item.bookName}</Text>
          </View>
          <View style={styles.reviewContainerProduct}>
            {/* <Text style={styles.bodyItemText}>{item.reviews}</Text> */}
            <Text style={styles.bodyItemTextProduct}>
              {checkNull(item.TotalStar)}
            </Text>
            <View style={styles.starConProduct}>
              <AntDesign name="star" size={12} color="#EEE730" />
            </View>
            <Text style={styles.bodyItemTextProduct}>
              {""}|{""}
            </Text>
            <Text style={styles.bodyItemTextProduct}>
              đã bán {checkNull(item.TotalSales)}
            </Text>
          </View>
          <View style={styles.footerCard}>
            <View style={styles.footerItem}>
              <Text style={styles.footerItemText}>
                {formatNumberDot(item.price)}
              </Text>
              <Text style={styles.footerItemTextDis}>{item.discount}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView
      decelerationRate="fast"
      scrollEventThrottle={0}
      style={{ marginBottom: "10%" }}
    >
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
};
export default ProductElement;
const styles = StyleSheet.create({
  starConProduct: {
    flexDirection: "row",
  },
  titleItemProduct: {
    flex: 1,
    fontSize: 16,
    fontFamily: "SansCasualMedium",
    flexWrap: "wrap",
  },
  itemProduct: {
    marginVertical: 15,
    marginHorizontal: 12,
  },
  bodyProduct: {
    paddingHorizontal: 10,
    flex: 1,
    marginTop: 15,
  },
  reviewContainerProduct: {
    flexDirection: "row",
    marginVertical: "5%",
    paddingHorizontal: "5%",
  },
  bodyItemTextProduct: {
    fontSize: 11,
    color: "#000000",
    fontFamily: "SansCasual",
  },

  imageProduct: {
    width: w / 2.3,
    height: w / 1.5,
    borderRadius: 15,
    backgroundColor: "#D3D3D3",
  },
  footerItem: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  footerCardProduct: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerItemTextProduct: {
    fontSize: 14,
    color: "#000000",
    fontFamily: "SansCasual",
  },
  footerItemTextDisProduct: {
    fontSize: 14,
    color: "red",
    marginStart: 7,
    fontFamily: "SansCasual",
  },
  buttonHeart: {
    position: "absolute",
    right: 15,
    top: 10,
  },
});
