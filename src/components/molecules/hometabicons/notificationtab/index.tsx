import {useReactiveVar} from '@apollo/client'
import {MaterialIcons} from '@expo/vector-icons'

import {ThemeReactiveVar} from '#/reactive'
import TabBarIcon, {TabProps} from '#/src/components/atoms/TabBarIcon'

const NotificationTab = (props: TabProps) => {
  const rTheme = useReactiveVar(ThemeReactiveVar)
  return (
    <TabBarIcon
      icon={
        <MaterialIcons
          style={{
            zIndex: 100,
            justifyContent: 'center',
          }}
          name="notifications"
          size={28}
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

export default NotificationTab
