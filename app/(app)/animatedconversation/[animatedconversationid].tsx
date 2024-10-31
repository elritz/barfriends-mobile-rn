import {useReactiveVar} from '@apollo/client'
import {FontAwesome6} from '@expo/vector-icons'
import {BlurView} from 'expo-blur'
import React, {useCallback, useRef} from 'react'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {SafeAreaView as RNSafeAreaView, StyleSheet, View} from 'react-native'
import {useKeyboardHandler} from 'react-native-keyboard-controller'
import Reanimated, {
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'

import {useCreateMessageMutation} from '#/graphql/generated'
import {ThemeReactiveVar} from '#/reactive'
import {Input, InputField, InputSlot} from '#/src/components/ui/input'
import {SafeAreaView} from '#/src/components/ui/safe-area-view'
import Message from '#/src/view/screens/conversations/Message'
import {history} from '#/src/view/screens/conversations/Message/data'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  header: {
    color: 'black',
    marginRight: 12,
  },
  inverted: {
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
  content: {
    flex: 1,
  },
  blurView: {flex: 1, height: '100%'},
})

interface FormValues {
  text: string
}

const useKeyboardAnimation = () => {
  const progress = useSharedValue(0)
  const height = useSharedValue(0)
  const inset = useSharedValue(0)
  const offset = useSharedValue(0)
  const scroll = useSharedValue(0)
  const shouldUseOnMoveHandler = useSharedValue(false)

  useKeyboardHandler({
    onStart: e => {
      'worklet'

      // i. e. the keyboard was under interactive gesture, and will be showed
      // again. Since iOS will not schedule layout animation for that we can't
      // simply update `height` to destination and we need to listen to `onMove`
      // handler to have a smooth animation
      if (progress.value !== 1 && progress.value !== 0 && e.height !== 0) {
        shouldUseOnMoveHandler.value = true
        return
      }

      progress.value = e.progress
      height.value = e.height

      inset.value = e.height
      // Math.max is needed to prevent overscroll when keyboard hides (and user scrolled to the top, for example)
      offset.value = Math.max(e.height + scroll.value, 0)
    },
    onInteractive: e => {
      'worklet'

      progress.value = e.progress
      height.value = e.height
    },
    onMove: e => {
      'worklet'

      if (shouldUseOnMoveHandler.value) {
        progress.value = e.progress
        height.value = e.height
      }
    },
    onEnd: e => {
      'worklet'

      height.value = e.height
      progress.value = e.progress
      shouldUseOnMoveHandler.value = false
    },
  })

  const onScroll = useAnimatedScrollHandler({
    onScroll: e => {
      scroll.value = e.contentOffset.y - inset.value
    },
  })

  return {height, progress, onScroll, inset, offset}
}

const TEXT_INPUT_HEIGHT = 80

const contentContainerStyle = {
  paddingBottom: TEXT_INPUT_HEIGHT + 30,
}
// const AnimatedBoxInput = Reanimated.createAnimatedComponent(Box);
// const AnimatedView = Reanimated.createAnimatedComponent(View);
const AnimatedView = Reanimated.createAnimatedComponent(View)

function AnimatedChatroom() {
  const refSafeArea = useRef<RNSafeAreaView>(null)
  const ref = useRef<Reanimated.ScrollView>(null)
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const {height, onScroll, inset, offset} = useKeyboardAnimation()

  const {control, handleSubmit} = useForm<FormValues>({
    defaultValues: {
      text: '',
    },
  })

  const [] = useCreateMessageMutation()

  const scrollToBottom = useCallback(() => {
    ref.current?.scrollToEnd({animated: false})
  }, [])

  const BoxInputStyle = useAnimatedStyle(
    () => ({
      position: 'absolute',
      minHeight:
        height.value < 100 ? TEXT_INPUT_HEIGHT : TEXT_INPUT_HEIGHT - 20,
      width: '100%',
      transform: [{translateY: -height.value}],
    }),
    [],
  )

  const props = useAnimatedProps(() => ({
    contentInset: {
      bottom: inset.value,
    },
    contentOffset: {
      x: 0,
      y: offset.value,
    },
  }))

  const handleSendMessage = useCallback<SubmitHandler<FormValues>>(() => {
    // createMessageMutation({
    //   variables: {
    //     content: {
    //       text: value,
    //     },
    //     conversationId: '1'
    //   }
    // })
  }, [])

  return (
    <View style={styles.container}>
      <Reanimated.ScrollView
        ref={ref}
        onContentSizeChange={scrollToBottom}
        contentContainerStyle={contentContainerStyle}
        keyboardDismissMode="interactive"
        // simulation of `automaticallyAdjustKeyboardInsets` behavior on RN < 0.73
        animatedProps={props}
        onScroll={onScroll}
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior="never">
        {history.map((message, index) => (
          <Message key={index} {...message} />
        ))}
      </Reanimated.ScrollView>
      <AnimatedView style={[BoxInputStyle]}>
        <BlurView
          tint={
            rTheme.colorScheme === 'light'
              ? 'systemMaterialLight'
              : 'systemThickMaterialDark'
          }
          style={{minWidth: '100%', height: '100%'}}>
          <Controller
            control={control}
            name="text"
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => {
              return (
                <SafeAreaView ref={refSafeArea}>
                  <Input className="mx-4 mb-2 mt-5 h-auto max-h-[155px] items-center rounded-3xl border-light-300">
                    <BlurView
                      style={styles.blurView}
                      className="h-auto min-h-[40px] flex-row items-center rounded-3xl"
                      intensity={98}>
                      <InputField
                        value={value}
                        variant="rounded"
                        onChangeText={onChange}
                        multiline
                        style={{
                          lineHeight: 22,
                          borderRadius: 15,
                          paddingVertical: 5,
                        }}
                        onPressIn={() => ref.current?.scrollToEnd()}
                        className="h-auto flex-1 border-0 text-[17px] font-medium leading-6 color-black dark:color-white"
                      />
                      <InputSlot
                        onPress={handleSubmit(handleSendMessage)}
                        className="mr-2 h-[25px] w-[25px] items-center justify-center rounded-full bg-blue-500">
                        <FontAwesome6
                          name={'arrow-up'}
                          fontSize={'$xl'}
                          size={16}
                          color={'#ffffff'}
                        />
                      </InputSlot>
                    </BlurView>
                  </Input>
                </SafeAreaView>
              )
            }}
          />
        </BlurView>
      </AnimatedView>
    </View>
  )
}

export default AnimatedChatroom
