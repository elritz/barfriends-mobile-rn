import {useEffect, useState} from 'react'
import {View} from 'react-native'
import {useLocalSearchParams, useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {Ionicons} from '@expo/vector-icons'
import {FlashList} from '@shopify/flash-list'
import {Skeleton} from 'moti/skeleton'

import {
  useExploreSearchLazyQuery,
  useRefreshDeviceManagerQuery,
} from '#/graphql/generated'
import {ThemeReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Center} from '#/src/components/ui/center'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Pressable} from '#/src/components/ui/pressable'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'
import useContentInsets from '#/src/util/hooks/useContentInsets'
import SearchCard from '#/src/view/screens/search/components/SearchCard'

type Item = {
  search: string
}

function getUniqueListBy<T>(arr: T[], key: keyof T): T[] {
  const seen = new Set()
  return arr.filter(item => {
    const keyValue = item[key]
    if (seen.has(keyValue)) {
      return false
    }
    seen.add(keyValue)
    return true
  })
}

export default () => {
  const router = useRouter()
  const params = useLocalSearchParams()
  const contentInsets = useContentInsets()
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const [showPastItems, setShotPastItems] = useState(true)
  const [filteredRecentSearches, setFilteredRecentSearches] = useState<Item[]>(
    [],
  )

  const [exploreSearchQuery, {data, loading}] = useExploreSearchLazyQuery({
    fetchPolicy: 'cache-first',
  })

  const {} = useRefreshDeviceManagerQuery({
    fetchPolicy: 'cache-first',
    onCompleted: data => {
      if (
        data.refreshDeviceManager?.__typename === 'AuthorizationDeviceProfile'
      ) {
        const filteredRecentSearches = getUniqueListBy(
          data.refreshDeviceManager.Profile?.resentSearches?.searches ?? [],
          'search',
        )
        setFilteredRecentSearches(filteredRecentSearches)
      }
    },
  })

  useEffect(() => {
    if (params.searchtext?.length) {
      setShotPastItems(false)
      exploreSearchQuery({
        variables: {
          search: String(params.searchtext),
        },
      })
    } else {
      setShotPastItems(true)
    }
  }, [params.searchtext])

  const PastSearchItem = (item: Item) => {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={() => {
          exploreSearchQuery({
            variables: {
              search: item.search,
            },
            onCompleted: () => {
              router.setParams({
                searchtext: item.search,
              })
            },
          })
        }}
        className="px-2">
        <HStack
          space={'md'}
          className="h-[55px] w-[100%] items-center justify-start">
          <Box className="h-[35px] w-[35px] content-center items-center justify-center rounded-md border-2">
            <Ionicons
              name="search"
              size={18}
              color={
                rTheme.colorScheme === 'light'
                  ? rTheme.theme?.gluestack.tokens.colors.light900
                  : rTheme.theme?.gluestack.tokens.colors.light50
              }
            />
          </Box>
          <VStack>
            <Text className="text-md font-medium">{item.search}</Text>
          </VStack>
        </HStack>
      </Pressable>
    )
  }

  if (!params?.searchtext?.length && !loading) {
    return (
      <Box className="flex-1 px-2">
        <FlashList
          data={filteredRecentSearches as Item[]}
          ListHeaderComponent={() => {
            return (
              <>
                {filteredRecentSearches.length ? (
                  <Heading>Recent</Heading>
                ) : (
                  <Heading className="mt-10 text-center">
                    No recent searches
                  </Heading>
                )}
              </>
            )
          }}
          numColumns={1}
          estimatedItemSize={55}
          scrollEnabled={true}
          renderItem={item => <PastSearchItem search={item.item.search} />}
          contentInset={{
            ...contentInsets,
          }}
          automaticallyAdjustsScrollIndicatorInsets
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          ItemSeparatorComponent={() => <View style={{height: 5}} />}
        />
      </Box>
    )
  }

  if (loading) {
    return (
      <FlashList
        data={[...Array(20)]}
        numColumns={1}
        estimatedItemSize={60}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
        contentInset={{
          ...contentInsets,
        }}
        keyboardDismissMode="on-drag"
        automaticallyAdjustKeyboardInsets
        ItemSeparatorComponent={() => <View style={{height: 5}} />}
        renderItem={item => {
          return (
            <HStack space="md" className="h-[60px] flex-1 items-center px-5">
              <Skeleton
                height={50}
                width={50}
                radius={10}
                colorMode={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
                colors={
                  rTheme.colorScheme === 'light'
                    ? [
                        String(rTheme.theme?.gluestack.tokens.colors.light100),
                        String(rTheme.theme?.gluestack.tokens.colors.light300),
                      ]
                    : [
                        String(rTheme.theme?.gluestack.tokens.colors.light800),
                        String(rTheme.theme?.gluestack.tokens.colors.light600),
                      ]
                }
              />
              <VStack space="md">
                <Skeleton
                  colors={
                    rTheme.colorScheme === 'light'
                      ? [
                          String(
                            rTheme.theme?.gluestack.tokens.colors.light100,
                          ),
                          String(
                            rTheme.theme?.gluestack.tokens.colors.light300,
                          ),
                        ]
                      : [
                          String(
                            rTheme.theme?.gluestack.tokens.colors.light800,
                          ),
                          String(
                            rTheme.theme?.gluestack.tokens.colors.light600,
                          ),
                        ]
                  }
                  width={250}
                  height={20}
                />
                <Skeleton
                  colors={
                    rTheme.colorScheme === 'light'
                      ? [
                          String(
                            rTheme.theme?.gluestack.tokens.colors.light100,
                          ),
                          String(
                            rTheme.theme?.gluestack.tokens.colors.light300,
                          ),
                        ]
                      : [
                          String(
                            rTheme.theme?.gluestack.tokens.colors.light800,
                          ),
                          String(
                            rTheme.theme?.gluestack.tokens.colors.light600,
                          ),
                        ]
                  }
                  width={100}
                  height={20}
                />
              </VStack>
            </HStack>
          )
        }}
      />
    )
  }

  return (
    <Box className="flex-1 bg-transparent px-2">
      <FlashList
        scrollEnabled={true}
        estimatedItemSize={40}
        contentInset={{
          ...contentInsets,
        }}
        automaticallyAdjustKeyboardInsets
        automaticallyAdjustContentInsets
        refreshing={loading}
        keyboardDismissMode="on-drag"
        ItemSeparatorComponent={() => <Box className="h-5 bg-transparent" />}
        ListHeaderComponent={() => {
          return (
            <>
              {!data?.exploreSearch?.venues?.length &&
                !data?.exploreSearch?.people?.length && (
                  <Box className="bg-transparent">
                    <Center>
                      <Heading className="text-md font-medium">
                        No search results for
                      </Heading>
                      <Heading className="text-3xl">
                        "{params.searchtext}"
                      </Heading>
                    </Center>
                  </Box>
                )}
            </>
          )
        }}
        data={[
          {title: 'Accounts', data: data?.exploreSearch?.people},
          {title: 'Venues', data: data?.exploreSearch?.venues},
        ]}
        renderItem={({item}) => {
          return (
            <Box className="bg-transparent">
              {item.data && item.data.length ? (
                <Box className="bg-transparent">
                  <Heading className="mx-2 text-lg">{item.title}</Heading>
                  {item.data?.map((item, index) => {
                    return <SearchCard key={index} item={item} />
                  })}
                </Box>
              ) : null}
            </Box>
          )
        }}
      />
    </Box>
  )
}
