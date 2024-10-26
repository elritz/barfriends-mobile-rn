import {Text} from '#/src/components/ui/text'
import {Pressable} from '#/src/components/ui/pressable'
import {Heading} from '#/src/components/ui/heading'
import {Center} from '#/src/components/ui/center'
import {Button, ButtonText} from '#/src/components/ui/button'
import {Box} from '#/src/components/ui/box'
// TODO: Add a way to remove photos from tonights story
import {useReactiveVar} from '@apollo/client'
import {MaterialIcons} from '@expo/vector-icons'
import {
  PhotoCreateManyProfileInput,
  useAddStoryPhotosMutation,
  useRefreshDeviceManagerQuery,
} from '#/graphql/generated'
import {AuthorizationReactiveVar, ThemeReactiveVar} from '#/reactive'
import useCloudinaryImageUploading from '#/src/util/uploading/useCloudinaryImageUploading'
import {BlurView} from 'expo-blur'
import * as ImagePicker from 'expo-image-picker'
import {useCallback, useState} from 'react'
import {Image} from 'react-native'
import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native'
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated'
import useEmojimoodTextColor from '#/hooks/useEmojiMoodTextContrast'
import {useFormContext} from 'react-hook-form'
import {FormType} from '#/app/(app)/modal/_layout'

const size = 70

const Photos: React.FC<ActivityCardProps> = ({isEmojimoodDynamic = false}) => {
  const [isLoading, setLoading] = useState(false)
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const {width} = useWindowDimensions()
  const scrollRef = useAnimatedRef<ScrollView>()
  const translateX = useSharedValue(0)
  const containerHeight = 400
  const margin = 12
  const DOT_SIZE = 8
  const ITEM_WIDTH = width - margin * 2
  const textColor = useEmojimoodTextColor({
    isEmojimoodDynamic: isEmojimoodDynamic,
  })

  //! don't move this from here
  const activeIndex = useDerivedValue(() => {
    return Math.round(translateX.value / ITEM_WIDTH)
  })

  const [addPhotosMutation, {data, loading, error}] =
    useAddStoryPhotosMutation()

  const {
    data: rdmData,
    loading: rdmLoading,
    error: rdmError,
  } = useRefreshDeviceManagerQuery()

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    setTimeout(() => {
      setLoading(true)
    }, 1500)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      presentationStyle: ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
      selectionLimit: 4,
      aspect: [4, 3],
      allowsMultipleSelection: true,
      quality: 1,
    })

    if (result.assets) {
      const resultSettled = await Promise.allSettled(
        result.assets.map(async item => {
          const data = await useCloudinaryImageUploading(item.uri)
          return data.secure_url
        }),
      )

      const images: PhotoCreateManyProfileInput[] = resultSettled.map(
        (item, index) => {
          if (item.status === 'fulfilled' && item.value) {
            return {url: item.value}
          }
        },
      )

      addPhotosMutation({
        variables: {
          photos: {
            data: [...images],
          },
        },
      })
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      translateX.value = event.contentOffset.x
    },
  })

  const onPressScroll = useCallback(side => {
    if (side === 'left') {
      if (activeIndex.value === 0) return
      scrollRef.current?.scrollTo({
        x: ITEM_WIDTH * (activeIndex.value - 1),
        animated: false,
      })
    }
    if (side == 'right') {
      if (rAuthorizationVar?.Profile?.tonightStory?.photos) {
        if (
          activeIndex.value ===
          rAuthorizationVar?.Profile?.tonightStory?.photos?.length - 1
        ) {
          scrollRef.current?.scrollTo({x: ITEM_WIDTH * 0, animated: false})
          return
        }
        scrollRef.current?.scrollTo({
          x: ITEM_WIDTH * (activeIndex.value + 1),
          animated: false,
        })
      }
    }
  }, [])

  const styles = StyleSheet.create({
    dotLg: {
      position: 'absolute',
      left: -39,
      top: -10,
      height: size + 10,
      width: size + 10,
      borderRadius: size + 10 / 2,
      backgroundColor: rTheme.theme?.gluestack.tokens.colors.primary400,
    },
    dotMd: {
      top: 10,
      left: -55,
      position: 'absolute',
      height: size - 15,
      width: size - 15,
      borderRadius: size / 2,
      backgroundColor: rTheme.theme?.gluestack.tokens.colors.tertiary400,
    },
    dotSm: {
      top: 20,
      left: 20,
      position: 'absolute',
      height: size - 25,
      width: size - 25,
      borderRadius: size / 2,
      backgroundColor: rTheme.theme?.gluestack.tokens.colors.secondary700,
      zIndex: 3,
    },
  })

  return (
    <Box className="mx-2 bg-transparent">
      {rAuthorizationVar?.Profile?.tonightStory?.photos?.length ? (
        <Box className={` h-${containerHeight} rounded-md bg-transparent`}>
          <Animated.ScrollView
            ref={scrollRef as any}
            pagingEnabled
            horizontal
            scrollToOverflowEnabled
            snapToInterval={ITEM_WIDTH}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            decelerationRate={'fast'}
            bounces={false}
            style={{overflow: 'hidden'}}>
            {[
              ...rAuthorizationVar?.Profile?.tonightStory?.photos,
              {__typename: 'upload'},
            ]?.map((item, index) => {
              if (item?.__typename === 'upload') {
                return (
                  <Box
                    className={` h-${containerHeight} w-${ITEM_WIDTH} rounded-md bg-transparent`}>
                    <Center className="mx-5 flex-1">
                      <Box className="mb-25 w-[100%] items-center bg-transparent">
                        <MaterialIcons
                          style={{
                            zIndex: 10,
                            marginTop: 10,
                            color:
                              rTheme.colorScheme === 'light'
                                ? rTheme.theme?.gluestack.tokens.colors.light100
                                : rTheme.theme?.gluestack.tokens.colors
                                    .light100,
                          }}
                          size={40}
                          name={'photo-size-select-actual'}
                        />
                        <Box className="z-5 absolute bg-transparent">
                          <View
                            style={[
                              styles.dotSm,
                              {
                                alignContent: 'center',
                                justifyContent: 'center',
                              },
                            ]}
                          />
                          <View
                            style={[
                              styles.dotMd,
                              {
                                alignContent: 'center',
                                justifyContent: 'center',
                              },
                            ]}
                          />
                          <View
                            style={[
                              styles.dotLg,
                              {
                                alignContent: 'center',
                                justifyContent: 'center',
                              },
                            ]}
                          />
                        </Box>
                      </Box>
                      <Heading className="pb-1 font-black">
                        Upload another image
                      </Heading>
                      <Button
                        onPress={pickImage}
                        className="z-20 rounded-lg bg-tertiary-400">
                        <ButtonText>Add</ButtonText>
                      </Button>
                    </Center>
                  </Box>
                )
              }

              return (
                <View key={index}>
                  <Box
                    className={` w-${ITEM_WIDTH} h-[100%] overflow-hidden rounded-md bg-transparent`}>
                    <Pressable
                      onPress={() => {
                        onPressScroll('left')
                      }}
                      className={` w-${ITEM_WIDTH / 2} absolute bottom-0 left-0 top-0 z-10 h-[100%] opacity-20`}
                    />
                    <Pressable
                      onPress={() => {
                        onPressScroll('right')
                      }}
                      className={` w-${ITEM_WIDTH / 2} absolute bottom-0 right-[0px] top-0 z-10 h-[100%]`}
                    />
                    <Button
                      hitSlop={10}
                      size="xs"
                      onPress={() => {
                        console.log('Remove Image', index)
                      }}
                      className="absolute right-[10px] top-10 z-20 bg-red-400">
                      <ButtonText>Remove</ButtonText>
                    </Button>
                    <Image
                      source={{
                        uri: String(item.url),
                      }}
                      resizeMode="cover"
                      style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: 0,
                        overflow: 'hidden',
                      }}
                    />
                  </Box>
                </View>
              )
            })}
          </Animated.ScrollView>

          <View
            style={{
              position: 'absolute',
              bottom: -20,
              alignSelf: 'center',
              flexDirection: 'row',
            }}>
            {[
              rAuthorizationVar?.Profile?.tonightStory?.photos,
              {__typename: 'upload'},
            ].map((item, i) => {
              const rDotStyle = useAnimatedStyle(() => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
                const dotWidth = interpolate(
                  translateX.value,
                  inputRange,
                  [11, 20, 11],
                  'clamp',
                )
                const dotColor = interpolateColor(
                  translateX.value,
                  inputRange,
                  ['#1d1d1d', '#ff7000', '#1d1d1d'],
                )

                return {
                  width: dotWidth,
                  backgroundColor: dotColor,
                }
              })

              return (
                <Animated.View
                  key={i.toString()}
                  style={[
                    rDotStyle,
                    {
                      marginHorizontal: 3,
                      height: DOT_SIZE,
                      borderWidth: 0.5,
                      borderRadius: DOT_SIZE / 2,
                    },
                  ]}
                />
              )
            })}
          </View>
        </Box>
      ) : (
        <BlurView
          tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
          intensity={60}
          style={{
            borderRadius: 15,
            overflow: 'hidden',
            backgroundColor:
              rdmData?.refreshDeviceManager?.__typename ===
                'AuthorizationDeviceProfile' &&
              rdmData?.refreshDeviceManager.Profile?.tonightStory?.emojimood
                ? 'transparent'
                : rTheme.colorScheme === 'light'
                  ? rTheme.theme.gluestack.tokens.colors.light300
                  : rTheme.theme.gluestack.tokens.colors.light800,
          }}>
          <Box style={{height: containerHeight}} className="rounded-md">
            <Center className="flex-1">
              <Box className="mb-24 w-[100%] items-center">
                <MaterialIcons
                  style={{
                    zIndex: 10,
                    marginTop: 10,
                    color:
                      rTheme.colorScheme === 'light'
                        ? rTheme.theme?.gluestack.tokens.colors.light100
                        : rTheme.theme?.gluestack.tokens.colors.light100,
                  }}
                  size={40}
                  name={'photo-size-select-actual'}
                />
                <Box className="z-5 absolute bg-transparent">
                  <View
                    style={[
                      styles.dotSm,
                      {
                        alignContent: 'center',
                        justifyContent: 'center',
                      },
                    ]}
                  />
                  <View
                    style={[
                      styles.dotMd,
                      {
                        alignContent: 'center',
                        justifyContent: 'center',
                      },
                    ]}
                  />
                  <View
                    style={[
                      styles.dotLg,
                      {
                        alignContent: 'center',
                        justifyContent: 'center',
                      },
                    ]}
                  />
                </Box>
              </Box>
              <Heading
                style={{
                  color: textColor,
                }}
                className="text-2xl">
                Start tonights Story
              </Heading>
              <Text
                style={{
                  color: textColor,
                }}
                className="w-3/4 text-center text-lg font-medium">
                Add photos of your fit and pick your emojimood
              </Text>
              <Button
                onPress={pickImage}
                // action="tertiary"
                className="mt-10 rounded-lg bg-tertiary-500">
                <ButtonText className="dark:text-white">
                  Select{loading ? 'ing' : ''} images
                </ButtonText>
              </Button>
            </Center>
          </Box>
        </BlurView>
      )}
    </Box>
  )
}

export default Photos
