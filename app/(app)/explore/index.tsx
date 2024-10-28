import {Image} from 'react-native'
import {useWindowDimensions, View} from 'react-native'
import {useRouter} from 'expo-router'
import {FlashList} from '@shopify/flash-list'

import {ProfileType, useProfilesQuery} from '#/graphql/generated'
import {Box} from '#/src/components/ui/box'
import {Pressable} from '#/src/components/ui/pressable'
import {Text} from '#/src/components/ui/text'
import useContentInsets from '#/src/util/hooks/useContentInsets'

export default () => {
  const {width} = useWindowDimensions()
  const router = useRouter()
  const numColumns = 2 // 2.5 if numColumns from flatlist is 3
  const height = width * (1.25 / numColumns)
  const contentInsets = useContentInsets()

  const {data, loading, error} = useProfilesQuery({
    variables: {
      where: {
        ProfileType: {
          equals: ProfileType.Personal,
        },
      },
      take: 20,
    },
  })

  return (
    <Box style={{flex: 1}} className="bg-transparent">
      <FlashList
        data={loading ? [] : data?.profiles}
        numColumns={2}
        estimatedItemSize={45}
        keyExtractor={(item, index) => index.toString()}
        // ListHeaderComponent={() => {
        // 	return <ShowCaseScroll />
        // }}
        contentInset={{
          ...contentInsets,
        }}
        renderItem={({item}) => {
          return (
            <>
              {loading ? null : (
                <Pressable
                  accessibilityRole="button"
                  onPress={() => {
                    router.push({
                      pathname: `/(app)/public/personal/${item.IdentifiableInformation?.username}`,
                    })
                  }}
                  className="mx-1 my-2 flex-1 grow-[1px] self-center rounded-md">
                  {item && item.photos && item.photos.length > 0 && (
                    <Image
                      style={{
                        width: '100%',
                        height,
                        borderWidth: 3,
                        borderColor: 'white',
                      }}
                      source={{uri: item.photos[0].url}}
                      resizeMode="cover"
                    />
                  )}
                  <View
                    style={{
                      width: '100%',
                      justifyContent: 'flex-start',
                    }}>
                    <Text className="text-sm capitalize">
                      {item.IdentifiableInformation?.fullname}
                    </Text>
                  </View>
                </Pressable>
              )}
            </>
          )
        }}
      />
    </Box>
  )
}
