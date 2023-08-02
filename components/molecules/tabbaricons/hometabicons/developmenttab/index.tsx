import { useReactiveVar } from '@apollo/client'
import TabBarIcon from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'
import { MotiPressable } from 'moti/interactions'
import { useMemo } from 'react'

const DevelopmentTab = (props: TabProps) => {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	return (
		<TabBarIcon
			color='transparent'
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
					<MaterialCommunityIcons
						style={{
							zIndex: 100,
							marginTop: -4,
							justifyContent: 'center',
						}}
						size={38}
						name='dev-to'
						color={
							!props.focused ? (rTheme.deviceColorScheme === 'dark' ? 'white' : 'black') : props.color
						}
					/>
				</MotiPressable>
			}
		/>
	)
}

export default DevelopmentTab
