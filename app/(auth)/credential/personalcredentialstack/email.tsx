import { useReactiveVar } from '@apollo/client'
import { Heading, Text, Pressable, VStack, Box, Input } from '@components/core'
import { Feather } from '@expo/vector-icons'
import { useSendAuthenticatorDeviceOwnerCodeMutation } from '@graphql/generated'
import { useIsFocused } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar, ThemeReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
	InputAccessoryView,
	Platform,
	View,
	TextInput,
	InteractionManager,
	KeyboardAvoidingView,
} from 'react-native'
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller'
import Reanimated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
	const INPUT_ACCESSORY_VIEW_ID = 'e-129818723433'
	const router = useRouter()
	const { bottom } = useSafeAreaInsets()
	const _emailRef = useRef<TextInput>()
	const isFocused = useIsFocused()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
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
		formState: { errors },
		setError,
	} = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			email: '',
		},
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const [sendCode, { data, loading, error }] = useSendAuthenticatorDeviceOwnerCodeMutation({
		onCompleted: data => {
			switch (data.sendAuthenticatorDeviceOwnerCode?.__typename) {
				case 'Error':
					setError('email', {
						type: 'validate',
						message: 'Unable to send phone number',
					})
					break
				case 'Code':
					router.push({
						pathname: '(app)/credential/personalcredentialstack/confirmationcode',
						params: {
							code: data.sendAuthenticatorDeviceOwnerCode.code,
						},
					})
					break
			}
		},
	})

	const onSubmit = (data: any) => {
		CredentialPersonalProfileReactiveVar({
			...credentialPersonalProfileVar,
			phone: {
				completeNumber: '',
				countryCallingCode: '',
				countryCode: '',
				number: '',
			},
			email: data.email,
		})
		sendCode({
			variables: {
				where: {
					Authenticators: {
						EmailInput: {
							email: data.email,
						},
					},
				},
			},
		})
	}

	useEffect(() => {
		if (isFocused && _emailRef.current) {
			InteractionManager.runAfterInteractions(() => {
				_emailRef.current?.focus()
			})
		}
		if (!isFocused) {
			InteractionManager.runAfterInteractions(() => {
				_emailRef.current?.blur()
			})
		}
	}, [isFocused])

	const InnerContent = () => {
		return (
			<VStack
				display={isFocused ? 'flex' : 'none'}
				flexDirection={'row'}
				alignItems='center'
				justifyContent={'flex-end'}
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
				<Pressable disabled={!!errors.email || loading} onPress={handleSubmit(onSubmit)}>
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
						<Feather name='arrow-right' size={32} color={errors.email ? '#292524' : 'white'} />
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
						Enter your email
					</Heading>
					<Pressable
						onPress={() => {
							router.back()
						}}
						sx={{
							w: 100,
							h: 'auto',
						}}
						pb={'$3'}
					>
						<Text fontSize={'$md'} fontWeight={'$bold'} color={'$primary500'}>
							Use phone
						</Text>
					</Pressable>
				</VStack>
				<View style={{ width: '100%' }}>
					<Controller
						name='email'
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input variant={'underlined'} size='lg'>
								<Input.Input
									keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
									type='password'
									py={'$2'}
									autoFocus
									sx={{
										h: 50,
									}}
									key={'email'}
									inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
									textContentType='emailAddress'
									placeholder='Email'
									returnKeyType={Platform.OS === 'ios' ? 'done' : 'none'}
									numberOfLines={1}
									blurOnSubmit={false}
									enablesReturnKeyAutomatically={false}
									// onSubmitEditing={handleSubmit(onSubmit)}
									onBlur={onBlur}
									autoComplete='email'
									importantForAutofill='auto'
									autoCorrect={true}
									autoCapitalize='none'
									keyboardType='email-address'
									onSubmitEditing={handleSubmit(onSubmit)}
									value={value.toLowerCase()}
									onChangeText={onChange}
								/>
							</Input>
						)}
						rules={{
							required: {
								value: true,
								message: 'Your email is required to continue.',
							},
							pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
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
					]}
				>
					<InnerContent />
				</Reanimated.View>
			)}
		</KeyboardAvoidingView>
	)
}
