import {memo} from 'react'
import {Image} from 'expo-image'

import {HStack} from '#/src/components/ui/hstack'
import {Text} from '#/src/components/ui/text'

type Props = {
  item: any
  index: number
}

function ContactItem(props: Props): React.ReactNode {
  return (
    <HStack className="items-center bg-transparent px-5 py-2">
      <Image
        alt={'random'}
        source={{uri: 'https://picsum.photos/200/300'}}
        contentFit="cover"
        placeholder={'LEHV6nWB2yk8pyo0adR*.7kCMdnj'}
        transition={100}
        style={{
          borderRadius: 5,
          height: 40,
          width: 40,
          backgroundColor: 'transparent',
        }}
      />
      <Text className="ml-2 capitalize">
        {props.item.value}&nbsp;{props.item.value}
      </Text>
    </HStack>
  )
}

export default memo(ContactItem)
