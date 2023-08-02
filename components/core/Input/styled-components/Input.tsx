// @ts-nocheck
import { styled } from '../../styled'
import { TextInput } from 'react-native'

export default styled(
	TextInput,
	{
		flex: 1,
		color: '$textLight900',
		props: {
			placeholderTextColor: '#8C8C8C',
		},
		_dark: {
			color: '$textDark50',
			props: {
				placeholderTextColor: '#A3A3A3',
			},
		},
		_web: {
			cursor: 'text',
			':disabled': {
				cursor: 'not-allowed',
			},
		},
	},
	{ ancestorStyle: ['_input'], resolveProps: ['placeholderTextColor'] },
	{
		propertyTokenMap: {
			placeholderTextColor: 'colors',
		},
	},
)
