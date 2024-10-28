import React, {useEffect} from 'react'
import {Pressable, SectionList, Text, View} from 'react-native'
import * as Clipboard from 'expo-clipboard'
import {Feather} from '@expo/vector-icons'
import {uniqueId} from 'lodash'

import {useRefreshDeviceManagerLazyQuery} from '#/graphql/generated'
import {Box} from '#/src/components/ui/box'
import {Divider} from '#/src/components/ui/divider'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {VStack} from '#/src/components/ui/vstack'
import {Color} from '#/src/util/helpers/color'

type MappedData = {
  key: string
  value: any
}

type Section = {
  title: string
  data: MappedData[]
  color: {
    color: string
    isDark: boolean
  }
}
const Account: React.FC = () => {
  const [sections, setSections] = React.useState<Section[]>([])

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    const isDark = Color.isDark(color)
    return {
      color,
      isDark,
    }
  }

  const mapData = (data): Section => {
    const {__typename: title, ...rest} = data
    const color = generateRandomColor()

    const mappedData = Object.entries(rest)
      .filter(([, value]) => typeof value !== 'object')
      .map(([key, value]) => ({key, value}))

    return {
      title,
      data: mappedData,
      color,
    }
  }

  const [refreshDeviceManagerQuery, {data, loading}] =
    useRefreshDeviceManagerLazyQuery({
      fetchPolicy: 'network-only',
      onCompleted: data => {
        if (
          data?.refreshDeviceManager?.__typename ===
          'AuthorizationDeviceProfile'
        ) {
          const sections: Section[] = []

          if (data.refreshDeviceManager?.Profile) {
            const profileDatail = mapData(data.refreshDeviceManager.Profile)
            sections.push(profileDatail)
          }
          if (data.refreshDeviceManager.Profile?.DetailInformation) {
            const detailDatail = mapData(
              data.refreshDeviceManager.Profile?.DetailInformation,
            )
            sections.push(detailDatail)
          }
          if (data.refreshDeviceManager.Profile?.IdentifiableInformation) {
            const identifiableData = mapData(
              data.refreshDeviceManager.Profile?.IdentifiableInformation,
            )
            sections.push(identifiableData)
          }
          if (data.refreshDeviceManager.Profile?.Personal) {
            const personalData = mapData(
              data.refreshDeviceManager.Profile?.Personal,
            )
            sections.push(personalData)
          }

          setSections(sections)
        }
      },
    })

  useEffect(() => {
    refreshDeviceManagerQuery()
  }, [])

  if (!data || loading) {
    return (
      <Box className="flex-1">
        <Heading>No Account</Heading>
      </Box>
    )
  }

  return (
    <Box className="flex-1">
      <SectionList
        onRefresh={refreshDeviceManagerQuery}
        refreshing={loading}
        sections={sections}
        keyExtractor={(item, index) => item.key + index + uniqueId()}
        contentInset={{bottom: 100}}
        ItemSeparatorComponent={() => <Divider />}
        renderSectionHeader={({section: {title, color}}) => {
          return (
            <Box
              style={{backgroundColor: color.color}}
              className="justify-center p-3 bg-light-200 dark:bg-black">
              <Heading
                style={{
                  color: color.isDark ? 'white' : 'black',
                }}
                className="mt-4 font-black text-4xl">
                {title}
              </Heading>
            </Box>
          )
        }}
        renderItem={({item, index, section}) => {
          if (!item.value) {
            return null
          }
          return (
            <Pressable
              accessibilityRole="button"
              style={{backgroundColor: section.color.color}}
              onPress={async () => {
                await Clipboard.setStringAsync(String(item.value))
              }}
              className="px-4">
              <HStack className=" py-4 flex-1">
                <VStack className="flex-1">
                  <Text
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                    style={{
                      color: section.color.isDark ? 'white' : 'black',
                    }}
                    className="underline text-xl max-w-[90%] flex-1 font-bold">
                    {item.key}
                  </Text>
                  <Text
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                    style={{
                      color: section.color.isDark ? 'white' : 'black',
                    }}
                    className="text-lg max-w-[90%] flex-1 font-semibold">
                    {item.value}
                  </Text>
                </VStack>
                <View style={{marginHorizontal: 2}}>
                  <Feather
                    color={section.color.isDark ? 'white' : 'black'}
                    size={25}
                    name="copy"
                  />
                </View>
              </HStack>
            </Pressable>
          )
        }}
      />
    </Box>
  )
}

export default Account
