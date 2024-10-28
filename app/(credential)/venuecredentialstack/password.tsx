import {useEffect, useRef, useState} from 'react'
import {InputAccessoryView, Platform, TextInput, View} from 'react-native'
import {useReanimatedKeyboardAnimation} from 'react-native-keyboard-controller'
import Reanimated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {Feather} from '@expo/vector-icons'
import {useIsFocused} from '@react-navigation/native'
import {Controller, useForm} from 'react-hook-form'

import {
  CredentialPersonalProfileReactiveVar,
  ThemeReactiveVar,
} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Heading} from '#/src/components/ui/heading'
import {EyeIcon, EyeOffIcon} from '#/src/components/ui/icon'
import {
  Input,
  InputField,
  InputIcon,
  InputSlot,
} from '#/src/components/ui/input'
import {Pressable} from '#/src/components/ui/pressable'
import {Text} from '#/src/components/ui/text'

// const ACCESS_CONTROL_OPTIONS = ['None', 'Passcode', 'Password']
// const ACCESS_CONTROL_OPTIONS_ANDROID = ['None']
// const ACCESS_CONTROL_MAP = [
//   null,
//   Keychain.ACCESS_CONTROL.DEVICE_PASSCODE,
//   Keychain.ACCESS_CONTROL.APPLICATION_PASSWORD,
//   Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
// ]
// const ACCESS_CONTROL_MAP_ANDROID = [
//   null,
//   Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
// ]
// const SECURITY_LEVEL_OPTIONS = ['Any', 'Software', 'Hardware']
// const SECURITY_LEVEL_MAP = [
//   Keychain.SECURITY_LEVEL.ANY,
//   Keychain.SECURITY_LEVEL.SECURE_SOFTWARE,
//   Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
// ]

// const SECURITY_STORAGE_OPTIONS = ['Best', 'FB', 'AES', 'RSA']
// const SECURITY_STORAGE_MAP = [
//   null,
//   Keychain.STORAGE_TYPE.FB,
//   Keychain.STORAGE_TYPE.AES,
//   Keychain.STORAGE_TYPE.RSA,
// ]

export default function () {
  const INPUT_ACCESSORY_VIEW_ID = 'pc-1298187263'
  const _passwordRef = useRef<TextInput>(null)
  const router = useRouter()
  const isFocused = useIsFocused()
  const {bottom} = useSafeAreaInsets()
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const credentialPersonalProfileVar = useReactiveVar(
    CredentialPersonalProfileReactiveVar,
  )

  const [showPassword, setShowPassword] = useState(false)
  const handleState = () => {
    setShowPassword(showState => {
      return !showState
    })
  }

  const {height: platform} = useReanimatedKeyboardAnimation()
  const INPUT_CONTAINER_HEIGHT = 90

  const height = useDerivedValue(() => platform.value, [isFocused])

  const InnerContent = () => {
    return (
      <Box className="h-[90px] flex-row items-center justify-end bg-white px-2 dark:bg-black">
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}>
          <Pressable
            accessibilityRole="button"
            disabled={!!errors.password}
            onPress={handleSubmit(onSubmit)}>
            <Box className="h-[50px] w-[50px] items-center justify-center rounded-full bg-primary-500">
              <Feather
                name="arrow-right"
                size={32}
                color={errors?.password ? '#292524' : 'white'}
              />
            </Box>
          </Pressable>
        </View>
      </Box>
    )
  }

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

  const {
    control,
    handleSubmit,
    setError,
    getValues,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      password: '',
    },
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  })

  const values = getValues()

  useEffect(() => {
    if (!values.password) {
      setError('password', {type: 'validate', message: ''})
    }
    if (_passwordRef && _passwordRef.current) {
      _passwordRef.current?.focus()
    }
  }, [])

  const navigateToNextScreen = async (): Promise<void | null> => {
    router.push({
      pathname: '/(credential)/personalcredentialstack/create',
    })
  }

  const onSubmit = async (data: any) => {
    CredentialPersonalProfileReactiveVar({
      ...credentialPersonalProfileVar,
      password: data.password,
    })

    navigateToNextScreen()
  }

  return (
    <Box className="flex-1 bg-transparent">
      <Reanimated.View style={{flex: 1, marginHorizontal: 15}}>
        <Heading className="mt-4 text-2xl font-black">Enter a password</Heading>
        <View style={{marginVertical: '10%', width: '100%'}}>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <>
                  <Input
                    key={'password'}
                    variant={'underlined'}
                    size={'lg'}
                    className="py-1">
                    <InputField
                      value={value}
                      ref={_passwordRef}
                      keyboardAppearance={
                        rTheme.colorScheme === 'light' ? 'light' : 'dark'
                      }
                      onChangeText={onChange}
                      onSubmitEditing={handleSubmit(onSubmit)}
                      onBlur={onBlur}
                      textContentType="newPassword"
                      blurOnSubmit={false}
                      type={showPassword ? 'text' : 'password'}
                      passwordRules={
                        'minlength: 20; required: lower; required: upper; required: digit; required: [-];'
                      }
                      autoComplete="new-password"
                      autoFocus
                      enablesReturnKeyAutomatically={false}
                      placeholder="Password"
                      returnKeyType="done"
                      autoCorrect={false}
                      inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
                      autoCapitalize="none"
                      numberOfLines={1}
                    />
                    <InputSlot onPress={handleState} className="pr-3">
                      {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
                      <InputIcon
                        as={showPassword ? EyeIcon : EyeOffIcon}
                        className="text-primary-500"
                      />
                    </InputSlot>
                  </Input>
                  <Text className="text-sm text-error-700">
                    {errors?.password?.message}
                  </Text>
                </>
              )
            }}
            rules={{
              required: {
                value: true,
                message: '',
              },
              validate: {
                greaterThanZero: value =>
                  value.length > 0 || 'Must have password',
                noSpaces: value => /^[\S]+$/.test(value) || 'Remove spaces!!',
                greaterQualThanFour: value =>
                  value.length >= 4 || 'Must be at least 4 characters',
                checkUppercase: value =>
                  /[A-Z]/.test(value) || 'Must have a uppercase character.',
                checkDiget: value => /\d/.test(value) || 'Must have a diget.',
                checkSpecial: value =>
                  /[#?!@$%^&)(*-]/.test(value) ||
                  'Must have a special character',
              },
            }}
          />
        </View>
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
    </Box>
  )
}
