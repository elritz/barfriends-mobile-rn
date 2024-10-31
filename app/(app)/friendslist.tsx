import {useReactiveVar} from '@apollo/client'
import {ScrollView} from 'react-native'

import {ThemeReactiveVar} from '#/reactive'
import {Button, ButtonIcon} from '#/src/components/ui/button'
import {AddIcon} from '#/src/components/ui/icon'
import {Input} from '#/src/components/ui/input'
import {Text} from '#/src/components/ui/text'

export default function NewConversation() {
  const rTheme = useReactiveVar(ThemeReactiveVar)
  return (
    <>
      <Input
        variant="underlined"
        className="items-center border border-gray-300 px-4">
        <Text className="mr-2 text-sm text-gray-400">To:</Text>
        <Input
          borderWidth={'$0'}
          returnKeyType="default"
          underlineColorAndroid="transparent"
          keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
        />
        <Button
          size="sm"
          hitSlop={{
            top: 12,
            bottom: 12,
            left: 12,
            right: 12,
          }}
          onPress={() => {
            console.log('OPEN SECONDARY modal')
          }}
          className="h-5 w-5 rounded-full border border-primary-500 px-0">
          <ButtonIcon as={AddIcon} />
        </Button>
      </Input>
      <ScrollView />
      <Text> NEW conversation</Text>
    </>
  )
}
