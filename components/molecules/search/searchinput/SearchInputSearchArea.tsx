import { useReactiveVar } from '@apollo/client'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import { HStack, Input } from '@gluestack-ui/themed'
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'
import useDebounce from '@util/hooks/useDebounce'
import { useRouter } from 'expo-router'
import { useCallback, useMemo, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TextInput } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

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
		formState: { errors },
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
		<HStack position={'relative'} flex={1} sx={{ mt: insets.top }} pb={'$2'}>
			<ChevronBackArrow />
			<Controller
				control={control}
				name='searchtext'
				render={({ field: { value, onChange } }) => (
					<Input
						flex={1}
						variant='rounded'
						mr={'$3'}
						zIndex={0}
						hitSlop={{ top: 12, bottom: 12, left: 0, right: 15 }}
						bg={
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light100
								: rTheme.theme?.gluestack.tokens.colors.light900
						}
					>
						<Input.Icon ml={'$2'}>
							<Ionicons
								color={
									rTheme.colorScheme === 'light'
										? rTheme.theme?.gluestack.tokens.colors.light700
										: rTheme.theme?.gluestack.tokens.colors.light100
								}
								name='ios-search'
								size={20}
							/>
						</Input.Icon>
						<Input.Input
							ref={_inputRef}
							autoFocus
							placeholderTextColor={
								rTheme.colorScheme === 'light'
									? rTheme.theme?.gluestack.tokens.colors.light700
									: rTheme.theme?.gluestack.tokens.colors.light100
							}
							autoCapitalize={'none'}
							autoCorrect={false}
							autoComplete='off'
							value={value}
							onChangeText={onChange}
							placeholder={props.placeholder || 'Search'}
							returnKeyType='search'
							underlineColorAndroid='transparent'
							onSubmitEditing={handleSubmit(handleSearchSubmitEditting)}
							keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
						/>

						{watch('searchtext')?.length ? (
							<Input.Icon mr={'$3'} onPress={() => clearSearchInput()}>
								<AntDesign
									name='closecircle'
									size={20}
									color={rTheme.colorScheme === 'light' ? 'black' : 'white'}
								/>
							</Input.Icon>
						) : null}
					</Input>
				)}
			/>
		</HStack>
	)
}

export default SearchInputSearchArea
