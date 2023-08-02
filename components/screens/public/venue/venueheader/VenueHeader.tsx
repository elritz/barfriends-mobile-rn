import { Box } from '@components/core'
import { PUBLIC_VENUE_HEADER_IMAGE_HEIGHT } from '@constants/Layout'
import { Photo } from '@graphql/generated'
import { Image } from 'react-native'
import { useWindowDimensions } from 'react-native'

type Props = {
	loading: boolean
	photos: Array<Photo> | undefined
}

const VenueHeader = (props: Props) => {
	const { width } = useWindowDimensions()

	if (props.loading || !props.photos?.length) {
		return (
			<Box
				style={{
					flexDirection: 'column',
					justifyContent: 'flex-end',
					height: PUBLIC_VENUE_HEADER_IMAGE_HEIGHT,
					overflow: 'hidden',
				}}
			/>
		)
	}

	return (
		<Box
			style={{
				flexDirection: 'column',
				justifyContent: 'flex-end',
				height: PUBLIC_VENUE_HEADER_IMAGE_HEIGHT,
				overflow: 'hidden',
			}}
		>
			<Image
				source={{ uri: props.photos[0].url }}
				style={{
					width: width,
					height: PUBLIC_VENUE_HEADER_IMAGE_HEIGHT,
				}}
				alt={'Venue Profile Photo'}
			/>
		</Box>
	)
}

export default VenueHeader
