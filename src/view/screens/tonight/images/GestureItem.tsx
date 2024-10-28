import React, {ReactNode} from 'react'
import {Dimensions, StyleSheet} from 'react-native'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {
  animationConfig,
  COL,
  getOrder,
  getPosition,
  Positions,
  SIZE,
  SIZE_LARGE,
} from './Config'

interface ItemProps {
  children: ReactNode
  positions: SharedValue<Positions>
  id: string
  editing: boolean
  onDragEnd: (diffs: Positions) => void
  scrollY: SharedValue<number>
}

const GestureItem = ({
  children,
  positions,
  id,
  onDragEnd,
  scrollY,
  editing,
}: ItemProps) => {
  const inset = useSafeAreaInsets()

  const containerHeight =
    Dimensions.get('window').height - inset.top - inset.bottom
  const contentHeight = (Object.keys(positions.value).length / COL) * SIZE
  const isGestureActive = useSharedValue(false)

  const position = getPosition(positions.value[id]!)
  const translateX = useSharedValue(position.x)
  const translateY = useSharedValue(position.y)

  const slide = Gesture.Pan()
    .onBegin(() => {
      if (editing) {
        isGestureActive.value = true
      }
    })
    .onUpdate(event => {
      if (editing) {
        translateX.value = event.translationX
        translateY.value = event.translationY

        const newOrder = getOrder(
          translateX.value,
          translateY.value,
          Object.keys(positions.value).length - 1,
        )

        const oldOrder = positions.value[id]
        if (newOrder !== oldOrder) {
          const idToSwap = Object.keys(positions.value).find(
            key => positions.value[key] === newOrder,
          )
          if (idToSwap) {
            const newPositions = JSON.parse(JSON.stringify(positions.value))
            newPositions[id] = newOrder
            newPositions[idToSwap] = oldOrder
            positions.value = newPositions
          }
        }

        const lowerBound = scrollY.value
        const upperBound = lowerBound + containerHeight - SIZE
        const maxScroll = contentHeight - containerHeight
        const leftToScrollDown = maxScroll - scrollY.value
        if (translateY.value < lowerBound) {
          const diff = Math.min(lowerBound - translateY.value, lowerBound)
          scrollY.value -= diff
          translateY.value += diff
        }
        if (translateY.value > upperBound) {
          const diff = Math.min(translateY.value - upperBound, leftToScrollDown)
          scrollY.value += diff
          translateY.value -= diff
        }
      }
    })
    .onEnd(() => {
      const newPosition = getPosition(positions.value[id]!)
      translateX.value = withTiming(newPosition.x, animationConfig, () => {
        isGestureActive.value = false
        runOnJS(onDragEnd)(positions.value)
      })
      translateY.value = withTiming(newPosition.y, animationConfig)
    })

  useAnimatedReaction(
    () => positions.value[id]!,
    newOrder => {
      if (!isGestureActive.value) {
        const pos = getPosition(newOrder)
        translateX.value = withTiming(pos.x, animationConfig)
        translateY.value = withTiming(pos.y, animationConfig)
      }
    },
  )
  const style = useAnimatedStyle(() => {
    const zIndex = isGestureActive.value ? 100 : 0
    const scale = withSpring(isGestureActive.value ? 1.05 : 1)

    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: position.y && position.x === 0 ? SIZE_LARGE : SIZE,
      height: position.y && position.x === 0 ? SIZE_LARGE : SIZE,
      zIndex,
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {scale},
      ],
    }
  })
  return (
    <Animated.View style={style}>
      <GestureDetector gesture={slide}>
        <Animated.View style={StyleSheet.absoluteFill}>
          {children}
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  )
}

export default GestureItem
