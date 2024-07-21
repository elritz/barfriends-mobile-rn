import { VStack } from "#/components/ui/vstack";
import { Text } from "#/components/ui/text";
import { Pressable } from "#/components/ui/pressable";
import { Heading } from "#/components/ui/heading";
import { Button, ButtonText } from "#/components/ui/button";
import { Box } from "#/components/ui/box";
// TODO: FN(onPress(Resend Code)) - ln:162 -- when the user presses resend code need to resend and keep track of how many times
import { useReactiveVar } from '@apollo/client'
import { Feather } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar, ThemeReactiveVar } from '#/reactive'
import useTimer2 from '#/util/hooks/useTimer2'
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Controller, useForm, ValidateResult } from 'react-hook-form'
import { InputAccessoryView, Platform, View } from 'react-native'
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller'
import Reanimated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
	const INPUT_ACCESSORY_VIEW_ID = 'cc-12981123123263'
	const INPUT_CONTAINER_HEIGHT = 90
	const router = useRouter()
	const params = useLocalSearchParams()

	const { bottom } = useSafeAreaInsets()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const isFocused = useIsFocused()
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const { start, finished, seconds, isFinished } = useTimer2('5')
	const [codeValue, setCodeValue] = useState('')
	const { height: platform } = useReanimatedKeyboardAnimation()

	const CELL_COUNT = String(params?.code).length
	const ref = useBlurOnFulfill({ value: params?.code, cellCount: CELL_COUNT })
	const height = useDerivedValue(() => platform.value, [isFocused])


	const textInputContainerStyle = useAnimatedStyle(
		() => ({
			width: '100%',
			position: 'absolute',
			bottom: 0,
			paddingBottom: bottom,
			height: INPUT_CONTAINER_HEIGHT,
			transform: [{ translateY: height.value }],
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
		formState: { errors },
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

	const onSubmit = (data: { code: any }) => {
		const { code } = data

		if (code !== params?.code) {
			return setError('code', { type: 'validate', message: 'Invalid code' })
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
			setError('code', { type: 'validate', message: 'Wrong code' })
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
	}, [watch('code')])

	const InnerContent = () => {
		return (
            <Box
                className={` ${isFocused ? "flex" : "hidden"} rounded-none flex-row justify-between content-around px-2 h-[80px]  dark:bg-black bg-white `}>
                <Box className="bg-transparent justify-around">
					{isFinished ? (
						<VStack space={'md'} className="justify-around">
							<Button
								variant='link'
								size={'md'}
								onPress={() => router.back()}
								className="justify-start"
							>
								<ButtonText>Resend code</ButtonText>
							</Button>
							<Button
								variant={'link'}
								size={'md'}
								onPress={() => router.back()}
								className="justify-start"
							>
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
					<Pressable disabled={!!errors.code} onPress={handleSubmit(onSubmit)}>
						<Box
                            className="items-center justify-center h-[50px]  w-[50px] rounded-full bg-primary-500">
							<Feather name='arrow-right' size={32} color={errors?.code ? '#292524' : 'white'} />
						</Box>
					</Pressable>
				</VStack>
            </Box>
        );
	}

	return (
        <Box className="rounded-none bg-transparent flex-1">
            <Reanimated.View style={{ flex: 1, marginHorizontal: 15 }}>
				<Heading className="mt-4 font-black text-2xl">
					{`Enter the 4-diget code sent to you at ${credentialPersonalProfileVar.email
						? credentialPersonalProfileVar.email
						: credentialPersonalProfileVar?.phone?.completeNumber
						}`}
				</Heading>
				<View style={{ alignSelf: 'center', width: '80%' }}>
					<Controller
						name='code'
						control={control}
						render={({ field: { value, onChange, onBlur } }) => (
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
								keyboardType='number-pad'
								textContentType='oneTimeCode'
								onSubmitEditing={handleSubmit(onSubmit)}
								onBlur={onBlur}
								blurOnSubmit={false}
								autoFocus
								onEndEditing={handleSubmit(onSubmit)}
								keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
								renderCell={({ index, symbol, isFocused }) => (
									<Box
                                        key={index}
                                        onLayout={getCellOnLayoutHandler(index)}
                                        className={` ${isFocused ? "border-b-2" : "border-b"} ${!isFocused ? "border-b-[#ccc]" : "border-b-[#007AFF]"} bg-transparent h-[50px]  w-[60px] justify-center items-center `}>
										<Heading className="text-primary-500 text-3xl">
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
									checkFinalCode(value) || "The SMS passcode you've entered is incorrect.",
							},
						}}
					/>
					<Text style={{ color: 'red' }}>{errors?.code?.message}</Text>
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
					]}
				>
					<InnerContent />
				</Reanimated.View>
			)}
        </Box>
    );
}
