import { Image, StyleSheet, Text, View } from 'react-native';
import { icons } from '../helpers/icons'
import { colors } from '../helpers/colors'

const HourForecast = (Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.temp}>{Props.temp}°</Text>
      <Image style={styles.icon} source={icons[Props.icon]} />
      <Text style={styles.time}>{Props.time}</Text>
      <Text style={styles.date}>{Props.date}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 175,
    backgroundColor: colors.cardColor,
    borderRadius: 20,
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  temp: {
    fontSize: 22,
    color: colors.textColor
  },
  icon: {
    width: 50,
    height: 50,
  },
  time: {
    color: colors.textColor
  },
  date: {
    color: colors.textColor
  },

});

export default HourForecast