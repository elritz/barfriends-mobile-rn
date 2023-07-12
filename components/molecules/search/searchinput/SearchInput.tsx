import { useReactiveVar } from '@apollo/client'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import { HStack, Input } from '@components/core'
import { Ionicons } from '@expo/vector-icons'
import { useExploreSearchLazyQuery } from '@graphql/generated'
import { ThemeReactiveVar } from '@reactive'
import useDebounce from '@util/hooks/useDebounce'
import { useGlobalSearchParams, useLocalSearchParams, useRouter, useSegments } from 'expo-router'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, TextInput, TextInputProps } from 'react-native'

type Props = {
	// onPressIn?: () => void
	// onPress?: () => void
	// isDisabled?: boolean
	// autofocus?: boolean
	// editable?: boolean
	// isFocused?: boolean
	placeholder?: string
	// withBack?: boolean
}

const SearchInput = (props: Props) => {
	const _inputRef = useRef<TextInputProps | undefined>()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const router = useRouter()
	const segments = useSegments()
	const params = useGlobalSearchParams()
	const [showBack, setShowBack] = useState(false)
	const [autoFucus, setAutoFocus] = useState(false)
	const {
		control,
		setError,
		clearErrors,
		setValue,
		getValues,
		handleSubmit,
		formState: { errors },
		watch,
		setFocus,
	} = useForm({
		defaultValues: {
			searchtext: String(params.searchtext) || '',
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
		const showSubscription = Keyboard.addListener('keyboardDidShow', () => {})
		const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {})

		return () => {
			showSubscription.remove()
			hideSubscription.remove()
		}
	}, [])

	useLayoutEffect(() => {
		setShowBack(!segments.includes('hometab'))
		if (!segments.includes('hometab')) {
			if (segments.includes('explore')) {
				setAutoFocus(true)
			}
			if (
				segments.includes('searcharea') &&
				segments.includes('searchcountry' || 'searchstate' || 'searchstatecities')
			) {
				setAutoFocus(true)
			}
		}
	}, [segments])

	useEffect(() => {
		setValue('searchtext', params.searchtext as string)
	}, [params.searchtext])

	const [exploreSearchQuery, { data, loading, error }] = useExploreSearchLazyQuery({
		onCompleted: data => {
			router.setParams({
				searchtext: String(watch().searchtext),
			})
		},
	})

	const clearSearchInput = () => {
		setValue('searchtext', '')
		router.setParams({
			searchtext: '',
		})
	}

	const handleSearchSubmitEditting = data => {
		router.push({
			pathname: '(app)/explore/searchresults',
			params: { searchtext: data.searchtext },
		})
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
		<HStack position={'relative'} flex={1} alignItems='center'>
			{showBack && <ChevronBackArrow />}
			<Controller
				control={control}
				name='searchtext'
				render={({ field: { value, onChange } }) => (
					<Input
						flex={1}
						variant='rounded'
						mr={'$2'}
						ml={!showBack ? '$2' : '$0'}
						zIndex={0}
						isReadOnly={!showBack}
						bg={
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light100
								: rTheme.theme?.gluestack.tokens.colors.dark100
						}
					>
						<Input.Icon ml={'$2'}>
							<Ionicons
								color={
									rTheme.colorScheme === 'light'
										? rTheme.theme?.gluestack.tokens.colors.light700
										: rTheme.theme?.gluestack.tokens.colors.dark900
								}
								name='ios-search'
								size={23}
							/>
						</Input.Icon>
						<Input.Input
							ref={_inputRef}
							autoFocus={autoFucus}
							placeholderTextColor={
								rTheme.colorScheme === 'light'
									? rTheme.theme?.gluestack.tokens.colors.light700
									: rTheme.theme?.gluestack.tokens.colors.dark900
							}
							onPressIn={() => {
								if (segments.includes('explore') && segments.includes('searchtext'))
									router.replace({
										params: {
											searchtext: watch('searchtext'),
										},
										pathname: '(app)/explore/searchtext',
									})
								if (segments.includes('hometab')) {
									router.push({
										pathname: '(app)/explore/searchtext',
										params: {
											searchtext: '',
										},
									})
								}
								if (segments.includes('searcharea')) {
									router.push({
										pathname: '(app)/searcharea/searchcountry',
										params: {
											searchtext: '',
										},
									})
								}
							}}
							alignSelf={'center'}
							onChangeText={onChange}
							placeholder={props.placeholder || 'Search'}
							returnKeyType='search'
							underlineColorAndroid='transparent'
							onSubmitEditing={handleSubmit(handleSearchSubmitEditting)}
							keyboardAppearance={rTheme.localStorageColorScheme === 'light' ? 'light' : 'dark'}
						/>
					</Input>
				)}
			/>
		</HStack>
	)
}

export default SearchInput
