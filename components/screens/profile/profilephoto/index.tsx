import ProfilePhotoEmptyState from './ProfilePhotoEmptyState'
import { Box } from '@components/core'
import { Maybe, Photo } from '@graphql/generated'
import { Image } from 'react-native'
import { useWindowDimensions } from 'react-native'

type Props = {
	photo: Maybe<Photo> | undefined
}

export default function ProfilePhoto({ photo }: Props) {
	const { width } = useWindowDimensions()
	const margin = 12
	const ITEM_WIDTH = width - margin * 2

	if (!photo?.id) {
		return <ProfilePhotoEmptyState />
	}

	return (
		<Box
			sx={{
				h: 100,
				w: 100,
			}}
			rounded={'$md'}
			overflow={'hidden'}
			mb={'$3'}
		>
			<Image
				source={{
					uri: photo?.url,
				}}
				style={{
					height: '100%',
					width: '100%',
				}}
			/>
		</Box>
	)
}
