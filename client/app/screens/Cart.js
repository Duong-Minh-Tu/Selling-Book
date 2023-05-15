import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import {
    Feather,
    FontAwesome5,
    Entypo,
    FontAwesome,
} from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import { ScrollView  } from "react-native-gesture-handler";
import { formatNumberDot, formatNumberWithDot } from "../shared/utils/moneyUtil";
import { deleteBookFromCart } from "../shared/services/CoreServices";
import Loading from "../components/cards/Loading";
import { getCart } from "../shared/services/CoreServices";
import { getInfoUser } from "../shared/services/UserServices";
import { useIsFocused } from "@react-navigation/native";
import { Alert } from "react-native";

const Cart = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true);
    const [cartData, setCartData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [isReset, setIsReset] = useState(0);
    const [updateBook, setUpdateBook] = useState({idBook: 0, quantity: 0});

    const total = cartData.reduce((sum, item) => {
        return sum + item.price;
    }, 0)

    useEffect(() => {
		getCart().then(response => {
			setCartData(response.data.cartDetails.map(book => {
                book.isChoose = false;
                return book;
            }))
		}, error => {
            setIsLoading(false);
        }),
        getInfoUser().then((response) => {
            setIsLoading(false);
            setUserData(response.data);
        });
	}, [isReset, isFocused])

    const deleteBook = (idBook) => {
        deleteBookFromCart(idBook).then( (res) => {
            setIsReset(isReset+1);
            console.log('Xóa thành công: ', res);
        })
    } 

    const addToBill = () => {
        if (cartData.length > 0){
            navigation.navigate("Payment", {cartData})
        } else {
            Alert.alert("Thông báo", "Vui lòng thêm sách vào giỏ hàng!")
        }
	}

    // function SetAllItems() {
    //     if (checkboxBC == "#fff") {
    //         setCheckboxBC("#CAC659")
    //     } else setCheckboxBC("#fff")
    // }

    function plusQuantity(idBook, quantity) {
        setUpdateBook({idBook: idBook, quantity: quantity+1})
	}

	function minusQuantity(idBook, quantity) {
        if (quantity > 1)
        {
            setUpdateBook({idBook: idBook, quantity: quantity-1})
            console.log('minus: ', updateBook);
        }
    }

    return (
        <View style={styles.container}>
            {
                isLoading ? <Loading></Loading>
                : (
                    <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Feather name="arrow-left" size={30} color="#FFF" />
                            </TouchableOpacity>
                            <Text style={styles.headerText}>Giỏ Hàng</Text>
                            <View></View>
                        </View>
                    </View>
                    {
                        userData.detailAddress 
                        ? (
                            <TouchableOpacity onPress={() => navigation.navigate("AddressScreen", { userData })}>
                            <View style={styles.address}>
                            <View style={styles.addressDetail}>
                                <FontAwesome5 name="map-marker-alt" size={24} color="#CAC659" />
                                <Text style={styles.addressDetailText}>{userData.detailAddress.length > 45 ? userData.detailAddress.substring(0, 45) + '...' : userData.detailAddress}</Text> 
                            </View>
                            <View style={styles.addressIcon}>
                                <Entypo style={styles.rankName} name="chevron-small-right" size={30} color="black" />
                            </View>
                            </View>
                            </TouchableOpacity>
                        )
                        : (
                            <TouchableOpacity onPress={() => navigation.navigate("AddressScreen", { userData })}>
                            <View style={styles.address}>
                                <View style={styles.addressDetail}>
                                    <FontAwesome5 name="map-marker-alt" size={24} color="#CAC659" />
                                
                                        <Text style={styles.addressDetailText}>Chưa thiết lập chỉ nhận hàng nhấn để thiết lập</Text> 
                                    
                                </View>
                                <View style={styles.addressIcon}>
                                    <Entypo style={styles.rankName} name="chevron-small-right" size={30} color="black" />
                                </View>
                            </View>
                        </TouchableOpacity>
                        )

                    }


        
                    <View style={styles.total}>
                        <View style={styles.totalDetail}>
                            <View style={styles.listCheckBox}>
                                {/* <TouchableOpacity onPress={SetAllItems}>
                                    <View style={[styles.checkBox, {backgroundColor: checkboxBC}]}>
                                    </View>
                                </TouchableOpacity> */}
                                <Text>Tất cả ({cartData.length} sản phẩm)</Text>
                            </View>
                                <TouchableOpacity onPress={ () => {
                                    console.log("abcde")
                                } }>
                                    <View style={styles.deleteItem}>
                                        {/* <FontAwesome name="trash-o" size={24} color="black" /> */}
                                    </View>
                                </TouchableOpacity>
        
                        </View>
                    </View>
        
                    <ScrollView>
                        <View style={styles.listItemContainer}>
                            {
                                cartData.map((bookOverview) => {
                                    return (
                                        <View style={styles.itemContainer}>
                                            <TouchableOpacity style={styles.overviewItem} onPress={() => {navigation.navigate("DetailPage", { id: bookOverview?.book?.id });}}>
                                                <View style={styles.overviewItem}>
                                                    {/* <TouchableOpacity style={[styles.checkBox, { backgroundColor: checkboxBC }]}></TouchableOpacity> */}
                                                    <Image
                                                        style={styles.itemImage}
                                                        source={{
                                                            uri: `data:image/png;base64,${bookOverview.book.image}`,
                                                        }}
                                                    />
                                                    <View style={styles.description}>
                                                        <Text style={styles.title}>{bookOverview.book.bookName}</Text>
                                                        <View>
                                                            <Text style={styles.price}>{formatNumberWithDot(bookOverview.book.price)}</Text>
                                                            <View style={styles.quantityItem}>
                                                                {/* <TouchableOpacity style={styles.changeQuantityLeft} onPress={() => minusQuantity(bookOverview.idBook, bookOverview.quantity)}>
                                                                    <AntDesign name="minus" size={16} color="black" />
                                                                </TouchableOpacity>
                                                                <View style={styles.showQuantity}>
                                                                    <Text>{bookOverview.quantity}</Text>
                                                                </View>
                                                                <TouchableOpacity style={styles.changeQuantityRight} onPress={() => plusQuantity(bookOverview.idBook, bookOverview.quantity)}>
                                                                    <AntDesign name="plus" size={16} color="black" />
                                                                </TouchableOpacity> */}
                                                                <View>
                                                                    <Text>Số lượng: {bookOverview.quantity}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View >
                                                        <TouchableOpacity style={styles.deleteItem} 
                                                            onPress={() => { deleteBook(bookOverview.idBook) }}
                                                        >
                                                            <FontAwesome name="trash-o" size={24} color="black" />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })
                            }
                        </View>
                    </ScrollView>
                    <View style={styles.bottom}>
                        {/* <View style={styles.salesContainer}>
                            <View style={styles.salesDescription}>
                                <MaterialCommunityIcons name="ticket-percent-outline" size={24} color="#CAC659" />
                                <Text style={{ marginLeft: 10 }}>Shop khuyến mãi</Text>
                            </View>
                            <View style={styles.inputCode}>
                                <TextInput
                                    placeholder="Nhập mã giảm giá">
                                </TextInput>
                                <Entypo style={styles.rankName} name="chevron-small-right" size={24} color="#ccc" />
        
        
                            </View>
                        </View> */}
        
                        <View style={styles.paymentContainer}>
                            <View style={styles.paymentContent}>
                                <Text style={{fontWeight: '600'}}>Tổng cộng</Text>
                                {total > 0 
                                    ? <Text style={styles.paymentPrice}>{formatNumberDot(total)}</Text> 
                                    : <Text style={styles.paymentPrice}>Thêm sách vào giỏ hàng</Text> 
                                }
                            </View>
                            <View>
                                <TouchableOpacity style={styles.paymentBnt} onPress={addToBill}>
                                    <Text style={styles.paymentBntText}>Mua Hàng </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                )
            }
        </View>

    )
};


export default Cart;

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
        flexDirection: 'row',
        height: 48,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    addressDetail: {
        flexDirection: 'row',
        marginLeft: 20,
        alignItems: 'center'
    },
    addressIcon: {
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },
    addressDetailText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#444950'
    },
    total: {
        marginTop: 8,
        flexDirection: 'row',
        height: 48,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'space-between',
    },
    totalDetail: {
        width: '90%',
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    listCheckBox: {
        flexDirection: 'row',
    },
    checkBox: {
        width: 20,
        height: 20,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#ccc',
        marginRight: 10
    },
    listItemContainer: {
        // backgroundColor: '#fff',
        justifyContent: 'center',

    },
    itemContainer: {
        marginTop: 4,
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
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: 40
    },
    bottom: {
        marginTop: 8,
        height: 80,
        backgroundColor: '#fff'
    },
    salesContainer: {
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
        fontSize: 16,
        fontWeight: '600'
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
    }
})