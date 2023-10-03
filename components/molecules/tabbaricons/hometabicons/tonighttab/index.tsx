import { useReactiveVar } from '@apollo/client'
import TabBarIcon from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { Ionicons } from '@expo/vector-icons'
import { Box } from '@gluestack-ui/themed'
import { ThemeReactiveVar } from '@reactive'

const TonightTab = (props: TabProps) => {
	const rTheme = useReactiveVar(ThemeReactiveVar)

	return (
		<>
			<TabBarIcon
				icon={
					<Ionicons
						style={{
							zIndex: 100,
							justifyContent: 'center',
						}}
						size={28}
						name={!props.focused ? 'md-play-outline' : 'md-play'}
						color={!props.focused ? (rTheme.colorScheme === 'dark' ? 'white' : 'black') : props.color}
					/>
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

export default TonightTab
