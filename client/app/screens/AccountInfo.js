import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
  Entypo,
  FontAwesome5,
  AntDesign,
  MaterialIcons,
  Octicons,
  FontAwesome,
} from "@expo/vector-icons";
import { TabActions } from "@react-navigation/native";
import { useState, useEffect } from "react";
import Api from "../shared/Api";
import { getInfoUser } from "../shared/services/UserServices";
import { getCart } from "../shared/services/CoreServices";
import Loading from "../components/cards/Loading";
import { useIsFocused } from "@react-navigation/native";


const AccountInfo = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lengthCart, setLengthCart] = useState(0);

  useEffect(() => {
    getInfoUser().then((response) => {
      window.id = response.data.id;
      console.log('id: ', window.id);
      setUserData(response.data);
    });
    getCart().then((response) => {
      setIsLoading(false);
      setLengthCart(response.data.cartDetails.length);
    })
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {
        isLoading ? <Loading></Loading>
        : (
          <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.headerIcon}>
                <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
                  <Ionicons
                    style={[styles.icon, {marginTop: 4}]}
                    name="settings-outline"
                    size={26}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                  {
                    lengthCart > 0 ? <Text style={{backgroundColor: 'red', color: '#fff', width: 16, borderRadius: 60, marginBottom: -12, marginLeft:36, fontSize: 12, zIndex: 1, textAlign: 'center'}}>{lengthCart}</Text>
                    : (
                      <Text style={{ color: '#fff', width: 16, borderRadius: 60, marginBottom: -12, marginLeft:36, fontSize: 12, zIndex: 1, textAlign: 'center'}}></Text>
                    )
                  }
                  
                  <Feather
                    style={styles.icon}
                    name="shopping-cart"
                    size={26}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.headerInfo}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("EditProfile", { userData })}
                >
                  <View style={styles.avatar}>
                    {
                      userData?.image 
                      ? (                    
                      <Image
                        style={styles.avatarImage}
                        source={{ uri: userData.image }}
                      />)
                      : (
                        <Image
                        style={styles.avatarImage}
                        source={require("../../assets/images/blank-profile-picture.png")}
                      />
                      )
                    }
                    {/* <Image
                      style={styles.avatarImage}
                      source={require("../../assets/images/blank-profile-picture.png")}
                    /> */}
                  </View>
                </TouchableOpacity>
                <View style={styles.info}>
                  <Text style={styles.name}>
                    {userData?.customerName ?? userData?.userName}
                  </Text>
                  <View style={styles.rank}>
                    <Text style={styles.rankName}>Thành viên</Text>
                    {/* <Entypo
                      style={styles.rankName}
                      name="chevron-small-right"
                      size={22}
                      color="black"
                    /> */}
                  </View>
                </View>
              </View>
            </View>
          </View>
  
          <View style={styles.block}>
            <View style={styles.donMua}>
              <TouchableOpacity onPress={() => navigation.navigate("Deliver")}>
                <View style={styles.donMuaHeader}>
                  <View style={styles.donMuaHeaderLeft}>
                    <MaterialCommunityIcons
                      name="clipboard-text-outline"
                      size={22}
                      color="#05a"
                    />
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>Đơn mua</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.donMuaHeaderRight}
                    onPress={() => navigation.navigate("ListBillByStatus", { index: 3})}

                  >
                    <Text>Xem lịch sử mua hàng</Text>
                    <Entypo name="chevron-small-right" size={26} color="black" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
  
              <View style={styles.boxStatus}>
                <TouchableOpacity
                  style={[styles.statusChoose, styles.statusPrepare]}
                  onPress={() => navigation.navigate("ListBillByStatus", { index: 1})}
                >
                  <AntDesign name="wallet" size={28} color="black" />
                  <Text>Chờ xác nhận</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.statusChoose, styles.statusPrepare]}
                  onPress={() => navigation.navigate("ListBillByStatus", { index: 2})}
                >
                  <AntDesign name="inbox" size={28} color="black" />
                  <Text>Chờ lấy hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.statusChoose}
                  onPress={() => navigation.navigate("ListBillByStatus", { index: 3})}

                >
                  <MaterialCommunityIcons
                    name="truck-outline"
                    size={28}
                    color="black"
                  />
                  <Text>Đang giao</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.statusChoose}
                  onPress={() => navigation.navigate("ListBillByStatus", { index: 4})}
                >
                  <MaterialCommunityIcons
                    name="star-circle-outline"
                    size={28}
                    color="black"
                  />
                  <Text>Đánh giá</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
  
          <View style={styles.block}>
            <TouchableOpacity
              style={[styles.customerInfo, styles.customerInfoBlock]}
            >
              <View style={[styles.customerInfo, styles.customerInfoLeft]}>
                <MaterialIcons name="attach-money" size={24} color="#CAC659" />
                <Text style={styles.customerInfoText}>Khách hàng thân thiết</Text>
              </View>
              <View style={[styles.customerInfo, styles.customerInfoRight]}>
                <Text>Thành viên</Text>
                <Entypo name="chevron-small-right" size={26} color="black" />
              </View>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={[styles.customerInfo, styles.customerInfoBlock]}
            >
              <View style={[styles.customerInfo, styles.customerInfoLeft]}>
                <AntDesign name="hearto" size={24} color="#CAC659" />
                <Text style={styles.customerInfoText}>Đã thích</Text>
              </View>
              <View style={[styles.customerInfo, styles.customerInfoRight]}>
                <Text>0 Like</Text>
                <Entypo name="chevron-small-right" size={26} color="black" />
              </View>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={[styles.customerInfo, styles.customerInfoBlock]}
            >
              <View style={[styles.customerInfo, styles.customerInfoLeft]}>
                <MaterialCommunityIcons
                  name="clock-time-three-outline"
                  size={24}
                  color="#05a"
                />
                <Text style={styles.customerInfoText}>Đã xem gần đây</Text>
              </View>
              <View style={[styles.customerInfo, styles.customerInfoRight]}>
                <Entypo name="chevron-small-right" size={26} color="black" />
              </View>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={[styles.customerInfo, styles.customerInfoBlock]}
            >
              <View style={[styles.customerInfo, styles.customerInfoLeft]}>
                <Feather name="star" size={24} color="#CAC659" />
                <Text style={styles.customerInfoText}>Đánh giá của tôi</Text>
              </View>
              <View style={[styles.customerInfo, styles.customerInfoRight]}>
                <Entypo name="chevron-small-right" size={26} color="black" />
              </View>
            </TouchableOpacity>
          </View>
  
          <View style={styles.block}>
            <TouchableOpacity
              style={[styles.customerInfo, styles.customerInfoBlock]}
            >
              <View style={[styles.customerInfo, styles.customerInfoLeft]}>
                <FontAwesome name="user-o" size={24} color="#05a" />
                <Text style={styles.customerInfoText}>Thiết lập tài khoản</Text>
              </View>
              <View style={[styles.customerInfo, styles.customerInfoRight]}>
                <Entypo name="chevron-small-right" size={26} color="black" />
              </View>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={[styles.customerInfo, styles.customerInfoBlock]}
            >
              <View style={[styles.customerInfo, styles.customerInfoLeft]}>
                <Octicons name="question" size={24} color="#CAC659" />
                <Text style={styles.customerInfoText}>Trung tâm hỗ trợ</Text>
              </View>
              <View style={[styles.customerInfo, styles.customerInfoRight]}>
                <Entypo name="chevron-small-right" size={26} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        )
      }
    </View>

  );
};

export default AccountInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ccc",
  },
  header: {
    height: 150,
    backgroundColor: "#CAC659",
  },
  headerContent: {
    marginHorizontal: 20,
  },
  headerIcon: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 40,
    alignContent: "center",
  },
  icon: {
    marginLeft: 20,
  },
  headerInfo: {
    flexDirection: "row",
  },
  avatar: {
    marginRight: 10,
  },
  avatarImage: {
    height: 60,
    width: 60,
    borderRadius: 100,
    resizeMode: "center",
  },
  info: {
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    lineHeight: 24,
    color: "#fff",
  },
  rank: {
    flexDirection: "row",
    backgroundColor: "#303335",
    alignItems: "center",
    height: 22,
    width: 80,
    paddingHorizontal: 8,
    borderRadius: 30,
  },
  rankName: {
    color: "white",
    fontSize: 12,
  },
  block: {
    marginTop: 10,
    backgroundColor: "#f3f3f3",
    paddingBottom: 10,
  },
  donMua: {
    marginHorizontal: 20,
    paddingVertical: 4,
  },
  donMuaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    // backgroundColor: 'red',
    alignContent: "center",
  },
  donMuaHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },
  donMuaHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    justifyContent: "flex-end",
    // backgroundColor: 'red'
  },
  statusChoose: {
    height: 60,
    width: "23%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusPrepare: {
    width: "27%",
  },
  boxStatus: {
    flexDirection: "row",
    marginTop: 8,
  },
  // block customer
  customerInfo: {
    flexDirection: "row",
    paddingTop: 8,
  },
  customerInfoBlock: {
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  customerInfoLeft: {
    justifyContent: "center",
    alignItems: "center",
  },
  customerInfoRight: {
    justifyContent: "center",
    alignItems: "center",
  },
  customerInfoText: {
    marginLeft: 8,
  },
});
