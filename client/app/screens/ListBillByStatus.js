import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
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
import BackIcon from "../components/buttons/BackIcon";
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const ListBillByStatus = ({ navigation, route }) => {
  // const { status } = route.params.index;

  const [loaded] = useFonts({
    SansCasual: require("../../assets/fonts/RecursiveSansCslSt-Regular.ttf"),
    SansCasualMedium: require("../../assets/fonts/RecursiveSansCslSt-Med.ttf"),
    SansCasualBold: require("../../assets/fonts/RecursiveSansCslSt-Bold.ttf"),
  });
  const [dataListDefault, setDataListDefault] = useState({});
  // const [dataList, setDataList] = useState([]);
  const [status, setStatus] = useState(1);
  const [index, setIndex] = useState(null);

  useEffect(() => {
    // setIndex(route.params.index);
    // console.log('index: ', index);
    FindAllBill(status).then((res) => {
      setDataListDefault(res.data.data);
      console.log(res.data.data)
    });
  }, []);

  if (!loaded) {
    return <AppLoading />;
  }

  // function checkStatus(status) {
  //   setIndex(status);
  // }
  const listTabName = [
    {
      numberStatus: 1,
      nameStatus: "Chờ xác nhận",
    },
    {
      numberStatus: 2,
      nameStatus: "Chờ lấy hàng",
    },
    {
      numberStatus: 3,
      nameStatus: "Đang giao",
    },
    {
      numberStatus: 4,
      nameStatus: "Đã giao",
    },
  ];

  return (
    // <View style={styles.itemScroll}>
    //     <View style={{marginTop: 50, backgroundColor: '#e8e4e3', flexDirection: 'row', paddingHorizontal: 20 ,justifyContent:'space-between'}}>
    //       {
    //         index == 1
    //         ? (
    //           <TouchableOpacity >
    //             <Text style={{padding: 8 , borderBottomWidth: 2 , borderBottomColor: '#CAC659'}}>Chờ xác nhận</Text>
    //           </TouchableOpacity>
    //         )
    //         : (
    //           <TouchableOpacity onPress={() => checkStatus(1)}>
    //           <Text style={{padding: 8 }}>Chờ xác nhận</Text>
    //         </TouchableOpacity>
    //         )
    //       }

    //       {
    //         index == 2
    //         ? (
    //           <TouchableOpacity >
    //             <Text style={{padding: 8 , borderBottomWidth: 2 , borderBottomColor: '#CAC659'}}>Chờ lấy hàng</Text>
    //           </TouchableOpacity>
    //         )
    //         : (
    //           <TouchableOpacity onPress={() => checkStatus(2)}>
    //             <Text style={{padding: 8}}>Chờ lấy hàng</Text>
    //           </TouchableOpacity>
    //         )
    //       }

    //       {
    //         index == 3
    //         ? (
    //           <TouchableOpacity >
    //             <Text style={{padding: 8 , borderBottomWidth: 2 , borderBottomColor: '#CAC659'}}>Đang giao</Text>
    //           </TouchableOpacity>
    //         )
    //         : (
    //       <TouchableOpacity onPress={() => checkStatus(3)}>
    //         <Text style={{padding: 8}}>Đang giao</Text>
    //       </TouchableOpacity>
    //         )
    //       }

    //       {
    //         index == 4
    //         ? (
    //           <TouchableOpacity >
    //             <Text style={{padding: 8 , borderBottomWidth: 2 , borderBottomColor: '#CAC659'}}>Đánh giá</Text>
    //           </TouchableOpacity>
    //         )
    //         : (
    //           <TouchableOpacity onPress={() => checkStatus(4)}>
    //             <Text style={{padding: 8}}>Đánh giá</Text>
    //           </TouchableOpacity>
    //         )
    //       }
    //     </View>
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <BackIcon navigation={() => navigation.goBack()} />
        <View style={{ alignSelf: "center" }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "SansCasualBold",
            }}
          >
            Đơn Mua
          </Text>
        </View>
      </View>
      <View style={styles.listTab}>
        {listTabName.map((item) => (
          <TouchableOpacity
            style={[
              styles.btnTab,
              status === item.numberStatus && styles.btnTabActive,
            ]}
            onPress={() => setStatus(item.numberStatus)}
          >
            <Text
              style={[
                {
                  flex: 1,
                  flexWrap: "wrap",
                  fontFamily: "SansCasualMedium",
                  fontSize: 13.5,
                  textAlign: "center",
                  alignSelf: "center",
                },
                status === item.numberStatus && styles.textTabActive,
              ]}
            >
              {item.nameStatus}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView>
        {dataListDefault &&
          Object.entries(dataListDefault).map((item, index) => {
            return (
              <View
                key={index}
                style={[styles.itemcontainer, { marginBottom: 12 }]}
              >
                {item.billDetails &&
                  Object.entries(item.billDetails).map((detail) => {
                    console.log('item', detail)
                    return (
                      <View key={detail.id} style={styles.itemcontainer}>
                        <TouchableOpacity
                          style={styles.item}
                          onPress={() =>
                            navigation.navigate("DetailPage", {
                              item: detail.idBook,
                            })
                          }
                        >
                          <Image
                            style={styles.image}
                            source={{
                              uri: `data:image/png;base64,${detail.imageBook}`,
                            }}
                          />
                          ;
                          <View style={styles.body}>
                            <Text style={styles.titleItem} numberOfLines={1}>
                              {detail.bookName}
                            </Text>
                          </View>
                          <View style={styles.footerCard}>
                            <Text style={styles.footerItemText}>
                              Tổng tiền:{" "}
                              {formatNumberWithDot(detail.totalPrice)}
                            </Text>
                            <Text style={styles.footerItemText}>
                              {" "}
                              x{detail.quantity}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  })}

                <View
                  style={{
                    backgroundColor: "#fff",
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                    marginTop: 12,
                  }}
                >
                  <Text>Trạng thái: {getNameStatus(item.status)}</Text>
                  <Text>
                    Tổng tiền của đơn hàng: {formatNumberWithDot( item[1].totalPrice)}
                  </Text>
                  <Text>Hình thức giao hàng: Nhanh {`(Giao trong ngày)`}</Text>
                  <Text>Phương thức thanh toán: Thẻ ngân hàng</Text>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};
export default ListBillByStatus;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "7%",
    // justifyContent: "center",
  },
  listTab: {
    // flex: 1,
    padding: "3.5%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "5%",
  },
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
    paddingBottom: 100,
  },
  itemcontainer: {
    marginTop: 1,
    marginBottom: 1,
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
  btnTab: {
    width: w / 4.5,
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    padding: "3%",
    justifyContent: "center",
    borderRadius: 10,
    alignContent: "center",
    marginHorizontal: "1.8%",
    // backgroundColor: "red",
  },
  btnTabActive: {
    backgroundColor: "#f4deb4",
  },
  textTabActive: {
    color: "fff",
  },
});
