import { useReactiveVar } from '@apollo/client'
import { Box, Heading } from '@components/core'
import { FontAwesome5 } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { Pressable } from 'react-native'

const JoinVenue = ({}) => {
	const router = useRouter()
	const rTheme = useReactiveVar(ThemeReactiveVar)

	return (
		<Pressable
			onPress={() => {
				router.push({
					pathname: '(app)/hometab/venuefeed',
				})
			}}
			style={{
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Box bg='$darkBlue400' h={'$16'} w={'$16'} alignItems='center' justifyContent='center'>
				<FontAwesome5
					name='map-marker-alt'
					style={{
						marginLeft: 2,
					}}
					size={30}
					color={
						rTheme.colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light900
							: rTheme.theme?.gluestack.tokens.colors.dark900
					}
				/>
			</Box>
			<Heading
				textAlign={'center'}
				mt={'$3'}
				sx={{
					w: 'auto',
				}}
				fontSize={'$lg'}
				lineHeight={'$md'}
				fontWeight={'$black'}
				textTransform={'uppercase'}
			>
				Find venues near you
			</Heading>
		</Pressable>
	)
}

export default JoinVenue
