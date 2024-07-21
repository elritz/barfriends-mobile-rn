import { Box } from "#/components/ui/box";
import { useReactiveVar } from '@apollo/client'
import TabBarIcon from '#/components/atoms/icons/tabbaricon/TabBarIcon'
import { TabProps } from '#/components/atoms/icons/tabbaricon/TabBarIcon'
import { Entypo } from '@expo/vector-icons'
import { ThemeReactiveVar } from '#/reactive'

const HomeTab = (props: TabProps) => {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	return (<>
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
                        !props.focused ? (rTheme.colorScheme === 'dark' ? 'white' : 'black') : props.color
                    }
                />
            }
        />
        <Box
            className={` bottom-${-3} ${false ? "bg-red-500" : "bg-transparent"} h-[4.25px]  w-[4.25px] absolute rounded-full `} />
    </>);
}

export default HomeTab
