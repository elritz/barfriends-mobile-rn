import {useState} from 'react'
import {InputAccessoryView, KeyboardAvoidingView, Platform} from 'react-native'
import {useReanimatedKeyboardAnimation} from 'react-native-keyboard-controller'
import Reanimated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useLocalSearchParams, useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {Feather} from '@expo/vector-icons'
import {useIsFocused} from '@react-navigation/native'
import {Controller, useForm} from 'react-hook-form'

import {
  AuthorizationDeviceProfile,
  useLoginPasswordLazyQuery,
  useSwitchDeviceProfileMutation,
} from '#/graphql/generated'
import {AuthorizationReactiveVar, ThemeReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {HStack} from '#/src/components/ui/hstack'
import {EyeIcon, EyeOffIcon, Icon} from '#/src/components/ui/icon'
import {Input, InputField, InputSlot} from '#/src/components/ui/input'
import {Pressable} from '#/src/components/ui/pressable'
import {Spinner} from '#/src/components/ui/spinner'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'

export default () => {
  const INPUT_ACCESSORY_VIEW_ID = 'lp-21565434tw'
  const router = useRouter()
  const params = useLocalSearchParams()
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const isFocused = useIsFocused()
  const {bottom} = useSafeAreaInsets()
  const {height: platform} = useReanimatedKeyboardAnimation()
  const INPUT_CONTAINER_HEIGHT = 90

  const handleShowPassword = () => {
    setShowPassword(showState => {
      return !showState
    })
  }

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

  const {
    control,
    handleSubmit,
    setError,
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

  const [switchDeviceProfileMutation] = useSwitchDeviceProfileMutation({
    onCompleted: data => {
      if (data.switchDeviceProfile?.__typename === 'Error') {
        setError('password', {
          type: 'validate',
          message: 'Incorrect password',
        })
      }

      if (
        data.switchDeviceProfile?.__typename === 'AuthorizationDeviceProfile'
      ) {
        const deviceManager =
          data.switchDeviceProfile as AuthorizationDeviceProfile
        AuthorizationReactiveVar(deviceManager)
        router.push({
          pathname: '/(app)/hometab/venuefeed',
        })
      }
    },
  })

  const [loginPasswordQuery, {loading: LPLoading}] = useLoginPasswordLazyQuery({
    onCompleted: data => {
      if (!data.loginPassword) {
        setError('password', {
          type: 'validate',
          message: 'Incorrect password',
        })
      } else {
        switchDeviceProfileMutation({
          variables: {
            profileId: String(params.profileid),
          },
        })
      }
    },
  })

  const onSubmit = async (data: any) => {
    loginPasswordQuery({
      variables: {
        username: String(params.username),
        password: data.password,
      },
    })
  }

  const InnerContent = () => {
    return (
      <Box
        className={` ${isFocused ? 'flex' : 'hidden'} h-[80px] flex-row content-around items-center justify-end rounded-none bg-white px-2 dark:bg-black`}>
        <HStack className="flex-row justify-around">
          <Pressable
            accessibilityRole="button"
            onPress={handleSubmit(onSubmit)}>
            <Box className="h-[50px] w-[50px] items-center justify-center rounded-full bg-primary-500">
              <Feather
                name="arrow-right"
                size={32}
                color={errors?.password ? '#292524' : 'white'}
              />
            </Box>
          </Pressable>
        </HStack>
      </Box>
    )
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
        <VStack className="mt-12 h-[110px]">
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <Input
                  variant={'underlined'}
                  size="lg"
                  className="items-center">
                  <InputField
                    keyboardAppearance={
                      rTheme.colorScheme === 'light' ? 'light' : 'dark'
                    }
                    value={value}
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                    secureTextEntry={!showPassword}
                    onChangeText={value => onChange(value)}
                    onSubmitEditing={handleSubmit(onSubmit)}
                    onBlur={onBlur}
                    textContentType="password"
                    blurOnSubmit={false}
                    autoComplete={'password'}
                    autoFocus
                    returnKeyType="done"
                    autoCorrect={false}
                    inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
                    autoCapitalize="none"
                    numberOfLines={1}
                    className="leading-2xl h-[50px] py-2 text-2xl font-medium"
                  />
                  <InputSlot
                    hitSlop={15}
                    onPress={handleShowPassword}
                    className="pr-3">
                    {showPassword ? (
                      <Icon
                        as={EyeIcon}
                        size={'xl'}
                        className="text-primary-500"
                      />
                    ) : (
                      <Icon
                        as={EyeOffIcon}
                        size={'xl'}
                        className="text-primary-500"
                      />
                    )}
                  </InputSlot>
                  {LPLoading && (
                    <Spinner size="small" accessibilityLabel={'Loading...'} />
                  )}
                </Input>
              )
            }}
          />
          <Text className="text-error-500">
            {errors.password && errors.password
              ? errors?.password.message
              : null}
          </Text>
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
