import { useReactiveVar } from '@apollo/client'
import { Box, Button, Center, Icon, Input, Spinner, Text, VStack } from '@components/core'
import { Feather, Ionicons } from '@expo/vector-icons'
import {
	AuthorizationDeviceManager,
	useLoginPasswordLazyQuery,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { useIsFocused } from '@react-navigation/native'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Image } from 'react-native'
import { InputAccessoryView, Platform } from 'react-native'
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller'
import Reanimated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const IMAGE_SIZE = 85

export default () => {
	const INPUT_ACCESSORY_VIEW_ID = 'lp-21565434tw'
	const router = useRouter()
	const params = useLocalSearchParams()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const [showPassword, setShowPassword] = useState<boolean>(true)

	const isFocused = useIsFocused()
	const { bottom } = useSafeAreaInsets()
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
				if (data.switchDeviceProfile.__typename == 'AuthorizationDeviceManager') {
					const deviceManager = data.switchDeviceProfile as AuthorizationDeviceManager
					AuthorizationReactiveVar(deviceManager)
					router.push({
						pathname: '(app)/hometab',
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
				display={isFocused ? 'flex' : 'none'}
				flexDirection={'row'}
				justifyContent={'flex-end'}
				alignContent={'space-around'}
				sx={{
					h: 70,
				}}
				px={'$2'}
			>
				<Button
					disabled={!!errors?.password}
					onPress={handleSubmit(onSubmit)}
					variant={'solid'}
					isDisabled={!!errors.password || LPLoading || SDPLoading}
					rounded={'$full'}
					style={{
						justifyContent: 'center',
						height: 60,
						width: 60,
						paddingHorizontal: 20,
						alignSelf: 'center',
					}}
				>
					<Icon
						as={Feather}
						name='arrow-right'
						size={'xl'}
						color={errors.password ? 'primary.700' : 'white'}
					/>
				</Button>
			</Box>
		)
	}

	return (
		<Box flex={1}>
			<Reanimated.View style={{ flex: 1, marginVertical: 15, marginHorizontal: 15 }}>
				<VStack space={'md'}>
					<Center>
						{params.photo ? (
							<Image
								source={{ uri: String(params.photo) }}
								style={{
									marginTop: 5,
									height: IMAGE_SIZE,
									width: IMAGE_SIZE,
									alignSelf: 'center',
									borderRadius: 10,
								}}
							/>
						) : (
							<Box
								sx={{
									h: 40,
									w: 40,
								}}
								rounded={'$md'}
							>
								<Box
									sx={{
										h: '100%',
									}}
								>
									<Center>
										<Icon
											sx={{
												_light: {
													color: '$light300',
												},
												_dark: {
													color: '$dark300',
												},
											}}
											as={Ionicons}
											size={'lg'}
											name={'ios-person'}
										/>
									</Center>
								</Box>
							</Box>
						)}
					</Center>
					<Controller
						name='password'
						control={control}
						defaultValue=''
						render={({ field: { onChange, onBlur, value } }) => {
							return (
								<Input>
									<Input.Input
										keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
										value={value}
										placeholder='Password'
										type='password'
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
									{LPLoading && <Spinner size='large' accessibilityLabel={'Loading...'} />}
									<Input.Input
										fontSize={'$2xl'}
										fontWeight='$medium'
										type={showPassword ? 'text' : 'password'}
									/>
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
		</Box>
	)
}
