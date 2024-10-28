import {memo} from 'react'

import {Box} from '#/src/components/ui/box'
import {Text} from '#/src/components/ui/text'

type Props = {
  item: any
  index: number
}

function SearchResultContactItem(props: Props): React.ReactNode {
  return (
    <Box className="bg-transparent py-2">
      {/* <Image source={}> */}
      <Text>{props.item.value}</Text>
    </Box>
  )
}

export default memo(SearchResultContactItem)
