import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Alert
} from "react-native";
import { 
    Feather, 
    FontAwesome5, 
    Entypo,
    MaterialCommunityIcons
} from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import CheckBox from "../components/buttons/CheckBox";
import { ScrollView } from "react-native-gesture-handler";
import { formatNumberDot } from "../shared/utils/moneyUtil";
import Api from "../shared/Api";
import axios from "axios";
import { CreateBill, getAllDiscount } from "../shared/services/CoreServices";
import { getInfoUser } from "../shared/services/UserServices";
import Loading from "../components/cards/Loading";
import { useIsFocused } from "@react-navigation/native";


const Payment = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const [deliver, setDeliver] = useState(1);
    const [payment, setPayment] = useState(1);
    const [phiVC, setPhiVC] = useState(25000);
    const [giamGia, setGiamGia] = useState(0);
    const [userData, setUserData] = useState([]);
    const [listDiscount, setListDiscount] = useState([]);
    const [name, setName] = useState();
    const [isLoading, setIsLoading] = useState(true)
    const [maGiamGia, setMaGiamGia] = useState('');

    useEffect(() => {
        getAllDiscount().then( (res) => {
            setListDiscount(res.data)
        })
        getInfoUser().then((response) => {
            setIsLoading(false);
            setUserData(response.data);
        });
    }, [isFocused]);

    const [listDeliver, setListDeliver] = useState([
        {
            name: 'Tiết Kiệm (Giao trong tuần)',
            code: 1,
            value: 25000,
            isChoose: true
        },
        {
            name: 'Nhanh (Giao trong ngày)',
            code: 2,
            value: 40000,
            isChoose: false
        },        {
            name: 'Hỏa Tốc (Giao trong 2h)',
            code: 3,
            value: 50000,
            isChoose: false
        }
    ]); 
    const [listPayment, setListPayment] = useState([
        {
            name: 'COD',
            code: 1,
            isChoose: true
        },
        {
            name: 'Thẻ ngân hàng',
            code: 2,
            isChoose: false
        }
    ])

    const { cartData } = route.params

    const tamTinh = cartData.reduce((sum, item) => {
        return sum + item.price;
    }, 0)

    const tongTien = tamTinh + phiVC - (tamTinh * giamGia);

    const billBooks = cartData.map(item => {
        return item.idBook;
    })

    function changeDeliver(code) {
        listDeliver.map( item => {
            item.isChoose = false;
        })
        let index = listDeliver.findIndex(p => p.code == code);
        listDeliver[index].isChoose = true;
        setDeliver(code);
        setPhiVC(listDeliver[index].value)
        setListDeliver(listDeliver);
    };

    function changePayment(code) {
        listPayment.map( item => {
            item.isChoose = false;
        })
        let index = listPayment.findIndex(p => p.code == code);
        listPayment[index].isChoose = true;
        setPayment(code)
        setListPayment(listPayment);
    }

    const AuthRequest = axios.create({
		baseURL: Api.BASE_URL,
	});

    const createBill = () => {
        if (!userData.addressId){
            Alert.alert("Thông báo", "Vui lòng cấu hình địa chỉ trước khi đặt hàng")
        }
        else{
            let dataRequest = {
                ListIdBook: billBooks,
                name: name,
                payment: payment,
                delivery: deliver,
                addressId: userData.addressId
            }
            CreateBill(dataRequest).then( (res) => {
                console.log(res);
                Alert.alert("Thông báo", "Mua hàng thành công")
                navigation.navigate("HomePage");
            })
        }
	}

    function FindDiscount() {
        let test = listDiscount.filter((item) => item.name.includes(maGiamGia));
        console.log('!!!', test);
        if (test.length > 0){
            console.log('!!! test: ', test[0].discountPercent );
            setName(test[0].name)
            setGiamGia(test[0].discountPercent)
        } else {
            Alert.alert("Thông báo", "Mã giảm giá không đúng");
        }
    }

    return (
        <View style={styles.container}>
            {
                isLoading ? (<Loading></Loading>)
                : (
                    <View style={styles.container}>
                    <View style={styles.header}>
                       <View style={styles.headerContent}>
                           <TouchableOpacity onPress={() => navigation.goBack()}>
                               <Feather name="arrow-left" size={30} color="#FFF" />
                           </TouchableOpacity>
                           <Text style={styles.headerText}>Xác Nhận Đơn Hàng</Text>
                           <View></View>
                       </View>
                   </View>
                   <ScrollView>
                   {
                       userData.addressId
                       ? (
                           <TouchableOpacity onPress={() => navigation.navigate("AddressScreen", { userData })}>
                           <View style={styles.address}>
                               <View style={styles.firstInfo}>
                                   <FontAwesome5 name="map-marker-alt" size={24} color="#CAC659" />
                                   <Text style={styles.name}>{userData.nameAddress ?? userData.userName}</Text>
                                   <Text style={styles.phone}>{userData.phoneAddress}</Text>
                               </View>
                               <View style={styles.addressDetail}>
                                   <View style={styles.addressText}>
                                       <Text style={styles.greyColor}>{userData.detailAddress}</Text>
                                   </View>
                                   <View style={styles.addressIcon}>
                                       <Entypo style={styles.greyColor} name="chevron-small-right" size={30} color="black" />
                                   </View>
                               </View>
                           </View>
                           </TouchableOpacity>
                       )
                       : (
                           <TouchableOpacity onPress={() => navigation.navigate("AddressScreen", { userData })}>
                               <View style={styles.addressEmpty}>
                                   <View style={styles.addressDetail}>
                                       <View style={styles.addressText}>
                                           <Text>Chưa thiết lập địa chỉ giao hàng</Text>
                                       </View>
                                       <View style={styles.addressIcon}>
                                           <Entypo style={styles.greyColor} name="chevron-small-right" size={30} color="black" />
                                       </View>
                                   </View>
                               </View>
                           </TouchableOpacity>
       
                       )
                   }
       
       
                   <View style={styles.deliver}>
                       <View style={styles.deliverContainer}>
                           <Text style={styles.deliverTitle}>Chọn hình thức giao hàng</Text>
                           <View style={styles.selectDelivers}>
                               {
                                   listDeliver.map((deliver) => {
                                       return(
                                           <View style={styles.deliverOption}>
                                               <CheckBox
                                                   onPress={() => changeDeliver(deliver.code)}
                                                   title={deliver.name}
                                                   isChecked={deliver.isChoose}
                                               />
                                           </View>
                                       )
                                   })
                               }
       
                           </View>
                       </View>
                   </View>
       
                   <View style={styles.deliver}>
                       <View style={styles.deliverContainer}>
                           <Text style={styles.deliverTitle}>Chọn phương thức thanh toán</Text>
                           <View style={styles.selectDelivers}>
                               {
                                   listPayment.map((deliver) => {
                                       return(
                                           <View style={styles.deliverOption}>
                                               <CheckBox
                                                   onPress={() => changePayment(deliver.code)}
                                                   title={deliver.name}
                                                   isChecked={deliver.isChoose}
                                               />
                                           </View>
                                       )
                                   })
                               }
       
                           </View>
                       </View>
                   </View>
       
                
                       <View style={styles.listItemContainer}>
                           {
                               cartData.map((bookOverview) => {
                                   return(
                                       <View style={styles.itemContainer}>
                                           <View style={styles.overviewItem}>
                                           <Image
                                                   style={styles.itemImage}
                                                   source={{
                                                       uri: `data:image/png;base64,${bookOverview?.book.image}`,
                                                   }}
                                               />
                                               <View style={styles.description}>
                                                   <Text style={styles.title}>{bookOverview?.book.bookName}</Text>
                                                   <View>
                                                       <Text>Số lượng: {bookOverview?.quantity}</Text>
                                                       <Text style={styles.price}>{formatNumberDot(bookOverview.book.price) ?? 0} </Text>
                                                   </View>
                                               </View>
                                           </View>
                                       </View>
                                   );
                               })
                           }
                       </View>
       
                       <View style={styles.priceContainer}>
                           <View style={styles.priceOverview}> 
                               <View style={styles.priceCalculate}>
                                   <View style={styles.priceItem}>
                                       <Text>Tạm tính</Text>
                                       <Text>{formatNumberDot(tamTinh) ?? 0} </Text>
                                   </View>
                                   <View style={styles.priceItem}>
                                       <Text>Phí vận chuyển</Text>
                                       <Text>{formatNumberDot(phiVC) ?? 0} </Text>
                                   </View>
                                   {
                                   giamGia != 0
                                       ? <View style={styles.priceItem}>
                                           <Text>Giảm giá</Text>
                                           <Text style={styles.discount}>- {formatNumberDot(tamTinh * giamGia)} </Text>
                                       </View>
                                       : <View></View>
                                   }
       
                               </View>
       
                               <View style={[ styles.priceItem, styles.totalPrice ]}>
                                   <Text style={styles.totalPriceText}>Tổng tiền</Text>
                                   <Text style={styles.totalPriceText}>{formatNumberDot(tongTien) ?? 0}</Text>
                               </View>
       
                           </View>
                       </View>
                   </ScrollView>
       
                   <View style={styles.bottom}>
                       <View style={styles.salesContainer}>
                           <View style={styles.salesDescription}>
                               <MaterialCommunityIcons name="ticket-percent-outline" size={24} color="#CAC659" />
                               <TextInput 
                                   style={{ marginLeft: 4 }}
                                   placeholder="Nhập mã giảm giá"
                                   onChangeText={newText => setMaGiamGia(newText)}
                                   defaultValue={maGiamGia}>
                               </TextInput>
                           </View>
                           <View style={styles.inputCode}>
       
                               <TouchableOpacity onPress={() => {FindDiscount()}}>
                                   <View style={{ paddingHorizontal: 12, paddingVertical: 8, backgroundColor:'#CAC659', borderRadius: 8 }}>
                                       <Text style={{color: '#fff', fontSize:16, fontWeight:'500'  }}>Áp dụng</Text>
                                   </View>
                               </TouchableOpacity>
       
                               
                           </View>
                       </View>
       
                       <View style={styles.paymentContainer}>
                           <View style={styles.paymentContent}>
                               <Text>Tổng tiền</Text>
                               <Text style={styles.paymentPrice}>{formatNumberDot(tongTien) ?? 0}</Text>
                           </View>
                           <View>
                               <TouchableOpacity style={styles.paymentBnt} onPress={createBill}>
                                   <Text style={styles.paymentBntText}>Đặt hàng</Text>
                               </TouchableOpacity>
                           </View>
                       </View>
                   </View>
               </View>
                )
            }
        </View>
    );
 }

export default Payment;

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#ccc'
    },
    header: {
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: '#CAC659',
    },
    headerContent: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-between'
    },
    headerText: {
        flexDirection: 'column',
        color: '#fff',
        fontWeight: '600',
        fontSize: 24,
        alignItems: "center",
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    address: {
        height: 100,
        backgroundColor: '#fff',
    },
    addressEmpty: {
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    firstInfo: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 12,
        alignItems: 'center'
    },
    name: {
        marginLeft: 4,
        paddingHorizontal: 8,
        borderRightWidth: 1,
        borderRightColor: '#CCC'
    },
    phone: {
        paddingHorizontal: 8
    },
    addressDetail: {
        paddingHorizontal: 20,
        flexDirection: 'row'
    },
    addressText: {
        flex: 11,
    },
    addressIcon: {
        flex: 1,
    },
    greyColor: {
        color: '#595858'
    },
    deliver: {
        marginTop: 8,
        backgroundColor: '#fff',
    },
    deliverContainer: {
        paddingHorizontal: 20,
        marginBottom: 20
    },
    deliverTitle: {
        paddingVertical: 12
    },
    selectDelivers: {
        paddingHorizontal: 20,
        paddingTop: 12,
        backgroundColor: '#f1f0dd',
        borderColor: '#CAC659',
        borderWidth: 2,
        borderRadius: 28,
        paddingBottom: 20
    },
    checkBox: {
        width: 20,
        height: 20,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#ccc',
        marginRight: 10
    },
    deliverOption: {
        flexDirection: 'row',
        paddingVertical: 8
    },
    listItemContainer: {
        // backgroundColor: '#fff',
        marginTop: 8,
        justifyContent: 'center',

    },
    itemContainer: {
        marginTop: 1,
        height: 160,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        // justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        // marginHorizontal: 20,
        justifyContent: 'space-between'
    },
    overviewItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemImage: {
        height: 120,
        width: 100,
        flex: 2
    },
    description: {
        flex: 5,
        height: 120,
        // width: '55%',
        marginLeft: 12,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        fontWeight: '400'
    },
    price: {
        fontSize: 16,
        color: 'red'
    },
    quantityItem: {
        flexDirection: 'row',
        marginTop: 8
    },
    changeQuantityLeft: {
        borderWidth: 1,
        paddingVertical: 4,
        width: 24,
        borderColor: '#ccc',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    changeQuantityRight: {
        borderWidth: 1,
        paddingVertical: 4,
        width: 24,
        borderColor: '#ccc',
        alignItems: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    showQuantity: {
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center'
    },
    bottom: {
        backgroundColor: '#fff',
        borderTopColor: '#ccc',
        borderWidth: 2,

    },
    salesContainer:{
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 12,
        paddingVertical: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    salesDescription: {
        flexDirection: 'row',
        alignItems: 'center'

    },
    inputCode: {
        flexDirection: 'row',
        alignItems: 'center'

    },
    paymentContainer: {
        height: 76,
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    paymentContent: {
        justifyContent: 'space-between'
    },
    paymentPrice: {
        color: 'red',
        fontSize: 18,
        fontWeight: '500'
    },
    paymentBnt: {
        height: 44,
        width: 130,
        backgroundColor: 'red',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    paymentBntText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 16
    },
    priceContainer: {
        marginTop: 8,
        marginBottom: 2,
        backgroundColor: '#fff',
    },
    priceOverview: {
        paddingHorizontal: 20,
        paddingVertical: 12
    },
    priceCalculate: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    priceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6
    },
    discount: {
        color: 'green'
    },
    totalPriceText: {
        fontSize: 16,
        fontWeight: '500'
    }
})