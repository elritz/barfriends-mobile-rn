import { Text } from "#/components/ui/text";
import { Box } from "#/components/ui/box";
import { Image } from 'expo-image'
import { memo } from 'react'

type Props = {
	item: any
	index: number
}

function SearchResultContactItem(props: Props): React.ReactNode {
	return (
        <Box className="py-2 bg-transparent">
            {/* <Image source={}> */}
            <Text>{props.item.value}</Text>
        </Box>
    );
}

export default memo(SearchResultContactItem)
