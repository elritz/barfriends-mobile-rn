import * as React from 'react'
import { FieldError } from 'react-hook-form'
import { StyleSheet, Text, TextInputProps, TextStyle, View } from 'react-native'
import { Input } from '@rneui/base'

interface Props extends TextInputProps {
	name: string
	label?: string
	labelStyle?: TextStyle
	error?: FieldError | undefined
}

export default React.forwardRef<any, Props>((props, ref): React.ReactElement => {
	const { label, labelStyle, error, ...inputProps } = props

	return (
		<View style={styles.container}>
			{label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
			<Input
				autoCapitalize='none'
				ref={ref}
				style={[styles.input, { borderColor: error ? '#fc6d47' : '#c0cbd3' }]}
				{...inputProps}
			/>
			<Text style={styles.textError}>{error && error.message}</Text>
		</View>
	)
})

const styles = StyleSheet.create({
	container: {
		marginVertical: 8,
	},
	input: {
		borderStyle: 'solid',
		borderWidth: 1,
		borderRadius: 5,
		paddingVertical: 5,
		paddingLeft: 5,
		fontSize: 16,
		height: 40,
		color: '#c0cbd3',
	},
	label: {
		paddingVertical: 5,
		fontSize: 16,
		fontWeight: 'bold',
		color: '#c0cbd3',
	},
	textError: {
		color: '#fc6d47',
		fontSize: 14,
	},
})
