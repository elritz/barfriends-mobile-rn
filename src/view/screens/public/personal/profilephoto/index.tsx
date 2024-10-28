import {Image} from 'react-native'

import {Maybe, Photo} from '#/graphql/generated'
import {Box} from '#/src/components/ui/box'

type Props = {
  photo: Maybe<Photo> | undefined
}

export default function ProfilePhoto({photo}: Props) {
  if (!photo?.id) {
    return null
  }

  return (
    <Box className="mb-3 h-[150px] w-[150px] overflow-hidden rounded-md">
      <Image
        accessibilityIgnoresInvertColors
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
