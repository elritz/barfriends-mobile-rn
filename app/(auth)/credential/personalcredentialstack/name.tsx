import { useReactiveVar } from '@apollo/client'
import { Box, Heading, Input, Pressable, Text, VStack } from '@components/core'
import { Feather } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar, ThemeReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
	InputAccessoryView,
	Platform,
	TextInput,
	TextInputProps,
	TextProps,
	View,
} from 'react-native'
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller'
import Reanimated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
	const INPUT_ACCESSORY_VIEW_ID = 'n-1298187263'
	const router = useRouter()
	const isFocused = useIsFocused()
	const { bottom } = useSafeAreaInsets()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const _firstnameRef = useRef<TextInput | null>(null)
	const _lastnameRef = useRef<TextInput | null>(null)

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
			firstname: '',
			lastname: '',
		},
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const onSubmit = (data: any) => {
		if (!data.firstname) {
			setError('firstname', {
				message: 'You need to enter a first name',
			})
		}
		if (!data.lastname) {
			setError('firstname', {
				message: 'You need to enter a last name',
			})
		}
		CredentialPersonalProfileReactiveVar({
			...credentialPersonalProfileVar,
			firstname: data.firstname,
			lastname: data.lastname,
		})
		router.push({
			pathname: '(app)/credential/personalcredentialstack/username',
		})
	}

	const InnerContent = () => {
		return (
			<Box
				flexDirection={'row'}
				justifyContent={'flex-end'}
				alignItems={'center'}
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
				<Pressable disabled={!!errors.firstname || !!errors.lastname} onPress={handleSubmit(onSubmit)}>
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
							color={errors?.firstname || errors.lastname ? '#292524' : 'white'}
						/>
					</Box>
				</Pressable>
			</Box>
		)
	}

	return (
		<Box bg='$transparent' flex={1}>
			<Reanimated.View style={{ flex: 1, marginHorizontal: 15 }}>
				<Heading mt={'$4'} fontWeight={'$black'} fontSize={'$3xl'}>
					Enter your name
				</Heading>
				<VStack space={'md'} style={{ marginVertical: '10%' }}>
					<Controller
						name='firstname'
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input key={'name'} variant={'underlined'} py={'$1'} size={'lg'}>
								<Input.Input
									ref={_firstnameRef}
									keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
									key={'name'}
									returnKeyType='next'
									textContentType='givenName'
									autoComplete={'name-given'}
									autoCapitalize={'none'}
									keyboardType='default'
									numberOfLines={1}
									autoFocus
									placeholder='First name'
									inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
									py={'$1'}
									onSubmitEditing={() => _lastnameRef?.current?.focus()}
									onBlur={onBlur}
									blurOnSubmit={false}
									onChangeText={onChange}
									value={value.toLowerCase()}
								/>
							</Input>
						)}
						rules={{
							required: {
								value: true,
								message: 'Your lastname is required to continue.',
							},
						}}
					/>
					<Text>{errors?.firstname?.message}</Text>

					<Controller
						name='lastname'
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input key={'lname'} variant={'underlined'} py={'$1'} size={'lg'}>
								<Input.Input
									ref={_lastnameRef}
									keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
									key={'lastname'}
									returnKeyType='done'
									textContentType='familyName'
									autoComplete={'name-family'}
									autoCapitalize={'none'}
									keyboardType='default'
									numberOfLines={1}
									placeholder='Last name'
									inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
									py={'$1'}
									onBlur={onBlur}
									onSubmitEditing={handleSubmit(onSubmit)}
									blurOnSubmit={false}
									onChangeText={onChange}
									value={value.toLowerCase()}
								/>
							</Input>
						)}
						rules={{
							required: {
								value: true,
								message: 'Your first name is required to continue.',
							},
						}}
					/>
					<Text>{errors?.firstname?.message}</Text>
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
