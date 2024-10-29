import {memo, useEffect, useState} from 'react'
import {View} from 'react-native'
import {useGlobalSearchParams, useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {FlashList} from '@shopify/flash-list'
import {filter} from 'lodash'
import {Skeleton} from 'moti/skeleton'
import {useFormContext} from 'react-hook-form'

import {
  CountryResponseObject,
  Maybe,
  useGetAllCountriesQuery,
} from '#/graphql/generated'
import {ThemeReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Button, ButtonText} from '#/src/components/ui/button'
import {Text} from '#/src/components/ui/text'
import useContentInsets from '#/src/util/hooks/useContentInsets'
import {Form} from './_layout'

export default function SearchCountry() {
  const router = useRouter()
  const params = useGlobalSearchParams()
  const contentInsets = useContentInsets()

  const rTheme = useReactiveVar(ThemeReactiveVar)
  const [countries, setCountries] = useState<CountryResponseObject[]>([])
  const [_, setPagination] = useState<number>()

  const {watch, setValue} = useFormContext<Form>()

  const {data, loading} = useGetAllCountriesQuery({
    onCompleted: data => {
      if (data.getAllCountries) {
        setCountries(data?.getAllCountries)
        setPagination(data.getAllCountries.length / 4)
      }
    },
  })

  const filterList = (text: string | string[]) => {
    if (!params?.searchtext?.length && data?.getAllCountries?.length) {
      if (data.getAllCountries) {
        setCountries(data.getAllCountries)
      }
    }

    const filteredCountriesData = filter(data?.getAllCountries, item => {
      return contains(
        item,
        Array.isArray(text) ? text.join(' ').toLowerCase() : text.toLowerCase(),
      )
    })
    setCountries(filteredCountriesData)
  }

  const contains = (
    item: {
      __typename?: 'CountryResponseObject' | undefined
      name: any
      phonecode?: string | null | undefined
      isoCode?: string | null | undefined
      flag?: string | null | undefined
      currency?: string | null | undefined
      latitude?: string | null | undefined
      longitude?: string | null | undefined
    },
    query: string,
  ) => {
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
        renderItem={({index, item}) => {
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

  function CountryItem({
    index,
    item,
  }: {
    index: number
    item: CountryResponseObject
  }) {
    const _pressItem = async (item: {
      __typename?: 'CountryResponseObject' | undefined
      currency?: Maybe<string> | undefined
      flag?: Maybe<string> | undefined
      isoCode: any
      latitude: any
      longitude: any
      name: any
      phonecode?: Maybe<string> | undefined
    }) => {
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
        isFocused
        className={` ${watch('country.name') === item.name ? 'bg-primary-500' : 'bg-light-100'} ${watch('country.name') === item.name ? 'dark:bg-primary-500' : 'dark:bg-light-800'} h-[50px] w-full justify-between rounded-md px-2 py-0`}>
        <Box>
          <Text
            numberOfLines={1}
            className="ml-3 mt-0.5 text-center text-xl font-medium">
            {item?.flag} {item.name}
          </Text>
        </Box>
        {watch('country.name') === item.name ? (
          <Button
            onPress={() => _pressItem(item)}
            size="xs"
            className="mr-3 rounded-full bg-blue-500">
            <ButtonText className="text-xs">Continue</ButtonText>
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
      keyExtractor={index => 'key' + index}
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
      renderItem={({index, item}) => {
        return <MemoizedItem index={index} item={item} />
      }}
    />
  )
}
