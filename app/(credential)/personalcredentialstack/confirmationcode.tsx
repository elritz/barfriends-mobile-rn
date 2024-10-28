import {useEffect, useState} from 'react'
import {InputAccessoryView, Platform, View} from 'react-native'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import {useReanimatedKeyboardAnimation} from 'react-native-keyboard-controller'
import Reanimated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useLocalSearchParams, useRouter} from 'expo-router'
// TODO: FN(onPress(Resend Code)) - ln:162 -- when the user presses resend code need to resend and keep track of how many times
import {useReactiveVar} from '@apollo/client'
import {Feather} from '@expo/vector-icons'
import {useIsFocused} from '@react-navigation/native'
import {Controller, useForm, ValidateResult} from 'react-hook-form'

import {
  CredentialPersonalProfileReactiveVar,
  ThemeReactiveVar,
} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Button, ButtonText} from '#/src/components/ui/button'
import {Heading} from '#/src/components/ui/heading'
import {Pressable} from '#/src/components/ui/pressable'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'
import useContentInsets from '#/src/util/hooks/useContentInsets'
import useTimer from '#/src/util/hooks/useTimer2'

export default () => {
  const INPUT_ACCESSORY_VIEW_ID = 'cc-1298187263'
  const INPUT_CONTAINER_HEIGHT = 90
  const router = useRouter()
  const params = useLocalSearchParams()
  const {height: platform} = useReanimatedKeyboardAnimation()
  const contentInsets = useContentInsets()
  const {bottom} = useSafeAreaInsets()
  const isScreenFocused = useIsFocused()
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const credentialPersonalProfileVar = useReactiveVar(
    CredentialPersonalProfileReactiveVar,
  )
  const CELL_COUNT = String(params?.code).length
  const ref = useBlurOnFulfill({
    value: String(params?.code),
    cellCount: CELL_COUNT,
  })
  const [codeValue, setCodeValue] = useState('')

  const {start, isFinished, seconds} = useTimer('9')

  const height = useDerivedValue(() => platform.value, [isScreenFocused])

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

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: codeValue,
    setValue: setCodeValue,
  })

  useEffect(() => {
    start()
  }, [start])

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      code: '',
    },
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  })

  const checkFinalCode = (value: string): ValidateResult => {
    if (value !== params?.code) {
      return false
    } else {
      return true
    }
  }

  const onSubmit = (data: {code: any}) => {
    const {code} = data

    if (code !== params?.code) {
      return setError('code', {type: 'validate', message: 'Invalid code'})
    }
    clearErrors()
    if (checkFinalCode(code)) {
      router.replace({
        pathname: '/(credential)/personalcredentialstack/birthday',
      })
    } else {
      setError('code', {type: 'validate', message: 'Wrong code'})
    }
  }

  useEffect(() => {
    if (watch('code').length === CELL_COUNT) {
      onSubmit({
        code: watch('code'),
      })
    }
  }, [watch('code'), CELL_COUNT])

  const InnerContent = () => {
    return (
      <Box
        className={` ${isScreenFocused ? 'flex' : 'hidden'} h-[90px] flex-row content-around justify-between bg-white px-2 dark:bg-black`}>
        <Box className="justify-around bg-transparent">
          {isFinished ? (
            <VStack space={'sm'} className="justify-around">
              <Button variant={'link'} size={'md'} className="justify-start">
                <ButtonText>Resend code</ButtonText>
              </Button>
              <Button
                variant={'link'}
                size={'md'}
                onPress={() => router.back()}
                className="justify-start">
                <ButtonText>Update information</ButtonText>
              </Button>
            </VStack>
          ) : (
            <Text>
              Resend code in 0:
              {seconds}
            </Text>
          )}
        </Box>
        <VStack className="justify-around">
          <Pressable
            accessibilityRole="button"
            disabled={!!errors.code}
            onPress={handleSubmit(onSubmit)}>
            <Box className="h-[50px] w-[50px] items-center justify-center rounded-full bg-primary-500">
              <Feather
                name="arrow-right"
                size={32}
                color={errors?.code ? '#292524' : 'white'}
              />
            </Box>
          </Pressable>
        </VStack>
      </Box>
    )
  }

  return (
    <Box className="flex-1 bg-transparent">
      <Reanimated.View style={{flex: 1, marginHorizontal: 15}}>
        <Heading className="mt-4 min-h-[70px] text-2xl font-black">
          {`Enter the 4-diget code sent to you at ${
            credentialPersonalProfileVar.email
              ? credentialPersonalProfileVar.email
              : credentialPersonalProfileVar?.phone?.completeNumber
          }`}
        </Heading>
        <View style={{alignSelf: 'center', width: '80%'}}>
          <Controller
            name="code"
            control={control}
            render={({field: {value: codeValue, onChange, onBlur}}) => (
              <CodeField
                {...props}
                inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
                ref={ref}
                value={codeValue}
                onChangeText={value => onChange(value)}
                cellCount={CELL_COUNT}
                // autoComplete={'one-time-code'}
                rootStyle={{
                  marginVertical: 10,
                }}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                onSubmitEditing={handleSubmit(onSubmit)}
                onBlur={onBlur}
                keyboardAppearance={
                  rTheme.colorScheme === 'light' ? 'light' : 'dark'
                }
                blurOnSubmit={false}
                autoFocus
                onEndEditing={handleSubmit(onSubmit)}
                renderCell={({index, symbol, isFocused}) => (
                  <Box
                    key={index}
                    onLayout={getCellOnLayoutHandler(index)}
                    className={` ${isFocused ? 'border-b-2' : 'border-b'} ${!isFocused ? 'border-b-[#ccc]' : 'border-b-[#007AFF]'} h-[60px] w-[50px] items-center justify-center rounded-none bg-transparent`}>
                    <Heading className="text-3xl text-primary-500">
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Heading>
                  </Box>
                )}
              />
            )}
            rules={{
              required: {
                value: true,
                message: '',
              },
              validate: {
                checkLength: value => value.length === CELL_COUNT,
                checkFinalCode: value =>
                  checkFinalCode(value) ||
                  "The SMS passcode you've entered is incorrect.",
              },
            }}
          />
          <Text className="text-sm text-error-700">
            {errors?.code?.message}
          </Text>
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
