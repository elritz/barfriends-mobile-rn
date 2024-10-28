import {useMemo} from 'react'
import {Pressable, View} from 'react-native'
import {MotiPressable} from 'moti/interactions'

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

const TabBarIcon = ({icon, containerStyle}: TabBarIconProps) => (
  <View
    style={{
      height: 45,
      width: containerStyle?.width || '100%',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    {/* {badge} */}
    {icon}
  </View>
)

export default TabBarIcon
