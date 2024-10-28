import {useState} from 'react'
import React from 'react'
import {Image} from 'react-native'
import * as Haptics from 'expo-haptics'
import {useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'

import CompanyCoasterLogoDynamic from '#/assets/images/company/CompanyCoasterLogoDynamic'
import CompanyCoasterLogoDynamicInverse from '#/assets/images/company/CompanyCoasterLogoDynamicInverse'
import CompanyCoasterLogoDynamicOutline from '#/assets/images/company/CompanyCoasterLogoDynamicOutline'
import {AuthorizationReactiveVar, ThemeReactiveVar} from '#/reactive'
import TabBarIcon, {TabProps} from '#/src/components/atoms/TabBarIcon'
import {Box} from '#/src/components/ui/box'

const HEIGHT = 22

const ProfileTab = (props: TabProps) => {
  const router = useRouter()
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

  // const {
  // 	data: GNData,
  // 	loading: GNLoading,
  // 	error,
  // } = useGetNotificationsQuery({
  // 	fetchPolicy: 'network-only',
  // 	onCompleted: data => {
  // 		if (data.getNotifications?.friendRequestNotifications?.length) {
  // 			const filterSentNotifications = data.getNotifications?.friendRequestNotifications.filter(
  // 				item => {
  // 					if (item?.receiverProfileId === rAuthorizationVar?.Profile?.id) {
  // 						return item
  // 					}
  // 				},
  // 			)
  // 			setNumNotifications(numNotification + filterSentNotifications.length)
  // 		}
  // 	},
  // })

  const onLongPressProfileIcon = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    router.push({
      pathname: '/(app)/modal/devicemanager/deviceprofilemanager',
    })
  }

  if (
    !rAuthorizationVar ||
    rAuthorizationVar?.Profile?.ProfileType === 'GUEST'
  ) {
    return (
      <>
        <TabBarIcon
          icon={
            props.focused ? (
              <CompanyCoasterLogoDynamic
                width={HEIGHT}
                height={HEIGHT}
                iconColor={rTheme.colorScheme === 'dark' ? 'black' : 'white'}
                backgroundColor={props.color}
              />
            ) : (
              <CompanyCoasterLogoDynamicOutline
                width={HEIGHT}
                height={HEIGHT}
                backgroundColor={
                  !props.focused
                    ? rTheme.colorScheme === 'dark'
                      ? 'white'
                      : 'black'
                    : props.color
                }
              />
            )
          }
        />
        {
          <Box
            className={` ${false ? 'bg-red-500' : 'bg-transparent'} h-[4.25px] w-[4.25px] rounded-full`}
          />
        }
      </>
    )
  }

  return (
    <>
      <TabBarIcon
        onPress={() => {
          router.navigate({
            pathname: '/(app)/hometab/profilestack/personalprofile',
          })
        }}
        onLongPress={() => onLongPressProfileIcon()}
        icon={
          <>
            {rAuthorizationVar?.Profile?.photos?.length ? (
              <Image
                source={{uri: rAuthorizationVar.Profile.photos[0].url}}
                style={{
                  width: HEIGHT,
                  height: HEIGHT,
                  borderRadius: 4,
                  borderColor: props.color,
                  borderWidth: 1.5,
                }}
              />
            ) : (
              <>
                {!props.focused ? (
                  <CompanyCoasterLogoDynamicOutline
                    width={HEIGHT}
                    height={HEIGHT}
                    backgroundColor={
                      rTheme.colorScheme === 'dark' ? 'white' : 'black'
                    }
                  />
                ) : (
                  <CompanyCoasterLogoDynamicInverse
                    width={HEIGHT}
                    height={HEIGHT}
                    backgroundColor={props.color}
                  />
                )}
              </>
            )}
          </>
        }
      />
      {
        <Box
          className={` ${false ? 'bg-red-500' : 'bg-transparent'} h-[4.25px] w-[4.25px] rounded-full`}
        />
      }
    </>
  )
}

export default ProfileTab
