import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Alert } from "react-native";
import { Feather, Entypo, } from "@expo/vector-icons";
import { TabActions } from "@react-navigation/native";
import { useState, useEffect } from "react";
import Api from "../shared/Api";
import { getInfoUser, addAddress, updateAddress, changeDefaultAddress } from "../shared/services/UserServices";
import { ScrollView  } from "react-native-gesture-handler";
import { formatNumberWithDot } from "../shared/utils/moneyUtil";
import CheckBoxAddress from "../components/buttons/CheckBoxAddress";
import { getAllAddress } from "../shared/services/UserServices";
import Loading from "../components/cards/Loading";
import { useIsFocused } from "@react-navigation/native";


const AddressScreen = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const {userData} = route.params
    const [modalAddressVisible, setModalAddressVisible] = useState(false);
    const [address, setAddress] = useState({id: 0, name: '', phone: '', detailAddress: '', isDefaul: null});
    const [idDefault, setIdDefault] = useState()
    const [listAddress, setListAddress] = useState([]); 
    const [isLoading, setIsLoading] = useState(true)
    const [isChange, setIsChange] = useState(0)

    useEffect(() => {
        getAllAddress().then((response) => {
            let addresses = response.data.map( (item) => {
                if (item.isDefaul == 'Y') {
                    setIdDefault(item.id);
                    item.isDefaul = true;
                } else {
                    item.isDefaul = false;
                }
                return item;
            })
            setIsLoading(false)
            setListAddress(addresses);
        });
    }, [isChange, isFocused]);


    

    function editAddress(item) {
        setAddress(item)
        setModalAddressVisible(true);
    }

    function createAddress() {
        setAddress({id: 0, name: '', phone: '', detailAddress: '', isDefaul: null});
        setModalAddressVisible(true);
    }

    function setDefaultAddress(id) {
        let responseData = {
            idNew: id,
            idOld: idDefault,
        }
        changeDefaultAddress(responseData).then( (res) => {
            console.log('!!! ', res);
            setIsChange(isChange+1);
        })
    }

    function changeAddress(id){
        // Alert.alert("Thay đổi địa chỉ", "Bạn có chắc muốn chọn địa chỉ này làm địa chỉ mặc định!")
        Alert.alert("Thay đổi địa chỉ", "Bạn có chắc muốn chọn địa chỉ này làm địa chỉ mặc định!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => setDefaultAddress(id) }
      ])
    }
    
    function cancelAddress() {
        setAddress({id: 0, name: '', phone: '', detailAddress: '', isDefaul: null});
        setModalAddressVisible(!modalAddressVisible);
    }

    function save(item) {
        setIsLoading(true);
        setModalAddressVisible(!modalAddressVisible);
        console.log('item: ', item);
        if (item.id == 0){
            console.log('them moi');
            addAddress(userData?.id, item).then(res => {
                console.log('add address: ', res);
                setIsChange(isChange+1);
            })
        } else {
            let responseDate = {
                id: item.id,
                name: item.name,
                phone: item.phone,
                detailAddress: item.detailAddress
            }
            updateAddress(responseDate).then(res => {
                console.log('update address: ', res);
                setIsChange(isChange+1);
            })
            console.log('update: ', responseDate);
        }
    }

    return (
        <View style={styles.container}>
            {
                isLoading ? ( <Loading></Loading> )
                : (
                    <View style={styles.container}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalAddressVisible}
                        onRequestClose={() => {
                        setModalAddressVisible(!modalAddressVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={{justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#CCC'}}> 
                                    { 
                                    address.id == 0 
                                        ? <Text style={{fontSize: 16, fontWeight:'600', padding: 8}}>Thêm Địa Chỉ Nhận Hàng</Text>
                                        : <Text style={{fontSize: 16, fontWeight:'600', padding: 8}}>Sửa Địa Chỉ Nhận Hàng</Text>
                                    }
                                </View>
                                <View style={{marginVertical: 20, flexDirection: 'row'}}>
                                    <View style={{flex: 1}}>
                                        <Text>Tên người nhận:</Text>
                                        <TextInput
                                            style={{textAlignVertical: "top", marginTop: 4, marginBottom: 12, paddingTop: 8, paddingLeft: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 20}}
                                            placeholder="Nhập tên người nhận"
                                            defaultValue={address.name}
                                            onChangeText={newText => setAddress({id: address.id, name: newText, phone: address.phone, detailAddress: address.detailAddress, isDefaul: address.isDefaul})}>
                                        </TextInput>
    
                                        <Text>Số điện thoại:</Text>
                                        <TextInput
                                            style={{textAlignVertical: "top", marginTop: 4, marginBottom: 12,paddingTop: 8, paddingLeft: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 20}}
                                            placeholder="Nhập số điện thoại"
                                            defaultValue={address.phone}
                                            onChangeText={newText => setAddress({id: address.id, name: address.name, phone: newText, detailAddress: address.detailAddress, isDefaul: address.isDefaul})}>
                                        </TextInput>
    
                                        <Text>Nhập địa chỉ:</Text>
                                        <TextInput
                                            style={{textAlignVertical: "top", marginTop: 4, marginBottom: 12,paddingTop: 8, paddingLeft: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 20}}
                                            placeholder="Nhập địa chỉ"
                                            defaultValue={address.detailAddress}
                                            multiline={true}
                                            numberOfLines={4}
                                            onChangeText={newText => setAddress({id: address.id, name: address.name, phone: address.phone, detailAddress: newText, isDefaul: address.isDefaul})}>
                                        </TextInput>
                                    </View>
                                </View>
    
                                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                                    <View style={{ bottom: 0, flexDirection: 'row-reverse', alignContent: 'flex-end'}}>
                                        <TouchableOpacity
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => save(address)}>
                                            <Text style={styles.textStyle}>Xác Nhận</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                        style={[styles.button, styles.buttonExist, { marginRight: 12}]}
                                        onPress={() => cancelAddress()}>
                                            <Text style={styles.textStyle}>Hủy</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
    
    
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Feather name="arrow-left" size={30} color="#CAC659" />
                            </TouchableOpacity>
                            <Text style={styles.headerText}>Sửa Địa Chỉ Nhận Hàng</Text>
                            <TouchableOpacity onPress={() => createAddress()}>
                                <Entypo name="plus" size={30} color="#CAC659" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        listAddress.length > 0
                        ? (
                            <ScrollView>
                            <Text style={{marginTop: 8, paddingHorizontal:8}}> Chạm để chỉnh sửa</Text>
                            <View style={styles.selectDelivers}>
                            {
                                listAddress.map((item) => {
                                    return(
                                        <TouchableOpacity onPress={() => editAddress(item)}>
                                            <View style={styles.deliverOption}>
                                                <CheckBoxAddress
                                                    onPress={() => changeAddress(item.id)}
                                                    title={item.name}
                                                    phone={item.phone}
                                                    address={item.detailAddress}
                                                    isChecked={item.isDefaul}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                            </View>
                        </ScrollView>
                        )
                        : (
                            <View></View>
                        )
                    }
    
                </View>
                )
            }
        </View>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#ccc",
        },
    header: {
        paddingTop: 40,
        backgroundColor: '#f3f3f3',
    },
    headerContent: {
        flexDirection: 'row',
        marginHorizontal: 20,
        alignContent: 'center',
        paddingVertical: 8,
        justifyContent:'space-between'
    },
    headerText: {
        fontSize: 20,
        marginLeft: 8
    },
    content: {
        flex: 1,
        marginHorizontal: 20
    },
    selectDelivers: {
        marginTop: 4,
        paddingHorizontal: 20,
        paddingTop: 12,
        backgroundColor: '#FFF',
        paddingBottom: 20,
 
    },
    deliverOption: {
        flexDirection: 'row',
        paddingVertical: 8,
        // borderBottomColor: '#ccc',
        // borderBottomWidth: 1
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        // alignItems: "center",
        shadowColor: "#000",
        width: '90%',
        height: 440,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 12,
        padding: 10,
        elevation: 2,
        width: '30%'
      },

      buttonExist: {
        backgroundColor: "red",
      },

      buttonClose: {
        backgroundColor: "#CAC659",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }

});
