import React from 'react'
import {Pressable, ScrollView} from 'react-native'
import {useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {Ionicons} from '@expo/vector-icons'
import PropTypes from 'prop-types'

import {useProfileQuery} from '#/graphql/generated'
import {AuthorizationReactiveVar, ThemeReactiveVar} from '#/reactive'
import {Badge} from '#/src/components/ui/badge'
import {Box} from '#/src/components/ui/box'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'

interface EditableOptionsScreenProps {}

export default ({}: EditableOptionsScreenProps) => {
  const router = useRouter()
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const rIdentifiableInformation =
    rAuthorizationVar?.Profile?.IdentifiableInformation
  const date = new Date(
    rAuthorizationVar?.Profile?.IdentifiableInformation?.birthday,
  ).toLocaleDateString('en-EN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const {loading} = useProfileQuery({
    variables: {
      where: {
        id: {
          equals: rAuthorizationVar?.Profile?.id,
        },
      },
    },
  })

  if (loading) return null

  return (
    <ScrollView
      style={{
        marginVertical: 20,
        marginHorizontal: 10,
      }}
      scrollToOverflowEnabled
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="scrollableAxes">
      <RoundedListItem
        onPress={() => {
          router.push({
            pathname: '/(app)/settings/profilesettings/personal/fullname',
          })
        }}
        title="Full name">
        <Text className="text-xl">{rIdentifiableInformation?.fullname}</Text>
        {rIdentifiableInformation?.nickname && (
          <>
            <Text className="py-2 text-xl">Nick name</Text>
            <Text className="text-xl">{rIdentifiableInformation.nickname}</Text>
          </>
        )}
      </RoundedListItem>
      <RoundedListItem
        onPress={() =>
          router.push({
            pathname: '/(app)/settings/profilesettings/personal/username',
          })
        }
        title="Username">
        <Text className="text-xl">{rIdentifiableInformation?.username}</Text>
      </RoundedListItem>
      <RoundedListItem title="Birthday 🥳">
        <HStack className="w-[100%] items-center justify-between">
          <Text className="text-xl text-light-600">{date}</Text>
          <Ionicons
            name={'lock-closed'}
            color={
              rTheme.colorScheme === 'light'
                ? rTheme.theme?.gluestack.tokens.colors.light400
                : rTheme.theme?.gluestack.tokens.colors.light600
            }
            size={20}
          />
        </HStack>
      </RoundedListItem>
      <RoundedListItem
        onPress={() =>
          router.push({
            pathname: '/(app)/settings/profilesettings/personal/description',
          })
        }
        title="About me">
        <Text numberOfLines={4} ellipsizeMode="tail" className="text-xl">
          {!rAuthorizationVar?.Profile?.DetailInformation?.description
            ? 'Add description'
            : rAuthorizationVar.Profile.DetailInformation.description}
        </Text>
      </RoundedListItem>
      <RoundedListItem
        onPress={() =>
          router.push({
            pathname: '/(app)/settings/profilesettings/personal/interests',
          })
        }
        title={'My interests'}>
        <Box>
          <VStack className="flex-row flex-wrap">
            {rAuthorizationVar?.Profile?.DetailInformation?.Tags.length ? (
              <>
                {rAuthorizationVar?.Profile?.DetailInformation?.Tags.map(
                  item => (
                    <Badge
                      key={item.id}
                      className="m-2 rounded-md bg-primary-500 px-2 py-1">
                      <Text
                        className={` ${rTheme.colorScheme === 'light' ? rTheme.theme?.gluestack.tokens.colors.light100 : rTheme.theme?.gluestack.tokens.colors.light900} text-md font-bold`}>
                        {item.emoji}
                        {item.name}
                      </Text>
                    </Badge>
                  ),
                )}
              </>
            ) : (
              <Box>
                <Text numberOfLines={1} className="text-xl">
                  Select your interests
                </Text>
              </Box>
            )}
          </VStack>
        </Box>
      </RoundedListItem>
      <Heading className="py-2 text-lg">MY BASIC INFO</Heading>
      <RoundedListItem
        onPress={() =>
          router.push({
            pathname: '/(app)/settings/profilesettings/personal/lookingfor',
          })
        }
        title={`I'm looking for a ...`}>
        <Text numberOfLines={1} className="text-xl">
          {rAuthorizationVar?.Profile?.IdentifiableInformation?.lookfor ||
            'Set the vibes your looking for'}
        </Text>
      </RoundedListItem>
      <RoundedListItem
        onPress={() =>
          router.push({
            pathname: '/(app)/settings/profilesettings/personal/relationship',
          })
        }
        title={`Relationship`}>
        <Text className="text-xl">Are you in a relationship</Text>
      </RoundedListItem>
      <RoundedListItem
        onPress={() =>
          router.push({
            pathname: '/(app)/settings/profilesettings/personal/hometown',
          })
        }
        title={`Add your hometown`}>
        <Text className="text-xl">add your hometown</Text>
      </RoundedListItem>
      <RoundedListItem
        onPress={() =>
          router.push({
            pathname: '/(app)/settings/profilesettings/personal/currenttown',
          })
        }
        title={'Add your city'}>
        <Text className="text-xl">Rep your city</Text>
      </RoundedListItem>
    </ScrollView>
  )
}

const RoundedListItem: React.FC<{
  title?: string
  onPress?: () => void
  children?: React.ReactNode
}> = ({children, ...props}) => (
  <Pressable accessibilityRole="button" onPress={props.onPress}>
    <Box className="flex-column my-2 items-start rounded-md px-2 py-3">
      {props.title && <Heading className="text-md pb-3">{props.title}</Heading>}
      {children}
    </Box>
  </Pressable>
)
RoundedListItem.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  children: PropTypes.element,
}
