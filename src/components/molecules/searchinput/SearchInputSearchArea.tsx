import {Pressable} from '#/src/components/ui/pressable'
import {
  Input,
  InputField,
  InputIcon,
  InputSlot,
} from '#/src/components/ui/input'
import {HStack} from '#/src/components/ui/hstack'
import {useReactiveVar} from '@apollo/client'
import ChevronBackArrow from '#/src/components/atoms/ChevronBackArrow'
import {Ionicons} from '@expo/vector-icons'
import {AntDesign} from '@expo/vector-icons'
import {ThemeReactiveVar} from '#/reactive'
import useDebounce from '#/src/util/hooks/useDebounce'
import {useRouter} from 'expo-router'
import {useCallback, useMemo, useRef} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {TextInput} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

type Props = {
  placeholder?: string
}

const SearchInputSearchArea = (props: Props) => {
  const insets = useSafeAreaInsets()
  const _inputRef = useRef<TextInput | undefined>()
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const router = useRouter()

  const {
    control,
    setError,
    clearErrors,
    setValue,
    getValues,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm({
    defaultValues: {
      searchtext: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  })

  const clearSearchInput = useCallback(() => {
    _inputRef.current?.clear()
    setValue('searchtext', '')
    router.setParams({
      searchtext: '',
    })
  }, [])

  const handleSearchSubmitEditting = data => {
    router.setParams({
      searchtext: data.searchtext,
    })
  }

  const debouncedSearchResults = useDebounce(watch().searchtext, 700)

  useMemo(() => {
    router.setParams({
      searchtext: watch().searchtext,
    })
  }, [debouncedSearchResults])

  return (
    <HStack className="relative mt-[2] flex-1 pb-2">
      <ChevronBackArrow />
      <Controller
        control={control}
        name="searchtext"
        render={({field: {value, onChange}}) => (
          <Input
            variant="rounded"
            hitSlop={{top: 12, bottom: 12, left: 0, right: 15}}
            className={` ${rTheme.colorScheme === 'light' ? rTheme.theme?.gluestack.tokens.colors.light100 : rTheme.theme?.gluestack.tokens.colors.light900} z-0 mx-3 flex-1 items-center px-3`}>
            <InputSlot style={{alignSelf: 'center'}}>
              <Ionicons
                color={
                  rTheme.colorScheme === 'light'
                    ? rTheme.theme?.gluestack.tokens.colors.light700
                    : rTheme.theme?.gluestack.tokens.colors.light100
                }
                name="search"
                size={23}
              />
            </InputSlot>
            <InputField
              ref={_inputRef}
              autoFocus
              placeholderTextColor={
                rTheme.colorScheme === 'light'
                  ? rTheme.theme?.gluestack.tokens.colors.light700
                  : rTheme.theme?.gluestack.tokens.colors.light100
              }
              autoCapitalize={'none'}
              type="text"
              textAlignVertical="center"
              autoCorrect={false}
              autoComplete="off"
              value={value}
              onChangeText={onChange}
              placeholder={props.placeholder || 'Search'}
              returnKeyType="search"
              underlineColorAndroid="transparent"
              onSubmitEditing={handleSubmit(handleSearchSubmitEditting)}
              keyboardAppearance={
                rTheme.colorScheme === 'light' ? 'light' : 'dark'
              }
              className="text-xl"
            />
            {watch('searchtext')?.length ? (
              <Pressable
                onPress={() => clearSearchInput()}
                className="h-[100%] justify-center px-2">
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
    </HStack>
  )
}

export default SearchInputSearchArea
