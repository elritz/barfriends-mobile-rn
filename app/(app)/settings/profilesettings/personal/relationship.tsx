import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

import {Box} from '#/src/components/ui/box'
import {Text} from '#/src/components/ui/text'

interface StatusScreenProps {}

export default ({}: StatusScreenProps) => {
  // list of 30 items
  const list = [
    {
      id: 1,
      name: 'John Doe',
      status: 'online',
    },
    {
      id: 2,
      name: 'Jane Doe',
      status: 'offline',
    },
  ]

  return (
    <Box className="flex-column">
      <KeyboardAwareScrollView
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps={'always'}
        extraScrollHeight={100}
        style={{height: '100%'}}>
        {list.map(item => {
          return <Text key={item.id}>{item.name}</Text>
        })}
      </KeyboardAwareScrollView>
    </Box>
  )
}
