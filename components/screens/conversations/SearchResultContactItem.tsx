import { Box, Text } from '@gluestack-ui/themed'
import { Image } from 'expo-image'
import { memo } from 'react'

type Props = {
	item: any
	index: number
}

function SearchResultContactItem(props: Props): React.ReactNode {
	return (
		<Box py={'$2'} bg='transparent'>
			{/* <Image source={}> */}
			<Text>{props.item.value}</Text>
		</Box>
	)
}

export default memo(SearchResultContactItem)
