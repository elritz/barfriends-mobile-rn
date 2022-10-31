import { useReactiveVar } from '@apollo/client'
import { TAB_NAVIGATION_HEIGHT } from '@constants/ReactNavigationConstants'
import { Feather } from '@expo/vector-icons'
import { useSendAuthenticatorDeviceOwnerCodeMutation } from '@graphql/generated'
import { useHeaderHeight } from '@react-navigation/elements'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar } from '@reactive'
import { CountryCode } from 'libphonenumber-js'
import { Input, Text, Icon, IconButton, KeyboardAvoidingView, Box } from 'native-base'
import { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputAccessoryView, Platform, TextInput, View, InteractionManager } from 'react-native'
import styled from 'styled-components/native'

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

const PhoneScreen = () => {
	const inputAccessoryViewID = 'phonenumberAccessoryID2122'
	const phonenumberRef = useRef<TextInput>()
	const isFocused = useIsFocused()
	const navigation = useNavigation()
	const headerHeight = useHeaderHeight()
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const keyboardVerticalOffset =
		Platform.OS === 'ios' ? headerHeight + TAB_NAVIGATION_HEIGHT + 65 : 0

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
		onCompleted: data => {
			switch (data.sendAuthenticatorDeviceOwnerCode?.__typename) {
				case 'ErrorProfiling':
					setError('mobileNumber.number', {
						type: 'validate',
						message: 'Unable to send phone number',
					})
					break
				case 'Code':
					navigation.navigate('CredentialNavigator', {
						screen: 'PersonalCredentialStack',
						params: {
							screen: 'ConfirmationCodeScreen',
							params: {
								code: data.sendAuthenticatorDeviceOwnerCode.code,
							},
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
		if (isFocused && phonenumberRef.current) {
			InteractionManager.runAfterInteractions(() => {
				phonenumberRef.current?.focus()
			})
		} else {
			InteractionManager.runAfterInteractions(() => {
				phonenumberRef.current?.blur()
			})
		}
	}, [isFocused])

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={keyboardVerticalOffset}
			style={{
				flex: 1,
				height: 'auto',
				flexDirection: 'column',
				marginHorizontal: '5%',
			}}
		>
			<Text mt={4} lineHeight={35} fontWeight={'black'} fontSize={'3xl'}>
				Enter your mobile number
			</Text>
			<View style={{ marginVertical: 20, width: '100%' }}>
				{isFocused && (
					<Controller
						name='mobileNumber.completeNumber'
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								ref={phonenumberRef}
								key={'mobileNumber.completeNumber'}
								variant={'underlined'}
								returnKeyType='done'
								textContentType='telephoneNumber'
								autoComplete='tel'
								keyboardType='phone-pad'
								numberOfLines={1}
								placeholder='Mobile Number'
								inputAccessoryViewID={inputAccessoryViewID}
								py={4}
								_input={{
									fontSize: '2xl',
									fontWeight: 'medium',
								}}
								onSubmitEditing={handleSubmit(onSubmit)}
								onBlur={onBlur}
								onChangeText={value => {
									onChange(value)
									const replaced = value.replace(/\D/g, '')
									setValue('mobileNumber.number', replaced)
								}}
							/>
							// <Input placeholder='Hello' />
						)}
						rules={{
							required: {
								value: true,
								message: 'Hey this is required 🤷‍♂️.',
							},
						}}
					/>
				)}
				<Text style={{ color: 'red' }}>{errors?.mobileNumber?.number?.message}</Text>
			</View>

			<InputAccessoryView nativeID={inputAccessoryViewID}>
				<Box
					flexDir={'row'}
					justifyContent={'flex-end'}
					alignContent={'space-around'}
					height={'90px'}
					px={'2.5%'}
				>
					<Box flex={2} display={'flex'} flexDir={'column'} justifyContent={'space-around'} px={2}>
						<Text>
							By continuing you may receive an SMS for verification. Message and data rates may apply.
						</Text>
					</Box>
					<IconButton
						disabled={!!errors.mobileNumber}
						onPress={handleSubmit(onSubmit)}
						variant={'solid'}
						color={'primary.500'}
						isDisabled={!!errors.mobileNumber?.completeNumber || loading}
						style={{
							justifyContent: 'center',
							borderRadius: 50,
							height: 70,
							width: 70,
							paddingHorizontal: 20,
							alignSelf: 'center',
						}}
						icon={
							<Icon
								as={Feather}
								name='arrow-right'
								size={'2xl'}
								color={errors.mobileNumber ? 'light.800' : 'white'}
							/>
						}
					/>
				</Box>
			</InputAccessoryView>
		</KeyboardAvoidingView>
	)
}

export default PhoneScreen
