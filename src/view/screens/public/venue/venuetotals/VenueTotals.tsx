import {useEffect, useState} from 'react'
import {Alert, Platform, Share} from 'react-native'
import {useGlobalSearchParams} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {Ionicons} from '@expo/vector-icons'
import {uniqueId} from 'lodash'

import {useGetLiveVenueTotalsV2Query} from '#/graphql/generated'
import {ThemeReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Button} from '#/src/components/ui/button'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Text} from '#/src/components/ui/text'

type Totals = {
  name: 'friends' | 'total' | 'joined'
  value: number
}

export default function VenueTotals() {
  const params = useGlobalSearchParams()
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const [total, setTotal] = useState<Totals>({name: 'total', value: 0})
  const [friends, _] = useState<Totals>({name: 'friends', value: 0})
  const [joined, setJoined] = useState<Totals>({name: 'joined', value: 0})

  const link = `https://barfriends.com/app/public/venue?profileid=${params.venueProfileId}`

  const onShare = async () => {
    try {
      const result = await Share.share(
        {
          message: 'Barfriends | The nightlife app',
          url: Platform.OS === 'ios' ? link : '',
        },
        {
          dialogTitle: 'Join me on Barfriends',
          subject: 'Invite to Barfriends',
        },
      )
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message)
    }
  }

  const {data: d, loading: l} = useGetLiveVenueTotalsV2Query({
    skip: !String(params.venueProfileId),
    variables: {
      profileIdVenue: String(params.venueProfileId),
    },
    onCompleted: async data => {
      // if (data.getLiveVenueTotalsV2.__typename === 'LiveVenueTotals2') {
      // 	setTotal({
      // 		...total,
      // 		value: data.getLiveVenueTotalsV2.totaled ? data.getLiveVenueTotalsV2.totaled : 0,
      // 	})
      // 	setJoined({
      // 		...joined,
      // 		value: data.getLiveVenueTotalsV2.joined ? data.getLiveVenueTotalsV2.joined : 0,
      // 	})
      // }
    },
  })

  useEffect(() => {
    if (d && d.getLiveVenueTotalsV2?.__typename === 'LiveVenueTotals2') {
      setTotal({
        ...total,
        value: d.getLiveVenueTotalsV2.totaled
          ? d.getLiveVenueTotalsV2.totaled
          : 0,
      })
      setJoined({
        ...joined,
        value: d.getLiveVenueTotalsV2.joined
          ? d.getLiveVenueTotalsV2.joined
          : 0,
      })
    }
  }, [d])

  return (
    <HStack
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
      space="sm"
      className="mx-2">
      {[friends, total, joined].map(item => {
        return (
          <Box
            key={uniqueId()}
            className={` ${item.name !== 'friends' ? 'bg-light-200' : 'bg-primary-500'} ${l ? 'opacity-50' : 'opacity-100'} ${item.name !== 'friends' ? 'dark:bg-light-800' : 'dark:bg-primary-500'} ${l ? 'dark:opacity-50' : 'dark:opacity-100'} flex-1 items-center justify-around rounded-xl p-1`}>
            <Heading
              numberOfLines={1}
              className={` ${item.name === 'friends' ? 'text-white' : 'text-black'} ${item.name === 'friends' ? 'dark:text-white' : 'dark:text-white'} leading-xl tracking-0.01 text-2xl font-black`}>
              {item.value}
            </Heading>
            <Text
              className={`uppercase ${item.name === 'friends' ? 'text-white' : 'text-black'} ${item.name === 'friends' ? 'dark:text-white' : 'dark:text-white'} leading-xs text-xs font-black`}>
              {item.name}
            </Text>
          </Box>
        )
      })}
      <Button
        onPress={onShare}
        variant={'solid'}
        size={'lg'}
        className="h-full self-center bg-transparent">
        <Ionicons
          name={'share'}
          size={23}
          color={
            rTheme.colorScheme === 'light'
              ? rTheme.theme?.gluestack.tokens.colors.light900
              : rTheme.theme?.gluestack.tokens.colors.light100
          }
        />
      </Button>
    </HStack>
  )
}
