// TODO: FN(this needs to be operational for user story line)
// TODO: UX(get photos in order and update order)
import { MARGIN } from './Config'
import Item from './Item'
import SortableList from './SortableList'
import { useReactiveVar } from '@apollo/client'
import { Box, Button, Heading, Text, VStack } from '@components/core'
import { MaterialIcons } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'
import * as ImagePicker from 'expo-image-picker'
import { useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const tiles = [
	{
		id: 'reanimated',
		picture: 'https://picsum.photos/id/1/300/300',
	},
	{
		id: 'github',
		picture: 'https://picsum.photos/id/2/300/300',
	},
	{
		id: 'rnnavigation',
		picture: 'https://picsum.photos/id/3/300/300',
	},
	{},
]

const TonightImages = () => {
	const window = useWindowDimensions()
	const rTheme = useReactiveVar(ThemeReactiveVar)

	const updatePositions = async () => {}
	const handleSelectImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			base64: true,
			allowsEditing: false,
			aspect: [1, 1],
			quality: 1,
		})

		// useCloudinaryImageUploading([])
	}

	return (
		<SafeAreaView style={{ paddingHorizontal: MARGIN, marginVertical: 20 }}>
			{!tiles.length ? (
				<Box mx={'$2'} h={window.width} rounded={'$md'} alignItems={'center'} justifyContent={'center'}>
					<VStack space={'md'} alignItems={'center'}>
						{/* <Icon color={'primary.600'} as={MaterialCommunityIcons} name={'sticker-plus'} size={'6xl'} /> */}
						<Box bg='$transparent' alignItems={'center'} mx={'$4'}>
							<Heading fontSize={'2xl'}>Start tonights Story</Heading>
							<Text fontSize={'$lg'}>Ready to go out, add photos of you tonight. </Text>
						</Box>
						<Button
							mt={'$4'}
							sx={{ w: window.width / 2 }}
							bg={'$tertiary50'}
							onPress={async () => {
								const result = await ImagePicker.launchImageLibraryAsync({
									mediaTypes: ImagePicker.MediaTypeOptions.Images,
									selectionLimit: 4,
									allowsEditing: false,
									aspect: [1, 1],
									quality: 1,
									allowsMultipleSelection: true,
								})
								if (result.canceled) {
								}
								if (result.assets) {
								}
							}}
						>
							<Text>Select images</Text>
							<MaterialIcons
								name={'photo-library'}
								size={25}
								color={
									rTheme.colorScheme === 'light'
										? rTheme.theme?.gluestack.tokens.colors.light900
										: rTheme.theme?.gluestack.tokens.colors.dark900
								}
							/>
						</Button>
					</VStack>
				</Box>
			) : (
				<SortableList editing onDragEnd={positions => updatePositions()}>
					{tiles.map((tile, index) => (
						<Item
							onPress={handleSelectImage}
							key={`${tile.id}-${index}`}
							id={`${tile.id}-${index}`}
							uri={tile.picture}
						/>
					))}
				</SortableList>
			)}
		</SafeAreaView>
	)
}

export default TonightImages
