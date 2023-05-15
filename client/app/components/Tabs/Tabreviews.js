import React, { useState } from "react";
import { View, StyleSheet, Text,TouchableOpacity, useWindowDimensions,Image } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { AntDesign } from '@expo/vector-icons'; 
import ShowMore from 'react-native-show-more-button';

const Tabreviews = ({ onPress }) => {
    const layout = useWindowDimensions();
        const [loaded] = useFonts({
            SansCasual: require("../../../assets/fonts/RecursiveSansCslSt-Regular.ttf"),
            SansCasualMedium: require("../../../assets/fonts/RecursiveSansCslSt-Med.ttf"),
            SansCasualBold: require("../../../assets/fonts/RecursiveSansCslSt-Bold.ttf"),
        });
        if (!loaded) {
        return <AppLoading />;
    }
    return(
    <TouchableOpacity onPress={onPress}>
        <View style = {{width: layout.width * 0.9,marginBottom: 10, marginTop: 30 }}>
            <ShowMore height={350} buttonColor={"black"} showMoreText="Xem thêm >" showLessText="thu gọn ^" fontSize={100}>
                <View style = {styles.ViewDetail}>
                    <View style = {{flexDirection: 'row'}}>
                        <Image style = {styles.IamgeAvatar} source={require("../../../assets/images/yen.png")}/>
                        <View style = {{marginLeft: 10}}>
                            <Text>Ný Yén</Text>
                            <View style={{color:'yellow',flexDirection: 'row',}}>
                                <AntDesign name="star" size={24} color='#EEE730'/>
                                <AntDesign name="star" size={24} color='#EEE730'/>
                                <AntDesign name="star" size={24} color='#EEE730'/>
                                <AntDesign name="star" size={24} color='#EEE730'/>
                                <AntDesign name="star" size={24} color='#EEE730'/>
                            </View>
                        </View>
                    </View>
                    <View style= {{marginTop: 10}}>
                        <Text style ={{fontSize: 15, fontFamily: 'SansCasual'}} >
                        Bình thường mình không hay nhận xét đơn hàng nhưng
                        lần này lại quá hài lòng luôn. Sách mới còn nguyên seal,
                        shop lại đóng gói siêu kĩ luôn. Cảm ơn shop nhiều 
                        </Text>
                    </View>
                    <View style= {{flexDirection:'row', marginLeft: 20}}>
                        <Image style = {styles.ImageReview} source={require("../../../assets/images/NguonCoi.png")}/>
                        <Image style = {styles.ImageReview} source={require("../../../assets/images/thaotungtamly.png")}/>
                    </View>
                </View>

                <View style = {styles.ViewDetail}>
                    <View style = {{flexDirection: 'row'}}>
                        <Image style = {styles.IamgeAvatar} source={require("../../../assets/images/yen2.png")}/>
                        <View style = {{marginLeft: 10}}>
                            <Text>Hãi Yén</Text>
                            <View style={{color:'yellow',flexDirection: 'row',}}>
                                <AntDesign name="star" size={24} color='#EEE730'/>
                                <AntDesign name="star" size={24} color='#EEE730'/>
                                <AntDesign name="star" size={24} color='#EEE730'/>
                                <AntDesign name="star" size={24} />
                                <AntDesign name="star" size={24} />
                            </View>
                        </View>
                    </View>
                    <View style= {{marginTop: 10}}>
                        <Text style ={{fontSize: 15, fontFamily: 'SansCasual'}} >
                        Sách mình đang đọc dở, không tác động mạnh nhưng 
                        chữ in trên bìa bị nhòe đi. Một số trang thì giấy bị bong khỏi gáy. 
                        Như vậy thì chất lượng sách khá kém. Mình có được gửi trả lấy quyển khác 
                        hoặc cửa hàng sửa những trang bị bung gáy ko?
                        </Text>
                    </View>
                    <View style= {{flexDirection:'row', marginLeft: 20}}>
                        <Image style = {styles.ImageReview} source={require("../../../assets/images/NguonCoi.png")}/>
                        <Image style = {styles.ImageReview} source={require("../../../assets/images/thaotungtamly.png")}/>
                    </View>
                </View>
            </ShowMore>
            {/* <View style = {{flexDirection: 'row', alignItems:'center', paddingVertical: '-150%' }}>
                <AntDesign name="right" size={24} color="black" />
                <Text style = {{fontSize: 17, fontFamily: 'SansCasual'}}>Xem Tất cả</Text>
            </View> */}
        </View>
    </TouchableOpacity>
    );
};
export default Tabreviews;

const styles = StyleSheet.create({
    IamgeAvatar:{
        height: 50,
        width: 50,
        borderRadius:30
    },
    ImageReview:
    {
        height: 200,
        width: 140,
        marginRight: 30
    },
    ViewDetail:
    {
        marginBottom: 50
    }
});
