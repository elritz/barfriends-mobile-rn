import { useReactiveVar } from '@apollo/client'
import { Box, Center, Pressable } from '@components/core'
import { Ionicons } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'
import * as ImagePicker from 'expo-image-picker'

export default function ProfilePhotoEmptyState() {
	const rTheme = useReactiveVar(ThemeReactiveVar)

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			presentationStyle: ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
			aspect: [4, 3],
			quality: 1,
		})

		if (result.assets) {
			result.assets.map(item => {})
		}
	}

	return (
		<Pressable
			onPress={pickImage}
			flex={1}
			p={'$4'}
			sx={{
				w: 120,
				h: 120,
				_light: {
					bg: '$light300',
				},
				_dark: {
					bg: '$dark100',
				},
			}}
			rounded={'$md'}
		>
			<Box
				sx={{
					h: '100%',
				}}
				justifyContent={'center'}
			>
				<Center>
					<Ionicons
						size={40}
						name={'ios-person'}
						color={
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light900
								: rTheme.theme?.gluestack.tokens.colors.dark900
						}
					/>
				</Center>
				<Box
					sx={{
						_light: {
							borderColor: '$light700',
						},
						_dark: {
							borderColor: '$dark700',
						},
						bottom: -25,
						right: -25,
					}}
					borderWidth={'$2'}
					rounded={'$full'}
					alignItems={'center'}
					justifyContent={'center'}
					position={'absolute'}
				>
					<Ionicons
						name='ios-arrow-up-circle'
						color={
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light900
								: rTheme.theme?.gluestack.tokens.colors.dark900
						}
						size={32}
						style={{
							marginLeft: 2,
							borderRadius: 50,
							zIndex: 10,
						}}
					/>
				</Box>
			</Box>
		</Pressable>
	)
}
