import {Pressable} from '#/src/components/ui/pressable'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Divider} from '#/src/components/ui/divider'
import {FlashList} from '@shopify/flash-list'
import {useRouter} from 'expo-router'

export default function Preferences() {
  const router = useRouter()
  const ITEM_HEIGHT = 85
  return (
    <FlashList
      estimatedItemSize={ITEM_HEIGHT}
      data={[
        {
          name: 'Foreground Location',
          route: () => {
            router.push({
              pathname: '/(app)/permission/foregroundlocation',
            })
          },
        },
        {
          name: 'Background Location',
          route: () => {
            router.push({
              pathname: '/(app)/permission/backgroundlocation',
            })
          },
        },
        {
          name: 'Contacts',
          route: () => {
            router.push({
              pathname: '/(app)/permission/contacts',
            })
          },
        },
        {
          name: 'Notifications',
          route: () => {
            router.push({
              pathname: '/(app)/permission/notifications',
            })
          },
        },
        {
          name: 'Media Library',
          route: () => {
            router.push({
              pathname: '/(app)/permission/medialibrary',
            })
          },
        },
        {
          name: 'Camera',
          route: () => {
            router.push({
              pathname: '/(app)/permission/camera',
            })
          },
        },
        {
          name: 'Microphone',
          route: () => {
            router.push({
              pathname: '/(app)/permission/microphone',
            })
          },
        },
      ]}
      keyExtractor={i => i.name}
      numColumns={1}
      contentInset={{top: 10}}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({item}) => {
        return (
          <Pressable onPressIn={item.route}>
            <HStack
              style={{height: ITEM_HEIGHT}}
              className={` flex-1 items-center`}>
              <Heading className="text-md px-4">{item.name}</Heading>
            </HStack>
          </Pressable>
        )
      }}
    />
  )
}
