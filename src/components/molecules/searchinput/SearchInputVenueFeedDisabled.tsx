import {useRouter, useSegments} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {Ionicons} from '@expo/vector-icons'

import {ThemeReactiveVar} from '#/reactive'
import {HStack} from '#/src/components/ui/hstack'
import {Input} from '#/src/components/ui/input'
import {Pressable} from '#/src/components/ui/pressable'
import {Text} from '#/src/components/ui/text'

const SearchInputVenueFeedDisabled = () => {
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const router = useRouter()
  const segments: string[] = useSegments()
  return (
    <HStack className="relative mt-[10] flex-1">
      <Pressable
        accessibilityRole="button"
        onPressIn={() => {
          if (segments.includes('hometab')) {
            router.push({
              pathname: '/(app)/explore/searchtext',
              params: {
                searchtext: '',
              },
            })
          }
        }}
        className="relative flex-1 pb-2">
        <Input
          variant="rounded"
          isReadOnly={true}
          className={` ${rTheme.colorScheme === 'light' ? rTheme.theme?.gluestack.tokens.colors.light100 : rTheme.theme?.gluestack.tokens.colors.light900} 'ml-2' mr-2 flex-1 items-center justify-center`}>
          <Ionicons
            color={
              rTheme.colorScheme === 'light'
                ? rTheme.theme?.gluestack.tokens.colors.light700
                : rTheme.theme?.gluestack.tokens.colors.light100
            }
            name="search"
            style={{
              paddingRight: 5,
            }}
            size={18}
          />
          <Text className="leading-md text-lg">Search</Text>
        </Input>
      </Pressable>
    </HStack>
  )
}

export default SearchInputVenueFeedDisabled
