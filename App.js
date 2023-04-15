// import land
import { Keyboard, FlatList, ActivityIndicator, Image, StyleSheet, Text, View, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { useState, useEffect } from 'react'
import FurtureForecast from './components/FurtureForecast'
import OtherDataCard from './components/OtherDataCard';
import HourForecast from './components/HourForecast';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { getCords } from "./helpers/getCords"
import { cordsToCity } from "./helpers/cordsToCity"
import { getWeather } from "./helpers/getWeather"
import { degToCompass, dtToTime, dtToDate } from "./helpers/conversions"
import { icons } from './helpers/icons'
import { colors } from './helpers/colors'

export default function App() {

	// Set up state variables

	const [city, setCity] = useState('');

	// states for error msg
	const [inputErr, setInputErr] = useState("");
	const [errorStatus, setErrorStatus] = useState(false);

	// state for loading data 
	const [loading, setLoading] = useState(false)

	const [weather, setWeather] = useState(null);
	const [hourly, sethourly] = useState([])
	const [daily, setDaily] = useState([])
	const [location, setLocation] = useState(null);
	const [locationName, setLocationName] = useState(null)

	// get the weather data and update all nessacary useState's
	const getData = async (lat, lon) => {
		const data = await getWeather(lat, lon)
		await setWeather(data);
		await sethourly(await data["hourly"]);
		await setDaily(await data["daily"]);
		return;
	}

	// Handle form submission when user enters a city name
	const onSubmit = async () => {
		setLoading(true)
		Keyboard.dismiss();
		setErrorStatus(false);
		setInputErr("");
		if (city === "") {
			setInputErr("You must enter a location first");
			setErrorStatus(true);
		} else {
			setInputErr("");
			setErrorStatus(false);
			try {
				const data = await getCords(city);
				setLocationName(data[2])
				await getData(data[0], data[1])
			} catch (error) {
				setInputErr("An error occurred. Please try again.");
				setErrorStatus(true);
			}
		}
		setLoading(false);
	}



	useEffect(() => {
		(async () => {
			setLoading(true)
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				await setLocationName("Orlando, Florida, United States")
				await getData(28, 81)
			} else {
				const isAndroid = Platform.OS == 'android';
				let location = await Location.getCurrentPositionAsync({ accuracy: isAndroid ? Location.Accuracy.Low : Location.Accuracy.Lowest, });
				const cords = [location.coords.latitude, location.coords.longitude]
				const x = await cordsToCity(cords)
				await setLocationName(x)
				setLocation(cords[0], cords[1]);
				await getData(cords[0], cords[1])
			}
			setLoading(false)

		})();

	}, []);

	return (
		<View style={styles.mainContainer}>
			<ScrollView>
				<SafeAreaView>
					{/* title */}
					<View style={styles.titleContainer}>
						<Text style={styles.title}>Storm Factor</Text>
					</View>

					{/* search container */}
					<View style={styles.searchContainer}>
						{/* city inpit */}
						<TextInput style={errorStatus ? styles.errorInput : styles.input} placeholder="Enter a city" onSubmitEditing={onSubmit} value={city} onChangeText={text => setCity(text)} />
						{/* search button */}

					</View>

					{/* error message */}
					<Text style={styles.errorMsg}>{inputErr}</Text>

					{/* loading container */}
					{loading ? <View style={styles.loadingContainer}>
						<ActivityIndicator size="large" color={colors.iconColor} />
						<Text style={styles.loadingText}>Fetching Data...</Text>
					</View> : null}


					{weather ? <View style={styles.dataContainer}>

						{/*----------------------------------------------------------Current Weather---------------------------------------------------------- */}

						<View style={styles.titleContainer}>
							<Text style={styles.subTitle}>Current Weather</Text>
						</View>

						<View style={styles.currentWeatherContainer}>
							<View style={styles.topContainer}>
								<Text style={styles.cityName}>{locationName}</Text>
								<Image style={styles.icon} source={icons[weather.current.weather[0].icon]} />
								<Text style={styles.weatheDesc}>{weather.current.weather[0].description}</Text>
								<Text style={styles.temp}>{Math.round(weather.current["temp"])}°</Text>
							</View>
							<View style={styles.tempInfoContainer}>
								<Text style={styles.dataText}>H: {Math.round(weather.daily[0]["temp"].max)}°</Text>
								<Text style={styles.dataText}>L: {Math.round(weather.daily[0]["temp"].min)}°</Text>
							</View>
						</View>

						{/*----------------------------------------------------------Hourly Weather---------------------------------------------------------- */}
						<View></View>
						<View style={styles.titleContainer}>
							<Text style={styles.subTitle}>Hourly</Text>
						</View>

						<View style={styles.furtureContainer}>
							<FlatList
								horizontal={true}
								showsHorizontalScrollIndicator={true}
								data={hourly.slice(0, 24)}
								renderItem={({ item }) => (
									<HourForecast key={item.dt.toString()} temp={Math.round(item.temp)} icon={item.weather[0].icon} time={dtToTime(item.dt, weather["timezone_offset"])} date={dtToDate(item.dt, weather["timezone_offset"])} />
								)} />
						</View>

						{/*----------------------------------------------------------Future Weather---------------------------------------------------------- */}

						<View style={styles.titleContainer}>
							<Text style={styles.subTitle}>Future forecast</Text>
						</View>
						<View style={styles.furtureContainer}>
							<FlatList
								horizontal={true}
								showsHorizontalScrollIndicator={true}
								data={daily.slice(0, 24)}
								renderItem={({ item }) => (
									<FurtureForecast temp={Math.round(item["temp"].day)} icon={item["weather"][0].icon} dec={item["weather"][0].description} dt={dtToDate(item["dt"])} />
								)} />
						</View>

						{/*----------------------------------------------------------Other Data Section---------------------------------------------------------- */}

						<View style={styles.titleContainer}>
							<Text style={styles.subTitle}>More data</Text>
						</View>
						<View style={styles.moreDataContainer}>
							<OtherDataCard icon={<Feather name="thermometer" size={50} color={colors.iconColor} />} text={"Feels Like"} data={Math.round(weather.current["feels_like"]) + "°"} />
							<OtherDataCard icon={<Ionicons name="water" size={50} color={colors.iconColor} />} text={"Humidity"} data={Math.round(weather.current["humidity"]) + "%"} />
							<OtherDataCard icon={<Ionicons name="water" size={50} color={colors.iconColor} />} text={"Pressure"} data={weather.current["pressure"] + "hpa"} />
							<OtherDataCard icon={<Feather name="wind" size={50} color={colors.iconColor} />} text={"Wind Speed"} data={Math.round(weather.current["wind_speed"]) + " mph"} />
							<OtherDataCard icon={<Feather name="compass" size={50} color={colors.iconColor} />} text={"Wind Direction"} data={degToCompass(weather.current["wind_deg"])} />
							<OtherDataCard icon={<Feather name="wind" size={50} color={colors.iconColor} />} text={"Gusts"} data={Math.round(weather.current["wind_gust"]) + " mph"} />
							<OtherDataCard icon={<Feather name="sun" size={50} color={colors.iconColor} />} text={"UV Index"} data={Math.round(weather.current["uvi"])} />
							<OtherDataCard icon={<Feather name="eye" size={50} color={colors.iconColor} />} text={"Visibility"} data={weather.current["visibility"]} />
							<OtherDataCard icon={<Feather name="sunrise" size={50} color={colors.iconColor} />} text={"Sunrise"} data={dtToTime(weather.current["sunrise"], weather["timezone_offset"]) + " (24 hr)"} />
							<OtherDataCard icon={<Feather name="sunset" size={50} color={colors.iconColor} />} text={"Sunset"} data={dtToTime(weather.current["sunset"], weather["timezone_offset"]) + " (24 hr)"} />
						</View>
					</View> : null}
				</SafeAreaView>
			</ScrollView>
		</View>

	);
}
const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: colors.backgroundColor,
		height: "100%"
	},
	titleContainer: {
		marginLeft: 40,
		marginTop: 20,
		marginBottom: 30
	},
	title: {
		fontSize: 22,
		color: colors.textColor,
		fontWeight: "bold"
	},
	searchContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 10,
	},
	input: {
		width: 200,
		height: 34,
		borderWidth: 1,
		borderColor: colors.iconColor,
		borderRadius: 23,
		color: "black",
		backgroundColor: "white"
	},
	errorInput: {
		width: 200,
		height: 34,
		borderWidth: 1,
		borderColor: "#e63946",
		borderRadius: 23,
		color: colors.textColor,
		backgroundColor: "white",
	},
	errorMsg: {
		color: "#e63946",
		fontWeight: 'bold',
		alignSelf: 'center'
	},
	seachBtn: {
		height: 34,
		padding: 10,
		marginLeft: 10,
		backgroundColor: "white",
		justifyContent: 'center',
		alignItems: 'center'
	},
	loadingContainer: {
		alignItems: 'center'
	},
	loadingText: {
		fontSize: 16,
		color: colors.textColor
	},
	subTitle: {
		fontSize: 20,
		color: colors.textColor,
		fontWeight: "bold",
	},
	currentWeatherContainer: {
		width: 300,
		height: 300,

		borderRadius: 20,
		backgroundColor: colors.cardColor,
		alignSelf: 'center',

		display: 'flex',
		flexDirection: 'coloum',
		justifyContent: 'center',

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	topContainer: {
		alignItems: 'center'
	},
	cityName: {
		fontSize: 18,
		fontWeight: 'bold',
		color: colors.textColor,
		textAlign: 'center'
	},
	icon: {
		width: 140,
		height: 140,
	},
	weatheDesc: {
		fontSize: 14,
		color: colors.textColor,
	},
	temp: {
		fontSize: 22,
		color: colors.textColor,
		fontWeight: 'bold'
	},
	tempInfoContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	dataText: {
		color: colors.textColor,
		fontSize: 19,
		alignSelf: 'center'
	},
	hourlyContainer: {
		width: "95%",
		borderRadius: 20,
		alignSelf: 'center',
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	furtureContainer: {
		width: "95%",
		height: 200,
		borderRadius: 20,
		alignSelf: 'center',
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	moreDataContainer: {
		display: 'flex',
		flexDirection: "row",
		justifyContent: 'space-around',
		flexWrap: 'wrap',
		height: 1000,
	},

});
