import {
	View,
	StyleSheet,
	Text,
	Image,
	ImageBackground,
	ScrollView,
	TouchableOpacity,
	FlatList,
} from "react-native";
import { useFonts } from "expo-font";
import TopIconAllPage from "../components/cards/TopIconAllPage";
import AppLoading from "expo-app-loading";
import { AntDesign, Entypo, SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
import BackIcon from "../components/buttons/BackIcon";
import { useEffect, useState } from "react";
import themes from "../shared/utils/themes";
import { getBookById, addToCart,getAllBook, getListReviewById, getCart} from "../shared/services/CoreServices";
import { useWindowDimensions } from "react-native";
import { Dimensions } from "react-native";
import { formatNumberWithDot,formatNumberDot } from "../shared/utils/moneyUtil";
import Loading from "../components/cards/Loading";
import { useIsFocused } from "@react-navigation/native";
import ShowMore from 'react-native-show-more-button';

const w = Dimensions.get("screen").width;

function DetailPage({ navigation, route }) {
	const [loaded] = useFonts({
		SansCasual: require("../../assets/fonts/RecursiveSansCslSt-Regular.ttf"),
		SansCasualMedium: require("../../assets/fonts/RecursiveSansCslSt-Med.ttf"),
		SansCasualBold: require("../../assets/fonts/RecursiveSansCslSt-Bold.ttf"),
	});
	const layout = useWindowDimensions();
	const isFocused = useIsFocused();
 	const [color, setColor] = useState("#B4B4B4");
	const { id } = route.params;

	const [productData, setProductData] = useState([]);
	const [productDetail, setProductDetail] = useState({});
	const [reviews, setReviews] = useState([]);
	const [quantity, setQuantity] = useState(1);
	const [selected, setSelected] = useState(0);
	const [review, setReview] = useState({});
	const [lengthCart, setLengthCart] = useState(0);
	const [isLoading , setIsLoading] = useState(true);
	const [isReset , setIsReset] = useState(false);

	useEffect(() => {
		getBookById(id).then(response => {
			setProductDetail(response.data)
		}),
		getListReviewById(id).then(response => {
			setReviews(response.data)
			setReview(response.data[0])
		}),
		getAllBook().then((response) => {
			setIsLoading(false);
		  	setProductData(response.data.item);
		});
		getCart().then((response) => {
			setLengthCart(response.data.cartDetails.length)
		})

	}, [isFocused]);

	function handleAddToCart(id, quantity)  {
		let requestBody = [{
			idBook: id,
			quantity: quantity,
		}]
		addToCart(requestBody).then( (response) => {
			getCart().then((response) => {
				setLengthCart(response.data.cartDetails.length);
				window.cartLength = response.data.cartDetails.length;
			})
			console.log('!!! addToCart requestBody: ', response);
		})
	}
	const w = Dimensions.get("screen").width;

	function pushQuantity() {
		setQuantity(quantity + 1);
	}

	function minusQuantity() {
		if (quantity > 1) {
			setQuantity(quantity - 1)
		}
	}

	function onChanged(text) {
		this.setState({
			mobile: text.replace(/[^0-9]/g, ''),
		});
	}

	if (!loaded) {
		return <AppLoading />;
	}
	const image = { uri: "" };

	const tabs = ["Chi Tiết", "Mô tả", "Đánh giá"];

	const onScroll = ({ nativeEvent }) => {
		const index = Math.round(nativeEvent.contentOffset.x / (w - 20));
		setSelected(index);
	};

	const renderItem = ({ item }) => {
		return (
			<View style = {{backgroundColor:'white',borderRadius: 20, marginLeft: 5, marginBottom: 10}}>
				<TouchableOpacity style={styles.itemProduct} onPress={() => {
					navigation.push("DetailPage", { id: item.id })
				}}>
					<ImageBackground
						style={styles.imageProduct}
						imageStyle={{ borderRadius: 15 }}
						source={{
							uri: `data:image/png;base64,${item.image}`,
						}}
					>
					</ImageBackground>
					<View style={styles.bodyProduct}>
						<View style={{ flexDirection: "row" }}>
							<Text style={styles.titleItemProduct}>{item.bookName}</Text>
						</View>
						<View style={styles.reviewContainerProduct}>
							{/* <Text style={styles.bodyItemText}>{item.reviews}</Text> */}
							<Text style={styles.bodyItemTextProduct}>rate {totalStar} start</Text>
							<View style={styles.starConProduct}>
								<AntDesign name="star" size={12} color="#EEE730" />
							</View>
							<Text style={styles.bodyItemTextProduct}>
								{""}|{""}
							</Text>
							<Text style={styles.bodyItemTextProduct}>đã bán {totalSales}</Text>
						</View>
						<View style={styles.footerCardProduct}>
							<View style={styles.footerItemProduct}>
								<Text style={styles.footerItemTextProduct}>{formatNumberDot(item.price)}</Text>
								<Text style={styles.footerItemTextDisProduct}>{item.discount}</Text>
							</View>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		);
	};

	var totalSales = productDetail.totalSales
	var discount = productDetail.discountPercent
	var totalStar = productDetail.totalStar
	if (totalSales == null) { totalSales = 0; } else { totalSales = totalSales; }
	if (discount == null) { discount = 0; } else { discount = discount; }
	if (totalStar == null) { totalStar = 5; } else { totalStar = totalStar; }

	return (
		<View style={styles.container}>
			{
				isLoading ? <Loading></Loading>
				: (
				<View style={styles.container}>
				<ScrollView>
					<View style={{ width: "100%", height: 550 }}>
						<ImageBackground
							style={styles.image}
							source={{
								uri: `data:image/png;base64,${productDetail?.image}`,
								}}
							>
							<View
								style={{ flexDirection: "row", justifyContent: "space-between" }}
							>
								<View style={{ marginTop: 35, flexDirection: 'row', justifyContent: 'space-between', flex: 1, paddingHorizontal: 20 }}>
									<BackIcon navigation={() => navigation.goBack()} />
									<TouchableOpacity onPress={() => navigation.navigate("Cart")}>
										<View style={{
											width: 40,
											height: 40,
											borderRadius: 60,
											marginTop: 6,
											justifyContent: "center",
											alignContent: 'center',
											alignItems: "center",
											backgroundColor: "#e6e3da",
										}}>

											<Text style={{backgroundColor: 'red', color: '#fff', width: 16, borderRadius: 60, marginBottom: -12, marginLeft:16, fontSize: 12, zIndex: 1, textAlign: 'center'}}>{lengthCart}</Text>
											<AntDesign
												style={{ borderRadius: 60 }}
												name="shoppingcart"
												size={26}
												color="black"
											/>
										</View>
									</TouchableOpacity>
								</View>
							</View>
						</ImageBackground>
					</View>

					<View style={styles.DetailOne}>

						<View style={{ alignItems: 'center', marginTop: 10 }}>
							<View style = {{width: "90%"}}>
								<Text style={styles.TextImg}>
									{productDetail.bookName}
								</Text>
							</View>
						</View>

						<View style={{ marginLeft: "5%", marginRight: "5%", }}>
							<View style={styles.DanhGia}>
								<View style={{ color: "yellow", flexDirection: "row" }}>
									{productDetail.totalStar > 0 ? <AntDesign name="star" size={24} style = {{color:"#EEE730"}}/> : <AntDesign name="star" size={24}/>}
									{productDetail.totalStar > 1 ? <AntDesign name="star" size={24} style = {{color:"#EEE730"}}/> : <AntDesign name="star" size={24}/>}
									{productDetail.totalStar > 2 ? <AntDesign name="star" size={24} style = {{color:"#EEE730"}}/> : <AntDesign name="star" size={24}/>}
									{productDetail.totalStar > 3 ? <AntDesign name="star" size={24} style = {{color:"#EEE730"}}/> : <AntDesign name="star" size={24}/>}
									{productDetail.totalStar > 4 ? <AntDesign name="star" size={24} style = {{color:"#EEE730"}}/> : <AntDesign name="star" size={24}/>}
						
		
									<Text style={{ fontSize: 15, marginLeft: 20 }}>
										({productDetail.reviews ?? 0} lượt đánh giá) |
									</Text>
									<Text style={{ fontSize: 15 }}> Đã bán {totalSales ?? 0 }+</Text>
								</View>
							</View>

							<View style={{ flexDirection: "row", marginTop: 10 }}>
								<Text style={{ fontSize: 20 }}>{formatNumberWithDot(productDetail.price)}</Text>
								{
									discount
									? <Text style={{ fontSize: 20, color: "red" }}> -{discount}% </Text>
									: <Text></Text>
								}
							</View>

							<View style={{ flexDirection: "row", marginTop: 15 }}>
								<View style={{ }}>
								<TouchableOpacity style={styles.buttonHeart}>
									<AntDesign
									name="heart"
									size={20}
									color={color}
									onPress={() => setColor("red")}
									/>
								</TouchableOpacity>
								</View>
								<Text style={{ paddingRight: 50, paddingLeft: 10, fontSize: 15 }}>
									Like
								</Text>
								<SimpleLineIcons name="share-alt" size={25} />
								<Text style={{ paddingLeft: 10, fontSize: 15 }}>Share</Text>
							</View>

						</View>
						<View>
							<View style={styles.header}>
								{tabs.map((e, i) => (
									<View>

										<View style={styles.textContainer}>
											<Text
												style={[
													styles.title,
													selected == i && { color: themes.colors.mainText },
												]}>
												{e}
											</Text>
										</View>
										{selected == i && <View style={styles.line} />}
									</View>
								))}
							</View>

							<ScrollView
								horizontal
								pagingEnabled
								snapToAlignment="center"
								onScroll={onScroll}
								decelerationRate="fast"
								scrollEventThrottle={0}
								showsHorizontalScrollIndicator={false}>

								<View style={styles.itemScroll}>

									<View style={styles.itemContainer}>
										<View
											style={{
												flexDirection: "row",
												alignContent: "center",
												marginBottom: 9,
											}}
										>
											<Text style={styles.textCa}>Danh mục: {productDetail.category}</Text>
										</View>
										<Text style={styles.textItem}>
											Công ty sản xuất: {productDetail.productCompany}
										</Text>
										<Text style={styles.textItem}>
											Ngày xuất bản: {productDetail.releaseDate}
										</Text>
										<Text style={styles.textItem}>Dịch giả: {productDetail.translator}</Text>
										<Text style={styles.textItem}>Loại bìa: {productDetail.coverType}</Text>
										<Text style={styles.textItem}>Số trang: {productDetail.numberOfPage}</Text>
										<Text style={styles.textItem}>
											Nhà xuất bản: {productDetail.editionCompany}
										</Text>
									</View>
								</View>

								<View style={{backgroundColor:"white", marginTop: 25, marginBottom: 30, width: layout.width * 0.9, alignItems: 'center', width: w, }}>
									<Text style={{ fontSize: 20, fontFamily: 'SansCasual' }}>{productDetail.bookName}</Text>
									<View style={{ flexDirection: 'row', marginTop: 20 }}>
										<Text style={styles.fontText}>Cuốn sách </Text>
										<Text style={{ color: 'orange', fontFamily: 'SansCasual' }}>{productDetail.bookName} </Text>
										<Text style={styles.fontText}>dành cho:</Text>
									</View>
									<View style = {{width: layout.width * 0.9}}>
										<ShowMore height={200} buttonColor={"#FF0000"} showMoreText="Open" showLessText="Close" style = {{alignItems:'center'}}>
											<Text style={{ marginTop: 10, width: '100%', }}>{productDetail.describe}</Text>
										</ShowMore>
									</View>
								</View>

								{  review ?
									(
										<View style={styles.ViewDetail}>
										<View style={{ marginLeft: "5%", marginRight: "5%" }}>
											<View style={{ flexDirection: 'row' }}>
												{
													review.imageUser 
													? <Image style={styles.IamgeAvatar} source={{uri: `data:image/png;base64,${review.imageUser}`,}} />
													: <Image style={styles.IamgeAvatar} source={require("../../assets/images/blank-profile-picture.png")}/>
												}
												<View style={{ marginLeft: 10 }}>
													<Text>{review.customerName}</Text>
													<View style={{ color: 'yellow', flexDirection: 'row', }}>
														{review.star > 0 ? <AntDesign name="star" size={24} style = {{color:"#EEE730"}}/> : <AntDesign name="star" size={24}/>}
														{review.star > 1 ? <AntDesign name="star" size={24} style = {{color:"#EEE730"}}/> : <AntDesign name="star" size={24}/>}
														{review.star > 2 ? <AntDesign name="star" size={24} style = {{color:"#EEE730"}}/> : <AntDesign name="star" size={24}/>}
														{review.star > 3 ? <AntDesign name="star" size={24} style = {{color:"#EEE730"}}/> : <AntDesign name="star" size={24}/>}
														{review.star > 4 ? <AntDesign name="star" size={24} style = {{color:"#EEE730"}}/> : <AntDesign name="star" size={24}/>}
													</View>
												</View>
												</View>
												<View style={{ marginTop: 10, }}>
													<Text style={{ fontSize: 15, fontFamily: 'SansCasual' }} >
															{review.text}
												</Text>
												</View>
												<View style={{ flexDirection: 'row', marginLeft: 20 }}>
													<Image style={styles.ImageReview} source={{uri: `data:image/png;base64,${review.image}`,}} />
												</View>
												</View>
												<TouchableOpacity onPress={()=>navigation.navigate('ReviewsScreen')}>
													<View style={styles.buttonDown}>
															<Text style={{ fontFamily: "SansCasual" , fontSize:20}}>Xem Thêm {`>`}</Text>
													</View>
												</TouchableOpacity>
											</View>
									)
									: (									
									<View style={styles.ViewDetail}>
										<View style={{ marginLeft: "5%", marginRight: "5%" }}>
											<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
												<Text style={{textAlign: 'center'}}>Hiện không có đánh giá cho sản phẩm này</Text>
											</View>
										</View>
									</View>
									)
								}

							</ScrollView>
						</View>
					</View>
					{/* <View style={styles.DetailTwo}>
						<View
							style={{
								marginLeft: "5%",
								marginRight: "5%",
								marginTop: 10,
								marginBottom: 20,
							}}
						>
							<View
								style={{
									justifyContent: "space-between",
									flexDirection: "row",
									marginBottom: 10,
								}}
							>
								<Text style={{ fontSize: 20, fontFamily: "SansCasual" }}>
									Giao hàng đến Q.Đống đa, P.Kim Liên, Hà Nội
								</Text>
								<MaterialIcons name="navigate-next" size={30} color="black" />
							</View>
							<View
								style={{
									borderRadius: 20,
									borderColor: "#A68C8C",
									borderWidth: 2,
								}}
							>
								<View
									style={{
										flexDirection: "row",
										fontSize: 20,
										marginTop: 10,
										paddingLeft: 20,
									}}
								>
									<Text
										style={{ color: "red", fontWeight: "bold", fontSize: 20 }}
									>
										Nhanh
									</Text>
									<Text style={{ paddingLeft: 10, fontSize: 20, color: "green" }}>
										Thứ năm, ngày 8/11
									</Text>
								</View>
								<Text style={{ fontSize: 20, marginBottom: 10, paddingLeft: 20 }}>
									Vận chuyển: 15.000đ
								</Text>
							</View>
						</View>
					</View> */}

					<View
						style={{ backgroundColor: "white", marginTop: 20, marginBottom: 20 }}
					>
						<View style={styles.DetailThree}>
							<Text style={{ fontSize: 25, fontFamily: "SansCasualBold" }}>
								Sản phẩm tương tự
							</Text>
						</View>
					</View>

					<ScrollView>
						<FlatList
							data={productData}
							renderItem={renderItem}
							keyExtractor={(item) => item.id}
							numColumns={2}
							showsHorizontalScrollIndicator={false}
							key={(item) => item.id}
						/>
					</ScrollView>
				</ScrollView>
				<View style={styles.DetailFive}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							marginLeft: "5%",
							marginRight: "5%",
							marginTop: 20,
							marginBottom: 20,
							alignItems:'center'
						}}
					>
						<View style={{flex: 1}}>
						
							<Text style={{ fontSize: 16, fontWeight: "500" }}>
								Giá trị: <Text style={{fontSize: 18, fontWeight: "600"}}> {formatNumberWithDot(productDetail.price * quantity)} </Text>
							</Text>
						
							<View style={{ flexDirection: 'row', height: 40}}>
								<View style={{width: '30%', flex: 1, justifyContent: 'center'}}> 
									<Text style={{ fontSize: 16, fontWeight: "500"}}>Số lượng:</Text>
								</View>
								<View style={styles.quantityOverview}>
								<TouchableOpacity style={styles.quantityItem} onPress={minusQuantity}>
									<Entypo name="minus" size={24} color="black" />
								</TouchableOpacity>
								<Text style={[styles.quantityItem, styles.quantityText]}>{quantity}</Text>
								<TouchableOpacity style={styles.quantityItem} onPress={pushQuantity}>
									<Entypo name="plus" size={24} color="black" />
								</TouchableOpacity>
							</View>
							</View>

						</View>

						<TouchableOpacity style={styles.ButtonBuy} onPress={ () => {handleAddToCart(id, quantity)} }>
							<View>
								<Text style={{ fontSize: 16, fontWeight: "500", alignItems: "center" }}>CHỌN MUA</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
				</View>
				)
			}
		</View>

	);
}

export default DetailPage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#D3D3D3",
	},
	image: {
		height: "100%",
		width: "100%",
	},
	DanhGia: {
		backgroundColor: "white",
		width: "100%",
		marginTop: 10,
	},
	TextImg: {
		fontSize: 34,
		fontFamily: "SansCasualBold",
		textAlign:'center',

	},
	buttonAllContanier: {
		justifyContent: "center",
		flexDirection: "row",
		marginEnd: 25,
		alignItems: "center",
		marginTop: 25,
	},
	DetailOne: {
		borderTopStartRadius: 30,
		borderTopEndRadius: 30,
		backgroundColor: "white",
		width: "100%",
		justifyContent: 'center',
		marginTop: -25
	},
	DetailTwo: {
		backgroundColor: "white",
		marginTop: 20,
	},
	DetailThree: {
		flexDirection: "row",
		marginTop: 20,
		marginLeft: "5%",
		marginRight: "5%",
		marginBottom: 20,
	},
	DetailFour: {
		width: "100%",
		backgroundColor: "white",
		justifyContent: "space-around",
		marginVertical: 20,
	},
	ButtonBuy: {
		justifyContent: "center",
		backgroundColor: "#CAC659",
		alignItems: "center",
		width: "30%",
		height: "70%",
		borderRadius: 15,
		
	},
	DetailFive: {
		width: "100%",
		height: 100,
		backgroundColor: "white",
		justifyContent: "center",
		borderTopColor: '#ccc',
		borderTopWidth: 2,
	},
	quantityOverview: {
		flexDirection: 'row',
		marginTop: 4,
		width: '70%',
	},
	quantityItem: {
		paddingHorizontal: 4,
		paddingTop: 4,
		borderWidth: 1,
		borderColor: '#ccc'
	},
	quantityText: {
		width: 40,
		justifyContent: "center",
		alignContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		fontWeight: '500',
		fontSize: 16
	},
	title: {
		fontSize: 25,
		fontFamily: "SansCasualBold",
		color: "gray",
	},
	header: {
		flexDirection: "row",
		justifyContent: 'center',
		marginLeft: 7,
		marginTop: 15,
	},
	line: {
		width: 90,
		height: 8,
		backgroundColor: themes.colors.main,
		alignSelf: "center",
		marginTop: 4,
		borderRadius: 5
	},
	textContainer: {
		marginHorizontal: 15,
	},
	itemScroll: {
		width: w,
		backgroundColor:"white"
	},
	itemContainer: {
		marginLeft: "5%",
		marginRight: "5%",
		marginTop: 30,
		marginBottom: 30,
		width: w * 0.9,

	},
	textCa: {
		fontFamily: "SansCasual",
		fontSize: 15,
	},
	textItem: {
		fontFamily: "SansCasual",
		fontSize: 15,
		marginVertical: 5,
	},
	fontText: {
		fontFamily: 'SansCasual'
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
	ViewDetail:
	{
		marginBottom: 50,
		marginTop: 30,
		width: w,
		backgroundColor:'white'
	},
	starConProduct: {
		flexDirection: "row",
	},
	titleItemProduct: {
		flex: 1,
		fontSize: 16,
		fontFamily: "SansCasualMedium",
		flexWrap: "wrap",
	},
	itemProduct: {
		marginVertical: 15,
		marginHorizontal: 12,
	},
	bodyProduct: {
		paddingHorizontal: 10,
		flex: 1,
		marginTop: 15,
	},
	reviewContainerProduct: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	bodyItemTextProduct: {
		fontSize: 11,
		color: "#000000",
		fontFamily: "SansCasual",
	},

	imageProduct: {
		width: w / 2.4,
		height: w / 1.6,
		borderRadius: 15,
		backgroundColor: "#D3D3D3",
	},
	footerItemProduct: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 5,
	},
	footerCardProduct: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	footerItemTextProduct: {
		fontSize: 14,
		color: "#000000",
		fontFamily: "SansCasual",
	},
	footerItemTextDisProduct: {
		fontSize: 14,
		color: "red",
		marginStart: 7,
		fontFamily: "SansCasual",
	},
	buttonHeartProduct: {
		position: "absolute",
		right: 15,
		top: 10,
	},
	buttonDown:
	{
		alignItems:'center',
		flex:1,
		justifyContent:'flex-end'
	},
});