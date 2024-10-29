import {useState} from 'react'
import {Image, Pressable, View} from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import {FlashList} from '@shopify/flash-list'

import {Heading} from '#/src/components/ui/heading'

export default ({}) => {
  const [selectedPhoto, setSelectedPhoto] = useState([])
  const [numberOfPhotos, _] = useState(100)
  const [lastPhotoID, setLastPhotoID] = useState('')
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([])
  const [status, __] = MediaLibrary.usePermissions()

  if (!status) return null

  const _pressedImageCameraRollItem = (item: {
    id?: string
    filename?: string
    uri: any
    mediaType?: MediaLibrary.MediaTypeValue
    mediaSubtypes?: MediaLibrary.MediaSubtype[] | undefined
    width?: number
    height?: number
    creationTime?: number
    modificationTime?: number
    duration?: number
    albumId?: string | undefined
  }) => {
    if (item.uri === selectedPhoto) {
      setSelectedPhoto([])
    } else {
      setSelectedPhoto(item.uri)
    }
  }

  const handleLoadMore = async () => {
    const GetNewPhotos = await MediaLibrary.getAssetsAsync({
      first: numberOfPhotos,
      last: lastPhotoID,
      after: lastPhotoID,
      endCursor: lastPhotoID,
      hasNextPage: true,
    })
    const {id} = GetNewPhotos.assets[GetNewPhotos.assets.length - 1]

    setLastPhotoID(id)
    setPhotos(GetNewPhotos.assets)
  }

  return (
    <View>
      <Heading className="text-2xl font-black uppercase">
        Show Media Library
      </Heading>
      <Heading className="text-2xl font-black">Take Photo Options</Heading>
      <FlashList
        estimatedItemSize={100}
        style={{flex: 1}}
        data={photos}
        numColumns={3}
        renderItem={({item}) => (
          <Pressable
            accessibilityRole="button"
            onPress={() => _pressedImageCameraRollItem(item)}>
            <Image
              accessibilityIgnoresInvertColors
              style={{
                width: 50,
                height: 50,
              }}
              source={{uri: item.uri}}
            />
          </Pressable>
        )}
        keyExtractor={item => item.id}
        onEndReachedThreshold={0.4}
        onEndReached={() => handleLoadMore()}
      />
    </View>
  )
}
