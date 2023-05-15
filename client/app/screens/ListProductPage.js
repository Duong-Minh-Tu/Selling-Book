import { View, StyleSheet, Text, Dimensions, TextInput } from "react-native";
import { AntDesign, EvilIcons, Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import React from "react";
import { useState, useEffect } from "react";
import ProductElement from "./ProductElement";
import axios from "axios";
import api from "../shared/Api";
import { getAllBook, getAllSearchBook } from "../shared/services/CoreServices";
const { width, height } = Dimensions.get("screen");

function ListProductPage({ navigation }) {
  const [icon, setIcon] = useState("ios-grid-outline");
  const [search, setSearch] = useState("");
  // const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [productData, setProductData] = useState([]);
  const [searchTimer, setSearchTimer] = useState(null);

  useEffect(() => {
    getAllBook().then((response) => {
      // setFilteredDataSource(response.data.item);
      setProductData(response.data.item);
      
    });
    getAllSearchBook(search).then((response) => {
      setProductData(response.data.item);
      
    });
  }, []);

  // const searchFilterFunction = (text) => {
  //   // Check neu o input text ko trong
  //   if (text) {
  //     // Loc data and update FilteredDataSource
  //     const newData = productData.filter(function (item) {
  //       const itemData = item.bookName
  //         ? item.bookName.toUpperCase()
  //         : "".toUpperCase();
  //       const textData = text.toUpperCase();
  //       return itemData.indexOf(textData) > -1;
  //     });
  //     setFilteredDataSource(newData);
  //     setSearch(text);
  //   } else {
  //     // Chen chu neu input text trong
  //     // Update FilteredDataSource voi datapost
  //     setFilteredDataSource(productData);
  //     setSearch(text);
  //   }
  // };
  const [loaded] = useFonts({
    SansCasual: require("../../assets/fonts/RecursiveSansCslSt-Regular.ttf"),
    SansCasualMedium: require("../../assets/fonts/RecursiveSansCslSt-Med.ttf"),
    SansCasualBold: require("../../assets/fonts/RecursiveSansCslSt-Bold.ttf"),
  });
  if (!loaded) {
    return <AppLoading />;
  }
  return (
    <View>
      <View style={styles.tabContainer}>
        <View style={styles.tabSearchContainer}>
          <View style={styles.backIcon}>
            <AntDesign
              name="left"
              size={24}
              color="black"
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={styles.inputContainer}>
            <EvilIcons
              name="search"
              size={33}
              color="black"
              style={{ opacity: 0.5 }}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                setSearch(text);
              }}
              value={search}
              placeholder="Tìm Kiếm Trên Book Store"
              underlineColorAndroid="transparent"
            ></TextInput>
          </View>
        </View>

        <Ionicons
          name={icon}
          size={27}
          color="black"
          style={{ marginLeft: 10, opacity: 0.6 }}
          // onPress={() =>
          //   handleIconPress &&
          //   (icon == "ios-list-outline" ? setIcon("ios-grid-outline") : setIcon("ios-list-outline"))
          // }
        />
      </View>
      <View style={styles.tabContanier}>
        <Text style={styles.text}>Mới Nhất</Text>
        <Text style={styles.text}>Bán Chạy</Text>
        <Text style={styles.text}>Giá</Text>
        <View>
          <AntDesign name="up" size={10} color="black" />
          <AntDesign name="down" size={10} color="black" />
        </View>
        <View style={{ marginLeft: 90 }}>
          <AntDesign name="filter" size={24} color="black" />
        </View>
        <Text style={styles.text}>Lọc</Text>
      </View>
      <View style={{ marginBottom: "70%" }}>
        <ProductElement data={productData} navigation={navigation} />
      </View>
    </View>
  );
}
export default ListProductPage;
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  tabContainer: {
    flexDirection: "row",
    marginTop: 70,
    marginLeft: 15,
    alignItems: "center",
  },
  tabContanier: {
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
  },
  text: {
    paddingHorizontal: 10,
    fontFamily: "SansCasual",
  },
  inputContainer: {
    flexDirection: "row",
    borderColor: "#000000",
    borderRadius: 15,
    borderWidth: 1,
    paddingTop: 7,
    paddingBottom: 7,
  },
  backIcon: {
    marginRight: 10,
    padding: 10,
    backgroundColor: "#eeeeee",
    borderRadius: 22,
  },
  input: {
    width: width / 1.69,
  },
  tabSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
