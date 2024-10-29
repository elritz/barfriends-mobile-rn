import {useState} from 'react'
import {InputAccessoryView, KeyboardAvoidingView, Platform} from 'react-native'
import {useReanimatedKeyboardAnimation} from 'react-native-keyboard-controller'
import Reanimated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {Feather, Ionicons} from '@expo/vector-icons'
import {useIsFocused} from '@react-navigation/native'
import {Controller, useForm} from 'react-hook-form'

import {
  useAuthorizedProfilesLazyQuery,
  useSendAuthenticatorDeviceOwnerCodeMutation,
} from '#/graphql/generated'
import {ThemeReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Button, ButtonText} from '#/src/components/ui/button'
import {HStack} from '#/src/components/ui/hstack'
import {Input, InputField} from '#/src/components/ui/input'
import {Pressable} from '#/src/components/ui/pressable'
import {VStack} from '#/src/components/ui/vstack'

export type FormType = {
  authenticator: string
}

export default () => {
  const INPUT_ACCESSORY_VIEW_ID = 'a-213123w'
  const router = useRouter()
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const isFocused = useIsFocused()
  const {bottom} = useSafeAreaInsets()
  const [keyboardType, setKeyboardType] = useState('number-pad')
  const {height: platform} = useReanimatedKeyboardAnimation()
  const INPUT_CONTAINER_HEIGHT = 90

  const height = useDerivedValue(() => platform.value, [isFocused])

  const textInputContainerStyle = useAnimatedStyle(
    () => ({
      width: '100%',
      position: 'absolute',
      bottom: 0,
      paddingBottom: bottom,
      height: INPUT_CONTAINER_HEIGHT,
      transform: [{translateY: height.value}],
    }),
    [],
  )

  const InnerContent = () => {
    return (
      <Box
        className={` ${isFocused ? 'flex' : 'hidden'} h-[80px] flex-row content-around items-center justify-between rounded-none bg-white px-2 dark:bg-black`}>
        <Pressable
          accessibilityRole="button"
          onPress={() =>
            keyboardType === 'number-pad'
              ? setKeyboardType('email')
              : setKeyboardType('number-pad')
          }
          className="p-2 pr-3">
          <Ionicons
            name="text-sharp"
            size={29}
            color={
              keyboardType === 'email'
                ? rTheme.theme?.gluestack.tokens.colors.primary500
                : rTheme.colorScheme === 'light'
                  ? rTheme.theme?.gluestack.tokens.colors.light900
                  : rTheme.theme?.gluestack.tokens.colors.light100
            }
          />
        </Pressable>
        <HStack className="flex-row justify-around">
          <Pressable
            accessibilityRole="button"
            disabled={sendCodeLoading}
            onPress={handleSubmit(onSubmit)}>
            <Box className="h-[50px] w-[50px] items-center justify-center rounded-full bg-primary-500">
              <Feather
                name="arrow-right"
                size={32}
                color={errors?.authenticator ? '#292524' : 'white'}
              />
            </Box>
          </Pressable>
        </HStack>
      </Box>
    )
  }

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: {errors},
  } = useForm<FormType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      authenticator: '',
    },
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  })

  const [sendCode, {loading: sendCodeLoading}] =
    useSendAuthenticatorDeviceOwnerCodeMutation({})

  const [authorizedProfilesV2Query] = useAuthorizedProfilesLazyQuery({
    fetchPolicy: 'network-only',
  })

  const onSubmit = (data: {authenticator: string}) => {
    const authenticatorClean = data.authenticator.replace(/[^a-zA-Z0-9]/g, '')
    const authenticatorNumberOnly = data.authenticator.replace(/\D/g, '')

    authorizedProfilesV2Query({
      variables: {
        where: {
          profiles: {
            username: authenticatorClean,
            email: data.authenticator,
            Phone: {
              number: authenticatorNumberOnly,
            },
          },
        },
      },
      onCompleted(data) {
        switch (data.authorizedProfiles?.__typename) {
          case 'ProfilesResponse':
            if (data.authorizedProfiles?.username?.length) {
              router.push({
                pathname: '/(credential)/logincredentialstack/loginpassword',
                params: {
                  profileid: data.authorizedProfiles.username[0].id,
                  username: String(
                    data.authorizedProfiles.username[0].IdentifiableInformation
                      ?.username,
                  ),
                },
              })
            }
            if (data.authorizedProfiles?.phone?.length) {
              sendCode({
                variables: {
                  where: {
                    Authenticators: {
                      PhoneInput: {
                        number: authenticatorNumberOnly,
                      },
                    },
                  },
                },
                onCompleted: data => {
                  switch (data.sendAuthenticatorDeviceOwnerCode?.__typename) {
                    case 'Error':
                      setError('authenticator', {
                        type: 'validate',
                        message: 'Unable to send phone number',
                      })
                      break
                    case 'Code':
                      router.push({
                        pathname:
                          '/(credential)/logincredentialstack/confirmationcode',
                        params: {
                          authenticator: authenticatorNumberOnly,
                          code: data.sendAuthenticatorDeviceOwnerCode.code,
                        },
                      })
                      break
                  }
                },
              })
              if (data.authorizedProfiles.email?.length) {
                sendCode({
                  variables: {
                    where: {
                      Authenticators: {
                        EmailInput: {
                          email: authenticatorClean,
                        },
                      },
                    },
                  },
                  onCompleted: codeData => {
                    switch (
                      codeData.sendAuthenticatorDeviceOwnerCode?.__typename
                    ) {
                      case 'Error':
                        setError('authenticator', {
                          type: 'validate',
                          message: 'Unable to send phone number',
                        })
                        break
                      case 'Code':
                        router.push({
                          pathname:
                            '/(credential)/logincredentialstack/confirmationcode',
                          params: {
                            authenticator: authenticatorClean,
                            code: codeData.sendAuthenticatorDeviceOwnerCode
                              .code,
                          },
                        })
                        break
                    }
                  },
                })
              }
            }
            break
          case 'Error':
            setError('authenticator', {
              message: data.authorizedProfiles.message,
            })
            break
        }
      },
    })
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        height: 'auto',
        flexDirection: 'column',
        marginHorizontal: '5%',
      }}>
      <Reanimated.View style={{flex: 1}}>
        <VStack className="mt-12">
          <Controller
            name="authenticator"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input variant={'underlined'} size="lg" className="items-center">
                <InputField
                  key={'authenticator'}
                  placeholder="Username, phone, email"
                  keyboardAppearance={
                    rTheme.colorScheme === 'light' ? 'light' : 'dark'
                  }
                  returnKeyType="done"
                  enablesReturnKeyAutomatically
                  textContentType={
                    keyboardType === 'number-pad'
                      ? 'telephoneNumber'
                      : 'emailAddress'
                  }
                  autoComplete={
                    keyboardType === 'number-pad' ? 'cc-number' : 'email'
                  }
                  keyboardType={
                    keyboardType === 'number-pad'
                      ? 'number-pad'
                      : 'email-address'
                  }
                  numberOfLines={1}
                  inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
                  autoCapitalize="none"
                  autoFocus
                  value={value}
                  type="text"
                  onSubmitEditing={handleSubmit(onSubmit)}
                  onBlur={onBlur}
                  blurOnSubmit={false}
                  autoCorrect={false}
                  onChangeText={value => {
                    if (keyboardType === 'number-pad') {
                      onChange(value.toLowerCase())
                      setValue('authenticator', value)
                    } else {
                      onChange(value)
                      setValue('authenticator', value.trim())
                    }
                  }}
                  className="leading-2xl h-[50px] py-2 text-2xl font-medium"
                />
              </Input>
            )}
            rules={{
              required: {
                value: true,
                message: '',
              },
            }}
          />
          {errors?.authenticator?.message ? (
            <Button
              onPress={() => {
                router.replace({
                  pathname: '/(credential)/personalcredentialstack/getstarted',
                })
              }}
              className="my-3 rounded-lg">
              <ButtonText className="font-boldc text-lg">Sign up</ButtonText>
            </Button>
          ) : null}
        </VStack>
      </Reanimated.View>
      {Platform.OS === 'ios' ? (
        <InputAccessoryView nativeID={INPUT_ACCESSORY_VIEW_ID}>
          <InnerContent />
        </InputAccessoryView>
      ) : (
        <Reanimated.View
          style={[
            {
              height: INPUT_CONTAINER_HEIGHT,
            },
            textInputContainerStyle,
          ]}>
          <InnerContent />
        </Reanimated.View>
      )}
    </KeyboardAvoidingView>
  )
}
