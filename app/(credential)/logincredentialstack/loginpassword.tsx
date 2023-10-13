import { useReactiveVar } from '@apollo/client'
import { Feather } from '@expo/vector-icons'
import {
	Box,
	EyeIcon,
	EyeOffIcon,
	HStack,
	Icon,
	Input,
	InputIcon,
	Pressable,
	Spinner,
	Text,
	VStack,
} from '@gluestack-ui/themed'
import {
	AuthorizationDeviceProfile,
	useLoginPasswordLazyQuery,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { useIsFocused } from '@react-navigation/native'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputAccessoryView, Platform } from 'react-native'
import {
	KeyboardAvoidingView,
	useReanimatedKeyboardAnimation,
} from 'react-native-keyboard-controller'
import Reanimated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
	const INPUT_ACCESSORY_VIEW_ID = 'lp-21565434tw'
	const router = useRouter()
	const params = useLocalSearchParams()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const [showPassword, setShowPassword] = useState<boolean>(false)

	const isFocused = useIsFocused()
	const { bottom } = useSafeAreaInsets()
	const { height: platform } = useReanimatedKeyboardAnimation()
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
			transform: [{ translateY: height.value }],
		}),
		[],
	)

	const {
		control,
		handleSubmit,
		setError,
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

	const [switchDeviceProfileMutation, { data: SDPData, loading: SDPLoading, error: SDPError }] =
		useSwitchDeviceProfileMutation({
			onCompleted: data => {
				if (data.switchDeviceProfile.__typename == 'Error') {
					setError('password', { type: 'validate', message: 'Incorrect password' })
				}

				if (data.switchDeviceProfile.__typename == 'AuthorizationDeviceProfile') {
					const deviceManager = data.switchDeviceProfile as AuthorizationDeviceProfile
					AuthorizationReactiveVar(deviceManager)
					router.push({
						pathname: '/(app)/hometab/venuefeed',
					})
				}
			},
		})

	const [loginPasswordQuery, { data: LPData, loading: LPLoading, error: LPError }] =
		useLoginPasswordLazyQuery({
			onCompleted: data => {
				if (!data.loginPassword) {
					setError('password', { type: 'validate', message: 'Incorrect password' })
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
				rounded={'$none'}
				display={isFocused ? 'flex' : 'none'}
				flexDirection={'row'}
				justifyContent={'flex-end'}
				alignItems='center'
				alignContent={'space-around'}
				px={'$2'}
				sx={{
					h: 80,
					_dark: {
						bg: '$black',
					},
					_light: {
						bg: '$white',
					},
				}}
			>
				<HStack justifyContent='space-around' flexDirection='row'>
					<Pressable onPress={handleSubmit(onSubmit)}>
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
			}}
		>
			<Reanimated.View style={{ flex: 1 }}>
				<VStack sx={{ h: 110 }} mt={'$12'}>
					<Controller
						name='password'
						control={control}
						defaultValue=''
						render={({ field: { onChange, onBlur, value } }) => {
							return (
								<Input variant={'underlined'} size='lg' alignItems='center'>
									<Input.Input
										keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
										value={value}
										placeholder='Password'
										fontSize={'$2xl'}
										lineHeight={'$2xl'}
										fontWeight='$medium'
										type={showPassword ? 'text' : 'password'}
										py={'$2'}
										sx={{
											h: 50,
										}}
										secureTextEntry={!showPassword}
										onChangeText={value => onChange(value)}
										onSubmitEditing={handleSubmit(onSubmit)}
										onBlur={onBlur}
										textContentType='password'
										blurOnSubmit={false}
										autoComplete={'password'}
										autoFocus
										returnKeyType='done'
										autoCorrect={false}
										inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
										autoCapitalize='none'
										numberOfLines={1}
									/>
									<Pressable onPress={handleShowPassword}>
										<InputIcon pr='$3'>
											{/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
											<Icon as={showPassword ? EyeIcon : EyeOffIcon} size={'lg'} color='$primary500' />
										</InputIcon>
									</Pressable>
									{LPLoading && <Spinner size='small' accessibilityLabel={'Loading...'} />}
								</Input>
								// <Input
								// 	variant={'underlined'}
								// 	ref={_passwordRef}
								// 	key='password'
								// 	keyboardAppearance={rTheme.colorScheme}
								// 	value={value}
								// 	py={2}
								// 	_input={{
								// 		fontSize: '2xl',
								// 		fontWeight: 'medium',
								// 	}}
								// 	size={'lg'}
								// 	secureTextEntry={!showPassword}
								// 	onChangeText={value => onChange(value)}
								// 	onSubmitEditing={handleSubmit(onSubmit)}
								// 	h={'50px'}
								// 	onBlur={onBlur}
								// 	textContentType='password'
								// 	blurOnSubmit={false}
								// 	autoComplete={'password'}
								// 	autoFocus
								// 	returnKeyType='done'
								// 	autoCorrect={false}
								// 	inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
								// 	autoCapitalize='none'
								// 	numberOfLines={1}
								// 	InputRightElement={
								// 		<HStack space={'md'}>
								// 			{/* {LPLoading && <Spinner size='md' accessibilityLabel={'Loading...'} />} */}
								// 			<Icon
								// 				onPress={() => {
								// 					setShowPassword(!showPassword)
								// 				}}
								// 				as={Ionicons}
								// 				name={showPassword ? 'eye-off' : 'eye'}
								// 				size={'md'}
								// 				_light={{
								// 					color: !showPassword ? 'primary.500' : 'light.800',
								// 				}}
								// 				_dark={{
								// 					color: !showPassword ? 'primary.500' : 'dark.800',
								// 				}}
								// 			/>
								// 		</HStack>
								// 	}
								// />
							)
						}}
					/>

					<Text color={'$error500'}>
						{errors.password && errors.password ? errors?.password.message : null}
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
					]}
				>
					<InnerContent />
				</Reanimated.View>
			)}
		</KeyboardAvoidingView>
	)
}
