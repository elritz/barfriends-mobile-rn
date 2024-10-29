import {useCallback, useMemo, useRef} from 'react'
import {TextInput} from 'react-native'
import {useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {Ionicons} from '@expo/vector-icons'
import {AntDesign} from '@expo/vector-icons'
import {Controller, useForm} from 'react-hook-form'

import {ThemeReactiveVar} from '#/reactive'
import ChevronBackArrow from '#/src/components/atoms/ChevronBackArrow'
import {HStack} from '#/src/components/ui/hstack'
import {Input, InputField, InputSlot} from '#/src/components/ui/input'
import {Pressable} from '#/src/components/ui/pressable'
import useDebounce from '#/src/util/hooks/useDebounce'

type Props = {
  placeholder?: string
}

const SearchInputSearchArea = (props: Props) => {
  const _inputRef = useRef<TextInput | null>(null)
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const router = useRouter()

  const {control, setValue, handleSubmit, watch} = useForm({
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

  const handleSearchSubmitEditting = (data: {searchtext: any}) => {
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
            ref={_inputRef}
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
                accessibilityRole="button"
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
