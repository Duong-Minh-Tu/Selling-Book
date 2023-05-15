import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Modal, Alert,
    TextInput,
    Image
} from "react-native";
import { 
    Feather, 
    Entypo, 
    AntDesign
} from '@expo/vector-icons';
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { updateUser } from "../shared/services/UserServices";

const EditProfile = ({ navigation, route }) => { 

    const {userData} = route.params
    const [modalNameVisible, setModalNameVisible] = useState(false);
    const [modalEmailVisible, setModalEmailVisible] = useState(false);
    const [modalPhoneVisible, setModalPhoneVisible] = useState(false);
    const [modalAddressVisible, setModalAddressVisible] = useState(false);
    const [modalAvatarVisible, setModalAvatarVisible] = useState(false);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [address, setAddress] = useState(null);
    const [avatar, setAvatar] = useState(null);

    function update() {
        let user = {
            id: userData?.id,
            customerName: name ?? userData?.customerName,
            email: email ?? userData?.email,
            phone: phone ?? userData?.phone,
            image: avatar ?? userData?.image
        }
        updateUser(user).then((res) => {
            console.log('!!!', res);
            navigation.navigate("AccountInfo");
        })
    }

    function cancelName() {
        setName(null);
        setModalNameVisible(!modalNameVisible);
    }

    function cancelAvatar() {
        setAvatar(null);
        setModalAvatarVisible(!modalAvatarVisible);
    }

    function cancelEmail() {
        setEmail(null);
        setModalEmailVisible(!modalEmailVisible);
    }

    function cancelPhone() {
        setPhone(null);
        setModalPhoneVisible(!modalPhoneVisible);
    }

    function cancelAddress() {
        setAddress(null);
        setModalAddressVisible(!modalAddressVisible);
    }

  
      const pickImage = async () => {
        const perMission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (perMission.granted === false) {
          console.log('Khong co quyen');
        }
        else{
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 0.5,
            //   base64: true,
          });
          if (!result.cancelled) {
            console.log('!!! avatar: ', result.uri);
        
            setAvatar(result.uri);
          }
        }
      };
    
      const updateProfile = () => {
          console.log('update');
      };

    return(
        <View style={styles.container}>

            <Modal
                backdropColor="#B4B3DB"
                backdropOpacity={0.8}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600}
                useNativeDriver={true}
                transparent={true}
                visible={modalAvatarVisible}
                onRequestClose={() => {
                setModalAvatarVisible(!modalAvatarVisible);
                }}
            >
                <View style={{ marginTop: 30}}>
                    <View style={[styles.modalView, {height: '80%'}]}>
                        <View style={{justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#CCC'}}> 
                            <Text style={{fontSize: 16, fontWeight:'600', padding: 8}}>Sửa Ảnh Đại Diện</Text>
                        </View>
                        <View style={{marginVertical: 20, flexDirection: 'row'}}>
                            <View style={{flex: 1}}>
                            <KeyboardAwareScrollView>
              {avatar ? (
                <TouchableOpacity onPress={pickImage}>
                  <Image
                    source={{
                      uri: avatar,
                    }}
                    style={{
                      width: "100%",
                      height: undefined,
                      aspectRatio: 1 / 1,
                      borderRadius: 50,
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: undefined,
                    aspectRatio: 1 / 1,
                    borderRadius: 50,
                    backgroundColor: "#f5f5f5",
                    borderWidth: 1,
                    borderStyle: "dashed",
                    borderRadius: 10,
                  }}
                  onPress={pickImage}
                ></TouchableOpacity>
              )}
              <View style={{marginTop: 12}}>
                <Text style={{textAlign: 'center', color: '#6e7681', fontSize: 16, fontWeight: '500', fontStyle: 'italic'}}>Chạm để thay đổi</Text>
              </View>
            </KeyboardAwareScrollView>
                            </View>
                        </View>

                        <View style={{flex: 1, justifyContent: 'flex-end'}}>
                            <View style={{ bottom: 0, flexDirection: 'row-reverse', alignContent: 'flex-end'}}>
                                <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalAvatarVisible(!modalAvatarVisible)}>
                                    <Text style={styles.textStyle}>Xác Nhận</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                style={[styles.button, styles.buttonExist, { marginRight: 12}]}
                                onPress={() => cancelAvatar()}>
                                    <Text style={styles.textStyle}>Hủy</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalNameVisible}
            onRequestClose={() => {
            setModalNameVisible(!modalNameVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#CCC'}}> 
                        <Text style={{fontSize: 16, fontWeight:'600', padding: 8}}>Sửa Họ Và Tên</Text>
                    </View>
                    <View style={{marginVertical: 20, flexDirection: 'row'}}>
                        <View style={{flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, paddingHorizontal: 12}}>
                            <TextInput
                                style={{textAlignVertical: "top", paddingVertical: 8}}
                                placeholder="Nhập họ và tên"
                                numberOfLines={2}
                                multiline={true}
                                defaultValue={name}
                                onChangeText={newText => setName(newText)}>
                            </TextInput>
                        </View>
                    </View>

                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <View style={{ bottom: 0, flexDirection: 'row-reverse', alignContent: 'flex-end'}}>
                            <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalNameVisible(!modalNameVisible)}>
                                <Text style={styles.textStyle}>Xác Nhận</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={[styles.button, styles.buttonExist, { marginRight: 12}]}
                            onPress={() => cancelName()}>
                                <Text style={styles.textStyle}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalEmailVisible}
            onRequestClose={() => {
            setModalEmailVisible(!modalEmailVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#CCC'}}> 
                        <Text style={{fontSize: 16, fontWeight:'600', padding: 8}}>Sửa Email</Text>
                    </View>
                    <View style={{marginVertical: 20, flexDirection: 'row'}}>
                        <View style={{flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, paddingHorizontal: 12}}>
                            <TextInput
                                style={{textAlignVertical: "top", paddingVertical: 8}}
                                placeholder="Nhập email"
                                defaultValue={email}
                                numberOfLines={2}
                                multiline={true}
                                onChangeText={newText => setEmail(newText)}>
                            </TextInput>
                        </View>
                    </View>

                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <View style={{ bottom: 0, flexDirection: 'row-reverse', alignContent: 'flex-end'}}>
                            <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalEmailVisible(!modalEmailVisible)}>
                                <Text style={styles.textStyle}>Xác Nhận</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={[styles.button, styles.buttonExist, { marginRight: 12}]}
                            onPress={() => cancelEmail()}>
                                <Text style={styles.textStyle}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalPhoneVisible}
            onRequestClose={() => {
            setModalPhoneVisible(!modalPhoneVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#CCC'}}> 
                        <Text style={{fontSize: 16, fontWeight:'600', padding: 8}}>Sửa Số Điện Thoại</Text>
                    </View>
                    <View style={{marginVertical: 20, flexDirection: 'row'}}>
                        <View style={{flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, paddingHorizontal: 12}}>
                            <TextInput
                                style={{textAlignVertical: "top", paddingVertical: 8}}
                                placeholder="Nhập Số điện thoại"
                                defaultValue={phone}
                                numberOfLines={2}
                                multiline={true}
                                onChangeText={newText => setPhone(newText)}>
                            </TextInput>
                        </View>
                    </View>

                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <View style={{ bottom: 0, flexDirection: 'row-reverse', alignContent: 'flex-end'}}>
                            <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalPhoneVisible(!modalPhoneVisible)}>
                                <Text style={styles.textStyle}>Xác Nhận</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={[styles.button, styles.buttonExist, { marginRight: 12}]}
                            onPress={() => cancelPhone()}>
                                <Text style={styles.textStyle}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>

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
                        <Text style={{fontSize: 16, fontWeight:'600', padding: 8}}>Sửa Địa Chỉ</Text>
                    </View>
                    <View style={{marginVertical: 20, flexDirection: 'row'}}>
                        <View style={{flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, paddingHorizontal: 12}}>
                            <TextInput
                                style={{textAlignVertical: "top", paddingVertical: 8}}
                                placeholder="Nhập địa chỉ"
                                defaultValue={address}
                                numberOfLines={6}
                                multiline={true}
                                onChangeText={newText => setAddress(newText)}>
                            </TextInput>
                        </View>
                    </View>

                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <View style={{ bottom: 0, flexDirection: 'row-reverse', alignContent: 'flex-end'}}>
                            <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalAddressVisible(!modalAddressVisible)}>
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
                    <Text style={styles.headerText}>Sửa hồ sơ</Text>
                    <TouchableOpacity onPress={() => update()}>
                        <AntDesign name="check" size={30} color="#CAC659" />
                    </TouchableOpacity>
                </View>

            </View>
            
            <View style={styles.avatarBox}>
                <View style={styles.avatarContent}>
                    <View >
                        {
                            avatar 
                            ? (
                                <TouchableOpacity onPress={() => setModalAvatarVisible(true)}>
                                
                                   
                                        <ImageBackground
                                        style={styles.avatarImage}
                                        source={{ uri: avatar }}
                                    >
                                        <View style={styles.viewText}>
                                            <Text style={styles.avatarText}>Sửa</Text>
                                        </View>
                                    </ImageBackground>   
                                </TouchableOpacity>
                            )
                            : (
                                <TouchableOpacity onPress={() => setModalAvatarVisible(true)}>
                                {
                                    userData.image ? (
                                        <ImageBackground
                                        style={styles.avatarImage}
                                        source={{ uri: userData.image } }
                                        >
                                        <View style={styles.viewText}>
                                            <Text style={styles.avatarText}>Sửa</Text>
                                        </View>
                                    </ImageBackground>
                                    )
                                    : (    
                                    <ImageBackground
                                        style={styles.avatarImage}
                                        source={  require("../../assets/images/blank-profile-picture.png")}
                                    >
                                        <View style={styles.viewText}>
                                            <Text style={styles.avatarText}>Sửa</Text>
                                        </View>
                                    </ImageBackground>
                                    )
                                }
    
                            </TouchableOpacity>
                            )
                        }

                    </View>

                </View>
                <View style={styles.avatarBot}>
                    <Text style={{ color: '#fff' }}>Chạm để thay đổi</Text>
                </View>
            </View>

            <View style={styles.contentBox}>
                <View style={styles.block}>
                    <TouchableOpacity style={ [ styles.customerInfo, styles.customerInfoBlock ]} onPress={() => setModalNameVisible(true)}>
                        <View style={[ styles.customerInfo, styles.customerInfoLeft ]}>
                            <Text style={styles.customerInfoText}>Tên</Text>
                        </View>
                        <View style={[ styles.customerInfo, styles.customerInfoRight ]}>
                            <Text>{ name ? name : userData?.customerName ?? userData?.userName}</Text>
                            <Entypo name="chevron-small-right" size={26} color="black" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={ [ styles.customerInfo, styles.customerInfoBlock ]} onPress={() => setModalEmailVisible(true)}>
                        <View style={[ styles.customerInfo, styles.customerInfoLeft ]}>
                            <Text style={styles.customerInfoText}>Email</Text>
                        </View>
                        <View style={[ styles.customerInfo, styles.customerInfoRight ]}>
                            <Text>{email ?? userData?.email}</Text>
                            <Entypo name="chevron-small-right" size={26} color="black" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={ [ styles.customerInfo, styles.customerInfoBlock ]} onPress={() => setModalPhoneVisible(true)}>
                        <View style={[ styles.customerInfo, styles.customerInfoLeft ]}>
                            <Text style={styles.customerInfoText}>Số điện thoại</Text>
                        </View>
                        <View style={[ styles.customerInfo, styles.customerInfoRight ]}>
                        {
                            userData.phone ? <Text>{phone ?? userData?.phone}</Text> : <Text>{phone ?? 'Thiết lập ngay'}</Text>
                        }
                            <Entypo name="chevron-small-right" size={26} color="black" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={ [ styles.customerInfo, styles.customerInfoBlock ]} onPress={() => navigation.navigate("AddressScreen", { userData })}>
                        <View style={[ styles.customerInfo, styles.customerInfoLeft ]}>
                            <Text style={styles.customerInfoText}>Địa chỉ</Text>
                        </View>
                        <View  style={[ styles.customerInfo, styles.customerInfoRight ]}>
                        <Text numberOfLines={1}>
                            { address ? address.length < 35
                                    ? `${address}`
                                    : `${address.substring(0, 32)}...`
                                : userData?.address ? userData?.address.length < 35
                                    ? `${userData?.address}`
                                    : `${userData?.address.substring(0, 32)}...`
                                : 'Thiết lập ngay'
                            }
                        </Text>
                        {/* {
                            userData.address ? 
                            <Text numberOfLines={1}>{
                                address.length < 35
                                    ? `${address}`
                                    : `${address.substring(0, 32)}...`
                            ?? userData?.address}</Text> : <Text>{ address.length < 35
                                    ? `${address}`
                                    : `${address.substring(0, 32)}...` ?? 'Thiết lập ngay'}</Text>
                        } */}
                            <Entypo name="chevron-small-right" size={26} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* <View style={[ styles.contentBox, styles.mt30 ]}>
                <View style={styles.block}>
                    <TouchableOpacity style={ [ styles.customerInfo, styles.customerInfoBlock ]}>
                        <View style={[ styles.customerInfo, styles.customerInfoLeft ]}>
                            <Text style={styles.customerInfoText}>Giới tính</Text>
                        </View>
                        <View style={[ styles.customerInfo, styles.customerInfoRight ]}>
                            <Text>Khác</Text>
                            <Entypo name="chevron-small-right" size={26} color="black" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={ [ styles.customerInfo, styles.customerInfoBlock ]}>
                        <View style={[ styles.customerInfo, styles.customerInfoLeft ]}>
                            <Text style={styles.customerInfoText}>Ngày sinh</Text>
                        </View>
                        <View style={[ styles.customerInfo, styles.customerInfoRight ]}>
                            <Text>15-09-2001</Text>
                            <Entypo name="chevron-small-right" size={26} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View> */}
        </View>
    )
}

export default EditProfile;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#ccc'
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
    avatarBox: {},
    avatarContent: {
        height: 160,
        backgroundColor: '#CAC659',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarImage: {
        height: 120,
        width: 120,
        borderRadius: 100,
        resizeMode: 'center',
        justifyContent: 'flex-end'
    },
    viewText: {
        backgroundColor: '#3b3b3b',
        alignItems: 'center'
    },
    avatarText: {
        color: '#fff',
    },
    avatarBot: {
        height: 24,
        width: '100%',
        backgroundColor: '#b8b32a',
        alignItems: 'center'
    },
    contentBox: {
        marginHorizontal: 20,
    },
    mt30: {
        marginTop: 30,
    },
    contentHeader: {
        marginTop: 16,
        marginBottom: 8
    },
    block: {
        // marginTop: 10,
        backgroundColor: '#f3f3f3',
        paddingBottom: 10,
        marginHorizontal: -20        
    },
    customerInfo: {
        flexDirection: 'row',
        paddingTop: 8,
    },
    customerInfoBlock: {
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    customerInfoLeft: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    customerInfoRight: {
        justifyContent: 'center',
        alignItems: 'center'
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
        height: '45%',
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
 })