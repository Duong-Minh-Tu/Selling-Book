import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    Alert
} from "react-native";
import { 
    Feather, 
    Entypo, 
} from '@expo/vector-icons';
import Api from "../shared/Api";
import ButtonBot from "../components/buttons/ButtonBot";
import axios from "axios";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { deleteUser, changePasswordUser } from "../shared/services/UserServices";

const Setting = ({ navigation }) => {
    const [modalDelete, setModalDelete] = useState(false);
    const [modalChangePassword, setModalChangePassword] = useState(false);
    const [oldPassword, setOldPassword] = useState(null);
    const [newPassword, setNewPassord] = useState(null);
    const [repeatPassword, setRepeatPassword] = useState(null);
    const [viewPassword1, setViewPassword1] = useState(true);
    const [viewPassword2, setViewPassword2] = useState(true);
    const [viewPassword3, setViewPassword3] = useState(true);
    const [rightIcon1, setRightIcon1] = useState("eye");
    const [rightIcon2, setRightIcon2] = useState("eye");
    const [rightIcon3, setRightIcon3] = useState("eye");

    const handlePasswordVisibility1 = () => {
        if (rightIcon1 === "eye") {
          setRightIcon1("eye-off");
        } else if (rightIcon1 === "eye-off") {
          setRightIcon1("eye");
        }
        setViewPassword1(!viewPassword1);
    };

    const handlePasswordVisibility2 = () => {
        if (rightIcon2 === "eye") {
          setRightIcon2("eye-off");
        } else if (rightIcon2 === "eye-off") {
          setRightIcon2("eye");
        }
        setViewPassword2(!viewPassword2);
    };

    const handlePasswordVisibility3 = () => {
        if (rightIcon3 === "eye") {
          setRightIcon3("eye-off");
        } else if (rightIcon3 === "eye-off") {
          setRightIcon3("eye");
        }
        setViewPassword3(!viewPassword3);
    };

    function deleteData(){
        deleteUser(window.id).then( (res) => {
            console.log('delete: ', res);
            setModalDelete(false);
            navigation.navigate("SignUpScreen");
        })
        setModalDelete(false);
    }

    function cancelChangePassword(){
        setOldPassword(null);
        setNewPassord(null);
        setRepeatPassword(null);
        setModalChangePassword(false);
    }

    function handlePassword(){
        if (!oldPassword && !newPassword && !repeatPassword){
            Alert.alert("Thông báo", "Vui lòng điền tất cả trường thông tin");
        } 
        else if (newPassword.trim() != repeatPassword.trim()){
            Alert.alert("Thông báo", "Mật khẩu mới và mật khẩu nhập lại không giống nhau");
        } 
        else if( newPassword.length < 6 || newPassword.length < 6 ) {
            Alert.alert("Thông báo", 'Mật khẩu tối thiểu 6 kí tự');
        } 
        else{
            changePassword();
        }
    }

    function changePassword(){
        let data = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }
        changePasswordUser(data).then( (res) => {
            console.log('!!!', res.data);
            if (res.data.code != 200){
                Alert.alert("Lỗi", res.data.message);
            } else {
                Alert.alert("Thông báo", "Đổi mật khẩu thành công");
                navigation.navigate("SignUpScreen");
            }
        });
    }

    return (
        <View style={styles.container}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalDelete}
                onRequestClose={() => {
                setModalDelete(!modalDelete);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#CCC'}}> 
                        <Text style={{fontSize:20, fontWeight:'600', paddingBottom: 8}}>Yêu cầu xóa tài khoản</Text>

                        </View>
                        <View style={{marginVertical: 20, flexDirection: 'row', flex: 1}}>
                            <View style={{flex: 1, justifyContent: 'space-evenly', alignContent: 'space-between', alignItems: 'center'}}>
                                <Text style={{fontWeight: '500', fontSize: 16}}>Bạn chắc chắn muốn xóa tài khoản này? </Text>
                                <Text style={{fontStyle: 'italic'}}>{`(Sau khi xóa không thể phục hồi tài khoản)`}</Text>
                            </View>
                        </View>

                        <View style={{flex: 1, justifyContent: 'flex-end'}}>
                            <View style={{ bottom: 0, flexDirection: 'row-reverse', alignContent: 'flex-end'}}>
                                <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => deleteData()}>
                                    <Text style={styles.textStyle}>Xác Nhận</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                style={[styles.button, styles.buttonExist, { marginRight: 12}]}
                                onPress={() => setModalDelete(false)}>
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
                visible={modalChangePassword}
                onRequestClose={() => {
                setModalDelete(!modalDelete);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, { height: 450}]}>
                        <View style={{justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#CCC'}}> 
                        <Text style={{fontSize:20, fontWeight:'600', paddingBottom: 8}}>Đổi mật khẩu</Text>

                        </View>
                        <View style={{marginVertical: 20, flexDirection: 'row', flex: 1}}>
                            <View style={{flex: 1}}>
                                <View>
                                    <Text>Mật khẩu hiện tại:</Text>
                                    <View style={styles.inputContainer}> 
                                        <TextInput
                                            style={[styles.inputField]}
                                            secureTextEntry={viewPassword1}
                                            placeholder="Nhập mật khẩu hiện tại"
                                            multiline={false}
                                            defaultValue={oldPassword}
                                            onChangeText={newText => setOldPassword(newText)}>
                                        </TextInput>
                                        <TouchableOpacity
                                            style={{padding: 8}}
                                            onPress={() => {
                                            handlePasswordVisibility1();
                                            }}
                                        >
                                            <Ionicons name={rightIcon1} size={22} color="#383838" />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                                <View style={{marginTop: 8}}>
                                    <Text>Mật khẩu mới:</Text>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.inputField}
                                            placeholder="Nhập mật khẩu mới"
                                            secureTextEntry={viewPassword2}
                                            multiline={false}
                                            defaultValue={newPassword}
                                            onChangeText={newText => setNewPassord(newText)}>
                                        </TextInput>
                                        <TouchableOpacity
                                            style={{padding: 8}}
                                            onPress={() => {
                                            handlePasswordVisibility2();
                                            }}
                                        >
                                            <Ionicons name={rightIcon2} size={22} color="#383838" />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                                <View style={{marginTop: 8}}>
                                    <Text>Nhập lại mật khẩu:</Text>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.inputField}
                                            placeholder="Nhập lại mật khẩu"
                                            secureTextEntry={viewPassword3}
                                            multiline={false}
                                            defaultValue={repeatPassword}
                                            onChangeText={newText => setRepeatPassword(newText)}>
                                        </TextInput>
                                        <TouchableOpacity
                                                style={{padding: 8}}
                                                onPress={() => {
                                                handlePasswordVisibility3();
                                                }}
                                            >
                                                <Ionicons name={rightIcon3} size={22} color="#383838" />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </View>

                        <View style={{flex: 1, justifyContent: 'flex-end'}}>
                            <View style={{ bottom: 0, flexDirection: 'row-reverse', alignContent: 'flex-end'}}>
                                <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => handlePassword()}>
                                    <Text style={styles.textStyle}>Xác Nhận</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                style={[styles.button, styles.buttonExist, { marginRight: 12}]}
                                onPress={() => cancelChangePassword()}>
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
                    <Text style={styles.headerText}>Thiết lập tài khoản</Text>
                </View>

            </View>

            <View style={styles.contentBox}>
                <Text style={styles.contentHeader}>Tài khoản</Text>
                <View style={styles.block}>
                    <TouchableOpacity style={ [ styles.customerInfo, styles.customerInfoBlock ]}>
                        <View style={[ styles.customerInfo, styles.customerInfoLeft ]}>
                            <Text style={styles.customerInfoText}>Tài khoản & Bảo mật</Text>
                        </View>
                        <View style={[ styles.customerInfo, styles.customerInfoRight ]}>
                            <Entypo name="chevron-small-right" size={26} color="black" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={ [ styles.customerInfo, styles.customerInfoBlock ]} onPress={() => {setModalChangePassword(true)}}>
                        <View style={[ styles.customerInfo, styles.customerInfoLeft ]}>
                            <Text style={styles.customerInfoText}>Đổi mật khẩu</Text>
                        </View>
                        <View style={[ styles.customerInfo, styles.customerInfoRight ]}>
                            <Entypo name="chevron-small-right" size={26} color="black" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={ [ styles.customerInfo, styles.customerInfoBlock ]}>
                        <View style={[ styles.customerInfo, styles.customerInfoLeft ]}>
                            <Text style={styles.customerInfoText}>Tài khoản / Thẻ ngân hàng</Text>
                        </View>
                        <View style={[ styles.customerInfo, styles.customerInfoRight ]}>
                            <Entypo name="chevron-small-right" size={26} color="black" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={ [ styles.customerInfo, styles.customerInfoBlock ]}>
                        <View style={[ styles.customerInfo, styles.customerInfoLeft ]}>
                            <Text style={styles.customerInfoText}>Ngôn ngữ / Language</Text>
                        </View>
                        <View style={[ styles.customerInfo, styles.customerInfoRight ]}>
                            <Entypo name="chevron-small-right" size={26} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.contentBox}>
                <Text style={styles.contentHeader}>Hỗ trợ</Text>
                <View style={styles.block}>
                    <TouchableOpacity style={ [ styles.customerInfo, styles.customerInfoBlock ]}>
                        <View style={[ styles.customerInfo, styles.customerInfoLeft ]}>
                            <Text style={styles.customerInfoText}>Trung tâm hỗ trợ</Text>
                        </View>
                        <View style={[ styles.customerInfo, styles.customerInfoRight ]}>
                            <Entypo name="chevron-small-right" size={26} color="black" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={ [ styles.customerInfo, styles.customerInfoBlock ]}>
                        <View style={[ styles.customerInfo, styles.customerInfoLeft ]}>
                            <Text style={styles.customerInfoText}>Tiêu chuẩn cộng đồng</Text>
                        </View>
                        <View style={[ styles.customerInfo, styles.customerInfoRight ]}>
                            <Entypo name="chevron-small-right" size={26} color="black" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={ [ styles.customerInfo, styles.customerInfoBlock ]}>
                        <View style={[ styles.customerInfo, styles.customerInfoLeft ]}>
                            <Text style={styles.customerInfoText}>Điều khoản</Text>
                        </View>
                        <View style={[ styles.customerInfo, styles.customerInfoRight ]}>
                            <Entypo name="chevron-small-right" size={26} color="black" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={ [ styles.customerInfo, styles.customerInfoBlock ]}>
                        <View style={[ styles.customerInfo, styles.customerInfoLeft ]}>
                            <Text style={styles.customerInfoText}>Giới thiệu</Text>
                        </View>
                        <View style={[ styles.customerInfo, styles.customerInfoRight ]}>
                            <Entypo name="chevron-small-right" size={26} color="black" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={ [ styles.customerInfo, styles.customerInfoBlock ]} onPress={() => {setModalDelete(true)}}>
                        <View style={[ styles.customerInfo, styles.customerInfoLeft ]}>
                            <Text style={styles.customerInfoText}>Yêu cầu xóa tài khoản</Text>
                        </View>
                        <View style={[ styles.customerInfo, styles.customerInfoRight ]}>
                            <Entypo name="chevron-small-right" size={26} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ marginTop: 20}}>

                <ButtonBot
                    text="ĐĂNG XUẤT"
                    navigation={() => navigation.navigate("SignUpScreen")}
                ></ButtonBot>
            </View>



        </View>
    );
}

export default Setting;

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
        paddingVertical: 8
    },
    headerText: {
        fontSize: 20,
        marginLeft: 8
    },
    contentBox: {
        marginHorizontal: 20
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
    // customerInfoText: {
    //     marginLeft: 8,
    // }
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
        height: 250,
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
      },
      inputContainer: {
        // backgroundColor: 'red',
        width: '100%',
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#b2b3ad",
        // padding: 5,
        // marginHorizontal: 30,
        marginVertical: 10,
      },
      inputField: {
        padding: 8,
        fontSize: 14,
        width: "85%",
        fontFamily: "SansCasualMedium",
      },

})