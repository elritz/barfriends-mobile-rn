import {useReactiveVar} from '@apollo/client'
import {FontAwesome5} from '@expo/vector-icons'

import {ThemeReactiveVar} from '#/reactive'
import TabBarIcon from '#/src/components/atoms/TabBarIcon'
import {TabProps} from '#/src/components/atoms/TabBarIcon'

const MapTab = (props: TabProps) => {
  const rTheme = useReactiveVar(ThemeReactiveVar)
  return (
    <TabBarIcon
      icon={
        <FontAwesome5
          style={{
            zIndex: 100,
            justifyContent: 'center',
          }}
          name="map-marker-alt"
          size={26}
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

export default MapTab
