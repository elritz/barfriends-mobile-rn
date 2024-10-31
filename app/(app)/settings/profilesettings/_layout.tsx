import {Stack} from 'expo-router'

export default () => {
  return (
    <Stack screenOptions={{presentation: 'modal'}}>
      <Stack.Screen
        name={'personal'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'venue'}
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}
