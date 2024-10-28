import {Stack} from 'expo-router'

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'index'} options={{headerShown: false}} />
      <Stack.Screen name={'birthday'} options={{headerShown: false}} />
      <Stack.Screen name={'currenttown'} options={{headerShown: false}} />
      <Stack.Screen name={'description'} options={{headerShown: false}} />
      <Stack.Screen name={'fullname'} options={{headerShown: false}} />
      <Stack.Screen name={'gender'} options={{headerShown: false}} />
      <Stack.Screen name={'hometown'} options={{headerShown: false}} />
      <Stack.Screen name={'interests'} options={{headerShown: false}} />
      <Stack.Screen name={'lookingfor'} options={{headerShown: false}} />
      <Stack.Screen name={'relationship'} options={{headerShown: false}} />
      <Stack.Screen name={'username'} options={{headerShown: false}} />
    </Stack>
  )
}
