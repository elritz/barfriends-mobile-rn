import { Dimensions, StyleSheet, Text, View } from 'react-native'

export default () => {
	//? Broken state
	console.log('LOAD BROKEN STATE wewewewewe NOT RENDER HERE:>> ')
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: 'red',
			alignItems: 'center',
			justifyContent: 'center',
		},
	})
	return (
		<View style={styles.container}>
			<Text>HEllo Workd</Text>
		</View>
	)
}
