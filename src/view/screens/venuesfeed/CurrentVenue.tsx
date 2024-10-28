import {useState} from 'react'
import {Image} from 'react-native'
import {StyleSheet} from 'react-native'
import {Blurhash} from 'react-native-blurhash'
import {useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {Ionicons} from '@expo/vector-icons'

import {usePublicVenueQuery} from '#/graphql/generated'
import {AuthorizationReactiveVar, ThemeReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Button, ButtonGroup} from '#/src/components/ui/button'
import {Divider} from '#/src/components/ui/divider'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Pressable} from '#/src/components/ui/pressable'
import {Text} from '#/src/components/ui/text'
import {useDisclose} from '#/src/util/hooks/useDisclose'

export default function CurrentVenue() {
  const router = useRouter()
  const [hideBlur, setHideBlur] = useState(false)
  const {isOpen, onToggle} = useDisclose()
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
  const rThemeVar = useReactiveVar(ThemeReactiveVar)

  const getTitleCase = (str: string) => {
    const titleCase = str
      .toLowerCase()
      .split(' ')
      .map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1)
      })
      .join(' ')

    return titleCase
  }

  const {data, loading} = usePublicVenueQuery({
    skip: !rAuthorizationVar?.Profile?.Personal?.LiveOutPersonal?.Out[0]
      ?.venueProfileId,
    fetchPolicy: 'cache-only',
    variables: {
      where: {
        id: {
          equals:
            rAuthorizationVar?.Profile?.Personal?.LiveOutPersonal?.Out[0]
              ?.venueProfileId,
        },
      },
    },
  })

  if (loading || !data) return null

  function leaveVenue() {
    onToggle()
  }

  return (
    <Box className="mx-2 my-3 h-[220px] rounded-md bg-white">
      <Pressable
        accessibilityRole="button"
        onPress={() => {
          router.push({
            pathname: `/(app)/public/venue/[username]`,
            params: {
              username:
                data.publicVenue?.Venue?.IdentifiableInformation?.username,
              latitude: Number(
                data.publicVenue?.Venue?.Location?.Geometry?.latitude,
              ),
              longitude: Number(
                data.publicVenue?.Venue?.Location?.Geometry?.longitude,
              ),
            },
          })
        }}>
        <Box
          style={{
            // backgroundColor: themeContext.palette.secondary.background.default,
            justifyContent: 'flex-end',
            overflow: 'hidden',
          }}
          className="h-[220px] rounded-md">
          {!loading ? (
            <Image
              accessibilityIgnoresInvertColors
              source={{uri: data.publicVenue?.photos[0]?.url}}
              resizeMode="cover"
              onLoadEnd={() => setHideBlur(true)}
              style={{
                ...StyleSheet.absoluteFillObject,
                width: undefined,
                height: undefined,
              }}
            />
          ) : null}
          {!hideBlur && (
            <Blurhash
              blurhash={String(data.publicVenue?.photos[0]?.blurhash)}
              style={{
                flex: 1,
              }}
            />
          )}

          <HStack className="h-[75px] bg-light-100 p-2 dark:bg-light-800">
            <Box className="flex-1 self-center bg-transparent">
              <Heading
                numberOfLines={2}
                ellipsizeMode="tail"
                className="self-start text-left text-sm font-medium">
                {getTitleCase(data.publicVenue?.Venue?.name)}
              </Heading>
            </Box>
            <Box className="content-center justify-center px-2">
              <ButtonGroup className="rounded-md">
                <Button
                  onPress={!isOpen ? () => onToggle() : () => leaveVenue()}
                  className="rounded-lg bg-light-100 dark:bg-light-800">
                  <Ionicons name={'exit'} size={30} />

                  <Text className="text-error-500">
                    {isOpen ? `Leave` : ''}
                  </Text>
                </Button>
                {isOpen && <Divider orientation="vertical" />}
                {isOpen && (
                  <>
                    <Ionicons
                      size={25}
                      name={'close'}
                      color={
                        rThemeVar.colorScheme === 'light'
                          ? rThemeVar.theme?.gluestack.tokens.colors.light900
                          : rThemeVar.theme?.gluestack.tokens.colors.light100
                      }
                    />
                    <Button
                      onPress={onToggle}
                      className="self-center rounded-lg bg-light-200 dark:bg-light-700"
                    />
                  </>
                )}
              </ButtonGroup>
            </Box>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  )
}
