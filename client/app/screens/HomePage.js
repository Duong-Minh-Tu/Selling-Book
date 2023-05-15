import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
} from "react-native";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import ListTab from "../components/Tabs/ListTab";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../shared/Api";
import { getAllBook, getBookById } from "../shared/services/CoreServices";
// import { getInfoUser } from "../shared/services/UserServices";
// import LikeButton from "../components/buttons/LikeButton";
import Loading from "../components/cards/Loading";
import { getCart } from "../shared/services/CoreServices";
import themes from "../shared/utils/themes";
import { useIsFocused } from "@react-navigation/native";
import { formatNumberDot } from "../shared/utils/moneyUtil";

// const { width, height } = Dimensions.get("screen");

// const tabs = Object.keys(ITEMS, title).map((i) => ({
//   key: i,
//   title: title[i],
//   source: ITEMS,
//   ref: React.createRef(),
// }));

const tabs = ["Phổ Biến", "Bán Chạy", "Hàng Mới"];
const HomePage = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const [productData, setProductData] = useState([]);
  const [lengthCart, setLengthCart] = useState(0);
  const [product, setProduct] = useState([]);
  const [color, setColor] = useState("#B4B4B4");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllBook().then((response) => {
      setProductData(response.data.item);
      setProduct(response.data.item[0]);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    getCart().then((response) => {
      setLengthCart(response.data.cartDetails.length);
    });
  }, [isFocused]);
  // const [selectedTab, setSelectedTab] = React.useState(tabs[0]);
  // const scrollX = React.useRef(new Animated.Value(0)).current;
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
  const content = Object.keys(api).map((i) => ({
    key: i,
    name: i,
    source: api[i],
    ref: React.createRef(),
  }));

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate("DetailPage", { id: item.id });
        }}
      >
        <ImageBackground
          style={styles.image}
          imageStyle={{ borderRadius: 15 }}
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
        <View style={styles.body}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.titleItem}>{item.bookName}</Text>
          </View>
          <View style={styles.reviewContainer}>
            {/* <Text style={styles.bodyItemText}>{item.reviews}</Text> */}
            <Text style={styles.bodyItemText}>{checkNull(item.TotalStar)}</Text>
            <View style={styles.starCon}>
              <AntDesign name="star" size={12} color="#EEE730" />
            </View>
            <Text style={styles.bodyItemText}>
              {""}|{""}
            </Text>
            {/* <Text style={styles.bodyItemText}> {item.numberOfSale}</Text> */}
            <Text style={styles.bodyItemText}>
              {" "}
              {checkNull(item.TotalSales)}
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
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={0}
        >
          {/* <TopIconHomePage /> */}
          <View style={styles.boxIcon}>
            <View style={[styles.searchIcon, { marginTop: 4 }]}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ListProductsPage")}
              >
                <AntDesign name="search1" size={26} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRight}>
              <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                {lengthCart > 0 ? (
                  <Text
                    style={{
                      backgroundColor: "red",
                      color: "#fff",
                      width: 16,
                      borderRadius: 60,
                      marginBottom: -12,
                      marginLeft: 16,
                      fontSize: 12,
                      zIndex: 1,
                      textAlign: "center",
                    }}
                  >
                    {lengthCart}
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: "#fff",
                      width: 16,
                      borderRadius: 60,
                      marginBottom: -12,
                      marginLeft: 16,
                      fontSize: 12,
                      zIndex: 1,
                      textAlign: "center",
                    }}
                  ></Text>
                )}
                <Feather
                  style={{ marginRight: 12 }}
                  name="shopping-cart"
                  size={26}
                  color="black"
                />
                {/* <AntDesign
                  style={{ marginRight: 12 }}
                  name="shoppingcart"
                  size={26}
                  color="black"
                /> */}
              </TouchableOpacity>
              {/* <TouchableOpacity>
                <Entypo name="dots-three-vertical" size={26} color="black" />
              </TouchableOpacity> */}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DetailPage", { id: product.id });
            }}
          >
            <View style={styles.header}>
              <View style={styles.textBox}>
                <Text style={[styles.headerText, styles.featureProduct]}>
                  Sản phẩm nổi bật
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={[styles.headerText, styles.title]}>
                    {product.bookName}
                  </Text>
                </View>
                <Text style={[styles.headerText, styles.author]}>
                  {product.author}
                </Text>
              </View>
              <View style={[styles.headerImage]}>
                <ImageBackground
                  style={{ width: 120, height: 160 }}
                  imageStyle={{ borderRadius: 15 }}
                  source={{
                    uri: `data:image/png;base64,${product.image}`,
                  }}
                ></ImageBackground>
              </View>
              <View style={styles.backgroundImage}>
                <Image
                  source={require("../../assets/icons/SanPhamNoiBat.png")}
                ></Image>
              </View>
            </View>
          </TouchableOpacity>
          <ListTab tabs={tabs} data={productData} navigation={navigation} />
          <View style={styles.ideaContanier}>
            <Text style={{ fontFamily: "SansCasualBold", fontSize: 22 }}>
              GỢI Ý
            </Text>
            <TouchableOpacity
              style={styles.buttonAllContanier}
              onPress={() => navigation.navigate("ListProductsPage")}
            >
              <Text style={{ fontFamily: "SansCasual" }}>Xem Tất Cả</Text>
              <AntDesign name="right" size={20} color="black" />
            </TouchableOpacity>
          </View>

          {/* <ProductElement onPress={() => navigation.navigate("DetailPage")} /> */}

          <ScrollView
            decelerationRate="fast"
            scrollEventThrottle={0}
            style={{ marginBottom: "3%" }}
          >
            <FlatList
              data={productData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              key={(item) => item.id}
            />
          </ScrollView>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  header: {
    marginHorizontal: 30,
    marginTop: 20,
    backgroundColor: "#B03131",
    borderRadius: 30,
    height: 180,
    flexDirection: "row",
  },
  textBox: {
    marginLeft: 20,
    width: "50%",
    flexDirection: "column",
  },
  headerText: {
    color: "#FBFBFB",
    marginTop: 20,
    fontFamily: "SansCasual",
  },
  featureProduct: {
    fontSize: 10,
    lineHeight: 12,
  },
  title: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 15,
    lineHeight: 22,
  },
  author: {
    fontSize: 13,
    lineHeight: 16,
    alignItems: "flex-end",
  },
  headerImage: {
    marginTop: 10,
    zIndex: 1,
  },
  backgroundImage: {
    position: "absolute",
    right: 0,
  },
  buttonTab: {
    paddingHorizontal: 15,
  },
  ideaContanier: {
    flexDirection: "row",
    marginLeft: 20,
    justifyContent: "space-between",
  },
  buttonAllContanier: {
    marginLeft: 40,
    justifyContent: "center",
    flexDirection: "row",
    marginEnd: 25,
    alignItems: "center",
  },
  boxIcon: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
  },
  searchIcon: {},
  iconRight: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 17,
    color: "#fff",
  },
  starCon: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    marginRight: 5,
  },
  titleItem: {
    flex: 1,
    fontSize: 16,
    fontFamily: "SansCasualMedium",
    flexWrap: "wrap",
  },
  item: {
    marginVertical: 15,
    marginHorizontal: 12,
    width: "45%",
  },
  body: {
    paddingHorizontal: 10,
    flex: 1,
    marginTop: 15,
  },
  reviewContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: "5%",
  },
  bodyItemText: {
    fontSize: 11,
    color: "#000000",
    fontFamily: "SansCasual",
  },

  image: {
    width: 170,
    height: 300,
    borderRadius: 15,
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
    top: 10,
  },
  // itemScroll: {
  //   width: w,
  // },
  // tabView: {
  //   marginLeft: 26,
  //   marginTop: 18,
  //   height: "25%",
  // },
  // containerListProduct: {
  //   width: "100%",
  //   height: "10%",
  // },
  // img: {
  //   width: "10%",
  //   height: "4%",
  // },
  // tabContainer: {
  //   position: "absolute",
  //   width: "100%",
  // },
  // textTitle: {
  //   color: "#000000",
  //   fontFamily: "SansCasualBold",
  //   fontSize: 60 / tabs.length,
  // },
  // tab: {
  //   flexDirection: "row",
  //   justifyContent: "space-evenly",
  //   flex: 1,
  // },
});
