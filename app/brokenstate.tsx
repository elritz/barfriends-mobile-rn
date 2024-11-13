import {Box} from '#/src/components/ui/box'
import {Button} from '#/src/components/ui/button'
import {HStack} from '#/src/components/ui/hstack'
import {Text} from '#/src/components/ui/text'
import {PersitedVar} from '#/src/state/reactive/persisted'
import {useTheme} from '#/src/util/hooks/theme/useTheme'
import {useReactiveVar} from '@apollo/client'
import React from 'react'
import {StyleSheet, useColorScheme} from 'react-native'
const BrokenStateScreen: React.FC = () => {
  const t = useReactiveVar(PersitedVar)
  const colorScheme = useColorScheme()
  const [toggleColorScheme] = useTheme()

  const onPress = (data: string) => {
    toggleColorScheme({
      colorScheme: data as any,
    })
  }

  return (
    <Box
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={[styles.text]}>
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
    </Box>
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
