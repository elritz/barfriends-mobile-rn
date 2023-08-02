import { useReactiveVar } from '@apollo/client'
import TabBarIcon from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { Box } from '@components/core'
import { Entypo } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'

const HomeTab = (props: TabProps) => {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	return (
		<>
			<TabBarIcon
				icon={
					<Entypo
						style={{
							zIndex: 100,
							justifyContent: 'center',
						}}
						size={26}
						name='home'
						color={
							!props.focused ? (rTheme.deviceColorScheme === 'dark' ? 'white' : 'black') : props.color
						}
					/>
				}
			/>
			<Box
				bg={false ? '$red500' : 'transparent'}
				sx={{
					h: 4.25,
					w: 4.25,
				}}
				position={'absolute'}
				bottom={-3}
				rounded={'$full'}
			/>
		</>
	)
}

export default HomeTab
