import { useReactiveVar } from '@apollo/client'
import TabBarIcon, { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { Box } from '@components/core'
import { Ionicons } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'

const SearchTab = (props: TabProps) => {
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
						name='search'
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
				rounded={'$full'}
			/>
		</>
	)
}

export default SearchTab
