import {useState} from 'react'
import {Pressable, useWindowDimensions, View} from 'react-native'
import {SceneMap, TabView} from 'react-native-tab-view'
import {useReactiveVar} from '@apollo/client'

import {ThemeReactiveVar} from '#/reactive'
import {Text} from '#/src/components/ui/text'
import Privacy from '#/src/view/screens/information/privacyserviceterms/Privacy'
import Service from '#/src/view/screens/information/privacyserviceterms/Service'

const renderScene = SceneMap({
  second: Privacy,
  third: Service,
})

export default () => {
  const layout = useWindowDimensions()
  const rTheme = useReactiveVar(ThemeReactiveVar)

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    {key: 'second', title: 'Services'},
    {key: 'third', title: 'Privacy'},
  ])

  const renderTabBar = props => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 5,
        }}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <Pressable
              accessibilityRole="button"
              style={{
                flex: 1,
                alignItems: 'center',
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor:
                  index === i
                    ? rTheme.colorScheme === 'light'
                      ? 'black'
                      : 'white'
                    : 'transparent',
              }}
              onPress={() => setIndex(i)}>
              <Text style={{fontWeight: index === i ? '800' : '500'}}>
                {route.title}
              </Text>
            </Pressable>
          )
        })}
      </View>
    )
  }

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  )
}
