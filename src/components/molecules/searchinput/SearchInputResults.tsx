import {useGlobalSearchParams, useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {Ionicons} from '@expo/vector-icons'

import {ThemeReactiveVar} from '#/reactive'
import {HStack} from '#/src/components/ui/hstack'
import {Input, InputField} from '#/src/components/ui/input'
import {Pressable} from '#/src/components/ui/pressable'

type Props = {
  placeholder?: string
}

const SearchInputResults = (props: Props) => {
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const router = useRouter()
  const params = useGlobalSearchParams()

  return (
    <HStack className="relative mt-[10] flex-1 pb-2">
      <Pressable
        accessibilityRole="button"
        onPress={() => router.back()}
        className="justify-center">
        <Ionicons
          color={
            rTheme.colorScheme === 'light'
              ? rTheme.theme?.gluestack.tokens.colors.light700
              : rTheme.theme?.gluestack.tokens.colors.light100
          }
          name="arrow-back"
          size={30}
          style={{
            marginLeft: 8,
            marginHorizontal: 5,
          }}
        />
      </Pressable>
      <Input
        variant="rounded"
        hitSlop={{top: 12, bottom: 12, left: 0, right: 15}}
        isReadOnly
        className={` ${rTheme.colorScheme === 'light' ? rTheme.theme?.gluestack.tokens.colors.light100 : rTheme.theme?.gluestack.tokens.colors.light900} z-0 mr-3 flex-1`}>
        <InputField
          placeholderTextColor={
            rTheme.colorScheme === 'light'
              ? rTheme.theme?.gluestack.tokens.colors.light700
              : rTheme.theme?.gluestack.tokens.colors.light100
          }
          autoCapitalize={'none'}
          autoCorrect={false}
          autoComplete="off"
          value={
            Array.isArray(params.searchtext)
              ? params.searchtext.join(', ')
              : params.searchtext
          }
          onPressIn={() => {
            router.push({
              pathname: '/(app)/explore/searchtext',
            })
          }}
          placeholder={props.placeholder || 'Search'}
          returnKeyType="search"
          underlineColorAndroid="transparent"
          keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
          className={` ${rTheme.colorScheme === 'light' ? rTheme.theme?.gluestack.tokens.colors.light700 : rTheme.theme?.gluestack.tokens.colors.light400} leading-xs text-center text-sm font-bold`}
        />
      </Input>
    </HStack>
  )
}

export default SearchInputResults
