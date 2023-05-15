import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
  
const CheckBoxAddress = (props) => {
    const iconName = props.isChecked ?
        "checkbox-marked" : "checkbox-blank-outline";
  
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.onPress}>
                <MaterialCommunityIcons
                    name={iconName} size={24} color="#CAC659" />
            </TouchableOpacity>
            <View style={styles.content}>
                <Text style={styles.title}>{props.title}</Text>
                <Text>{props.phone}</Text>
                <Text>{props.address}</Text>
            </View>

        </View>
    );
};
  
export default CheckBoxAddress;
  
const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: '100%',
        marginTop: 5,
        marginHorizontal: 5,
    },
    content: {
        flex: 1,
        paddingHorizontal: 12
    },
    title: {
        fontSize: 16,
        color: "#000",
        fontWeight: "600",
    },
});