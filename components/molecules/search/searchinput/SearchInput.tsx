import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { HStack, Input, InputField, InputIcon, Pressable } from '@gluestack-ui/themed'
import { useExploreSearchLazyQuery } from '@graphql/generated'
import { ThemeReactiveVar } from '@reactive'
import useDebounce from '@util/hooks/useDebounce'
import { useGlobalSearchParams, useRouter, useSegments } from 'expo-router'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TextInput } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {
	placeholder?: string
}

const SearchInput = (props: Props) => {
	const insets = useSafeAreaInsets()
	const _inputRef = useRef<TextInput | undefined>()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const router = useRouter()
	const segments: String[] = useSegments()
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

	useEffect(() => {
		if (segments.includes('searchtext')) {
			_inputRef.current?.focus()
		}
	}, [segments])

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

	const clearSearchInput = useCallback(() => {
		_inputRef.current?.clear()
		setValue('searchtext', '')
		router.setParams({
			searchtext: '',
		})
	}, [])

	const handleSearchSubmitEditting = data => {
		if (segments.includes('searchresults')) {
			router.push({
				pathname: '/(app)/explore/searchresults',
				params: { searchtext: data.searchtext },
			})
		}
		if (segments.includes('searchtext')) {
			router.push({
				pathname: '/(app)/explore/searchresults',
				params: { searchtext: data.searchtext },
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
								: rTheme.theme?.gluestack.tokens.colors.light900
						}
					>
						<HStack alignItems='center'>
							<InputIcon ml={'$2'}>
								<Ionicons
									color={
										rTheme.colorScheme === 'light'
											? rTheme.theme?.gluestack.tokens.colors.light700
											: rTheme.theme?.gluestack.tokens.colors.light100
									}
									name='ios-search'
									size={20}
								/>
							</InputIcon>
							<InputField
								ref={_inputRef}
								// autoFocus={autoFucus}
								placeholderTextColor={
									rTheme.colorScheme === 'light'
										? rTheme.theme?.gluestack.tokens.colors.light700
										: rTheme.theme?.gluestack.tokens.colors.light100
								}
								autoCapitalize={'none'}
								autoCorrect={false}
								autoComplete='off'
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

									if (segments.includes('explore') && segments.includes('searchtext')) {
										router.replace({
											params: {
												searchtext: watch('searchtext'),
											},
											pathname: '/(app)/explore/searchtext',
										})
									}

									if (segments.includes('searcharea')) {
										if (segments.includes('searchexplore')) {
											router.push({
												pathname: '/(app)/searcharea',
												params: {
													searchtext: '',
												},
											})
										} else {
											if (
												!segments.includes('searchcountry') ||
												!segments.includes('searchcountrystates') ||
												!segments.includes('searchstatecities')
											) {
												router.push({
													pathname: '/(app)/searcharea/searchcountry',
													params: {
														searchtext: '',
													},
												})
											}
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
								<Pressable onPress={() => clearSearchInput()}>
									<InputIcon mr={'$3'}>
										<AntDesign
											name='closecircle'
											size={20}
											color={rTheme.colorScheme === 'light' ? 'black' : 'white'}
										/>
									</InputIcon>
								</Pressable>
							) : null}
						</HStack>
					</Input>
				)}
			/>
		</HStack>
	)
}

export default SearchInput
