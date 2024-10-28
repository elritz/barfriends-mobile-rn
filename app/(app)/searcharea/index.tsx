import {ScrollView} from 'react-native'
import {useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {Ionicons} from '@expo/vector-icons'

import {SearchAreaReactiveVar, ThemeReactiveVar} from '#/reactive'
import LocationPermissionItemEmptyState from '#/src/components/organisms/list/searchareafiltering/LocationPermissionItemEmptyState'
import SearchAreaLocationPermissionItem from '#/src/components/organisms/list/searchareafiltering/SearchAreaLocationPermissionItem'
import {Box} from '#/src/components/ui/box'
import {Button, ButtonText} from '#/src/components/ui/button'
import {Divider} from '#/src/components/ui/divider'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'
import {LOCAL_STORAGE_SEARCH_AREA} from '#/src/constants/StorageConstants'
import {storage} from '#/src/storage/mmkv'
import useContentInsets from '#/src/util/hooks/useContentInsets'

export default () => {
  const router = useRouter()
  const contentInsets = useContentInsets()

  const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
  const rTheme = useReactiveVar(ThemeReactiveVar)

  const searchAreaLocation = [
    {name: 'Country', value: rSearchAreaVar?.searchArea.country.name},
    {name: 'State', value: rSearchAreaVar?.searchArea.state.name},
    {name: 'City', value: rSearchAreaVar?.searchArea.city.name},
  ]

  const searchAreaDistances = [
    {kRing: 1, distance: 30},
    {kRing: 2, distance: 60},
    {kRing: 3, distance: 80},
  ]

  const handleSearchAreaKRing = async item => {
    SearchAreaReactiveVar({
      ...rSearchAreaVar,
      kRing: {
        distance: item.distance,
        value: item.kRing,
      },
    })
    storage.set(LOCAL_STORAGE_SEARCH_AREA, JSON.stringify(rSearchAreaVar))
  }

  const switchRouter = value => {
    switch (value) {
      case 'City':
        if (
          rSearchAreaVar?.searchArea.country.isoCode &&
          rSearchAreaVar?.searchArea.state.isoCode
        ) {
          router.push({
            pathname: '/(app)/searcharea/searchstatecities',
            params: {
              countryIsoCode: rSearchAreaVar.searchArea.country.isoCode,
              stateIsoCode: rSearchAreaVar.searchArea.state.isoCode,
            },
          })
        }
        break
      case 'State':
        if (
          rSearchAreaVar?.searchArea.country.isoCode &&
          rSearchAreaVar?.searchArea.state.isoCode
        ) {
          router.push({
            pathname: '/(app)/searcharea/searchcountrystate',
            params: {
              countryIsoCode: rSearchAreaVar.searchArea.country.isoCode,
            },
          })
        }
        break
      case 'Country':
        if (
          rSearchAreaVar?.searchArea.country.isoCode &&
          rSearchAreaVar?.searchArea.state.isoCode
        ) {
          router.push({
            pathname: '/(app)/searcharea/searchcountry',
          })
        }
        break
      default:
        router.push({
          pathname: '/(app)/searcharea/searchcountry',
        })
    }
  }

  return (
    <ScrollView
      contentInset={contentInsets}
      style={{
        marginHorizontal: 4,
        flex: 1,
      }}>
      <VStack space={'md'} className="mx-2 my-4">
        <Box className="bg-transparent">
          <VStack space="sm">
            <Heading className="leading-sm text-lg dark:color-orange-500">
              Distance{`\n`}
              <Text className="text-md leading-sm">
                Around&nbsp;{rSearchAreaVar.kRing.distance}&nbsp;km away.
              </Text>
            </Heading>

            <HStack space={'md'} className="mt-3 justify-around">
              {searchAreaDistances.map((item, index) => {
                return (
                  <Button
                    key={index}
                    variant={
                      rSearchAreaVar?.kRing.value === item.kRing
                        ? 'solid'
                        : 'outline'
                    }
                    style={{
                      borderColor:
                        rSearchAreaVar?.kRing.value === item.kRing
                          ? '#ff700000'
                          : '#ff7000',
                      borderWidth: 1,
                    }}
                    onPress={() => handleSearchAreaKRing(item)}
                    className={` ${rSearchAreaVar?.kRing.value === item.kRing ? 'bg-primary-500' : 'bg-light-100'} ${rSearchAreaVar?.kRing.value === item.kRing ? 'dark:bg-primary-500' : 'dark:bg-light-900'} h-[50px] flex-1 rounded-xl`}>
                    <Text
                      className={` ${rSearchAreaVar?.kRing.value === item.kRing ? 'dark:text-white' : 'dark:text-white'} ${rSearchAreaVar?.kRing.value === item.kRing ? 'text-white' : 'text-coolGray-900'} ${rSearchAreaVar?.kRing.value === item.kRing ? 'font-bold' : 'font-bold'} `}>
                      {item.distance}
                    </Text>
                  </Button>
                )
              })}
            </HStack>
          </VStack>
        </Box>
        <Divider className="my-3 w-4/5 self-center" />
        <VStack space={'md'}>
          <HStack space={'md'}>
            {!rSearchAreaVar?.searchArea.country.name ||
            !rSearchAreaVar?.searchArea.state.name ||
            !rSearchAreaVar?.searchArea.city.name ? (
              <Box className="p-5">
                <VStack space={'md'}>
                  <VStack space={'md'} className="mb-2">
                    <Heading className="leading-md text-2xl">
                      Search For Your Area
                    </Heading>
                    <Text className="leading-sm text-lg">
                      Find your area and we will show you what we have for
                      venues.
                    </Text>
                  </VStack>
                  <Button
                    onPress={() => {
                      router.push({
                        pathname: '/(app)/searcharea/searchcountry',
                      })
                    }}>
                    <ButtonText className="text-lg">Find Area</ButtonText>
                  </Button>
                  <LocationPermissionItemEmptyState />
                </VStack>
              </Box>
            ) : (
              <VStack space={'md'} className="flex-1">
                <Heading className="leading-sm text-lg">
                  Search area{`\n`}
                  <Text className="text-md leading-sm">
                    {rSearchAreaVar?.useCurrentLocation
                      ? 'You are currently using your devices location to show you venues nearby.'
                      : 'Use your location to automatically set your area.'}
                  </Text>
                </Heading>

                <HStack space={'md'} className="mt-3">
                  {searchAreaLocation.map((item, index) => {
                    return (
                      <Button
                        key={index}
                        variant={'solid'}
                        onPress={() => switchRouter(item.name)}
                        className={` ${!rSearchAreaVar?.useCurrentLocation ? 'bg-light-800' : 'bg-blue-600'} disabled:opacity-1 h-[40px] flex-1 rounded-xl`}>
                        <Text
                          ellipsizeMode={'tail'}
                          numberOfLines={1}
                          className="font-medium color-white">
                          {item.value}
                        </Text>
                      </Button>
                    )
                  })}
                </HStack>
                <SearchAreaLocationPermissionItem />
                <HStack className="justify-end">
                  <Button
                    onPress={() => {
                      router.push({
                        pathname: '/(app)/searcharea/searchcountry',
                      })
                    }}
                    className="rounded-lg">
                    <ButtonText className="color-white">
                      Find new area
                    </ButtonText>
                    <Ionicons
                      color={
                        rTheme.colorScheme === 'light'
                          ? rTheme.theme?.gluestack.tokens.colors.light100
                          : rTheme.theme?.gluestack.tokens.colors.light100
                      }
                      name="arrow-forward"
                      size={27}
                      style={{
                        marginLeft: 8,
                      }}
                    />
                  </Button>
                </HStack>
              </VStack>
            )}
          </HStack>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
