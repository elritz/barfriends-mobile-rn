import {useCallback} from 'react'
import {Image} from 'react-native'
import {ScrollView, useWindowDimensions, View} from 'react-native'
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated'
import {BlurView} from 'expo-blur'
import {useReactiveVar} from '@apollo/client'
import {Ionicons} from '@expo/vector-icons'

import {Photo, useRefreshDeviceManagerQuery} from '#/graphql/generated'
import {ThemeReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Center} from '#/src/components/ui/center'
import {Pressable} from '#/src/components/ui/pressable'

type Props = {
  photos: Photo[] | undefined
  profilePhoto: Photo | null | undefined
  emojimoodsColors: string[] | null | undefined
}

export default function Photos(props: Props) {
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const {width} = useWindowDimensions()
  const scrollRef = useAnimatedRef<ScrollView>()
  const translateX = useSharedValue(0)
  const containerHeight = 350
  const margin = 12
  const DOT_SIZE = 8
  const ITEM_WIDTH = width - margin * 2

  //! don't move this from here
  const activeIndex = useDerivedValue(() => {
    return Math.round(translateX.value / ITEM_WIDTH)
  })

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      translateX.value = event.contentOffset.x
    },
  })

  const {data: rdmData} = useRefreshDeviceManagerQuery()

  const onPressScroll = useCallback((side: string) => {
    if (side === 'left') {
      if (activeIndex.value === 0) return
      scrollRef.current?.scrollTo({
        x: ITEM_WIDTH * (activeIndex.value - 1),
        animated: false,
      })
    }
    if (
      rdmData?.refreshDeviceManager?.__typename ===
        'AuthorizationDeviceProfile' &&
      rdmData?.refreshDeviceManager?.Profile?.tonightStory?.photos
    ) {
      if (side === 'right') {
        if (
          activeIndex.value ===
          rdmData?.refreshDeviceManager?.Profile.tonightStory.photos.length - 1
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

  // const styles = StyleSheet.create({
  //   dotLg: {
  //     position: 'absolute',
  //     left: -39,
  //     top: -10,
  //     height: size + 10,
  //     width: size + 10,
  //     borderRadius: size + 10 / 2,
  //     backgroundColor: rTheme.theme?.gluestack.tokens.colors.primary400,
  //   },
  //   dotMd: {
  //     top: 10,
  //     left: -55,
  //     position: 'absolute',
  //     height: size - 15,
  //     width: size - 15,
  //     borderRadius: size / 2,
  //     backgroundColor: rTheme.theme?.gluestack?.tokens.colors.tertiary400,
  //   },
  //   dotSm: {
  //     top: 20,
  //     left: 20,
  //     position: 'absolute',
  //     height: size - 25,
  //     width: size - 25,
  //     borderRadius: size / 2,
  //     backgroundColor: rTheme.theme?.gluestack?.tokens.colors.secondary700,
  //     zIndex: 3,
  //   },
  // })

  if (!props.photos?.length && !props.profilePhoto) {
    return (
      <BlurView
        style={{
          borderRadius: 13,
          overflow: 'hidden',
          height: containerHeight,
          backgroundColor: props.emojimoodsColors?.length
            ? 'transparent'
            : rTheme.colorScheme === 'light'
              ? rTheme.theme.gluestack.tokens.colors.light100
              : rTheme.theme.gluestack.tokens.colors.light800,
        }}
        intensity={80}
        tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}>
        <Center className="mx-5 flex-1">
          <Box className="mb-25 w-[100%] items-center bg-transparent">
            <Ionicons
              size={32}
              color={
                rTheme.colorScheme === 'light'
                  ? rTheme.theme?.gluestack.tokens.colors.light900
                  : rTheme.theme?.gluestack.tokens.colors.light100
              }
              name={'person'}
            />
          </Box>
        </Center>
        {/* </Box> */}
      </BlurView>
    )
  }

  if (!props.photos?.length && props.profilePhoto) {
    return (
      <BlurView
        style={{
          borderRadius: 13,
          overflow: 'hidden',
          height: containerHeight,
          backgroundColor: props.emojimoodsColors?.length
            ? 'transparent'
            : rTheme.colorScheme === 'light'
              ? rTheme.theme.gluestack.tokens.colors.light100
              : rTheme.theme.gluestack.tokens.colors.light800,
        }}
        intensity={80}
        tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}>
        {/* <Box
						bg='$red900'
						sx={{
							w: '100%',
							_dark: {
								bg: '$light900',
							},
							_light: {
								bg: '$light100',
							},
						}}
						rounded={'$md'}
					> */}
        <Center className="mx-5 flex-1">
          <Box className="mb-25 w-[100%] items-center bg-transparent">
            <Ionicons
              size={32}
              color={
                rTheme.colorScheme === 'light'
                  ? rTheme.theme?.gluestack.tokens.colors.light900
                  : rTheme.theme?.gluestack.tokens.colors.light100
              }
              name={'person'}
            />
          </Box>
        </Center>
        {/* </Box> */}
      </BlurView>
    )
  }

  return (
    <Box className="bg-transparent">
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
          {props.photos?.map((item, index) => {
            return (
              <View key={index}>
                <Box
                  className={` w-${ITEM_WIDTH} h-[100%] overflow-hidden rounded-md bg-green-200`}>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => {
                      onPressScroll('left')
                    }}
                    className={` w-${ITEM_WIDTH / 2} absolute bottom-0 left-0 top-0 z-10 h-[100%] opacity-20`}
                  />
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => {
                      onPressScroll('right')
                    }}
                    className={` w-${ITEM_WIDTH / 2} absolute bottom-0 right-[0px] top-0 z-10 h-[100%]`}
                  />
                  <Image
                    accessibilityIgnoresInvertColors
                    source={{
                      uri: item.url,
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
            bottom: 10,
            alignSelf: 'center',
            flexDirection: 'row',
          }}>
          {props.photos?.map((item, i) => {
            const rDotStyle = useAnimatedStyle(() => {
              const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
              const dotWidth = interpolate(
                translateX.value,
                inputRange,
                [11, 20, 11],
                'clamp',
              )
              const dotColor = interpolateColor(translateX.value, inputRange, [
                '#1d1d1d',
                '#ff7000',
                '#1d1d1d',
              ])

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
                    borderRadius: DOT_SIZE / 2,
                  },
                ]}
              />
            )
          })}
        </View>
      </Box>
    </Box>
  )
}
