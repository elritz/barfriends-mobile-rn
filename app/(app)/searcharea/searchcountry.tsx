import { Form } from './_layout'
import { useReactiveVar } from '@apollo/client'
import { Button, ButtonText, Text } from '@gluestack-ui/themed'
import { CountryResponseObject, useGetAllCountriesQuery } from '@graphql/generated'
import { ThemeReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import useContentInsets from '@util/hooks/useContentInsets'
import { useRouter, useGlobalSearchParams } from 'expo-router'
import { filter } from 'lodash'
import { Skeleton } from 'moti/skeleton'
import { memo, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { View } from 'react-native'

export default function SearchCountry() {
	const router = useRouter()
	const params = useGlobalSearchParams()
	const contentInsets = useContentInsets()

	const rTheme = useReactiveVar(ThemeReactiveVar)
	const [countries, setCountries] = useState<CountryResponseObject[]>([])
	const [pagination, setPagination] = useState<number>()

	const { watch, setValue } = useFormContext<Form>()

	const { data, loading, error } = useGetAllCountriesQuery({
		onCompleted: data => {
			if (data.getAllCountries) {
				setCountries(data?.getAllCountries)
				setPagination(data.getAllCountries.length / 4)
			}
		},
	})

	const filterList = text => {
		if (!params?.searchtext?.length && data?.getAllCountries.length) {
			if (data.getAllCountries) {
				setCountries(data.getAllCountries)
			}
		}

		const filteredCountriesData = filter(data?.getAllCountries, item => {
			return contains(item, text.toLowerCase())
		})
		setCountries(filteredCountriesData)
	}

	const contains = (item, query) => {
		if (item.name.toLowerCase().includes(query)) {
			return true
		}
		return false
	}

	useEffect(() => {
		if (params.searchtext) {
			filterList(params.searchtext)
		} else {
			if (data?.getAllCountries) {
				setCountries(data.getAllCountries)
			}
		}
	}, [params.searchtext])

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
											String(rTheme.theme?.gluestack.tokens.colors.light900),
											String(rTheme.theme?.gluestack.tokens.colors.light700),
									  ]
							}
						/>
					)
				}}
			/>
		)
	}

	function CountryItem({ index, item }) {
		const _pressItem = async item => {
			setValue('country', {
				name: item.name,
				isoCode: item.isoCode,
				coords: {
					latitude: Number(item.latitude),
					longitude: Number(item.longitude),
				},
			})
			router.replace({
				pathname: '/(app)/searcharea/searchcountrystate',
				params: {
					countryIsoCode: item.isoCode,
				},
			})
			router.setParams({
				searchtext: '',
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
						bg: watch('country.name') === item.name ? '$primary500' : '$light100',
					},
					_dark: {
						bg: watch('country.name') === item.name ? '$primary500' : '$light800',
					},
				}}
				rounded={'$md'}
				justifyContent='flex-start'
			>
				<ButtonText
					mt={'$0.5'}
					ml={'$3'}
					textAlign={'center'}
					fontWeight={'$medium'}
					fontSize={'$xl'}
					numberOfLines={1}
					ellipsizeMode={'tail'}
				>
					{item?.flag}
					<Text fontWeight={'$medium'} fontSize={'$lg'} numberOfLines={1} ellipsizeMode={'tail'}>
						{item.name}
					</Text>
				</ButtonText>
				{watch('country.name') === item.name ? (
					<Button onPress={() => _pressItem(item)} rounded={'$full'} bg='$blue500' size='xs' mr={'$3'}>
						<ButtonText fontSize={'$xs'}>Continue</ButtonText>
					</Button>
				) : null}
			</Button>
		)
	}

	const MemoizedItem = memo(CountryItem)

	return (
		<FlashList
			data={countries}
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
				return <MemoizedItem index={index} item={item} />
			}}
		/>
	)
}
