import {useReactiveVar} from '@apollo/client'
import {MaterialCommunityIcons} from '@expo/vector-icons'

import {ThemeReactiveVar} from '#/reactive'
import TabBarIcon from '#/src/components/atoms/TabBarIcon'
import {TabProps} from '#/src/components/atoms/TabBarIcon'

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
          name="dev-to"
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
  )
}

export default DevelopmentTab
