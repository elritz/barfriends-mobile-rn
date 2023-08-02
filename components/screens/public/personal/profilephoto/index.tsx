import { Box } from '@components/core'
import { Maybe, Photo } from '@graphql/generated'
import { Image } from 'react-native'

type Props = {
	photo: Maybe<Photo> | undefined
}

export default function ProfilePhoto({ photo }: Props) {
	if (!photo?.id) {
		return <></>
	}

	return (
		<Box
			sx={{
				h: 150,
				w: 150,
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
