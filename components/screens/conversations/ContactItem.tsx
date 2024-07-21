import { Text } from "#/components/ui/text";
import { HStack } from "#/components/ui/hstack";
import { Box } from "#/components/ui/box";
import { Image } from 'expo-image'
import { memo } from 'react'

type Props = {
	item: any
	index: number
}

function ContactItem(props: Props): React.ReactNode {
	return (
        <HStack className="py-2 px-5 bg-transparent items-center">
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
            <Text textTransform='capitalize' className="ml-2">
				{props.item.value}&nbsp;{props.item.value}
			</Text>
        </HStack>
    );
}

export default memo(ContactItem)
