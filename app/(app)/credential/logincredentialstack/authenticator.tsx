import { useReactiveVar } from '@apollo/client'
import { Box, Button, Input, Pressable, Text, VStack } from '@components/core'
import { Entypo, Feather } from '@expo/vector-icons'
import {
	useAuthorizedProfilesLazyQuery,
	useSendAuthenticatorDeviceOwnerCodeMutation,
} from '@graphql/generated'
import { useIsFocused } from '@react-navigation/native'
import { ThemeReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View, InputAccessoryView, Platform, KeyboardAvoidingView } from 'react-native'
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller'
import Reanimated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export type FormType = {
	authenticator: string
}

export default () => {
	const INPUT_ACCESSORY_VIEW_ID = 'a-213123w'
	const router = useRouter()
	const rTheme = useReactiveVar(ThemeReactiveVar)
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

	const InnerContent = () => {
		return (
			<Box
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
							<Feather name='arrow-right' size={32} color={errors?.authenticator ? '#292524' : 'white'} />
						</Box>
					</Pressable>
				</View>
			</Box>
		)
	}

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
		onError: error => {},
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
					<Entypo
						onPress={() => setKeyboardType('email')}
						size={25}
						name='phone'
						style={{ marginRight: 4 }}
						color={
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light900
								: rTheme.theme?.gluestack.tokens.colors.dark900
						}
					/>
				)
			case 'email':
				return (
					<Entypo
						onPress={() => setKeyboardType('number-pad')}
						size={25}
						name='email'
						style={{ marginRight: 4 }}
						color={
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light900
								: rTheme.theme?.gluestack.tokens.colors.dark900
						}
					/>
				)
		}
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
				<VStack sx={{ h: 110 }} mt={'$4'}>
					<Controller
						name='authenticator'
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input variant={'underlined'} size='lg' alignItems='center'>
								<Input.Input
									key={'authenticator'}
									placeholder='Username, phone, email'
									fontSize={'$2xl'}
									lineHeight={'$2xl'}
									fontWeight='$medium'
									keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
									returnKeyType='done'
									enablesReturnKeyAutomatically
									textContentType={keyboardType === 'number-pad' ? 'telephoneNumber' : 'emailAddress'}
									autoComplete={keyboardType === 'number-pad' ? 'cc-number' : 'email'}
									keyboardType={keyboardType === 'number-pad' ? 'number-pad' : 'email-address'}
									numberOfLines={1}
									inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
									autoCapitalize='none'
									autoFocus
									value={value}
									type='text'
									py={'$2'}
									sx={{
										h: 50,
									}}
									onSubmitEditing={handleSubmit(onSubmit)}
									onBlur={onBlur}
									blurOnSubmit={false}
									autoCorrect={false}
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
								<RightIcon />
							</Input>
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
