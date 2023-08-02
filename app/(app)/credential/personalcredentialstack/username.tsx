import { useReactiveVar } from '@apollo/client'
import { Box, Heading, Input, Pressable, Text } from '@components/core'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useCheckUsernameLazyQuery } from '@graphql/generated'
import { useIsFocused } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar, ThemeReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { useRef } from 'react'
import { Controller, useForm, ValidateResult } from 'react-hook-form'
import { InputAccessoryView, Platform, TextInput, TextInputProps, View } from 'react-native'
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller'
import Reanimated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
	const INPUT_ACCESSORY_VIEW_ID = 'un-1298187263'
	const { bottom } = useSafeAreaInsets()
	const router = useRouter()
	const isFocused = useIsFocused()
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const _usernameRef = useRef<TextInput>(null)

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
		clearErrors,
		getValues,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			username: '',
		},
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const values = getValues()

	const [checkUsername, { data: CUData, loading: CULoading, error: CUError }] =
		useCheckUsernameLazyQuery({
			fetchPolicy: 'no-cache',
			variables: {
				username: values.username,
			},
			onCompleted(data) {
				if (!data.checkUsername) {
					setError('username', { type: 'validate', message: 'Username has been taken' })
				} else {
					clearErrors()
				}
			},
		})

	const onSubmit = (data: any) => {
		CredentialPersonalProfileReactiveVar({
			...credentialPersonalProfileVar,
			username: data.username,
		})
		router.push({
			pathname: '(app)/credential/personalcredentialstack/password',
		})
	}

	const validateCheckUsername = async (value: string): Promise<ValidateResult> => {
		setTimeout(() => {
			checkUsername()
		}, 500)
		if (!CULoading && CUData?.checkUsername) {
			return true
		} else {
			setError('username', { type: 'validate', message: 'Username has been taken' })
			return false
		}
	}

	const InnerContent = () => {
		return (
			<Box
				flexDirection={'row'}
				justifyContent={'flex-end'}
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
				<Box
					bg='$transparent'
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-around',
					}}
				>
					<Pressable disabled={!!errors.username || CULoading} onPress={handleSubmit(onSubmit)}>
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
							<Feather name='arrow-right' size={32} color={errors?.username ? '#292524' : 'white'} />
						</Box>
					</Pressable>
				</Box>
			</Box>
		)
	}
	const InputRightIcon = () => {
		return (
			<Box
				bg='$transparent'
				sx={{
					w: 35,
				}}
				justifyContent={'center'}
				alignItems={'center'}
			>
				{values.username.length && CUData?.checkUsername ? (
					<Ionicons
						name='checkmark-circle'
						size={20}
						color={errors.username || !CUData?.checkUsername ? '#ef4444' : '#ff7000'}
					/>
				) : null}
			</Box>
		)
	}

	return (
		<Box bg='$transparent' flex={1}>
			<Reanimated.View style={{ flex: 1, marginHorizontal: 15 }}>
				<Heading mt={'$4'} fontWeight={'$black'} fontSize={'$3xl'}>
					Choose your username
				</Heading>
				<View style={{ marginVertical: '10%', width: '100%' }}>
					<Controller
						name='username'
						control={control}
						defaultValue=''
						render={({ field: { onChange, onBlur, value } }) => (
							<Input key={'username'} variant={'underlined'} py={'$1'} size={'lg'}>
								<Input.Input
									ref={_usernameRef}
									type='text'
									value={value}
									key='username'
									placeholder='Username'
									keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
									onChangeText={onChange}
									onSubmitEditing={handleSubmit(onSubmit)}
									onBlur={onBlur}
									autoCorrect={false}
									contextMenuHidden
									spellCheck={false}
									autoFocus
									textContentType='nickname'
									autoComplete='username-new'
									returnKeyType='done'
									py={'$1'}
									numberOfLines={1}
									keyboardType='default'
									autoCapitalize='none'
									inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
									blurOnSubmit={false}
								/>
								<Input.Icon>
									<InputRightIcon />
								</Input.Icon>
							</Input>
						)}
						rules={{
							required: {
								value: true,
								message: '',
							},
							validate: {
								greaterThanZero: value => value.length > 0 || '',
								greaterQualThanFour: value => value.length >= 1 || '',
								noSpaces: value => /^[\S]+$/.test(value) || 'No spaces are allowed',
								validateCheckUsername: async value => (await validateCheckUsername(value)) || '',
							},
						}}
					/>
					<Text>{errors?.username?.message}</Text>
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
