import * as React from "react";
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  Animated,
  TouchableOpacity,
} from "react-native";
import { SharedElement } from "react-native-shared-element";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import themes from "../shared/utils/themes";
import { getAllBook } from "../shared/services/CoreServices";
import Loading from "../components/cards/Loading";
import {
  FlingGestureHandler,
  Directions,
  State,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { formatNumberDot } from "../shared/utils/moneyUtil";

const { width, height } = Dimensions.get("screen");
const OVERFLOW_HEIGHT = 130;
const SPACING = 10;
const ITEM_WIDTH = width * 0.65;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 2;

const checkNull = (item) => {
  if (item == null) {
    return 0;
  } else return item;
};

const OverflowItems = ({ data, scrollXAnimated }) => {
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.titleItem} numberOfLines={1}>
                {item.bookName}
              </Text>
              <View style={styles.reviewContainer}>
                <Text style={styles.bodyItemText}>
                  {checkNull(item.TotalStar)}
                </Text>
                <View style={styles.starCon}>
                  <AntDesign name="star" size={12} color="#EEE730" />
                </View>
                <Text style={styles.bodyItemText}>
                  {""}|{""}
                </Text>
                <Text style={styles.bodyItemText}>
                  {" "}
                  Đã bán {checkNull(item.TotalSales)}
                </Text>
              </View>
              <View style={styles.footerItem}>
                <Text style={styles.footerItemText}>
                  {formatNumberDot(item.price)}
                </Text>
                <Text style={styles.footerItemTextDis}>{item.discount}</Text>
              </View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

export default function EventsList({ navigation }) {
  const [data, setData] = React.useState([]);
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const setActiveIndex = React.useCallback((activeIndex) => {
    setIndex(activeIndex);
    scrollXIndex.setValue(activeIndex);
  });
  React.useEffect(() => {
    getAllBook().then((response) => {
      setData(response.data.item);
      if (index === data.length - VISIBLE_ITEMS - 1) {
        const newData = [...data, ...data];
        setData(newData);
      }
      setIsLoading(false);
    });
  }, []);

  // React.useEffect(() => {
  //   if (index === data.length - VISIBLE_ITEMS - 1) {
  //     const newData = [...data, ...data];
  //     setData(newData);
  //   }
  // });

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });
  const [loaded] = useFonts({
    SansCasual: require("../../assets/fonts/RecursiveSansCslSt-Regular.ttf"),
    SansCasualMedium: require("../../assets/fonts/RecursiveSansCslSt-Med.ttf"),
    SansCasualBold: require("../../assets/fonts/RecursiveSansCslSt-Bold.ttf"),
  });
  if (!loaded) {
    return <AppLoading />;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <FlingGestureHandler
          key="left"
          direction={Directions.LEFT}
          onHandlerStateChange={(ev) => {
            if (ev.nativeEvent.state === State.END) {
              if (index === data.length - 1) {
                return;
              }
              setActiveIndex(index + 1);
            }
          }}
        >
          <FlingGestureHandler
            key="right"
            direction={Directions.RIGHT}
            onHandlerStateChange={(ev) => {
              if (ev.nativeEvent.state === State.END) {
                if (index === 0) {
                  return;
                }
                setActiveIndex(index - 1);
              }
            }}
          >
            <SafeAreaView style={styles.container}>
              <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
              <FlatList
                data={data}
                horizontal
                inverted
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                  flex: 1,
                  justifyContent: "center",
                  padding: SPACING * 4,
                }}
                scrollEnabled={false}
                removeClippedSubviews={false}
                CellRendererComponent={({
                  item,
                  index,
                  children,
                  style,
                  ...props
                }) => {
                  const newStyle = [style, { zIndex: data.length - index }];
                  return (
                    <View style={newStyle} index={index} {...props}>
                      {children}
                    </View>
                  );
                }}
                renderItem={({ item, index: i }) => {
                  const inputRange = [i - 1, i, i + 1];
                  const translateX = scrollXAnimated.interpolate({
                    inputRange,
                    outputRange: [50, 0, -100],
                  });
                  const scale = scrollXAnimated.interpolate({
                    inputRange,
                    outputRange: [0.8, 1, 1.3],
                  });
                  const opacity = scrollXAnimated.interpolate({
                    inputRange,
                    outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
                  });
                  return (
                    <Animated.View
                      style={{
                        position: "absolute",
                        left: -ITEM_WIDTH / 2,
                        opacity,
                        transform: [{ translateX }, { scale }],
                      }}
                    >
                      <SharedElement id={`item.${item.key}`}>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          onPress={() => {
                            navigation.navigate("DetailPage", { id: item.id });
                          }}
                        >
                          <Image
                            source={{
                              uri: `data:image/png;base64,${item.image}`,
                            }}
                            style={{
                              width: ITEM_WIDTH,
                              height: ITEM_HEIGHT,
                              borderRadius: 14,
                            }}
                          />
                        </TouchableOpacity>
                      </SharedElement>
                    </Animated.View>
                  );
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
                      top: height * 0.65,
                      borderRadius: 16,
                    },
                  ]}
                />
              </SharedElement>
            </SafeAreaView>
          </FlingGestureHandler>
        </FlingGestureHandler>
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    marginTop: "15%",
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: "hidden",
  },
  itemContainer: {
    marginVertical: Platform.OS == "android" ? "5.7%" : "9%",
    // marginTop: "10.5%",
    // marginBottom: "5.3%",
    marginHorizontal: "5%",
  },
  titleItem: {
    fontSize: 22,
    fontFamily: "SansCasualBold",
  },
  reviewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "35%",
    marginLeft: 10,
  },
  bodyItemText: {
    fontSize: 13,
    color: "#000000",
    fontFamily: "SansCasual",
  },
  starCon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: 5,
  },
  footerItemText: {
    fontSize: 15,
    color: "#000000",
    fontFamily: "SansCasual",
  },
  footerItemTextDis: {
    fontSize: 15,
    color: "red",
    marginStart: 8,
    fontFamily: "SansCasual",
  },
});
