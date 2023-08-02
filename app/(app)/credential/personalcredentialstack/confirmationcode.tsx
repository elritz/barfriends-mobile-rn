// TODO: FN(onPress(Resend Code)) - ln:162 -- when the user presses resend code need to resend and keep track of how many times
import { useReactiveVar } from '@apollo/client'
import { Box, Button, Heading, Pressable, Text, VStack } from '@components/core'
import { Feather } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import {
	ConfirmationCodeReactiveVar,
	CredentialPersonalProfileReactiveVar,
	ThemeReactiveVar,
} from '@reactive'
import Countdown from '@util/hooks/useTimer'
import { useLocalSearchParams, useRouter } from 'expo-router'
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
	const INPUT_ACCESSORY_VIEW_ID = 'cc-1298187263'
	const router = useRouter()
	const params = useLocalSearchParams()
	const { bottom } = useSafeAreaInsets()
	const isFocused = useIsFocused()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const confirmationCode = useReactiveVar(ConfirmationCodeReactiveVar)
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const CELL_COUNT = String(params?.code).length
	const ref = useBlurOnFulfill({ value: confirmationCode.code, cellCount: CELL_COUNT })

	const { num, complete } = Countdown(9)
	const [codeValue, setCodeValue] = useState('')

	const { height: platform } = useReanimatedKeyboardAnimation()
	const INPUT_CONTAINER_HEIGHT = 90

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
				pathname: '(app)/credential/personalcredentialstack/birthday',
			})
		} else {
			setError('code', { type: 'validate', message: 'Wrong code' })
		}
	}

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
				display={isFocused ? 'flex' : 'none'}
				flexDirection={'row'}
				justifyContent={'space-between'}
				alignContent={'space-around'}
				sx={{
					h: 90,
					_dark: {
						bg: '$black',
					},
					_light: {
						bg: '$white',
					},
				}}
				px={'$2'}
			>
				<Box bg={'$transparent'} justifyContent={'space-around'}>
					{complete ? (
						<VStack space={'sm'} justifyContent={'space-around'}>
							<Button
								variant={'link'}
								size={'md'}
								justifyContent={'flex-start'}
								// onPress={() => navigation.goBack()}
							>
								{/* <Text fontSize={'lg'}>Resend code</Text> */}
								<Text>Resend code</Text>
							</Button>
							<Button
								variant={'link'}
								size={'md'}
								justifyContent={'flex-start'}
								onPress={() => router.back()}
							>
								<Text>Update phone number</Text>
							</Button>
						</VStack>
					) : (
						<Text>
							Resend code in 0:0
							{num}
						</Text>
					)}
				</Box>
				<VStack justifyContent={'space-around'}>
					<Pressable disabled={!!errors.code} onPress={handleSubmit(onSubmit)}>
						<Box
							alignItems='center'
							justifyContent='center'
							sx={{
								h: 50,
								w: 50,
							}}
							rounded={'$full'}
							bg='$primary500'
						>
							<Feather name='arrow-right' size={32} color={errors?.code ? '#292524' : 'white'} />
						</Box>
					</Pressable>
				</VStack>
			</Box>
		)
	}

	return (
		<Box bg='$transparent' flex={1}>
			<Reanimated.View style={{ flex: 1, marginHorizontal: 15 }}>
				<Heading mt={'$4'} fontWeight={'$black'} fontSize={'$3xl'} sx={{ minHeight: 70 }}>
					{`Enter the 4-diget code sent to you at ${
						credentialPersonalProfileVar.email
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
								// autoComplete={'one-time-code'}
								rootStyle={{
									marginVertical: 10,
								}}
								keyboardType='number-pad'
								textContentType='oneTimeCode'
								onSubmitEditing={handleSubmit(onSubmit)}
								onBlur={onBlur}
								keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
								blurOnSubmit={false}
								autoFocus
								onEndEditing={handleSubmit(onSubmit)}
								renderCell={({ index, symbol, isFocused }) => (
									<Box
										bg='$transparent'
										key={index}
										sx={{
											w: 50,
											h: 60,
										}}
										rounded={'$none'}
										justifyContent={'center'}
										alignItems={'center'}
										borderBottomColor={!isFocused ? '#ccc' : '#007AFF'}
										borderBottomWidth={isFocused ? '$2' : '$1'}
										onLayout={getCellOnLayoutHandler(index)}
									>
										<Heading color={'$primary500'} fontSize={'$3xl'}>
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
	)
}
