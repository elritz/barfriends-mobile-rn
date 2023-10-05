import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { HStack, Input, InputField, InputIcon, Pressable, Text } from '@gluestack-ui/themed'
import { useExploreSearchLazyQuery } from '@graphql/generated'
import { ThemeReactiveVar } from '@reactive'
import useDebounce from '@util/hooks/useDebounce'
import { useGlobalSearchParams, useRouter, useSegments } from 'expo-router'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TextInput } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {
	placeholder?: string
}

const SearchInputText = (props: Props) => {
	const insets = useSafeAreaInsets()
	const _inputRef = useRef<TextInput | undefined>()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const router = useRouter()
	const segments = useSegments()
	const params = useGlobalSearchParams()

	const { control, setValue, handleSubmit, watch } = useForm({
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
		// _inputRef.current?.clear()
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
						alignItems='center'
						variant='rounded'
						ml={'$2'}
						zIndex={0}
						hitSlop={{ top: 12, bottom: 12, left: 0, right: 15 }}
						bg={
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light100
								: rTheme.theme?.gluestack.tokens.colors.light900
						}
					>
						<Ionicons
						style={{ marginLeft: 10 }}
							color={
								rTheme.colorScheme === 'light'
									? rTheme.theme?.gluestack.tokens.colors.light700
									: rTheme.theme?.gluestack.tokens.colors.light100
							}
							name='ios-search'
							size={20}
						/>
						<InputField
							ref={_inputRef}
							autoFocus={true}
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
							<Pressable mr={'$3'} onPress={() => clearSearchInput()}>
								<AntDesign
									name='closecircle'
									size={20}
									color={rTheme.colorScheme === 'light' ? 'black' : 'white'}
								/>
							</Pressable>
						) : null}
					</Input>
				)}
			/>
			<Pressable onPress={() => router.back()} mx={'$3'} justifyContent='center'>
				<Text>Cancel</Text>
			</Pressable>
		</HStack>
	)
}

export default SearchInputText
