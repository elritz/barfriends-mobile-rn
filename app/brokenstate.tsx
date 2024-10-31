import Theme from '#/src/components/layouts/Theme'
import {Button} from '#/src/components/ui/button'
import {HStack} from '#/src/components/ui/hstack'
import * as persisted from '#/src/state/persisted'
import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
const BrokenStateScreen: React.FC = () => {
  const theme = persisted.get('theme')
  // console.log('🚀 ~ file: brokenstate.tsx:16 ~ t:', t)

  // const theme = t ? JSON.parse(t) : undefined
  console.log('🚀 ~ file: brokenstate.tsx:18 ~ sssstheme:', theme)

  // storage.delete(THEME_COLOR_SCHEME)

  const backgroundStyle = {
    backgroundColor: '#333',
  }

  const onPress = (data: string) => {
    // switch (data) {
    //   case 'light':
    //     // setTheme(
    //     //   JSON.stringify({
    //     //     preference: 'light',
    //     //     mode: 'light',
    //     //   }),
    //     // )
    //     break
    //   case 'dark':
    //     setTheme(
    //       JSON.stringify({
    //         preference: 'dark',
    //         mode: 'dark',
    //       }),
    //     )
    //     break
    //   case 'system':
    //     if (theme.mode !== colorScheme) {
    //       if (colorScheme) {
    //         setTheme(
    //           JSON.stringify({
    //             preference: 'system',
    //             mode: colorScheme,
    //           }),
    //         )
    //       } else {
    //         setTheme(
    //           JSON.stringify({
    //             preference: 'dark',
    //             mode: 'dark',
    //           }),
    //         )
    //       }
    //     }
    // }
  }

  return (
    <Theme>
      <View style={[styles.container, backgroundStyle]}>
        <Text style={styles.text}>
          Hello, this is a basic React Native screen!
        </Text>
        <HStack space="lg">
          {['light', 'dark', 'system'].map(item => {
            return (
              <Button
                key={item}
                // isDisabled={theme.preference === item}
                onPress={() => onPress(item)}>
                <Text>{item}</Text>
              </Button>
            )
          })}
        </HStack>
      </View>
    </Theme>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})

export default BrokenStateScreen
