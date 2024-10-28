import {StyleSheet} from 'react-native'
import {Link, Stack} from 'expo-router'

import {ThemedView} from '#/src/components/ThemedView'
import {Heading} from '#/src/components/ui/heading'
import {Text} from '#/src/components/ui/text'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{title: 'Oops!'}} />
      <ThemedView style={styles.container}>
        <Heading>This screen doesn't exist.</Heading>
        <Link href="/" style={styles.link}>
          <Text>Go to home screen!</Text>
        </Link>
      </ThemedView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
})
