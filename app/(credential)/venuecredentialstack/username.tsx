import {useRef} from 'react'
import {InputAccessoryView, Platform, TextInput} from 'react-native'
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
import {Controller, useForm, ValidateResult} from 'react-hook-form'

import {useCheckUsernameLazyQuery} from '#/graphql/generated'
import {
  CredentialPersonalProfileReactiveVar,
  ThemeReactiveVar,
} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Heading} from '#/src/components/ui/heading'
import {Input, InputField, InputSlot} from '#/src/components/ui/input'
import {Pressable} from '#/src/components/ui/pressable'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'

const username = () => {
  const INPUT_ACCESSORY_VIEW_ID = 'un-1298187263'
  const {bottom} = useSafeAreaInsets()
  const router = useRouter()
  const isFocused = useIsFocused()
  const credentialPersonalProfileVar = useReactiveVar(
    CredentialPersonalProfileReactiveVar,
  )
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const _usernameRef = useRef<TextInput>(null)

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

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      username: '',
    },
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  })

  const values = getValues()

  const [checkUsername, {data: CUData, loading: CULoading}] =
    useCheckUsernameLazyQuery({
      fetchPolicy: 'no-cache',
      variables: {
        username: values.username,
      },
      onCompleted(data) {
        if (!data.checkUsername) {
          setError('username', {
            type: 'validate',
            message: 'Username has been taken',
          })
        } else {
          clearErrors()
        }
      },
    })

  const onSubmit = (data: any) => {
    CredentialPersonalProfileReactiveVar({
      ...credentialPersonalProfileVar,
      username: data.username,
    })
    router.push({
      pathname: '/(credential)/personalcredentialstack/password',
    })
  }

  const validateCheckUsername = async (
    value: string,
  ): Promise<ValidateResult> => {
    setTimeout(() => {
      checkUsername()
    }, 500)
    if (!CULoading && CUData?.checkUsername) {
      return true
    } else {
      setError('username', {type: 'validate', message: 'Username taken!'})
      return false
    }
  }

  const InnerContent = () => {
    return (
      <Box className="h-[90px] flex-row justify-end bg-white px-2 dark:bg-black">
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}
          className="bg-transparent">
          <Pressable
            accessibilityRole="button"
            disabled={!!errors.username || CULoading}
            onPress={handleSubmit(onSubmit)}>
            <Box className="h-[50px] w-[50px] items-center justify-center rounded-full bg-primary-500">
              <Feather
                name="arrow-right"
                size={32}
                color={errors?.username ? '#292524' : 'white'}
              />
            </Box>
          </Pressable>
        </Box>
      </Box>
    )
  }
  const InputRightIcon = () => {
    return (
      <Box className="w-[35px] items-center justify-center bg-transparent">
        {values.username.length && CUData?.checkUsername ? (
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={
              errors.username || !CUData?.checkUsername ? '#ef4444' : '#ff7000'
            }
          />
        ) : null}
      </Box>
    )
  }

  return (
    <Box className="flex-1 bg-transparent">
      <Reanimated.View style={{flex: 1, marginHorizontal: 15}}>
        <Heading className="mt-4 text-2xl font-black">
          Choose your username
        </Heading>
        <VStack space="xs" className="my-6 flex-1">
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                key={'username'}
                variant={'underlined'}
                size={'lg'}
                className="py-1">
                <InputField
                  ref={_usernameRef}
                  type="text"
                  value={value}
                  key="username"
                  placeholder="Username"
                  keyboardAppearance={
                    rTheme.colorScheme === 'light' ? 'light' : 'dark'
                  }
                  onChangeText={onChange}
                  onSubmitEditing={handleSubmit(onSubmit)}
                  onBlur={onBlur}
                  autoCorrect={false}
                  contextMenuHidden
                  spellCheck={false}
                  autoFocus
                  textContentType="nickname"
                  autoComplete="username-new"
                  returnKeyType="done"
                  numberOfLines={1}
                  keyboardType="default"
                  autoCapitalize="none"
                  inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
                  blurOnSubmit={false}
                />
                <InputSlot>
                  <InputRightIcon />
                </InputSlot>
              </Input>
            )}
            rules={{
              required: {
                value: true,
                message: '',
              },
              validate: {
                greaterThanZero: value => value.length > 0 || '',
                greaterQualThanFour: value => value.length >= 1 || '',
                noSpaces: value =>
                  /^[\S]+$/.test(value) || 'No spaces are allowed',
                validateCheckUsername: async value =>
                  (await validateCheckUsername(value)) || '',
              },
            }}
          />
          <Text className="text-sm text-error-700">
            {errors?.username?.message}
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
    </Box>
  )
}

export default username
