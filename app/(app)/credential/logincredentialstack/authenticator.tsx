import { Box, Button, Pressable, Text } from '@components/core'
import { Entypo, Feather } from '@expo/vector-icons'
import {
	useAuthorizedProfilesLazyQuery,
	useSendAuthenticatorDeviceOwnerCodeMutation,
} from '@graphql/generated'
import { useIsFocused } from '@react-navigation/native'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useRouter } from 'expo-router'
import { Icon, Input } from 'native-base'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View, InputAccessoryView, Platform } from 'react-native'
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller'
import Reanimated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export type FormType = {
	authenticator: string
}

export default () => {
	const INPUT_ACCESSORY_VIEW_ID = 'a-213123w'
	const router = useRouter()
	const colorScheme = useThemeColorScheme()
	const isFocused = useIsFocused()
	const { bottom } = useSafeAreaInsets()
	const [keyboardType, setKeyboardType] = useState('number-pad')
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
		getValues,
		reset,
		setError,
		formState: { errors },
	} = useForm<FormType>({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			authenticator: '',
		},
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const [sendAuthenticatorDeviceOwnerCodeMutation] = useSendAuthenticatorDeviceOwnerCodeMutation({
		onCompleted: data => {
			const values = getValues()
			if (data.sendAuthenticatorDeviceOwnerCode.__typename === 'Code') {
				router.push({
					params: {
						authenticator: values.authenticator,
						code: data.sendAuthenticatorDeviceOwnerCode.code,
					},
					pathname: '(app)/credential/logincredentialstack/confirmationcode',
				})
			}
		},
	})

	const [authorizedProfilesV2Query, { data, loading, error }] = useAuthorizedProfilesLazyQuery({
		fetchPolicy: 'network-only',
		onCompleted: data => {
			const formValues = getValues()
			const replaced = formValues.authenticator.replace(/\D/g, '')

			if (data.authorizedProfiles?.__typename === 'ProfilesResponse') {
				if (data.authorizedProfiles?.username.length) {
					router.push({
						params: {
							profile: String(data.authorizedProfiles?.username[0].id),
						},
						pathname: '(app)/credential/logincredentialstack/loginpassword',
					})
				}

				if (data.authorizedProfiles?.phone.length) {
					sendAuthenticatorDeviceOwnerCodeMutation({
						variables: {
							where: {
								Authenticators: {
									PhoneInput: {
										number: replaced,
									},
								},
							},
						},
					})
					if (data.authorizedProfiles.email.length) {
						sendAuthenticatorDeviceOwnerCodeMutation({
							variables: {
								where: {
									Authenticators: {
										EmailInput: {
											email: formValues.authenticator,
										},
									},
								},
							},
						})
					}
				}
			}
			if (data.authorizedProfiles?.__typename === 'Error') {
				setError('authenticator', { message: data.authorizedProfiles.message })
			}
		},
	})

	const onSubmit = data => {
		const username = data.authenticator.replace(/[^a-zA-Z0-9]/g, '')
		const numberOnly = data.authenticator.replace(/\D/g, '')
		authorizedProfilesV2Query({
			variables: {
				where: {
					profiles: {
						username: username,
						email: data.authenticator,
						Phone: {
							number: numberOnly,
						},
					},
				},
			},
		})
	}

	const RightIcon = () => {
		switch (keyboardType) {
			case 'number-pad':
				return (
					<Icon onPress={() => setKeyboardType('email')} size={'md'} name='email' as={Entypo} mr={4} />
				)
			case 'email':
				return (
					<Icon
						onPress={() => setKeyboardType('number-pad')}
						size={'md'}
						name='dial-pad'
						as={Entypo}
						mr={4}
					/>
				)
		}
	}

	return (
		<Box flex={1}>
			<Reanimated.View style={{ flex: 1, marginHorizontal: 15 }}>
				<Controller
					name='authenticator'
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							key='authenticator'
							keyboardAppearance={colorScheme}
							variant={'underlined'}
							returnKeyType='done'
							enablesReturnKeyAutomatically
							textContentType={keyboardType === 'number-pad' ? 'telephoneNumber' : 'emailAddress'}
							autoComplete={'username'}
							keyboardType={keyboardType === 'number-pad' ? 'number-pad' : 'email-address'}
							numberOfLines={1}
							placeholder='Email, number or username '
							inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
							rightElement={RightIcon()}
							autoCapitalize='none'
							autoFocus
							mt={'1/6'}
							py={2}
							_input={{
								fontSize: '2xl',
								fontWeight: 'medium',
							}}
							onSubmitEditing={handleSubmit(onSubmit)}
							onBlur={onBlur}
							value={value.toLowerCase()}
							onChangeText={value => {
								if (keyboardType === 'number-pad') {
									onChange(value.toLowerCase())
									setValue('authenticator', value)
								} else {
									onChange(value)
									setValue('authenticator', value.trim())
								}
							}}
						/>
					)}
					rules={{
						required: {
							value: true,
							message: '',
						},
					}}
				/>
				{errors?.authenticator?.message ? (
					<Button
						onPress={() => {
							router.replace({
								pathname: '(app)/credential/personalcredentialstack/getstarted',
							})
						}}
						my={'$3'}
						rounded={'$md'}
					>
						<Text textTransform='uppercase' fontWeight='$black' fontSize={'$lg'}>
							Sign up
						</Text>
					</Button>
				) : null}
			</Reanimated.View>
			{Platform.OS === 'ios' ? (
				<InputAccessoryView nativeID={INPUT_ACCESSORY_VIEW_ID}>
					<Box
						flexDirection={'row'}
						justifyContent={'flex-end'}
						alignContent={'space-around'}
						sx={{
							h: 70,
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
									<Feather
										name='arrow-right'
										size={32}
										color={errors?.authenticator ? '#292524' : 'white'}
									/>
								</Box>
							</Pressable>
						</View>
					</Box>
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
					<Box
						flexDirection={'row'}
						justifyContent={'flex-end'}
						alignContent={'space-around'}
						height={'70px'}
						px={'$2'}
					>
						<View
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-around',
							}}
						>
							<Pressable disabled={!!errors.authenticator} onPress={handleSubmit(onSubmit)}>
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
										color={errors?.authenticator ? '#292524' : 'white'}
									/>
								</Box>
							</Pressable>
						</View>
					</Box>
				</Reanimated.View>
			)}
		</Box>
	)
}
