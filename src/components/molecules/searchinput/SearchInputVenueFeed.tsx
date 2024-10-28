import {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react'
import {TextInput} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {
  router as _Router,
  useGlobalSearchParams,
  useRouter,
  useSegments,
} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {Ionicons} from '@expo/vector-icons'
import {AntDesign} from '@expo/vector-icons'
import {Controller, useForm} from 'react-hook-form'

import {ThemeReactiveVar} from '#/reactive'
import {HStack} from '#/src/components/ui/hstack'
import {Input, InputField} from '#/src/components/ui/input'

type Props = {
  placeholder?: string
}

const SearchInputVenueFeed = (props: Props) => {
  const insets = useSafeAreaInsets()
  const _inputRef = useRef<TextInput | undefined>()
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const router = useRouter()
  const segments: string[] = useSegments()
  const params = useGlobalSearchParams()
  const [showBack, setShowBack] = useState(false)

  const {
    control,
    setError,
    clearErrors,
    setValue,
    getValues,
    handleSubmit,
    formState: {errors},
    watch,
    setFocus,
  } = useForm({
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

  useLayoutEffect(() => {
    if (_Router.canGoBack()) {
      if (!segments.includes('hometab')) {
        if (segments.includes('explore')) {
          _inputRef.current?.focus()
        }
        if (
          (segments.includes('searcharea') &&
            segments.includes('searchcountry')) ||
          segments.includes('searchstate') ||
          segments.includes('searchstatecities')
        ) {
          _inputRef.current?.focus()
        }
      }
    }
  }, [segments])

  useEffect(() => {
    if (params.searchtext || params.searchtext !== undefined) {
      setValue('searchtext', params.searchtext as string)
    } else {
      setValue('searchtext', '')
    }
  }, [params.searchtext])

  const clearSearchInput = useCallback(() => {
    _inputRef.current?.clear()
    setValue('searchtext', '')
    router.setParams({
      searchtext: '',
    })
  }, [])

  const handleSearchSubmitEditting = (data: {searchtext: any}) => {
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

  return (
    <HStack className="relative mt-[2] flex-1 pb-2">
      <Controller
        control={control}
        name="searchtext"
        render={({field: {value, onChange}}) => (
          <Input
            ref={_inputRef}
            variant="rounded"
            className={` ${rTheme.colorScheme === 'light' ? rTheme.theme?.gluestack.tokens.colors.light100 : rTheme.theme?.gluestack.tokens.colors.light900} ${!showBack ? 'ml-2' : 'ml-0'} mr-2 flex-1 items-center`}>
            <Ionicons
              color={
                rTheme.colorScheme === 'light'
                  ? rTheme.theme?.gluestack.tokens.colors.light700
                  : rTheme.theme?.gluestack.tokens.colors.light100
              }
              name="search"
              style={{
                marginLeft: 10,
              }}
              size={20}
            />

            <InputField
              hitSlop={{top: 12, bottom: 12, left: 0, right: 15}}
              readOnly={!showBack}
              // autoFocus={autoFucus}
              placeholderTextColor={
                rTheme.colorScheme === 'light'
                  ? rTheme.theme?.gluestack.tokens.colors.light700
                  : rTheme.theme?.gluestack.tokens.colors.light100
              }
              autoCapitalize={'none'}
              autoCorrect={false}
              autoComplete="off"
              value={value}
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
              onChangeText={onChange}
              placeholder={props.placeholder || 'Search'}
              returnKeyType="search"
              underlineColorAndroid="transparent"
              keyboardAppearance={
                rTheme.colorScheme === 'light' ? 'light' : 'dark'
              }
              onSubmitEditing={handleSubmit(handleSearchSubmitEditting)}
              className={` ${rTheme.colorScheme === 'light' ? rTheme.theme?.gluestack.tokens.colors.light100 : rTheme.theme?.gluestack.tokens.colors.light900} z-0`}
            />
            {watch('searchtext')?.length ? (
              <AntDesign
                onPress={() => clearSearchInput()}
                name="closecircle"
                size={20}
                color={rTheme.colorScheme === 'light' ? 'black' : 'white'}
              />
            ) : null}
          </Input>
        )}
      />
    </HStack>
  )
}

export default SearchInputVenueFeed
