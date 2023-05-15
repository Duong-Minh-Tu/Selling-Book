import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
import themes from "../shared/utils/themes";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import ITEMLISTS from "./ITEMLISTS";
import { color } from "@rneui/themed/dist/config";
import { useState, useEffect } from "react";
import { FindAllBill } from "../shared/services/CoreServices";
import { formatNumberWithDot } from "../shared/utils/moneyUtil";
import { getNameStatus } from "../shared/utils/constants";
import { useIsFocused } from "@react-navigation/native";

const w = Dimensions.get("screen").width;

const ListBillWait = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    FindAllBill(3).then( (res) => {
      console.log('!!! data bill: ', res);
    })
  }, [isFocused]);

  const [loaded] = useFonts({
    SansCasual: require("../../assets/fonts/RecursiveSansCslSt-Regular.ttf"),
    SansCasualMedium: require("../../assets/fonts/RecursiveSansCslSt-Med.ttf"),
    SansCasualBold: require("../../assets/fonts/RecursiveSansCslSt-Bold.ttf"),
  });
  const [dataListDefault, setDataListDefault] = useState([]);
  const [dataList, setDataList] = useState([]);

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.itemScroll}>
        <View style={{marginTop: 50, backgroundColor: '#e8e4e3', flexDirection: 'row', paddingHorizontal: 20 ,justifyContent:'space-between'}}>
            <TouchableOpacity onPress={() => navigation.navigate("ListBillByStatus")}>
              <Text style={{padding: 8 }}>Chờ xác nhận</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("ListBillProcesing")}>
                <Text style={{padding: 8}}>Chờ lấy hàng</Text>
            </TouchableOpacity>
     
            <TouchableOpacity >
                <Text style={{padding: 8 , borderBottomWidth: 2 , borderBottomColor: '#CAC659'}}>Đang giao</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("ListBillReview")}>
                <Text style={{padding: 8}}>Đánh giá</Text>
            </TouchableOpacity>
     
        </View>
        <ScrollView>
            {
              dataListDefault.map( (item) => {
                  return(
                    <View key={index} style={[styles.itemcontainer, { marginBottom: 12} ]}>
             
                        <View>
                          <View style={{ backgroundColor: '#fff', paddingVertical: 12, paddingHorizontal: 20, marginTop: 12}}>
                            <Text>Trạng thái: {getNameStatus(item.status)}</Text>
                            <Text>Tổng tiền: {formatNumberWithDot(item.totalPrice)}</Text>
                            <Text>Hình thức giao hàng: Nhanh {`(Giao trong ngày)`}</Text>
                            <Text>Phương thức thanh toán: Thẻ ngân hàng</Text>
                          </View>
                        </View>

                        {
                          item.billDetail.map( (detail) => {
                            return (
                              <View key={index} style={styles.itemcontainer}>
                              <TouchableOpacity
                                style={styles.item}
                                onPress={() =>
                                  navigation.navigate("DetailPage", { item: detail.id })
                                }
                              >
                                <Image style={styles.image} source={detail.image} />
                                <View style={styles.body}>
                                  <Text style={styles.titleItem} numberOfLines={1}>
                                    {detail.name}
                                  </Text>
                                </View>
                                <View style={styles.footerCard}>
                                  <Text style={styles.footerItemText}>
                                    {formatNumberWithDot(detail.price)}
                                  </Text>
                                  <Text style={styles.footerItemText}> x{detail.quatity}</Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                            )
                          })
                        }
                    </View>
                  )
              })
            }
        </ScrollView>
    </View>
  );
};
export default ListBillWait;
const styles = StyleSheet.create({
  titleItem: {
    fontSize: 14,
    fontFamily: "SansCasual",
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  body: {
    paddingHorizontal: 22,
    marginTop: "5%",
    flex: 1,
    flexWrap: "wrap",
  },
  line: {
    width: 30,
    height: 2,
    backgroundColor: themes.colors.main,
    alignSelf: "center",
    marginTop: 3,
  },
  image: {
    width: w / 5,
    height: w / 3.7,
    borderRadius: 10,
    backgroundColor: "#D3D3D3",
    margin: "2%",
  },
  footerCard: {
    marginTop: "10%",
    alignItems: "flex-end",
    marginRight: "3%",
  },
  footerItemText: {
    fontSize: 14,
    color: "#000000",
    fontFamily: "SansCasual",
  },
  itemScroll: {
    width: w,
    backgroundColor: "#e8e4e3",
    paddingBottom: 100
  },
  itemcontainer: {
    marginTop: 1,
    marginBottom:1,
  },
  footerContainer: {
    flexDirection: "row",
    marginTop: "1%",
    backgroundColor: "#fff",
    paddingVertical: "3%",
  },
  textTotal: {
    fontFamily: "SansCasual",
  },
});
