import { useReactiveVar } from '@apollo/client'
import { Box, EyeIcon, EyeOffIcon, Heading, Icon, Input, Pressable, Text } from '@components/core'
import { Feather } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar, ThemeReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputAccessoryView, Platform, TextInput, View } from 'react-native'
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller'
import * as Keychain from 'react-native-keychain'
import Reanimated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ACCESS_CONTROL_OPTIONS = ['None', 'Passcode', 'Password']
const ACCESS_CONTROL_OPTIONS_ANDROID = ['None']
const ACCESS_CONTROL_MAP = [
	null,
	Keychain.ACCESS_CONTROL.DEVICE_PASSCODE,
	Keychain.ACCESS_CONTROL.APPLICATION_PASSWORD,
	Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
]
const ACCESS_CONTROL_MAP_ANDROID = [null, Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET]
const SECURITY_LEVEL_OPTIONS = ['Any', 'Software', 'Hardware']
const SECURITY_LEVEL_MAP = [
	Keychain.SECURITY_LEVEL.ANY,
	Keychain.SECURITY_LEVEL.SECURE_SOFTWARE,
	Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
]

const SECURITY_STORAGE_OPTIONS = ['Best', 'FB', 'AES', 'RSA']
const SECURITY_STORAGE_MAP = [
	null,
	Keychain.STORAGE_TYPE.FB,
	Keychain.STORAGE_TYPE.AES,
	Keychain.STORAGE_TYPE.RSA,
]

export default function () {
	const INPUT_ACCESSORY_VIEW_ID = 'pc-1298187263'
	const _passwordRef = useRef<TextInput>(null)
	const router = useRouter()
	const isFocused = useIsFocused()
	const { bottom } = useSafeAreaInsets()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)

	const [showPassword, setShowPassword] = useState(false)
	const handleState = () => {
		setShowPassword(showState => {
			return !showState
		})
	}

	const { height: platform } = useReanimatedKeyboardAnimation()
	const INPUT_CONTAINER_HEIGHT = 90

	const height = useDerivedValue(() => platform.value, [isFocused])

	const InnerContent = () => {
		return (
			<Box
				flexDirection={'row'}
				justifyContent={'flex-end'}
				alignItems='center'
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
				<View
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-around',
					}}
				>
					<Pressable disabled={!!errors.password} onPress={handleSubmit(onSubmit)}>
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
							<Feather name='arrow-right' size={32} color={errors?.password ? '#292524' : 'white'} />
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
			transform: [{ translateY: height.value }],
		}),
		[],
	)

	const {
		control,
		handleSubmit,
		setError,
		getValues,
		watch,
		formState: { errors },
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
			setError('password', { type: 'validate', message: '' })
		}
		if (_passwordRef && _passwordRef.current) {
			_passwordRef.current?.focus()
		}
	}, [])

	const navigateToNextScreen = async (): Promise<void | null> => {
		router.push({
			pathname: '(app)/credential/personalcredentialstack/create',
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
		<Box bg='$transparent' flex={1}>
			<Reanimated.View style={{ flex: 1, marginHorizontal: 15 }}>
				<Heading mt={'$4'} fontWeight={'$black'} fontSize={'$3xl'}>
					Enter a password
				</Heading>
				<View style={{ marginVertical: '10%', width: '100%' }}>
					<Controller
						name='password'
						control={control}
						defaultValue=''
						render={({ field: { onChange, onBlur, value } }) => {
							return (
								<>
									<Input key={'password'} variant={'underlined'} py={'$1'} size={'lg'}>
										<Input.Input
											value={value}
											ref={_passwordRef}
											keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
											onChangeText={onChange}
											onSubmitEditing={handleSubmit(onSubmit)}
											onBlur={onBlur}
											textContentType='newPassword'
											blurOnSubmit={false}
											type={showPassword ? 'text' : 'password'}
											passwordRules={
												'minlength: 20; required: lower; required: upper; required: digit; required: [-];'
											}
											autoComplete='new-password'
											autoFocus
											enablesReturnKeyAutomatically={false}
											placeholder='Password'
											returnKeyType='done'
											autoCorrect={false}
											inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
											autoCapitalize='none'
											numberOfLines={1}
										/>
										<Input.Icon pr='$3' onPress={handleState}>
											{/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
											<Icon as={showPassword ? EyeIcon : EyeOffIcon} color='$primary500' />
										</Input.Icon>
									</Input>
									<Text>{errors?.password?.message}</Text>
								</>
							)
						}}
						rules={{
							required: {
								value: true,
								message: '',
							},
							validate: {
								greaterThanZero: value => value.length > 0 || 'Must have password',
								noSpaces: value => /^[\S]+$/.test(value) || 'Remove spaces!!',
								greaterQualThanFour: value => value.length >= 4 || 'Must be at least 4 characters',
								checkUppercase: value => /[A-Z]/.test(value) || 'Must have a uppercase character.',
								checkDiget: value => /\d/.test(value) || 'Must have a diget.',
								checkSpecial: value => /[#?!@$%^&)(*-]/.test(value) || 'Must have a special character',
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
					]}
				>
					<InnerContent />
				</Reanimated.View>
			)}
		</Box>
	)
}
