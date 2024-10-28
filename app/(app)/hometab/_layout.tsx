import {useEffect} from 'react'
import {StyleSheet} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {BlurView} from 'expo-blur'
import * as Haptics from 'expo-haptics'
import {Tabs, useRouter, useSegments} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {MaterialIcons} from '@expo/vector-icons'

import {TermsServiceReactiveVar, ThemeReactiveVar} from '#/reactive'
import DevelopmentTab from '#/src/components/molecules/hometabicons/developmenttab'
import MessageTab from '#/src/components/molecules/hometabicons/messagestab'
import ProfileTab from '#/src/components/molecules/hometabicons/profiletab'
import TonightTab from '#/src/components/molecules/hometabicons/tonighttab'
import VenueFeedTab from '#/src/components/molecules/hometabicons/venuefeedtab'
import SearchInputVenueFeedDisabled from '#/src/components/molecules/searchinput/SearchInputVenueFeedDisabled'
import {Button, ButtonText} from '#/src/components/ui/button'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Pressable} from '#/src/components/ui/pressable'
import {VStack} from '#/src/components/ui/vstack'
import {
  HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
  HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
} from '#/src/constants/ReactNavigationConstants'
import {ITabColor} from '#/types/app'

export default function HomeTab() {
  const showDev = true
  const segments: string[] = useSegments()
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const rTermsServiceVar = useReactiveVar(TermsServiceReactiveVar)
  const onLongPressProfileIcon = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    router.push({
      pathname: '/(app)/modal/devicemanager/deviceprofilemanager',
    })
  }
  useEffect(() => {
    if (rTermsServiceVar.update) {
      router.push({
        pathname: '/(information)/updatelatestprivacytermsservice',
      })
    }
  }, [rTermsServiceVar.update, router])

  return (
    <Tabs
      initialRouteName="venuefeed"
      screenOptions={{
        tabBarBackground: () => (
          <BlurView
            tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
            intensity={70}
            style={[StyleSheet.absoluteFill]}
          />
        ),
        tabBarActiveTintColor:
          rTheme.colorScheme === 'light'
            ? 'black'
            : rTheme.theme.reactnavigation.colors.primary,
        tabBarStyle: {
          height:
            insets.bottom !== 0
              ? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
              : HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
          position: 'absolute',
          alignItems: 'center',
          elevation: 0, // for Android
          borderTopWidth: 0,
        },
        headerShown: true,
        headerTransparent: true,
        tabBarShowLabel: false,
        header: () => {
          return (
            <BlurView
              style={{
                paddingTop: insets.top,
                backgroundColor:
                  segments.includes('tonight') || segments.includes('emojimood')
                    ? 'transparent'
                    : rTheme.colorScheme === 'light'
                      ? rTheme.theme?.gluestack.tokens.colors.light100
                      : rTheme.theme?.gluestack.tokens.colors.light900,
              }}
              intensity={70}
              tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}>
              <VStack className="justify-start">
                <SearchInputVenueFeedDisabled placeholder="Explore" />
              </VStack>
            </BlurView>
          )
        },
      }}>
      <Tabs.Screen
        name="venuefeed"
        options={{
          // headerShown: false,
          href: '/(app)/hometab/venuefeed',
          tabBarLabel: 'outaboot',
          tabBarShowLabel: false,
          tabBarIcon: ({color, focused}: ITabColor) => (
            <VenueFeedTab color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name={'tonight'}
        options={{
          href: '/(app)/hometab/tonight',
          // headerShown: false,
          tabBarLabel: 'tonight',
          tabBarIcon: ({color, focused}: ITabColor) => (
            <TonightTab color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="conversations"
        options={{
          tabBarLabel: 'conversations',
          tabBarShowLabel: false,
          tabBarIcon: ({color, focused}: ITabColor) => {
            return <MessageTab color={color} focused={focused} />
          },
          headerTransparent: true,
          header: () => {
            return (
              <BlurView
                style={{
                  paddingTop: insets.top,
                  backgroundColor: segments.includes('tonight')
                    ? 'transparent'
                    : rTheme.colorScheme === 'light'
                      ? rTheme.theme?.gluestack.tokens.colors.light100
                      : rTheme.theme?.gluestack.tokens.colors.light900,
                }}
                intensity={70}
                tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}>
                <HStack className="flex-1 items-center justify-between px-4 pb-2">
                  <Button variant="link">
                    <ButtonText className="text-lg">Edit</ButtonText>
                  </Button>
                  <Heading>Messages</Heading>
                  <Pressable
                    accessibilityRole="button"
                    hitSlop={25}
                    onPress={() => {
                      router.push({
                        pathname: '/(app)/newconversation',
                      })
                    }}>
                    <MaterialIcons
                      name="add-box"
                      size={25}
                      color={
                        rTheme.colorScheme === 'light'
                          ? rTheme.theme?.gluestack.tokens.colors.light900
                          : rTheme.theme?.gluestack.tokens.colors.light100
                      }
                    />
                  </Pressable>
                </HStack>
              </BlurView>
            )
          },
        }}
      />
      <Tabs.Screen
        name="profilestack"
        options={{
          headerShown: false,
          tabBarLabel: 'profile',
          tabBarShowLabel: false,
          tabBarIcon: ({color, focused}: ITabColor) => (
            <Pressable
              accessibilityRole="button"
              onPress={() =>
                router.push({
                  pathname: '/(app)/hometab/profilestack',
                })
              }
              onLongPress={onLongPressProfileIcon}>
              <ProfileTab color={color} focused={focused} />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="developmentstack"
        options={{
          href:
            showDev && process.env.EXPO_PUBLIC_NODE_ENV === 'development'
              ? '/(app)/hometab/developmentstack'
              : null,
          headerShown: false,
          tabBarLabel: 'development',
          tabBarShowLabel: false,
          tabBarIcon: ({color, focused}: ITabColor) => (
            <DevelopmentTab color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  )
}
