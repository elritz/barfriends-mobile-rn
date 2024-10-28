import {useWindowDimensions} from 'react-native'
import {Image} from 'expo-image'

import {Photo} from '#/graphql/generated'
import {Box} from '#/src/components/ui/box'
import {PUBLIC_VENUE_HEADER_IMAGE_HEIGHT} from '#/src/constants/Layout'

type Props = {
  loading: boolean
  photos: Photo[] | undefined
}

const VenueHeader = (props: Props) => {
  const {width} = useWindowDimensions()

  if (props.loading || !props.photos?.length) {
    return (
      <Box
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-end',
          height: PUBLIC_VENUE_HEADER_IMAGE_HEIGHT,
          overflow: 'hidden',
        }}
      />
    )
  }

  return (
    <Box
      style={{
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: PUBLIC_VENUE_HEADER_IMAGE_HEIGHT,
        overflow: 'hidden',
      }}
      className="rounded-none">
      <Image
        source={{uri: props.photos[0].url}}
        style={{
          width: width,
          height: PUBLIC_VENUE_HEADER_IMAGE_HEIGHT,
        }}
        alt={'Venue Profile Photo'}
      />
    </Box>
  )
}

export default VenueHeader
