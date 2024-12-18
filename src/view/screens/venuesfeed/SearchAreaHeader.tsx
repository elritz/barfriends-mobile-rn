import {Pressable} from 'react-native'
import {useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {FontAwesome5} from '@expo/vector-icons'

import {SearchAreaReactiveVar, ThemeReactiveVar} from '#/reactive'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'
import VenueFeedSearchAreaEmptyState from '#/src/view/screens/venuesfeed/VenueFeedSearchAreaEmptyState'

export default function SearchAreaHeader() {
  const router = useRouter()
  const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const _press = () => {
    router.push({
      pathname: '/(app)/searcharea',
    })
  }

  if (!rSearchAreaVar.searchArea) {
    return <VenueFeedSearchAreaEmptyState />
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => _press()}
      style={{flex: 1}}>
      <HStack space={'md'} className="items-center justify-between px-3">
        <VStack className="flex-1">
          <HStack space={'md'} className="items-center justify-between">
            <Heading className="text-3xl color-black dark:color-white">
              {rSearchAreaVar.searchArea.city.name}
            </Heading>
            {rSearchAreaVar?.useCurrentLocation && (
              <FontAwesome5
                name="location-arrow"
                color={rTheme.theme?.gluestack.tokens.colors.blue500}
                size={20}
              />
            )}
          </HStack>
          <Text className="text-primary-500">Change area</Text>
        </VStack>
      </HStack>
    </Pressable>
  )
}
