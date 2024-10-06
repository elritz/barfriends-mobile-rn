import {MotiPressable} from 'moti/interactions'
import {useMemo} from 'react'
import {View} from 'react-native'

interface OuterViewStyleProps {
  height?: number
  width?: number
}

export interface TabBarIconProps {
  value?: number
  icon?: React.ReactNode
  badge?: React.ReactNode
  containerStyle?: OuterViewStyleProps
  onPress?: () => void
  onLongPress?: () => void
}

export interface TabProps {
  color: string
  focused: boolean
}

const TabBarIcon = ({
  icon,
  badge,
  containerStyle,
  onPress,
  onLongPress,
}: TabBarIconProps) => (
  <View
    style={{
      height: 45,
      width: containerStyle?.width || '100%',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    {/* {badge} */}
    {/* <MotiPressable
			animate={useMemo(
				() =>
					({ hovered, pressed }) => {
						'worklet'

						return {
							scale: hovered || pressed ? 0.75 : 1,
						}
					},
				[],
			)}
			style={{ zIndex: 100 }}
			onPress={onPress}
			onLongPress={onLongPress}
		> */}
    {icon}
    {/* </MotiPressable> */}
  </View>
)

export default TabBarIcon
