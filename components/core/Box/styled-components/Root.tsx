import { styled } from '../../styled'
import { View } from 'react-native'

export default styled(
	View,
	{
		_dark: { bg: '$dark100' },
		_light: { bg: '$light50' },
		rounded: '$lg',
	},
	{
		descendantStyle: ['_text'],
	},
)
