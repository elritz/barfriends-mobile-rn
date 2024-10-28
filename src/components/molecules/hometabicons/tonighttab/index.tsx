import {useReactiveVar} from '@apollo/client'
import {Ionicons} from '@expo/vector-icons'

import {ThemeReactiveVar} from '#/reactive'
import TabBarIcon from '#/src/components/atoms/TabBarIcon'
import {TabProps} from '#/src/components/atoms/TabBarIcon'
import {Box} from '#/src/components/ui/box'

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
            name={!props.focused ? 'play-outline' : 'play'}
            color={
              !props.focused
                ? rTheme.colorScheme === 'dark'
                  ? 'white'
                  : 'black'
                : props.color
            }
          />
        }
      />
      <Box
        className={` ${false ? 'bg-red-500' : 'bg-transparent'} h-[4.25px] w-[4.25px] rounded-full`}
      />
    </>
  )
}

export default TonightTab
