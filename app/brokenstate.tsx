import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

const BrokenStateScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Hello, this is a basic React Native screen!
      </Text>
    </View>
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
