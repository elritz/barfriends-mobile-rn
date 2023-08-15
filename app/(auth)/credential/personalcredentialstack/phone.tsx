import { useReactiveVar } from '@apollo/client'
import { Heading, Text, Pressable, VStack, Box, Input } from '@components/core'
import { Feather } from '@expo/vector-icons'
import { useSendAuthenticatorDeviceOwnerCodeMutation } from '@graphql/generated'
import { useIsFocused } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar, ThemeReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { CountryCode } from 'libphonenumber-js'
import { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
	View,
	TextInput,
	InteractionManager,
	InputAccessoryView,
	Platform,
	KeyboardAvoidingView,
} from 'react-native'
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller'
import Reanimated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export type FormType = {
	countrySelector: CountrySelector
	mobileNumber: {
		number: string
		completeNumber: string
	}
}

export type CountrySelector = {
	countryCode: CountryCode
	countryCallingCode: string
}

export default () => {
	const INPUT_ACCESSORY_VIEW_ID = 'p-1298187263'
	const router = useRouter()
	const { bottom } = useSafeAreaInsets()
	const isFocused = useIsFocused()
	const _phonenumberRef = useRef<TextInput>()
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)
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

	const {
		control,
		handleSubmit,
		setValue,
		clearErrors,
		setError,
		getValues,
		formState: { errors },
	} = useForm<FormType>({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			mobileNumber: {
				number: '',
				completeNumber: '',
			},
			countrySelector: {
				countryCallingCode: '+1',
				countryCode: 'CA',
			},
		},
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const [sendCode, { data, loading, error }] = useSendAuthenticatorDeviceOwnerCodeMutation({
		onCompleted: async data => {
			switch (data.sendAuthenticatorDeviceOwnerCode?.__typename) {
				case 'Error':
					setError('mobileNumber.number', {
						type: 'validate',
						message: 'Unable to send phone number',
					})
					break
				case 'Code':
					router.push({
						pathname: '(app)/credential/personalcredentialstack/confirmationcode',
						params: {
							code: String(data.sendAuthenticatorDeviceOwnerCode.code),
						},
					})
					break
			}
		},
	})

	const onSubmit = data => {
		CredentialPersonalProfileReactiveVar({
			...credentialPersonalProfileVar,
			email: '',
			phone: {
				...credentialPersonalProfileVar.phone,
				number: data.mobileNumber.number,
				completeNumber: data.mobileNumber.number,
			},
		})
		sendCode({
			variables: {
				where: {
					Authenticators: {
						PhoneInput: {
							number: data.mobileNumber.number,
							completeNumber: data.mobileNumber.number,
						},
					},
				},
			},
		})
	}

	useEffect(() => {
		setValue('countrySelector', { countryCode: 'CA', countryCallingCode: '+1' })
	}, [])

	useEffect(() => {
		if (isFocused && _phonenumberRef.current) {
			InteractionManager.runAfterInteractions(() => {
				_phonenumberRef.current?.focus()
			})
		}
		if (!isFocused) {
			InteractionManager.runAfterInteractions(() => {
				_phonenumberRef.current?.blur()
			})
		}
	}, [isFocused])

	const InnerContent = () => {
		return (
			<VStack
				display={isFocused ? 'flex' : 'none'}
				flexDirection={'row'}
				justifyContent={'flex-end'}
				alignItems='center'
				alignContent={'space-around'}
				px={'$2'}
				sx={{
					h: 90,
					_dark: {
						bg: '$black',
					},
					_light: {
						bg: '$white',
					},
				}}
			>
				<VStack
					flex={2}
					display={'flex'}
					flexDirection={'column'}
					justifyContent={'space-around'}
					px={'$2'}
				>
					<Text>
						By continuing you may receive an SMS for verification. Message and data rates may apply.
					</Text>
				</VStack>

				<Pressable
					disabled={!!errors.mobileNumber?.completeNumber || loading}
					onPress={handleSubmit(onSubmit)}
				>
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
						<Feather
							name='arrow-right'
							size={32}
							color={errors?.mobileNumber?.completeNumber ? '#292524' : 'white'}
						/>
					</Box>
				</Pressable>
			</VStack>
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
			}}
		>
			<Reanimated.View style={{ flex: 1 }}>
				<VStack sx={{ h: 110 }}>
					<Heading mt={'$4'} fontWeight={'$black'} fontSize={'$3xl'}>
						Enter your mobile number
					</Heading>
					<Pressable
						onPress={() => {
							router.push({
								pathname: '(app)/credential/personalcredentialstack/email',
							})
						}}
						sx={{
							w: 100,
							h: 'auto',
						}}
						pb={'$3'}
					>
						<Text fontSize={'$md'} fontWeight={'$bold'} color={'$primary500'}>
							Use email
						</Text>
					</Pressable>
				</VStack>
				<View style={{ width: '100%' }}>
					<Controller
						name='mobileNumber.completeNumber'
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input variant={'underlined'} size='lg'>
								<Input.Input
									keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
									value={value}
									type='text'
									py={'$2'}
									autoFocus
									sx={{
										h: 50,
									}}
									key={'mobileNumber.completeNumber'}
									inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
									textContentType='telephoneNumber'
									autoComplete='tel'
									keyboardType='phone-pad'
									placeholder='Mobile Number'
									returnKeyType={Platform.OS === 'ios' ? 'done' : 'none'}
									numberOfLines={1}
									blurOnSubmit={false}
									enablesReturnKeyAutomatically={false}
									// onSubmitEditing={handleSubmit(onSubmit)}
									onBlur={onBlur}
									onChangeText={value => {
										onChange(value)
										const replaced = value.replace(/\D/g, '')
										setValue('mobileNumber.number', replaced)
									}}
								/>
							</Input>
						)}
						rules={{
							required: {
								value: true,
								message: '️A mobile number is required to continue.',
							},
						}}
					/>
					<Text fontSize={'$md'} color={'$error500'}>
						{errors?.mobileNumber?.completeNumber?.message}
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
					]}
				>
					<InnerContent />
				</Reanimated.View>
			)}
		</KeyboardAvoidingView>
	)
}
