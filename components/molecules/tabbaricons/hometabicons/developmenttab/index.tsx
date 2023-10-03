import { useReactiveVar } from '@apollo/client'
import TabBarIcon from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'

const DevelopmentTab = (props: TabProps) => {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	return (
		<TabBarIcon
			icon={
				<MaterialCommunityIcons
					style={{
						zIndex: 100,
						marginTop: -4,
						justifyContent: 'center',
					}}
					size={38}
					name='dev-to'
					color={!props.focused ? (rTheme.colorScheme === 'dark' ? 'white' : 'black') : props.color}
				/>
			}
		/>
	)
}

export default DevelopmentTab
