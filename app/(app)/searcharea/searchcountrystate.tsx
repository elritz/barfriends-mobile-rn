import { Form } from './_layout'
import { useReactiveVar } from '@apollo/client'
import { Button, Center, Text } from '@components/core'
import { StateResponseObject, useGetAllStatesByCountryQuery } from '@graphql/generated'
import { ThemeReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import useContentInsets from '@util/hooks/useContentInsets'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { filter } from 'lodash'
import { Skeleton } from 'moti/skeleton'
import { memo, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function SearchAreaCountryStates() {
	const router = useRouter()
	const params = useLocalSearchParams()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const contentInsets = useContentInsets()

	const [countryStates, setCountryStates] = useState<Array<StateResponseObject>>([])
	const [pagination, setPagination] = useState<number>()
	const formContext = useFormContext<Form>()

	const { watch, getValues, setValue } = formContext

	const { data, loading, error } = useGetAllStatesByCountryQuery({
		skip: !String(params.countryIsoCode),
		variables: {
			countryIsoCode: String(params.countryIsoCode),
		},
		onCompleted: data => {
			setCountryStates(data.getAllStatesByCountry)
			if (data.getAllStatesByCountry.length > 100) {
				setPagination(data.getAllStatesByCountry.length / 4)
			} else {
				setPagination(data.getAllStatesByCountry.length)
			}
		},
	})

	const filterList = text => {
		if (!params?.searchtext?.length && data?.getAllStatesByCountry.length) {
			setCountryStates(data.getAllStatesByCountry)
		}

		const filteredData = filter(data?.getAllStatesByCountry, state => {
			return contains(state, text.toLowerCase())
		})
		setCountryStates(filteredData)
	}

	const contains = (state, query) => {
		if (state.name.toLowerCase().includes(query)) {
			return true
		}
		return false
	}

	useEffect(() => {
		if (params.searchtext) {
			filterList(params.searchtext)
		}
	}, [params.searchtext])

	if (!params.countryIsoCode) {
		return (
			<Center p={10}>
				<Text fontSize={'$lg'}> No country provided</Text>
			</Center>
		)
	}

	if (loading) {
		return (
			<FlashList
				data={[...Array(20)]}
				contentInset={{
					...contentInsets,
				}}
				contentContainerStyle={{
					paddingHorizontal: 10,
				}}
				keyExtractor={(item, index) => 'key' + index}
				estimatedItemSize={50}
				keyboardDismissMode={'on-drag'}
				ItemSeparatorComponent={() => {
					return (
						<View
							style={{
								marginVertical: 4,
							}}
						/>
					)
				}}
				renderItem={({ index, item }) => {
					return (
						<Skeleton
							key={index}
							height={50}
							width={'100%'}
							radius={10}
							colorMode={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
							colors={
								rTheme.colorScheme === 'light'
									? [
											String(rTheme.theme?.gluestack.tokens.colors.light100),
											String(rTheme.theme?.gluestack.tokens.colors.light300),
									  ]
									: [
											String(rTheme.theme?.gluestack.tokens.colors.dark100),
											String(rTheme.theme?.gluestack.tokens.colors.dark300),
									  ]
							}
						/>
					)
				}}
			/>
		)
	}

	function CityItem({ index, item }) {
		const _pressItem = async item => {
			setValue('state', {
				name: item.name,
				isoCode: item.isoCode,
				coords: {
					latitude: Number(item.latitude),
					longitude: Number(item.longitude),
				},
			})
			router.replace({
				pathname: '(app)/searcharea/searchstatecities',
				params: {
					countryIsoCode: item.countryCode,
					stateIsoCode: item.isoCode,
				},
			})
		}

		return (
			<Button
				onPress={() => _pressItem(item)}
				key={index}
				w={'$full'}
				isFocused
				sx={{
					h: 50,
					py: 0,
					px: 2,
					justifyContent: 'space-between',
					_light: {
						bg: watch('state.name') === item.name ? '$primary500' : '$light50',
					},
					_dark: {
						bg: watch('state.name') === item.name ? '$primary500' : '$dark100',
					},
				}}
				rounded={'$md'}
				justifyContent='flex-start'
			>
				<Text
					mt={'$0.5'}
					ml={'$3'}
					textAlign={'center'}
					fontWeight={'$medium'}
					fontSize={'$xl'}
					numberOfLines={1}
					ellipsizeMode={'tail'}
				>
					<Text fontWeight={'$medium'} fontSize={'$lg'} numberOfLines={1} ellipsizeMode={'tail'}>
						{item.name}
					</Text>
				</Text>
				{watch('state.name') === item.name ? (
					<Button onPress={() => _pressItem(item)} rounded={'$full'} bg='$blue500' size='xs' mr={'$3'}>
						<Button.Text fontSize={'$xs'}>Continue</Button.Text>
					</Button>
				) : null}
			</Button>
		)
	}

	const MemoizedItem = memo(CityItem)

	return (
		<FlashList
			data={countryStates}
			keyboardDismissMode={'on-drag'}
			keyExtractor={(item, index) => 'key' + index}
			contentInset={{
				...contentInsets,
			}}
			contentContainerStyle={{
				paddingHorizontal: 10,
			}}
			ItemSeparatorComponent={() => {
				return (
					<View
						style={{
							marginVertical: 4,
						}}
					/>
				)
			}}
			estimatedItemSize={50}
			renderItem={({ item, index }) => {
				return <MemoizedItem index={index} item={item} />
			}}
		/>
	)
}
