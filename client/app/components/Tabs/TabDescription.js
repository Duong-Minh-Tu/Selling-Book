import React, { useState } from "react";
import { View, StyleSheet, Text,TouchableOpacity, useWindowDimensions } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { AntDesign } from '@expo/vector-icons'; 

const TabDescription = ({ onPress }) => {
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
        <View style= {{marginTop: 25, marginBottom: 30,width: layout.width * 0.9, alignItems:'center'}}>
            <Text style ={{fontSize : 20, fontFamily: 'SansCasual'}}>{item.BookName}</Text>
            <View style = {{flexDirection: 'row',marginTop: 20 }}>
                <Text style = {styles.fontText}>Cuốn sách </Text>
                <Text style = {{color: 'orange', fontFamily: 'SansCasual'}}>{item.BookName}</Text>
                <Text style = {styles.fontText}>dành cho:</Text>
            </View>
            <Text  style= {{ marginTop: 10, width: '100%',}}>{item.Describe}</Text>
        </View>
        <View style={styles.buttonDown}>
                    <Text style={{ fontFamily: "SansCasual" , fontSize:20}}>Xem Thêm</Text>
                    <AntDesign name="down" size={24} color="black" />
        </View>
    </TouchableOpacity>
    );
};
export default TabDescription;

const styles = StyleSheet.create({
    fontText:{
        fontFamily: 'SansCasual'
    },
    buttonDown:
    {
        flexDirection: 'row',
        alignItems:'flex-end',
        justifyContent: 'center'
    }
});