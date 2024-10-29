import {View} from 'react-native'
import {useGlobalSearchParams} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {FlashList} from '@shopify/flash-list'
import {Skeleton} from 'moti/skeleton'

import {useExploreSearchQuery} from '#/graphql/generated'
import {ThemeReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Center} from '#/src/components/ui/center'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {VStack} from '#/src/components/ui/vstack'
import SearchCard from '../components/SearchCard'

export default function SearchAccounts() {
  const params = useGlobalSearchParams()
  const rTheme = useReactiveVar(ThemeReactiveVar)

  const {data, loading: ESLoading} = useExploreSearchQuery({
    fetchPolicy: 'cache-first',
    variables: {
      search: String(params.searchtext),
    },
  })

  const SkeletonLoader = () => {
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
                  String(rTheme.theme?.gluestack.tokens.colors.light900),
                  String(rTheme.theme?.gluestack.tokens.colors.light700),
                ]
          }
        />
        <VStack space="md">
          <Skeleton
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
            width={250}
            height={20}
          />
          <Skeleton
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
            width={100}
            height={20}
          />
        </VStack>
      </HStack>
    )
  }

  if (ESLoading) {
    return (
      <FlashList
        numColumns={1}
        estimatedItemSize={65}
        data={[...Array(15)]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={SkeletonLoader}
        ItemSeparatorComponent={() => <View style={{height: 5}} />}
      />
    )
  }

  if (!data?.exploreSearch?.people?.length) {
    return (
      <Box className="mt-28">
        <Center>
          <Heading className="text-md font-medium">
            No search results for
          </Heading>
          <Heading className="text-3xl">"{params.searchtext}"</Heading>
        </Center>
      </Box>
    )
  }

  return (
    <Box style={{flex: 1}} className="bg-transparent">
      <FlashList
        data={data?.exploreSearch.people}
        estimatedItemSize={55}
        keyExtractor={({id}: {id: string}) => id.toString()}
        renderItem={({item}) => {
          return <SearchCard item={item} />
        }}
      />
    </Box>
  )
}
