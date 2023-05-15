import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import themes from "../../shared/utils/themes";
import TabDetail from "./TabDetail";
import TabDescription from "./TabDescription";
import Tabreviews from "./Tabreviews";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
const w = Dimensions.get("screen").width;
const tabs = ["Chi Tiết", "Mô tả", "Đánh giá"];
const ListTabDetail = ({ onPress, item }) => {
  const [selected, setSelected] = useState(0);

  const onScroll = ({ nativeEvent }) => {
    const index = Math.round(nativeEvent.contentOffset.x / (w - 20));
    setSelected(index);
  };

  const [loaded] = useFonts({
    SansCasual: require("../../../assets/fonts/RecursiveSansCslSt-Regular.ttf"),
    SansCasualMedium: require("../../../assets/fonts/RecursiveSansCslSt-Med.ttf"),
    SansCasualBold: require("../../../assets/fonts/RecursiveSansCslSt-Bold.ttf"),
  });

  const Tab = createNativeStackNavigator();

  if (!loaded) {
    return <AppLoading />;
  }

  console.log(item);
  return (
    <View style={styles.container}>
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
        horizontal
        pagingEnabled
        snapToAlignment="center"
        onScroll={onScroll}
        decelerationRate="fast"
      >
        <TabDetail item={item} />
        <TabDescription onPress={onPress} />
        <Tabreviews onPress={onPress} />
      </ScrollView>
    </View>
  );
};

export default ListTabDetail;

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 25,
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
    width: 90,
    height: 8,
    backgroundColor: themes.colors.main,
    alignSelf: "center",
    marginTop: 4,
    borderRadius: 5,
  },
  textContainer: {
    marginHorizontal: 15,
  },
});
