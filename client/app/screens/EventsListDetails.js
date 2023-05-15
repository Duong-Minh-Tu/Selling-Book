import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { SharedElement } from "react-native-shared-element";
import themes from "../shared/utils/themes";
import React, { useState } from "react";
import {
  formatNumberWithDot,
  formatNumberDot,
} from "../shared/utils/moneyUtil";
const { width, height } = Dimensions.get("screen");

const tabs = ["Chi tiết", "Mô tả"];
const EventsListDetails = ({ navigation, route }) => {
  const [selected, setSelected] = useState(0);

  const onScroll = ({ nativeEvent }) => {
    const index = Math.round(nativeEvent.contentOffset.x / (width - 20));

    setSelected(index);
  };
  const [loaded] = useFonts({
    SansCasual: require("../../assets/fonts/RecursiveSansCslSt-Regular.ttf"),
    SansCasualMedium: require("../../assets/fonts/RecursiveSansCslSt-Med.ttf"),
    SansCasualBold: require("../../assets/fonts/RecursiveSansCslSt-Bold.ttf"),
  });
  if (!loaded) {
    return <AppLoading />;
  }
  const checkNull = (item) => {
    if (item == null) {
      return 0;
    } else return item;
  };
  const { item } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <SharedElement
        id={`item.${item.key}.image`}
        style={StyleSheet.absoluteFillObject}
      >
        <ImageBackground
          source={{
            uri: `data:image/png;base64,${item.image}`,
          }}
          style={[StyleSheet.absoluteFillObject]}
        />
      </SharedElement>
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor: "#000",
            opacity: 0.1,
          },
        ]}
      />
      <AntDesign
        name="close"
        size={28}
        style={{
          padding: 10,
          position: "absolute",
          top: 40,
          right: 22,
          zIndex: 2,
          backgroundColor: "#fff",
          borderRadius: 25,
          opacity: 0.55,
          overflow: "hidden",
        }}
        color="#333"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <SharedElement
        id="general.bg"
        style={[
          StyleSheet.absoluteFillObject,
          {
            transform: [{ translateY: height }],
          },
        ]}
      >
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: "#FAFAFA",

              transform: [{ translateY: -height * 0.6 }],
              borderRadius: 16,
            },
          ]}
        >
          <ScrollView decelerationRate="fast" scrollEventThrottle={0}>
            <View style={styles.contentContainer}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.title}>{item.bookName}</Text>
              </View>
              <View style={styles.reviewCon}>
                {Array(5)
                  .fill(0)
                  .map((_) => (
                    <AntDesign
                      name="star"
                      size={17}
                      color="#EEE730"
                      style={{ paddingHorizontal: 2 }}
                    />
                  ))}
                <View style={{ marginLeft: 12 }}>
                  <Text style={{ fontFamily: "SansCasualMedium" }}>
                    {checkNull(item.TotalStar)} {" | "} Đã bán{" "}
                    {checkNull(item.TotalSales)}
                  </Text>
                </View>
                <AntDesign
                  name="infocirlceo"
                  size={15}
                  color="black"
                  style={{ marginLeft: 5 }}
                />
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>{formatNumberDot(item.price)}</Text>
                <Text style={styles.textDis}>{item.discount}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                  justifyContent: "space-between",
                  width: width / 2,
                }}
              >
                <Ionicons name="ios-heart-outline" size={24} color="grey" />
                <Text style={styles.text}>Like</Text>
                <SimpleLineIcons name="share-alt" size={24} color="black" />
                <Text style={styles.text}>Share</Text>
              </View>
              <View style={styles.header}>
                {tabs.map((e, i) => (
                  <TouchableOpacity onPress={() => setSelected(i)}>
                    <View style={styles.textContainer}>
                      <Text
                        style={[
                          styles.title,
                          selected == i && { color: themes.colors.mainText },
                        ]}
                      >
                        {e}
                      </Text>
                    </View>
                    {selected == i && <View style={styles.line} />}
                  </TouchableOpacity>
                ))}
              </View>
              <ScrollView
                pagingEnabled
                snapToAlignment="center"
                onScroll={onScroll}
                decelerationRate="fast"
                scrollEventThrottle={0}
                showsHorizontalScrollIndicator={false}
                horizontal
              >
                <View style={styles.itemScroll}>
                  <View key={item.id} style={styles.itemContainer}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignContent: "center",
                        marginBottom: 9,
                      }}
                    >
                      <Text style={styles.textCa}>
                        Danh mục: {item.typeOfBook}
                      </Text>
                    </View>
                    <Text style={styles.textItem}>
                      Công ty sản xuất: {item.ProductCompany}
                    </Text>
                    <Text style={styles.textItem}>
                      Ngày xuất bản: {item.releaseDate}
                    </Text>
                    <Text style={styles.textItem}>
                      Dịch giả: {item.translator}
                    </Text>
                    <Text style={styles.textItem}>
                      Loại bìa: {item.coverType}
                    </Text>
                    <Text style={styles.textItem}>
                      Số trang: {item.numberOfPage}
                    </Text>
                    <Text style={styles.textItem}>
                      Nhà xuất bản: {item.editionCompany}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("DetailPage", { id: item.id });
                    }}
                    style={{ flexDirection: "row", justifyContent: "flex-end" }}
                  >
                    View
                    <Text
                      style={{
                        fontFamily: "SansCasual",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      Xem thêm
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </SharedElement>
    </View>
  );
};
export default EventsListDetails;
EventsListDetails.sharedElements = (route, otherRoute, showing) => {
  const { item } = route.params;
  return [
    {
      id: `item.${item.key}.image`,
    },
    {
      id: `general.bg`,
    },
  ];
};
const styles = StyleSheet.create({
  contentContainer: {
    marginVertical: 10,
    marginLeft: 10,
    flex: 1,
  },
  title: {
    flex: 1,
    flexWrap: "wrap",
    fontFamily: "SansCasualBold",
    fontSize: 25,
  },
  reviewCon: {
    marginVertical: 10,
    flexDirection: "row",
    alignContent: "center",
  },
  text: {
    fontFamily: "SansCasual",
    fontSize: 15,
  },
  textDis: {
    fontFamily: "SansCasual",
    fontSize: 15,
    color: "red",
  },
  title: {
    fontSize: 17,
    fontFamily: "SansCasualBold",
    color: "gray",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 7,
    marginTop: 15,
  },
  line: {
    width: 80,
    height: 5,
    backgroundColor: themes.colors.main,
    alignSelf: "center",
    marginTop: 4,
  },
  textContainer: {
    marginHorizontal: 20,
  },
  itemScroll: {
    width: width,
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
  fontText: {
    fontFamily: "SansCasual",
    flex: 1,
    flexWrap: "wrap",
  },
});
