import ProfilePhotoEmptyState from './ProfilePhotoEmptyState'
import { Maybe, Photo } from '@graphql/generated'
import { Image } from 'expo-image'
import { Box, View } from 'native-base'
import { useWindowDimensions } from 'react-native'

type Props = {
	photo: Maybe<Photo> | undefined
}

export default function ProfilePhoto({ photo }: Props) {
	const { width } = useWindowDimensions()
	const margin = 12
	const ITEM_WIDTH = width - margin * 2

	console.log(' photo?.url :>> ', photo?.url)

	if (!photo?.id) {
		return <ProfilePhotoEmptyState />
	}

	return (
		<Box
			_light={{
				bg: 'light.50',
			}}
			_dark={{
				bg: 'dark.50',
			}}
			h={100}
			w={100}
			borderRadius={'lg'}
			overflow={'hidden'}
			mb={3}
		>
			<Image
				source={{
					uri: photo?.url,
				}}
				placeholder={photo?.blurhash}
				style={{
					height: '100%',
					width: '100%',
				}}
			/>
		</Box>
	)
}