import { StatusBar } from 'expo-status-bar';
import { Image, Keyboard, StyleSheet, Text, View, ImageBackground, SafeAreaView, TextInput, TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Feather } from '@expo/vector-icons'; 


const OtherDataCard = (Props) => {


  return (
    <View style={styles.container}>
    <View style={styles.topContainer}>
      <Text style={styles.cityName}>temp</Text>
      <Image style={styles.icon} source={null}/>
      <Text style={styles.weatheDesc}>{data.current.weather[0].description}</Text>
      <Text style={styles.temp}>{Math.round(data.current["temp"])}°</Text>
    </View>
    <View style={styles.tempInfoContainer}> 
        <Text style={styles.dataText}>H: { Math.round(data.daily[0]["temp"].max)}°</Text>
        <Text style={styles.dataText}>L: {Math.round(data.daily[0]["temp"].min)}°</Text>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 300,
    
        borderRadius: 20,
        backgroundColor: "#edf2f4",
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
        color: "black",
        textAlign: 'center'
      },
    
    
      icon: {
        width: 140,
        height: 140,
      },
      weatheDesc: {
        fontSize: 14,
        color: "black",
      },
      temp: {
        fontSize: 22,
        color: "black",
        fontWeight: 'bold'
      },
      tempInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
      },
      dataText: {
        color: "black",
        fontSize: 19,
        alignSelf: 'center'
      },
    
  
});


export default OtherDataCard