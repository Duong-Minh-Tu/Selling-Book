import { View, StyleSheet, Text } from "react-native";
import { AntDesign, Entypo  } from "@expo/vector-icons";

function TopIconHomePage() {
    return(
        <View style={styles.boxIcon}>
            <View style={styles.iconRight}>
                <View style = {styles.IconCart}>
                    <AntDesign name="shoppingcart" size={26} color="black" />
                </View>
                <View style={styles.IconOpstion}>
                    <Entypo name="dots-three-vertical" size={26} color="black" />
                </View>
            </View>
        </View>
    );
}

export default TopIconHomePage;

const styles = StyleSheet.create({
    boxIcon: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        right: '28%'
    },
    iconRight:{
        flexDirection: 'row',
        position: 'absolute',
        opacity: 0.7
    },
    IconCart:
    {
        width: 45,
        height: 45,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    IconOpstion:
    {
        width: 45,
        height: 45,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginLeft: 8
    },
});
