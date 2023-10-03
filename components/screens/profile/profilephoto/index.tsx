import ProfilePhotoEmptyState from './ProfilePhotoEmptyState'
import { Box } from '@gluestack-ui/themed'
import { Maybe, Photo } from '@graphql/generated'
import { Image } from 'react-native'

type Props = {
	photo: Maybe<Photo> | undefined
}

export default function ProfilePhoto({ photo }: Props) {
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
