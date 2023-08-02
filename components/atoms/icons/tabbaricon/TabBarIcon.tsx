import { MotiPressable } from 'moti/interactions'
import { useMemo } from 'react'
import { View } from 'react-native'

interface OuterViewStyleProps {
	height?: number
	width?: number
}

export interface TabBarIconProps {
	color: string
	value?: number
	icon?: React.ReactNode
	badge?: React.ReactNode
	containerStyle?: OuterViewStyleProps
}

export interface TabProps {
	color: string
	focused: boolean
}

const TabBarIcon = ({ icon, badge, containerStyle }: TabBarIconProps) => (
	<View
		style={{
			height: 45,
			width: containerStyle?.width || '100%',
			alignItems: 'center',
			justifyContent: 'center',
		}}
	>
		{/* {badge} */}
		{icon}
	</View>
)

export default TabBarIcon
