import { StyleSheet, View,ScrollView,Image,Text } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import {getListReviewById} from "../shared/services/CoreServices";
import { AntDesign, Entypo, SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
import BackIcon from "../components/buttons/BackIcon";
import TopIconAllPage from "../components/cards/TopIconAllPage";
import { useIsFocused } from "@react-navigation/native";

export default function ReviewsScreen({ navigation, route }) {
	const isFocused = useIsFocused();
    const [reviews, setReviews] = useState([]);
    const { id } = route.params;
    useEffect(() => {
		getListReviewById(id).then(response => {
			setReviews(response.data)
		})
	}, [isFocused])

  return (
    <View style = {styles.container}>
        <View style={{ flexDirection: "row" ,justifyContent:'space-between',}}>
			<View style={{ marginTop: 35 }}>
				<BackIcon navigation={() => navigation.goBack()} />
			</View>
            <View style ={{alignItems:'center',justifyContent:'center',marginTop:30,marginRight:30}}>
                <Text style ={{fontSize:20,alignItems:'center'}}>Chi Tiet Danh Gia</Text>
            </View>
            <View></View>
			<TopIconAllPage />
		</View>
      <ScrollView>
		{reviews.map((item) => {
			return(
				<View style={styles.ViewDetail}>
					<View style={{ marginLeft: "5%", marginRight: "5%" }}>
						<View style={{ flexDirection: 'row' }}>
							<Image style={styles.IamgeAvatar} source={{uri: `data:image/png;base64,${item.imageUser}`,}} />
							<View style={{ marginLeft: 10 }}>
								<Text>{item.customerName}</Text>
								<View style={{ color: 'yellow', flexDirection: 'row', }}>
                                {item.star > 0 ? <AntDesign name="star" size={24} style = {{color:"#EEE730"}}/> : <AntDesign name="star" size={24}/>}
								{item.star > 1 ? <AntDesign name="star" size={24} style = {{color:"#EEE730"}}/> : <AntDesign name="star" size={24}/>}
								{item.star > 2 ? <AntDesign name="star" size={24} style = {{color:"#EEE730"}}/> : <AntDesign name="star" size={24}/>}
								{item.star > 3 ? <AntDesign name="star" size={24} style = {{color:"#EEE730"}}/> : <AntDesign name="star" size={24}/>}
								{item.star > 4 ? <AntDesign name="star" size={24} style = {{color:"#EEE730"}}/> : <AntDesign name="star" size={24}/>}
								</View>
							</View>
						</View>
					    <View style={{ marginTop: 10, }}>
                            <Text style={{ fontSize: 15, fontFamily: 'SansCasual' }} >
                                {item.text}
                            </Text>
					    </View>
					    <View style={{ flexDirection: 'row', marginLeft: 20 }}>
						    <Image style={styles.ImageReview} source={{uri: `data:image/png;base64,${item.image}`,}} />
					    </View>
					</View>
				</View>
				)
			})}
		</ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  ViewDetail:
  {
    marginTop:20,
      marginBottom: 10,
      borderBottomWidth: 1,
  },
  IamgeAvatar: {
    height: 50,
    width: 50,
    borderRadius: 30
},
ImageReview:
{
    height: 200,
    width: 140,
    marginRight: 30
},
});