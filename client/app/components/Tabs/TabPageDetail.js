import React, { useState } from "react";
import { View, StyleSheet, Text,TouchableOpacity, useWindowDimensions } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const TabPageDetail = ({ onPress }) => {
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
        <View style= {{marginTop: 25, marginBottom: 30,width: layout.width * 0.9}}>
            <View style = {{ justifyContent: 'center'}}>
                <Text style = {styles.Detail}>Danh mục: ...- Sách lịch sử - Thế giới</Text>
                    <Text style = {styles.Detail}>Công ty sản xuất: Alpha Books</Text>
                    <Text style = {styles.Detail}>Ngày xuất bản: 2021-07-14</Text>
                    <Text style = {styles.Detail}>Dịch giả: Dương Minh Tú</Text>
                    <Text style = {styles.Detail}>Loại bìa: Bìa cứng</Text>
                    <Text style = {styles.Detail}>Số trang : 1500</Text>
                    <Text style = {styles.Detail}>Số trang: Nhà xuất bản toàn cầu</Text>
                </View>
            </View>
    </TouchableOpacity>
    );
};
export default TabPageDetail;

const styles = StyleSheet.create({
    Detail:
    {
        fontSize: 20,
        paddingBottom: 10,
        fontFamily: 'SansCasual'
    }
})