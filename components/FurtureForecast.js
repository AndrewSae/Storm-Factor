import { Image, Keyboard, StyleSheet, Text, View, ImageBackground, SafeAreaView, TextInput, TouchableOpacity} from 'react-native';
import {icons} from '../helpers/icons'
import {colors} from '../helpers/colors'



const FurtureForecast = (Props) => {

  let date = new Date(parseInt(Props.dt) * 1000)
  let d = date.getMonth() + 1 + "/" + date.getDate()

  return (
    <View style={styles.container}>

      <Text style={styles.temp}>{Math.round(Props.temp)}°</Text>
      <Image style={styles.icon} source={icons[Props.icon]}/>
      <Text style={styles.desc}>{Props.dec}</Text>
      <Text style={styles.date}>{d}</Text>


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
        width: 175,
        height: 175,
        borderRadius: 20,
        backgroundColor: colors.cardColor,
        margin: 10,

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    temp: {
      fontSize: 27,
      color: colors.textColor,
    },
    icon: {
      width: 100,
      height: 100,
    },
    desc: {
      fontSize: 18,
      color: colors.textColor
    },
    date: {
      fontSize: 12,
      color: colors.textColor
    },
});


export default FurtureForecast