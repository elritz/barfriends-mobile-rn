import { useReactiveVar } from '@apollo/client'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import { HStack, Input } from '@components/core'
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { useExploreSearchLazyQuery } from '@graphql/generated'
import { ThemeReactiveVar } from '@reactive'
import useDebounce from '@util/hooks/useDebounce'
import { useGlobalSearchParams, useRouter, useSegments } from 'expo-router'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TextInput } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

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
	const insets = useSafeAreaInsets()
	const _inputRef = useRef<TextInput | undefined>()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const router = useRouter()
	const segments = useSegments()
	const params = useGlobalSearchParams()
	const [showBack, setShowBack] = useState(false)

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
			searchtext: params.searchtext === undefined ? '' : String(params.searchtext),
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
		setShowBack(!segments.includes('hometab'))

		if (!segments.includes('hometab')) {
			if (segments.includes('explore')) {
				_inputRef.current?.focus()
			}
			if (
				segments.includes('searcharea') &&
				segments.includes('searchcountry' || 'searchstate' || 'searchstatecities')
			) {
				_inputRef.current?.focus()
			}
		}
	}, [])

	useEffect(() => {
		if (params.searchtext || params.searchtext !== undefined) {
			setValue('searchtext', params.searchtext as string)
		} else {
			setValue('searchtext', '')
		}
	}, [params.searchtext])

	const [exploreSearchQuery, { data, loading, error }] = useExploreSearchLazyQuery({
		onCompleted: data => {
			router.setParams({
				searchtext: String(watch().searchtext),
			})
		},
	})

	const clearSearchInput = () => {
		_inputRef.current?.clear()
		setValue('searchtext', '')
		router.setParams({
			searchtext: '',
		})
	}

	const handleSearchSubmitEditting = data => {
		if (segments.includes('searchtext')) {
			router.push({
				pathname: '(app)/explore/searchresults',
				params: { searchtext: data.searchtext },
			})
		}
		if (
			segments.includes('venufeed') ||
			segments.includes('messagestack') ||
			segments.includes('tonight')
		) {
			router.push({
				pathname: '(app)/explore/searchtext',
				params: { searchtext: data.searchtext },
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
		<HStack position={'relative'} flex={1} sx={{ mt: insets.top }} pb={'$2'}>
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
						hitSlop={{ top: 12, bottom: 12, left: 0, right: 15 }}
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
								size={20}
							/>
						</Input.Icon>
						<Input.Input
							ref={_inputRef}
							// autoFocus={autoFucus}
							placeholderTextColor={
								rTheme.colorScheme === 'light'
									? rTheme.theme?.gluestack.tokens.colors.light700
									: rTheme.theme?.gluestack.tokens.colors.dark900
							}
							value={value}
							onPressIn={() => {
								if (segments.includes('hometab')) {
									router.push({
										pathname: '(app)/explore/searchtext',
										params: {
											searchtext: '',
										},
									})
								}

								if (segments.includes('explore') && segments.includes('searchtext')) {
									router.replace({
										params: {
											searchtext: watch('searchtext'),
										},
										pathname: '(app)/explore/searchtext',
									})
								}

								if (segments.includes('searcharea')) {
									if (
										!segments.includes('searchcountry') ||
										!segments.includes('searchcountrystates') ||
										!segments.includes('searchstatecities')
									) {
										router.push({
											pathname: '(app)/searcharea/searchcountry',
											params: {
												searchtext: '',
											},
										})
									} else {
									}
								}
							}}
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

export default SearchInput
