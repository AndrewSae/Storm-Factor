import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../helpers/colors'

const OtherDataCard = (Props) => {
	return (
		<View style={styles.container}>
			<Text>{Props.icon}</Text>
			<Text style={styles.dataDec}>{Props.text}</Text>
			<Text style={styles.data}>{Props.data}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: 175,
		height: 175,
		backgroundColor: colors.cardColor,
		borderRadius: 20,
		display: 'flex',
		flexDirection: "column",
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	dataDec: {
		color: colors.textColor,
		fontSize: 16
	},
	data: {
		color: colors.textColor,
	},
});

export default OtherDataCard