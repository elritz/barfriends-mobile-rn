import { StyleProp, TextStyle } from 'react-native'
import { Text, TextProps } from '@rneui/themed'
import styled from 'styled-components/native'

const TextStyled = styled(Text)(props => ({
	fontSize: 16,
	fontWeight: 500,

}))

type Props = {
	style?: StyleProp<TextStyle>
	children: React.ReactNode
}

const RNEText500 = (props: Props & TextProps) => (
	<TextStyled {...props}>{props.children}</TextStyled>
)
export default RNEText500
