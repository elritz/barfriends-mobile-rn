import {useReactiveVar} from '@apollo/client'
import {Entypo} from '@expo/vector-icons'

import {ThemeReactiveVar} from '#/reactive'
import TabBarIcon from '#/src/components/atoms/TabBarIcon'
import {TabProps} from '#/src/components/atoms/TabBarIcon'
import {Box} from '#/src/components/ui/box'

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
            name="home"
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
        className={` bottom-${-3} ${false ? 'bg-red-500' : 'bg-transparent'} absolute h-[4.25px] w-[4.25px] rounded-full`}
      />
    </>
  )
}

export default HomeTab
