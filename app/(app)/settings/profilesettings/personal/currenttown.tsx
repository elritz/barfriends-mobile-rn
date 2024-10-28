import {useState} from 'react'
import {View} from 'react-native'
import {useReactiveVar} from '@apollo/client'

import {ThemeReactiveVar} from '#/reactive'
import {Input, InputField} from '#/src/components/ui/input'

interface CurrentPlacceScreenProps {}

export default ({}: CurrentPlacceScreenProps) => {
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const [search, setSearch] = useState<string>('')

  return (
    <View>
      <Input
        style={{
          backgroundColor: 'transparent',
          width: '95%',
          alignSelf: 'center',
          paddingHorizontal: 5,
          borderRadius: 14,
        }}>
        <InputField
          style={{
            color:
              rTheme.colorScheme === 'light'
                ? rTheme.theme?.gluestack.tokens.colors.light900
                : rTheme.theme?.gluestack.tokens.colors.light100,
            borderBottomColor: 'transparent',
            backgroundColor:
              rTheme.colorScheme === 'light'
                ? rTheme.theme?.gluestack.tokens.colors.light50
                : rTheme.theme?.gluestack.tokens.colors.light900,
          }}
          placeholder="Search..."
          onChangeText={(text: string) => setSearch(text)}
          value={search}
          keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
        />
      </Input>
    </View>
  )
}
