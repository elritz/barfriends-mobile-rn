import React, {ReactElement} from 'react'
import Animated, {useAnimatedRef, useSharedValue} from 'react-native-reanimated'

import {COL, Positions, SIZE} from './Config'
import Item from './GestureItem'

interface ListProps {
  children: ReactElement<{id: string}>[]
  editing: boolean
  onDragEnd: (diff: Positions) => void
}

const SortableList = ({children, editing, onDragEnd}: ListProps) => {
  const scrollY = useSharedValue(0)
  const scrollView = useAnimatedRef<Animated.View>()
  const positions = useSharedValue<Positions>(
    Object.assign(
      {},
      ...children.map((child, index) => ({[child.props.id]: index})),
    ),
  )

  return (
    <Animated.View
      ref={scrollView}
      style={{
        height: Math.ceil(children.length / COL) * SIZE,
      }}>
      {children.map(child => (
        <Item
          key={child.props.id}
          positions={positions}
          id={child.props.id}
          editing={editing}
          onDragEnd={onDragEnd}
          scrollY={scrollY}>
          {child}
        </Item>
      ))}
    </Animated.View>
  )
}

export default SortableList
