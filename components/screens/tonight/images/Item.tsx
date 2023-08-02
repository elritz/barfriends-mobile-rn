import { MARGIN, SIZE } from './Config'
import { useReactiveVar } from '@apollo/client'
import { Box, Text } from '@components/core'
import { MaterialIcons } from '@expo/vector-icons'
import { PermissionMediaReactiveVar, ThemeReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { Image } from 'react-native'
import { StyleSheet, View, Pressable } from 'react-native'

const styles = StyleSheet.create({
	container: {
		width: SIZE,
		height: SIZE,
	},
})

interface TileProps {
	id: string
	uri: string
	onPress: () => void
}

const Item = ({ uri, onPress }: TileProps) => {
	const router = useRouter()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const rPermissionMedia = useReactiveVar(PermissionMediaReactiveVar)

	return (
		<Pressable
			onPress={() => {
				rPermissionMedia?.granted
					? onPress()
					: router.push({
							pathname: '(app)/permission/medialibrary',
					  })
			}}
		>
			<View style={styles.container} pointerEvents='none'>
				{uri ? (
					<Image
						source={{ uri }}
						style={{ flex: 1, margin: MARGIN * 2, borderRadius: MARGIN * 10 }}
						alt={'Story Image'}
						accessibilityLabel={'Story Image'}
					/>
				) : (
					<Box
						alignItems={'center'}
						justifyContent={'center'}
						flex={1}
						rounded={MARGIN * 10}
						m={MARGIN * 2}
					>
						<MaterialIcons
							size={55}
							name={'add-photo-alternate'}
							color={
								rTheme.colorScheme === 'light'
									? rTheme.theme?.gluestack.tokens.colors.light900
									: rTheme.theme?.gluestack.tokens.colors.dark900
							}
						/>
						<Text fontSize={'$xl'}>Add photo</Text>
					</Box>
				)}
			</View>
		</Pressable>
	)
}

export default Item
