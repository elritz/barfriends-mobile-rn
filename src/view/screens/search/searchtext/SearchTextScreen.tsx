import {useEffect} from 'react'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useLocalSearchParams, useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {Ionicons} from '@expo/vector-icons'
import {FlashList} from '@shopify/flash-list'
import {Skeleton} from 'moti/skeleton'

import {useExploreSearchLazyQuery} from '#/graphql/generated'
import {AuthorizationReactiveVar, ThemeReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Button} from '#/src/components/ui/button'
import {Center} from '#/src/components/ui/center'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Pressable} from '#/src/components/ui/pressable'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'
import {
  HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
  HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
} from '#/src/constants/ReactNavigationConstants'
import SearchCard from '#/src/view/screens/search/components/SearchCard'

type HItem = {
  search: string
}

const SearchTextScreen = () => {
  const params = useLocalSearchParams()
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
  const rTheme = useReactiveVar(ThemeReactiveVar)

  const [exploreSearchQuery, {data, loading}] = useExploreSearchLazyQuery()

  useEffect(() => {
    if (params.searchtext?.length) {
      exploreSearchQuery({
        variables: {
          search: String(params.searchtext),
        },
      })
    }
  }, [params.searchtext, exploreSearchQuery])

  function getUniqueListBy(arr: any[], key: string) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
  }

  const filteredRecentSearches = getUniqueListBy(
    rAuthorizationVar?.Profile?.resentSearches?.searches || [],
    'search',
  )

  if (loading) {
    return (
      <Box className="bg-transparent px-3">
        <FlashList
          scrollEnabled={false}
          automaticallyAdjustContentInsets
          automaticallyAdjustKeyboardInsets
          automaticallyAdjustsScrollIndicatorInsets
          contentInsetAdjustmentBehavior="automatic"
          keyboardDismissMode="on-drag"
          data={[...Array(20)]}
          ListHeaderComponent={() => {
            return (
              <>
                {!data?.exploreSearch?.venues?.length &&
                  !data?.exploreSearch?.people?.length && (
                    // <Box mt={insets.top}>
                    <Center>
                      <Heading className="text-md font-medium">
                        No search results for
                      </Heading>
                      <Heading className="text-3xl">
                        "{params.searchtext}"
                      </Heading>
                    </Center>
                    // </Box>
                  )}
              </>
            )
          }}
          estimatedItemSize={80}
          keyExtractor={(item, index) => {
            return (`key` + item).toString()
          }}
          contentInset={{
            top: insets.top + 10,
            bottom:
              insets.bottom !== 0
                ? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
                : HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
          }}
          renderItem={() => {
            return (
              <HStack className="h-[60px] w-[90%] px-2">
                <Skeleton
                  height={40}
                  width={40}
                  radius={15}
                  colorMode={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
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
                            rTheme.theme?.gluestack.tokens.colors.light900,
                          ),
                          String(
                            rTheme.theme?.gluestack.tokens.colors.light700,
                          ),
                        ]
                  }
                />
                <VStack className="px-2">
                  <Skeleton
                    height={40}
                    width={'100%'}
                    radius={15}
                    colorMode={
                      rTheme.colorScheme === 'light' ? 'light' : 'dark'
                    }
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
                              rTheme.theme?.gluestack.tokens.colors.light900,
                            ),
                            String(
                              rTheme.theme?.gluestack.tokens.colors.light700,
                            ),
                          ]
                    }
                  />
                  <Skeleton
                    height={40}
                    width={'100%'}
                    radius={15}
                    colorMode={
                      rTheme.colorScheme === 'light' ? 'light' : 'dark'
                    }
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
                              rTheme.theme?.gluestack.tokens.colors.light900,
                            ),
                            String(
                              rTheme.theme?.gluestack.tokens.colors.light700,
                            ),
                          ]
                    }
                  />
                </VStack>
              </HStack>
            )
          }}
        />
      </Box>
    )
  }

  if (!params?.searchtext?.length) {
    return (
      <FlashList
        scrollEnabled={true}
        automaticallyAdjustContentInsets
        automaticallyAdjustsScrollIndicatorInsets
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode="on-drag"
        data={filteredRecentSearches as HItem[]}
        ListHeaderComponent={() => {
          return (
            <>
              {!data?.exploreSearch?.venues?.length &&
                !data?.exploreSearch?.people?.length && (
                  // <Box mt={insets.top}>
                  <Center>
                    <Heading className="text-md font-medium">
                      No search results for
                    </Heading>
                    <Heading className="text-3xl">
                      "{params.searchtext}"
                    </Heading>
                  </Center>
                  // </Box>
                )}
            </>
          )
        }}
        estimatedItemSize={80}
        keyExtractor={item => {
          return (`key` + item).toString()
        }}
        contentInset={{
          top: insets.top + 10,
          bottom:
            insets.bottom !== 0
              ? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
              : HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
        }}
        automaticallyAdjustKeyboardInsets
        renderItem={({item}) => {
          return (
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                router.setParams({
                  searchtext: item.search,
                })
              }}>
              <HStack
                space={'md'}
                className="h-[55px] w-[100%] items-center justify-start px-2">
                <Button size="sm" variant="outline" className="rounded-md">
                  <Ionicons name={'search'} size={30} />
                </Button>
                <VStack>
                  <Text className="text-md font-medium">{item.search}</Text>
                </VStack>
              </HStack>
            </Pressable>
          )
        }}
      />
    )
  }

  return (
    <Box className={` mt-${insets.top} flex-1`}>
      <FlashList
        data={[
          {title: 'Accounts', data: data?.exploreSearch?.people},
          {title: 'Venues', data: data?.exploreSearch?.venues},
        ]}
        ListHeaderComponent={() => {
          return (
            <>
              {!data?.exploreSearch?.venues?.length &&
                !data?.exploreSearch?.people?.length && (
                  // <Box mt={insets.top}>
                  <Center>
                    <Heading className="text-md font-medium">
                      No search results for
                    </Heading>
                    <Heading className="text-3xl">
                      "{params.searchtext}"
                    </Heading>
                  </Center>
                  // </Box>
                )}
            </>
          )
        }}
        estimatedItemSize={80}
        keyExtractor={item => {
          return (`key` + item.title).toString()
        }}
        contentInset={{
          top: insets.top,
          bottom:
            insets.bottom !== 0
              ? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
              : HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
        }}
        automaticallyAdjustKeyboardInsets
        automaticallyAdjustContentInsets
        keyboardDismissMode="on-drag"
        renderItem={({item}) => {
          return (
            <Box className="bg-transparent">
              {item.data && item.data.length ? (
                <Box className="my-1">
                  <Heading className="mx-3">{item.title}</Heading>
                  {item.data.map((SrearchItem, index) => {
                    return <SearchCard key={index} item={SrearchItem} />
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

export default SearchTextScreen
