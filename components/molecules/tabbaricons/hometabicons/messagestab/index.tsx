import { useReactiveVar } from '@apollo/client'
import TabBarIcon from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { Box } from '@components/core'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'
import { MotiPressable } from 'moti/interactions'
import { useMemo } from 'react'

const MessageTab = (props: TabProps) => {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	return (
		<>
			<TabBarIcon
				icon={
					<MotiPressable
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
					>
						<Ionicons
							style={{
								zIndex: 100,
								justifyContent: 'center',
							}}
							size={25}
							name={!props.focused ? 'md-chatbubble-ellipses-outline' : 'md-chatbubble-ellipses-sharp'}
							color={
								!props.focused ? (rTheme.deviceColorScheme === 'dark' ? 'white' : 'black') : props.color
							}
						/>
					</MotiPressable>
				}
			/>
			<Box
				bg={false ? '$red500' : 'transparent'}
				sx={{
					h: 4.25,
					w: 4.25,
				}}
				rounded={'$full'}
			/>
		</>
	)
}

export default MessageTab
