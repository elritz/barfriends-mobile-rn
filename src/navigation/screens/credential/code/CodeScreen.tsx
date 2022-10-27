import { useReactiveVar } from '@apollo/client'
import { TAB_NAVIGATION_HEIGHT } from '@constants/ReactNavigationConstants'
import { Feather } from '@expo/vector-icons'
import { useHeaderHeight } from '@react-navigation/elements'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { ConfirmationCodeReactiveVar, CredentialPersonalProfileReactiveVar } from '@reactive'
import Countdown from '@util/hooks/useTimer'
import { IconButton, Icon, Box, Text, VStack, KeyboardAvoidingView, Heading } from 'native-base'
import { useState } from 'react'
import { Controller, useForm, ValidateResult } from 'react-hook-form'
import { InputAccessoryView, Platform, Pressable, View } from 'react-native'
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { PersonalCredentialStackParamList } from 'src/types/app'
import styled from 'styled-components/native'

// TODO: FN(onPress(Resend Code)) - ln:162 -- when the user presses resend code need to resend and keep track of how many times

type CodeInputCellViewType = {
	isFocused: boolean
}

export type CodeScreenRouteProp = RouteProp<
	PersonalCredentialStackParamList,
	'ConfirmationCodeScreen'
>
const CodeScreen = () => {
	const navigation = useNavigation()
	const route = useRoute<CodeScreenRouteProp>()
	const headerHeight = useHeaderHeight()
	const confirmationCode = useReactiveVar(ConfirmationCodeReactiveVar)
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const inputAccessoryViewID = 'codeAccessoryViewID'
	const CELL_COUNT = 4
	const { num, complete } = Countdown(9)
	const [codeValue, setCodeValue] = useState('')
	const keyboardVerticalOffset =
		Platform.OS === 'ios' ? headerHeight + TAB_NAVIGATION_HEIGHT + 65 : 0

	const ref = useBlurOnFulfill({ value: confirmationCode.code, cellCount: CELL_COUNT })
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value: codeValue,
		setValue: setCodeValue,
	})

	const {
		control,
		handleSubmit,
		setError,
		clearErrors,
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

	const navigateToNextScreen = () => {
		navigation.navigate('CredentialNavigator', {
			screen: 'PersonalCredentialStack',
			params: {
				screen: 'BirthdayScreen',
			},
		})
	}

	const checkFinalCode = (value: string): ValidateResult => {
		if (value !== route.params.code) {
			return false
		}
		navigateToNextScreen()
		return true
	}

	const onSubmit = (data: { code: any }) => {
		const { code } = data
		if (code !== route.params.code) {
			return setError('code', { type: 'validate', message: 'Invalid code' })
		}
		clearErrors()
		checkFinalCode(code)
	}

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
			<Heading mt={4} lineHeight={35} fontWeight={'black'} fontSize={'3xl'}>
				{`Enter the 4-diget code sent to you at ${
					credentialPersonalProfileVar.email
						? credentialPersonalProfileVar.email
						: credentialPersonalProfileVar.phone.completeNumber
				}`}
			</Heading>
			<View style={{ marginVertical: '10%', width: '100%' }}>
				<Controller
					name='code'
					control={control}
					render={({ field: { value, onChange, onBlur } }) => (
						<CodeField
							{...props}
							ref={ref}
							value={value}
							onChangeText={value => onChange(value)}
							cellCount={CELL_COUNT}
							rootStyle={{
								marginVertical: 10,
								width: 260,
							}}
							keyboardType='number-pad'
							textContentType='oneTimeCode'
							inputAccessoryViewID={inputAccessoryViewID}
							onSubmitEditing={handleSubmit(onSubmit)}
							onBlur={onBlur}
							blurOnSubmit
							autoFocus
							onEndEditing={handleSubmit(onSubmit)}
							renderCell={({ index, symbol, isFocused }) => (
								<CodeInputCellView
									onLayout={getCellOnLayoutHandler(index)}
									key={index}
									isFocused={isFocused}
								>
									<CellText>{symbol || (isFocused ? <Cursor /> : null)}</CellText>
								</CodeInputCellView>
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
			<InputAccessoryView nativeID={inputAccessoryViewID}>
				<InputAccessoryContainer>
					<Box justifyContent={'space-around'}>
						{complete ? (
							<VStack space={2} justifyContent={'space-around'}>
								<Pressable onPress={() => null}>
									<Text fontSize={'lg'}>Resend code</Text>
								</Pressable>
								<Pressable
									onPress={() =>
										navigation.navigate('CredentialNavigator', {
											screen: 'PersonalCredentialStack',
											params: {
												screen: 'EmailPhoneTabStack',
												params: {
													screen: 'PhoneScreen',
												},
											},
										})
									}
								>
									<Text fontSize={'lg'}>Update phone number</Text>
								</Pressable>
							</VStack>
						) : (
							<Text>
								Resend code in 0:0
								{num}
							</Text>
						)}
					</Box>
					<VStack justifyContent={'space-around'}>
						<IconButton
							disabled={!!errors.code}
							onPress={handleSubmit(onSubmit)}
							variant={'solid'}
							color={'primary.500'}
							isDisabled={!!errors.code}
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
									color={errors.code ? 'light.800' : 'white'}
								/>
							}
						/>
					</VStack>
				</InputAccessoryContainer>
			</InputAccessoryView>
		</KeyboardAvoidingView>
	)
}

export default CodeScreen

const InputAccessoryContainer = styled.View`
	background-color: ${props => props.theme.palette.background.paper};
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-content: space-around;
	height: 90px;
	padding-horizontal: 2.5%;
`
const CodeInputCellView = styled.View<CodeInputCellViewType>`
	width: 50px;
	height: 60px;
	justify-content: center;
	align-items: center;
	border-bottom-color: ${props => (!props.isFocused ? '#ccc' : '#007AFF')};
	border-bottom-width: ${props => (props.isFocused ? '2px' : '1px')};
`

const CellText = styled.Text`
	color: ${props => props.theme.palette.active.color.primary};
	font-size: 38px;
	text-align: center;
`
