import {memo, useEffect, useState} from 'react'
import {View} from 'react-native'
import {useGlobalSearchParams, useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {FlashList} from '@shopify/flash-list'
import {filter, uniqueId} from 'lodash'
import {Skeleton} from 'moti/skeleton'
import {useFormContext} from 'react-hook-form'

import {
  CityResponseObject,
  useGetAllCitiesByStateQuery,
} from '#/graphql/generated'
import {SearchAreaReactiveVar, ThemeReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Button, ButtonText} from '#/src/components/ui/button'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'
import {LOCAL_STORAGE_SEARCH_AREA} from '#/src/constants/StorageConstants'
import {storage} from '#/src/storage/mmkv'
import useContentInsets from '#/src/util/hooks/useContentInsets'
import {LocalStoragePreferenceSearchAreaType} from '#/types/preferences'
import {Form} from './_layout'

// TODO: FN(When done save this data to the backend as recent SearchAreas)
type CityState = {
  title: string
  cities: CityResponseObject[] | undefined | null
}
export default function SearchStateCities() {
  const router = useRouter()
  const params = useGlobalSearchParams()
  const contentInsets = useContentInsets()
  const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
  const rTheme = useReactiveVar(ThemeReactiveVar)

  const [popularCities, setPopularCities] = useState<
    CityResponseObject[] | undefined | null
  >([])
  const [allCities, setAllCities] = useState<
    CityResponseObject[] | undefined | null
  >([])
  const [searchCities, setSearchCities] = useState<CityState>()

  const formContext = useFormContext<Form>()
  const {watch, getValues, setValue, handleSubmit, formState} = formContext

  const {data, loading, error} = useGetAllCitiesByStateQuery({
    skip: !params.countryIsoCode || !params.stateIsoCode,
    variables: {
      countryIsoCode: String(params.countryIsoCode),
      stateIsoCode: String(params.stateIsoCode),
    },
    onError: error => {},
    onCompleted: data => {
      if (data.getAllCitiesByState) {
        setPopularCities(data.getAllCitiesByState.popularCities)
        setAllCities(data.getAllCitiesByState.allCities)
      }
    },
  })

  const filterList = text => {
    if (
      !params?.searchtext?.length &&
      data?.getAllCitiesByState?.allCities?.length
    ) {
      if (data.getAllCitiesByState) {
        setSearchCities({
          title: ``,
          cities: [],
        })
      }
    }

    const filteredAllCitiesData = filter(
      data?.getAllCitiesByState.allCities,
      item => {
        return contains(item, text.toLowerCase())
      },
    )
    setSearchCities({
      title: `"${text.toLowerCase()}"`,
      cities: [...filteredAllCitiesData],
    })
  }

  const contains = (item, query) => {
    if (item.name.toLowerCase().includes(query)) {
      return true
    }
    return false
  }

  useEffect(() => {
    if (params.searchtext && params.searchtext.length) {
      filterList(params.searchtext)
    } else {
      if (data?.getAllCitiesByState) {
        setSearchCities({
          title: ``,
          cities: [],
        })
      }
    }
  }, [params.searchtext])

  if (loading || !allCities) {
    return (
      <Box className="flex-1 bg-transparent">
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
      </Box>
    )
  }

  function CityItem({index, item}) {
    const _pressItem = async item => {
      setValue('city', {
        name: item.name,
        isoCode: '',
        coords: {
          latitude: Number(item.latitude),
          longitude: Number(item.longitude),
        },
      })
      setValue('done', true)

      const {country, state, city} = getValues()
      const newSearchAreaValue: LocalStoragePreferenceSearchAreaType = {
        ...rSearchAreaVar,
        useCurrentLocation: false,
        searchArea: {
          country,
          state,
          city,
          coords: {
            latitude: city.coords.latitude,
            longitude: city.coords.longitude,
          },
        },
      }

      storage.set(LOCAL_STORAGE_SEARCH_AREA, JSON.stringify(newSearchAreaValue))
      SearchAreaReactiveVar({
        ...newSearchAreaValue,
      })

      router.setParams({
        searchtext: '',
      })

      console.log(
        '🚀 ~ const_pressItem= ~ formState:',
        JSON.stringify(formState, null, 4),
      )
      setTimeout(() => {
        handleSubmit(() => {})
        router.back()
      }, 1000)
    }

    return (
      <Button
        onPress={() => _pressItem(item)}
        key={index}
        isFocused
        className={` ${watch('city.name') === item.name ? 'bg-primary-500' : 'bg-light-50'} ${watch('city.name') === item.name ? 'dark:bg-primary-500' : 'dark:bg-light-800'} my-2 h-[50px] w-full justify-between rounded-md px-2`}>
        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          className="ml-3 text-lg font-medium">
          {item.name}
        </Text>
        <HStack space={'md'} className="mr-2 items-center justify-end">
          {item.venuesInArea && item.venuesInArea > 1 ? (
            <VStack>
              <Text numberOfLines={1} className="text-md text-center font-bold">
                {item.venuesInArea}
              </Text>
              <Text
                numberOfLines={1}
                className="text-center text-sm font-light">
                Venues
              </Text>
            </VStack>
          ) : null}
          {watch('city.name') === item.name ? (
            <Button
              onPress={() => _pressItem(item)}
              size="xs"
              className="rounded-full bg-blue-500">
              <ButtonText className="text-xs">Continue</ButtonText>
            </Button>
          ) : null}
        </HStack>
      </Button>
    )
  }

  const MemoizedItem = memo(CityItem)

  if (searchCities && searchCities.title && searchCities.cities) {
    return (
      <Box className="flex-1 bg-transparent">
        <FlashList
          data={searchCities.cities}
          scrollEnabled={true}
          keyboardDismissMode="on-drag"
          estimatedItemSize={50}
          keyExtractor={(item, index) => {
            return uniqueId().toString()
          }}
          ListHeaderComponent={() => {
            return (
              <Box className="mx-3 mb-4 bg-transparent">
                <Heading className="mx-3 text-2xl">
                  {searchCities.title}
                </Heading>
              </Box>
            )
          }}
          renderItem={({item, index}) => {
            return <MemoizedItem index={index} item={item} />
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
          contentInset={{
            ...contentInsets,
          }}
        />
      </Box>
    )
  }

  return (
    <Box className="flex-1 bg-transparent">
      <FlashList
        data={allCities}
        scrollEnabled={true}
        automaticallyAdjustContentInsets
        automaticallyAdjustKeyboardInsets
        automaticallyAdjustsScrollIndicatorInsets
        keyboardDismissMode="on-drag"
        estimatedItemSize={50}
        keyExtractor={(item, index) => 'key' + index}
        ListHeaderComponent={() => {
          return (
            <Box className="mb-4 bg-transparent">
              {popularCities && popularCities.length ? (
                <Box className="mb-4 bg-transparent">
                  <Heading className="mb-4">Popular</Heading>
                  {popularCities.map((item, index) => {
                    return (
                      <MemoizedItem
                        key={uniqueId()}
                        index={index}
                        item={item}
                      />
                    )
                  })}
                </Box>
              ) : null}
              <Heading>All Cities</Heading>
            </Box>
          )
        }}
        renderItem={({item, index}) => {
          return <MemoizedItem index={index} item={item} />
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
        contentInset={{
          ...contentInsets,
        }}
        contentContainerStyle={{
          paddingHorizontal: 10,
        }}
      />
    </Box>
  )
}
