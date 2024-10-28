import {useState} from 'react'
import {View} from 'react-native'
import {useReactiveVar} from '@apollo/client'
import {useForm} from 'react-hook-form'

import {AuthorizationReactiveVar, ThemeReactiveVar} from '#/reactive'
import {Input, InputField} from '#/src/components/ui/input'

interface HomeTownScreenProps {}

export default ({}: HomeTownScreenProps) => {
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const [search, setSearch] = useState<string>('')

  const {
    control,
    setError,
    handleSubmit,
    reset,
    formState: {dirtyFields, errors},
  } = useForm({
    defaultValues: {
      lookfor: rAuthorizationVar?.Profile?.IdentifiableInformation?.lookfor,
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  })

  return (
    <View>
      <Input
        style={{
          backgroundColor: 'transparent',
          width: '95%',
          alignSelf: 'center',
          paddingHorizontal: 10,
        }}
        borderBottomColor={'$transparent'}
        rounded={'$md'}
        color={
          rTheme.colorScheme === 'light'
            ? rTheme.theme?.gluestack.tokens.colors.light900
            : rTheme.theme?.gluestack.tokens.colors.light100
        }
        backgroundColor={
          rTheme.colorScheme === 'light'
            ? rTheme.theme?.gluestack.tokens.colors.light100
            : rTheme.theme?.gluestack.tokens.colors.light900
        }>
        <InputField
          value={search}
          placeholder="Search..."
          onChangeText={(text: string) => setSearch(text)}
          keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
        />
      </Input>
    </View>
  )
}
