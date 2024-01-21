import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { HStack, Input, InputField } from '@gluestack-ui/themed'
import { ThemeReactiveVar } from '@reactive'
import { useGlobalSearchParams, useRouter, useSegments, router as _Router } from 'expo-router'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TextInput } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {
	placeholder?: string
}

const SearchInputVenueFeed = (props: Props) => {
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

	useLayoutEffect(() => {
		if (_Router.canGoBack()) {
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

	const handleSearchSubmitEditting = data => {
		if (segments.includes('searchresults')) {
			router.navigate({
				pathname: '/(app)/explore/searchresults',
				params: { searchtext: data.searchtext },
			})
		}
		if (segments.includes('searchtext')) {
			router.navigate({
				pathname: '/(app)/explore/searchresults',
				params: { searchtext: data.searchtext },
			})
		}

		if (
			segments.includes('venufeed') ||
			segments.includes('messagestack') ||
			segments.includes('tonight')
		) {
			router.navigate({
				pathname: '/(app)/explore/searchtext',
				params: { searchtext: data.searchtext },
			})
		}
	}

	return (
		<HStack position={'relative'} flex={1} sx={{ mt: insets.top }} pb={'$2'}>
			<Controller
				control={control}
				name='searchtext'
				render={({ field: { value, onChange } }) => (
					<Input
						alignItems='center'
						flex={1}
						variant='rounded'
						mr={'$2'}
						ml={!showBack ? '$2' : '$0'}
						bg={
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light100
								: rTheme.theme?.gluestack.tokens.colors.light900
						}
					>
						<Ionicons
							color={
								rTheme.colorScheme === 'light'
									? rTheme.theme?.gluestack.tokens.colors.light700
									: rTheme.theme?.gluestack.tokens.colors.light100
							}
							name='search'
							style={{
								marginLeft: 10,
							}}
							size={20}
						/>

						<InputField
							zIndex={0}
							hitSlop={{ top: 12, bottom: 12, left: 0, right: 15 }}
							isReadOnly={!showBack}
							bg={
								rTheme.colorScheme === 'light'
									? rTheme.theme?.gluestack.tokens.colors.light100
									: rTheme.theme?.gluestack.tokens.colors.light900
							}
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
									router.navigate({
										pathname: '/(app)/explore/searchtext',
										params: {
											searchtext: '',
										},
									})
								}
							}}
							onChangeText={onChange}
							placeholder={props.placeholder || 'Search'}
							returnKeyType='search'
							underlineColorAndroid='transparent'
							keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
							onSubmitEditing={handleSubmit(handleSearchSubmitEditting)}
						/>
						{watch('searchtext')?.length ? (
							<AntDesign
								onPress={() => clearSearchInput()}
								name='closecircle'
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
