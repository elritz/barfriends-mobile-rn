import { Ionicons } from '@expo/vector-icons'
import {
	CommonActions,
	RouteProp,
	StackActions,
	useNavigation,
	useRoute,
} from '@react-navigation/native'
import { Box, HStack, Icon, Input } from 'native-base'
import React, { useContext, useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, View, TextInput } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ExploreFilterTabParamList } from 'src/types/app'
import { ThemeContext } from 'styled-components/native'

export type ExploreFilterTabSearchResultRouteProp = RouteProp<
	ExploreFilterTabParamList,
	'SearchResultTabStack'
>

const SearchTopTabStackInput = () => {
	const _searchInputRef = useRef<TextInput>(null)
	const inset = useSafeAreaInsets()
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const route = useRoute<ExploreFilterTabSearchResultRouteProp>()
	const params = route.params

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
			searchText: params.params.searchText,
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
		if (params.params.searchText) {
			setValue('searchText', params.params.searchText)
		}
	}, [params.params.searchText])

	const handleSearchSubmitEditting = item => {
		const values = getValues()
		const pushAction = StackActions.push('HomeTabNavigator', {
			screen: 'ExploreStack',
			params: {
				screen: 'SearchResultTabStack',
				params: {
					screen: 'TopScreen',
					params: {
						searchText: values.searchText,
					},
				},
			},
		})
		navigation.dispatch(pushAction)
	}

	const goBack = () => {
		Keyboard.dismiss()
		_searchInputRef.current?.blur()
		navigation.dispatch(StackActions.pop())
	}

	const changeSearchText = (text: string) => {
		setValue('searchText', text)
		navigation.dispatch(CommonActions.setParams({ searchText: text }))
	}

	const clearSearchInput = () => {
		setValue('searchText', '')
		navigation.dispatch(CommonActions.setParams({ searchText: '' }))
	}

	return (
		<Box
			style={{
				marginTop: inset.top,
			}}
		>
			<HStack alignItems={'center'}>
				<Icon
					as={Ionicons}
					onPress={goBack}
					name='arrow-back'
					size={'3xl'}
					style={{
						width: '10%',
					}}
				/>
				<Controller
					control={control}
					name='searchText'
					render={({ field: { value, onChange } }) => (
						<Input
							variant={'filled'}
							rounded={'lg'}
							mx={2}
							py={4}
							bg={'secondary.50'}
							ref={_searchInputRef}
							placeholder='Search'
							_input={{
								fontSize: 'lg',
							}}
							isReadOnly
							value={value}
							onChangeText={(text: string) => changeSearchText(text)}
							onSubmitEditing={handleSearchSubmitEditting}
							returnKeyType='search'
							leftElement={<Icon as={Ionicons} name='ios-search' size={'lg'} ml={2} />}
							underlineColorAndroid='transparent'
							onPressIn={() => {
								navigation.dispatch(
									StackActions.push('HomeTabNavigator', {
										screen: 'ExploreStack',
										params: {
											screen: 'SearchTextScreen',
											params: {
												searchText: value,
											},
										},
									}),
								)
							}}
						/>
					)}
				/>
			</HStack>
		</Box>
	)
}

export default SearchTopTabStackInput
