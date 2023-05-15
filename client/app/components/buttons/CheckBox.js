import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
  
const CheckBox = (props) => {
    const iconName = props.isChecked ?
        "checkbox-marked" : "checkbox-blank-outline";
  
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.onPress}>
                <MaterialCommunityIcons
                    name={iconName} size={24} color="#CAC659" />
            </TouchableOpacity>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    );
};
  
export default CheckBox;
  
const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: 250,
        marginTop: 5,
        marginHorizontal: 5,
    },
    title: {
        fontSize: 16,
        color: "#000",
        marginLeft: 5,
        fontWeight: "600",
    },
});