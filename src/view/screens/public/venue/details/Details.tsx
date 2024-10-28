import {useState} from 'react'
import * as Clipboard from 'expo-clipboard'
import {useLocalSearchParams} from 'expo-router'
import {useReactiveVar} from '@apollo/client'

import {usePublicVenueQuery} from '#/graphql/generated'
import {SearchAreaReactiveVar} from '#/reactive'
import {Badge, BadgeText} from '#/src/components/ui/badge'
import {Box} from '#/src/components/ui/box'
import {HStack} from '#/src/components/ui/hstack'
import {CopyIcon, Icon} from '#/src/components/ui/icon'
import {Pressable} from '#/src/components/ui/pressable'
import {Text} from '#/src/components/ui/text'
import {Toast, ToastTitle, useToast} from '#/src/components/ui/toast'
import {VStack} from '#/src/components/ui/vstack'

type DetailTitleProps = {
  title: string
}

const DetailTitle = (props: DetailTitleProps) => {
  return <Text className="text-md py-2 font-extrabold">{props.title}</Text>
}

export default function Details() {
  const params = useLocalSearchParams()
  const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
  const toast = useToast()
  const [toastId, setToastId] = useState('0')
  const handleToast = () => {
    if (!toast.isActive(toastId)) {
      showNewToast()
    }
  }
  const showNewToast = () => {
    const newId = Math.random().toString()
    setToastId(newId)
    toast.show({
      id: newId,
      placement: 'bottom',
      duration: 3000,
      render: ({id}) => {
        const uniqueToastId = 'toast-' + id
        return (
          <Toast nativeID={uniqueToastId} action="muted" variant="outline">
            <ToastTitle>Copied</ToastTitle>
            {/* <ToastDescription></ToastDescription> */}
          </Toast>
        )
      },
    })
  }

  const currentLocationCoords = rSearchAreaVar.useCurrentLocation
    ? {
        currentLocationCoords: {
          latitude: Number(rSearchAreaVar.searchArea.coords.latitude),
          longitude: Number(rSearchAreaVar.searchArea.coords.longitude),
        },
      }
    : null

  const {data, loading} = usePublicVenueQuery({
    skip: !params.username,
    fetchPolicy: 'cache-first',
    variables: {
      where: {
        IdentifiableInformation: {
          username: {
            equals: String(params.username),
          },
        },
      },
      ...currentLocationCoords,
    },
  })

  if (loading || !data) {
    return null
  }

  return (
    <Box className="mx-2 mt-5 flex-1 rounded-md bg-light-50 px-2 py-4 dark:bg-light-800">
      <VStack space={'lg'} className="flex-1">
        <Box className="bg-transparent">
          <DetailTitle title={'Address'} />
          <Pressable
            accessibilityRole="button"
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={async () => {
              handleToast()
              await Clipboard.setStringAsync(
                String(
                  data?.publicVenue?.Venue?.Location?.Address?.formattedAddress,
                ),
              )
            }}>
            <Text className="text-xl font-medium">
              {data?.publicVenue?.Venue?.Location?.Address?.formattedAddress}
            </Text>
            <Icon as={CopyIcon} className="m-2 h-4 w-4 text-typography-500" />
          </Pressable>
        </Box>
        <Box className="bg-transparent">
          <DetailTitle title={'Website'} />
          <Pressable
            accessibilityRole="button"
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={async () => {
              handleToast()
              await Clipboard.setStringAsync(String('www.addthistothedata.com'))
            }}>
            <Text className="text-xl font-medium">
              www.addthistothedata.com
            </Text>
            <Icon as={CopyIcon} className="m-2 h-4 w-4 text-typography-500" />
          </Pressable>
        </Box>
        <Box className="bg-transparent">
          <DetailTitle title={'Type'} />
          <HStack space="xs" className="flex-wrap py-2">
            {data.publicVenue?.DetailInformation?.Tags.map(item => {
              return (
                <Badge
                  key={item.id}
                  size="lg"
                  variant="solid"
                  className="my-1 rounded-md bg-light-200 p-2 px-2 dark:bg-black">
                  <BadgeText className="text-md capitalize text-black dark:text-white">
                    {`${item.emoji}`}&nbsp;{`${item.name}`}
                  </BadgeText>
                </Badge>
              )
            })}
          </HStack>
        </Box>
        <Box className="bg-transparent">
          <DetailTitle title={'Capacity'} />
          <Text className="leading-lg text-2xl font-medium">
            {data?.publicVenue?.DetailInformation?.capacity}
          </Text>
        </Box>
        <Box className="flex-1 bg-transparent">
          <DetailTitle title={'Description'} />
          {data?.publicVenue?.DetailInformation?.description ? (
            <Box className="bg-transparent">
              <Text className="text-lg">
                {data.publicVenue.DetailInformation?.description}
              </Text>
            </Box>
          ) : (
            <Box className="bg-transparent">
              <Text className="text-lg">No description available</Text>
            </Box>
          )}
        </Box>
      </VStack>
    </Box>
  )
}
