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
import useTimer2 from '#/src/util/hooks/useTimer2'

export default () => {
  const INPUT_ACCESSORY_VIEW_ID = 'cc-12981123123263'
  const INPUT_CONTAINER_HEIGHT = 90
  const router = useRouter()
  const params = useLocalSearchParams()

  const {bottom} = useSafeAreaInsets()
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const isFocused = useIsFocused()
  const credentialPersonalProfileVar = useReactiveVar(
    CredentialPersonalProfileReactiveVar,
  )
  const {start, seconds, isFinished} = useTimer2('5')
  const [codeValue, setCodeValue] = useState('')
  const {height: platform} = useReanimatedKeyboardAnimation()

  const CELL_COUNT = String(params?.code).length
  const ref = useBlurOnFulfill({value: params?.code, cellCount: CELL_COUNT})
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

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: codeValue,
    setValue: setCodeValue,
  })

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
        params: {
          authenticator: params.authenticator,
        },
        pathname: '/(credential)/logincredentialstack/devicemanager',
      })
    } else {
      setError('code', {type: 'validate', message: 'Wrong code'})
    }
  }

  useEffect(() => {
    start()
  }, [])

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
        className={` ${isFocused ? 'flex' : 'hidden'} h-[80px] flex-row content-around justify-between rounded-none bg-white px-2 dark:bg-black`}>
        <Box className="justify-around bg-transparent">
          {isFinished ? (
            <VStack space={'md'} className="justify-around">
              <Button
                variant="link"
                size={'md'}
                onPress={() => router.back()}
                className="justify-start">
                <ButtonText>Resend code</ButtonText>
              </Button>
              <Button
                variant={'link'}
                size={'md'}
                onPress={() => router.back()}
                className="justify-start">
                <ButtonText>Update phone number</ButtonText>
              </Button>
            </VStack>
          ) : (
            <Text>
              Resend code in 0:0
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
    <Box className="flex-1 rounded-none bg-transparent">
      <Reanimated.View style={{flex: 1, marginHorizontal: 15}}>
        <Heading className="mt-4 text-2xl font-black">
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
            render={({field: {value, onChange, onBlur}}) => (
              <CodeField
                {...props}
                inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
                ref={ref}
                value={value}
                onChangeText={value => onChange(value)}
                cellCount={CELL_COUNT}
                rootStyle={{
                  marginVertical: 10,
                }}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                onSubmitEditing={handleSubmit(onSubmit)}
                onBlur={onBlur}
                blurOnSubmit={false}
                autoFocus
                onEndEditing={handleSubmit(onSubmit)}
                keyboardAppearance={
                  rTheme.colorScheme === 'light' ? 'light' : 'dark'
                }
                renderCell={({index, symbol, isFocused}) => (
                  <Box
                    key={index}
                    onLayout={getCellOnLayoutHandler(index)}
                    className={` ${isFocused ? 'border-b-2' : 'border-b'} ${!isFocused ? 'border-b-[#ccc]' : 'border-b-[#007AFF]'} h-[50px] w-[60px] items-center justify-center bg-transparent`}>
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
          <Text style={{color: 'red'}}>{errors?.code?.message}</Text>
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
