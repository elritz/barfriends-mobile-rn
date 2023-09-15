import { Pressable, Text } from '@components/core'
import { memo } from 'react'

type Props = {
	item: any
	index: number
}

function ContactItem(props: Props): React.ReactNode {
	return <Text>{props.item.value}</Text>
}

export default memo(ContactItem)
