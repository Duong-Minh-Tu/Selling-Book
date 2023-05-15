import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import themes from "../../shared/utils/themes";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { formatNumberDot } from "../../shared/utils/moneyUtil";
const w = Dimensions.get("screen").width;

const TabContent = ({ navigation, lisFooterContent, data }) => {
  const [loaded] = useFonts({
    SansCasual: require("../../../assets/fonts/RecursiveSansCslSt-Regular.ttf"),
    SansCasualMedium: require("../../../assets/fonts/RecursiveSansCslSt-Med.ttf"),
    SansCasualBold: require("../../../assets/fonts/RecursiveSansCslSt-Bold.ttf"),
  });
  if (!loaded) {
    return <AppLoading />;
  }
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => {
        navigation.navigate("DetailPage", { id: item.id });
      }}>
        <Image style={styles.image} source={{
            uri: `data:image/png;base64,${item.image}`,
          }} />
        <View style={styles.body}>
          <Text style={styles.titleItem} numberOfLines={1}>
            {item.bookName}
          </Text>
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
    <View style={styles.itemScroll}>
      <FlatList
        renderItem={renderItem}
        data={data}
        showsHorizontalScrollIndicator={false}
        horizontal
        // inverted
        // scrollEnabled={false}
        ListFooterComponent={lisFooterContent}
      />
    </View>
  );
};

export default TabContent;

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "gray",
  },
  starCon: {
    flexDirection: "row",
    marginVertical: 9,
  },
  star: {
    marginRight: 5,
  },
  titleItem: {
    fontSize: 16,
    fontFamily: "SansCasualMedium",
  },
  item: {
    alignItems: "center",
    alignContent: "center",
    marginVertical: 20,
  },
  body: {
    paddingHorizontal: 22,
    flex: 1,
    marginTop: 15,
    width: w / 2.6,
  },
  line: {
    width: 30,
    height: 2,
    backgroundColor: themes.colors.main,
    alignSelf: "center",
    marginTop: 3,
  },
  image: {
    width: w / 4,
    height: w / 2.8,
    borderRadius: 10,
    backgroundColor: "#D3D3D3",
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  footerCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerItemText: {
    fontSize: 14,
    color: "#000000",
    fontFamily: "SansCasual",
  },
  footerItemTextDis: {
    fontSize: 14,
    color: "red",
    marginStart: 7,
    fontFamily: "SansCasual",
  },
  iconHeart: {
    tintColor: themes.colors.main,
  },
  buttonHeart: {
    position: "absolute",
    right: 15,
    top: 1,
  },
  itemScroll: {
    width: w,
  },
});
