import TabBarIcon from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { Icon } from '@rneui/themed'

const HomeTab = (props: TabProps) => {
	return (
		<TabBarIcon
			color={props.color}
			icon={
				<Icon
					style={{
						zIndex: 100,
						justifyContent: 'center',
					}}
					name='home'
					size={27}
					type='entypo'
					color={props.color}
				/>
			}
		/>
	)
}

export default HomeTab
