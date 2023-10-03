import { Box, HStack, Text } from '@gluestack-ui/themed'
import { Image } from 'expo-image'
import { memo } from 'react'

type Props = {
	item: any
	index: number
}

function ContactItem(props: Props): React.ReactNode {
	return (
		<HStack py={'$2'} px={'$5'} bg='transparent' alignItems='center'>
			<Image
				alt={'random'}
				source={{ uri: 'https://unsplash.com/photos/FuusC7lfg6Q' }}
				contentFit='cover'
				placeholder={'LEHV6nWB2yk8pyo0adR*.7kCMdnj'}
				transition={100}
				style={{
					borderRadius: 5,
					height: 40,
					width: 40,
					backgroundColor: 'transparent',
				}}
			/>
			<Text ml={'$2'} textTransform='capitalize'>
				{props.item.value}&nbsp;{props.item.value}
			</Text>
		</HStack>
	)
}

export default memo(ContactItem)
