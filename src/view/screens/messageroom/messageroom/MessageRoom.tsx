import {useEffect} from 'react'
import {FlatList, Keyboard, KeyboardAvoidingView} from 'react-native'
import Animated, {
  Easing,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {BlurView} from 'expo-blur'
import {useReactiveVar} from '@apollo/client'
import {Ionicons} from '@expo/vector-icons'
import {useKeyboard} from '@react-native-community/hooks'

import {ThemeReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Input, InputField} from '#/src/components/ui/input'
import {Text} from '#/src/components/ui/text'

export default function MessageRoom() {
  const data = [...Array(16)]
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const insets = useSafeAreaInsets()
  const _keyboard = useKeyboard()
  const flatListRef = useAnimatedRef<FlatList>()
  const positionBottom = useSharedValue(0)
  const keyboardOffset = useSharedValue(0)

  const INPUT_HEIGHT = 65

  // const animatedStyle = useAnimatedStyle(() => {
  //   const inputRange = [insets.bottom, _keyboard.keyboardHeight]
  //   const transformY = interpolate(positionBottom.value, inputRange, [
  //     insets.bottom,
  //     _keyboard.keyboardHeight,
  //   ])

  //   return {
  //     transform: [{translateY: keyboardOffset.value}],
  //   }
  // })

  // const getVerticalOffset = () =>
  //   Platform.select({
  //     ios: 0,
  //     android: 0,
  //   })

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      const inputRange = [insets.bottom, _keyboard.keyboardHeight]
      if (e.contentOffset.y < -95) {
        if (positionBottom.value > insets.bottom) {
          const transformY = interpolate(positionBottom.value, inputRange, [
            _keyboard.keyboardHeight,
            insets.bottom,
          ])
          positionBottom.value = withTiming(transformY)
        }
      }
    },
  })

  const handlePressIn = () => {
    keyboardOffset.value = withTiming(
      -_keyboard.keyboardHeight + insets.bottom,
      {
        duration: 230,
        easing: Easing.sin,
      },
    )
  }

  // useEffect(() => {
  //   // start the animation when the keyboard appears
  //   // Keyboard.addListener('keyboardWillShow', e => {
  //   // 	// use the height of the keyboard (negative because the translateY moves upward)
  //   // 	keyboardOffset.value = withTiming(-_keyboard.keyboardHeight + insets.bottom, { duration: 250 })
  //   // })
  //   // perform the reverse animation back to keyboardOffset initial value: 0
  //   // Keyboard.addListener('keyboardWillHide', () => {
  //   // 	keyboardOffset.value = withTiming(0, { duration: 160 })
  //   // })
  //   // return () => {
  //   // 	// remove listeners to avoid memory leak
  //   // 	Keyboard.removeAllListeners('keyboardWillShow')
  //   // 	Keyboard.removeAllListeners('keyboardWillHide')
  //   // }
  // }, [])

  useEffect(() => {
    flatListRef.current?.scrollToEnd()
    // 	const willShowSubscription = Keyboard.addListener('keyboardWillShow', e => {
    // 		// positionBottom.value = withTiming(_keyboard.keyboardHeight)
    // 		positionBottom.value = withTiming(_keyboard.keyboardHeight)
    // 	})
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      positionBottom.value = withTiming(-_keyboard.keyboardHeight)
    })
    // const willHideSubscription = Keyboard.addListener('keyboardWillHide', e => {
    // 	positionBottom.value = withTiming(insets.bottom)
    // })
    // const hideSubscription = Keyboard.addListener('keyboardDidHide', e => {
    // 	keyboardShowing.value = false
    // 	positionBottom.value = withTiming(insets.bottom)
    // })

    return () => {
      // 		willShowSubscription.remove()
      showSubscription.remove()
      // willHideSubscription.remove()
      // hideSubscription.remove()
    }
  }, [flatListRef, _keyboard.keyboardHeight, positionBottom])

  return (
    <Box className="flex-1 bg-[orange.500]">
      {/* <GestureDetector gesture={PanGesture}> */}
      {/* <KeyboardAvoidingView keyboardVerticalOffset={0}> */}
      <Animated.FlatList
        // scrollEnabled={false}
        ref={flatListRef as any}
        contentInset={{top: insets.top, bottom: INPUT_HEIGHT + insets.bottom}}
        data={data}
        style={{backgroundColor: 'green', flex: 1}}
        keyboardDismissMode="interactive"
        // contentInsetAdjustmentBehavior={'scrollableAxes'}
        keyboardShouldPersistTaps={'always'}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        renderItem={({index}) => {
          return (
            <Text className="bg-red-500 text-4xl">MessagesRoom{index}</Text>
          )
        }}
      />
      {/* </KeyboardAvoidingView> */}
      <KeyboardAvoidingView
        style={{
          position: 'absolute',
          bottom: insets.bottom,
          width: '100%',
          height: INPUT_HEIGHT,
        }}>
        {/* </GestureDetector> */}
        {/* <Animated.View
				style={[
					{
						position: 'absolute',
						bottom: insets.bottom,
						width: '100%',
						height: INPUT_HEIGHT,
					},
					animatedStyle,
				]}
			> */}
        <BlurView
          tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
          style={{
            minWidth: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            paddingVertical: 15,
          }}>
          <Input
            variant={'rounded'}
            size={'lg'}
            className="mx-2 my-[auto] rounded-md">
            <InputField
              keyboardAppearance={
                rTheme.colorScheme === 'light' ? 'light' : 'dark'
              }
              onPressIn={handlePressIn}
              multiline
              placeholder=""
            />
            <Ionicons
              name={'send'}
              size={30}
              color={
                rTheme.colorScheme === 'light'
                  ? rTheme.theme?.gluestack.tokens.colors.light900
                  : rTheme.theme?.gluestack.tokens.colors.light100
              }
              style={{
                marginHorizontal: 2,
              }}
            />
          </Input>
        </BlurView>
        {/* </Animated.View> */}
      </KeyboardAvoidingView>
      <Box
        style={{
          position: 'absolute',
          height: insets.bottom,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        className={` ${rTheme.colorScheme === 'light' ? rTheme.theme?.gluestack.tokens.colors.light100 : rTheme.theme?.gluestack.tokens.colors.light900} `}
      />
    </Box>
  )
}
