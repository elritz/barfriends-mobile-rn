import {VStack} from '#/src/components/ui/vstack'
import {Text} from '#/src/components/ui/text'
import {HStack} from '#/src/components/ui/hstack'
import {Center} from '#/src/components/ui/center'
import {Box} from '#/src/components/ui/box'
import {useReactiveVar} from '@apollo/client'
import {Ionicons, MaterialIcons} from '@expo/vector-icons'
import {Profile, useRefreshDeviceManagerQuery} from '#/graphql/generated'
import {AuthorizationReactiveVar, ThemeReactiveVar} from '#/reactive'
import {View} from 'react-native'

import {Image} from 'expo-image'

type ProfileItemType = {
  item: Partial<Profile> | null | undefined
  loading?: boolean
}

const CheckMarkLoggedIn = ({item}) => {
  console.log('🚀 ~ CheckMarkLoggedIn ~ item:', item.isActive)
  const rTheme = useReactiveVar(ThemeReactiveVar)

  const {
    data: rdmData,
    loading: rdmLoading,
    error: rdmError,
  } = useRefreshDeviceManagerQuery({
    onCompleted: data => {},
  })

  if (rdmLoading) {
    return null
  }
  return null
}

const DeviceManagerProfileItemLarge = ({item}: ProfileItemType) => {
  const rTheme = useReactiveVar(ThemeReactiveVar)

  return (
    <Box
      key={item?.id}
      className="light:bg-light-200 my-2 flex-1 flex-row items-center rounded-md px-3 py-3 dark:bg-light-800">
      <HStack className="items-center justify-between">
        <View style={{marginRight: 8}}>
          <View style={{width: 30}}>
            <CheckMarkLoggedIn item={item} />
          </View>
        </View>
        {item?.profilePhoto ? (
          <Image
            placeholder={item.profilePhoto.blurhash}
            source={{uri: item.profilePhoto.url}}
            style={{width: 50, height: 50, borderRadius: 10}}
            alt={'Profile photo'}
          />
        ) : (
          <Box className="h-[40px] w-[40px] justify-center rounded-md bg-light-200 dark:bg-light-700">
            <Center>
              <Ionicons
                color={
                  rTheme.colorScheme === 'light'
                    ? rTheme.theme?.gluestack.tokens.colors.light900
                    : rTheme.theme?.gluestack.tokens.colors.light100
                }
                size={20}
                name={'person'}
              />
            </Center>
          </Box>
        )}
        <VStack className="mx-2 flex-1 justify-center">
          <Text numberOfLines={1} className="text-lg">
            {item?.IdentifiableInformation?.fullname}
          </Text>
          <Text className="text-md font-bold">
            @{item?.IdentifiableInformation?.username}
          </Text>
        </VStack>
      </HStack>
    </Box>
  )
}

export default DeviceManagerProfileItemLarge
