import {useCallback, useEffect, useMemo, useRef} from 'react'
import {TextInput} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useGlobalSearchParams, useRouter, useSegments} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {Ionicons} from '@expo/vector-icons'
import {AntDesign} from '@expo/vector-icons'
import {Controller, useForm} from 'react-hook-form'

import {useExploreSearchLazyQuery} from '#/graphql/generated'
import {ThemeReactiveVar} from '#/reactive'
import {HStack} from '#/src/components/ui/hstack'
import {Input, InputField} from '#/src/components/ui/input'
import {Pressable} from '#/src/components/ui/pressable'
import {Text} from '#/src/components/ui/text'
import useDebounce from '#/src/util/hooks/useDebounce'

type Props = {
  placeholder?: string
}

const SearchInputText = (props: Props) => {
  const insets = useSafeAreaInsets()
  const _inputRef = useRef<TextInput | null>(null)

  const rTheme = useReactiveVar(ThemeReactiveVar)
  const router = useRouter()
  const segments: string[] = useSegments()
  const params = useGlobalSearchParams()

  const {control, setValue, handleSubmit, watch} = useForm({
    defaultValues: {
      searchtext:
        params.searchtext === undefined ? '' : String(params.searchtext),
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  })

  useEffect(() => {
    if (segments.includes('searchtext')) {
      _inputRef.current?.focus()
    }
  }, [segments])

  useEffect(() => {
    if (params.searchtext || params.searchtext !== undefined) {
      setValue('searchtext', params.searchtext as string)
    }
  }, [params.searchtext])

  const [exploreSearchQuery, {data, loading, error}] =
    useExploreSearchLazyQuery({
      onCompleted: data => {
        router.setParams({
          searchtext: String(watch().searchtext),
        })
      },
    })

  const clearSearchInput = useCallback(() => {
    // _inputRef.current?.clear()
    router.setParams({
      searchtext: '',
    })
  }, [])

  const handleSearchSubmitEditting = data => {
    if (segments.includes('searchresults')) {
      router.push({
        pathname: '/(app)/explore/searchresults',
        params: {searchtext: data.searchtext},
      })
    }
    if (segments.includes('searchtext')) {
      router.push({
        pathname: '/(app)/explore/searchresults',
        params: {searchtext: data.searchtext},
      })
      _inputRef.current?.blur()
    }

    if (
      segments.includes('venufeed') ||
      segments.includes('messagestack') ||
      segments.includes('tonight')
    ) {
      router.push({
        pathname: '/(app)/explore/searchtext',
        params: {searchtext: data.searchtext},
      })
    }
  }

  const debouncedSearchResults = useDebounce(watch().searchtext, 700)

  useMemo(() => {
    if (watch().searchtext) {
      exploreSearchQuery({
        variables: {
          search: String(watch().searchtext),
        },
      })
    }
  }, [debouncedSearchResults])

  return (
    <HStack className="relative mt-[10] flex-1 pb-2">
      <Controller
        control={control}
        name="searchtext"
        render={({field: {value, onChange}}) => (
          <Input
            variant="rounded"
            hitSlop={{top: 12, bottom: 12, left: 0, right: 15}}
            className={` ${rTheme.colorScheme === 'light' ? rTheme.theme?.gluestack.tokens.colors.light100 : rTheme.theme?.gluestack.tokens.colors.light900} z-0 ml-2 flex-1 items-center`}>
            <Ionicons
              style={{paddingLeft: 10}}
              color={
                rTheme.colorScheme === 'light'
                  ? rTheme.theme?.gluestack.tokens.colors.light700
                  : rTheme.theme?.gluestack.tokens.colors.light100
              }
              name="search"
              size={20}
            />
            <InputField
              ref={_inputRef}
              placeholderTextColor={
                rTheme.colorScheme === 'light'
                  ? rTheme.theme?.gluestack.tokens.colors.light700
                  : rTheme.theme?.gluestack.tokens.colors.light100
              }
              autoCapitalize={'none'}
              autoCorrect={false}
              autoComplete="off"
              value={value}
              onFocus={() => {
                if (segments.includes('hometab')) {
                  router.push({
                    pathname: '/(app)/explore/searchtext',
                    params: {
                      searchtext: '',
                    },
                  })
                }
              }}
              onChangeText={onChange}
              placeholder={props.placeholder || 'Search'}
              returnKeyType="search"
              underlineColorAndroid="transparent"
              onSubmitEditing={handleSubmit(handleSearchSubmitEditting)}
              keyboardAppearance={
                rTheme.colorScheme === 'light' ? 'light' : 'dark'
              }
              className="leading-sm"
            />
            {watch('searchtext')?.length ? (
              <Pressable
                accessibilityRole="button"
                onPress={() => clearSearchInput()}
                className="mr-3">
                <AntDesign
                  name="closecircle"
                  size={20}
                  color={rTheme.colorScheme === 'light' ? 'black' : 'white'}
                />
              </Pressable>
            ) : null}
          </Input>
        )}
      />
      <Pressable
        accessibilityRole="button"
        onPress={() => router.back()}
        className="mx-3 justify-center">
        <Text>Cancel</Text>
      </Pressable>
    </HStack>
  )
}

export default SearchInputText
