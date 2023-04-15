import { Appearance } from 'react-native'

let colors;

let theme = Appearance.getColorScheme()


if (theme === "light") {
  colors = {
    iconColor: "#a537fd",
    cardColor: "#edf2f4",
    textColor: "#000",
    backgroundColor: "#fff",
  }
} else {
  colors = {
    iconColor: "#a537fd",
    cardColor: "#2C3333",
    textColor: "#fff",
    backgroundColor: "#191919",
  }
}

export { colors }


