import { useReactiveVar } from '@apollo/client'
import { Box, Button, Input, Text } from '@components/core'
import { Ionicons } from '@expo/vector-icons'
import {
	useUpdateProfileIdentifiableInformationMutation,
	Profile,
	AuthorizationDeviceManager,
	AuthorizationDeviceProfile,
} from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { Controller, useForm } from 'react-hook-form'
import { View, Pressable, ActivityIndicator, ScrollView, KeyboardAvoidingView } from 'react-native'

interface GenderScreenProps {}

const genderlist = [
	{
		gender: 'female',
	},
	{
		gender: 'male',
	},
]

export default ({}: GenderScreenProps) => {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)

	const [
		updateProfileIdentifiableInfmationMutation,
		{ data: UPIIData, loading: UPIILoading, error: UPIIError },
	] = useUpdateProfileIdentifiableInformationMutation({
		variables: {
			data: {
				gender: {
					set: rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.gender,
				},
			},
		},
		onCompleted: data => {
			if (
				data &&
				data.updateProfileIdentifiableInformation.__typename === 'AuthorizationDeviceManager'
			) {
				const profile = data.updateProfileIdentifiableInformation as Profile
				const deviceManager = rAuthorizationVar as AuthorizationDeviceManager
				const deviceprofile = rAuthorizationVar?.DeviceProfile as AuthorizationDeviceProfile

				AuthorizationReactiveVar({
					...deviceManager,
					DeviceProfile: {
						...deviceprofile,
						Profile: profile,
					},
				})
				reset({
					gender: String(
						data?.updateProfileIdentifiableInformation.DeviceProfile?.Profile?.IdentifiableInformation
							?.gender,
					),
				})
			}
			if (data.updateProfileIdentifiableInformation.__typename === 'Error') {
				setError('gender', { message: data.updateProfileIdentifiableInformation.message })
			}
		},
	})

	const {
		control,
		setError,
		handleSubmit,
		reset,
		formState: { dirtyFields, errors },
	} = useForm({
		defaultValues: {
			gender: rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.gender || '',
		},
		mode: 'onChange',
		reValidateMode: 'onChange',
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const onSubmit = data => {
		if (dirtyFields.gender) {
			updateProfileIdentifiableInfmationMutation({
				variables: {
					data: {
						gender: {
							set: data.gender,
						},
					},
				},
			})
		}
	}

	return (
		<ScrollView>
			<Controller
				name='gender'
				control={control}
				rules={{
					required: true,
					validate: {
						// maxLength: (value) => value.trim().split(/\s+/).length <= 200 || 'Description must be less than 200 characters'
					},
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<>
						<View style={{ alignItems: 'center' }}>
							{genderlist.map((item, i) => (
								<Pressable
									key={i}
									onPress={() => onChange(item.gender)}
									style={{
										width: '95%',
										padding: 15,
										marginVertical: 5,
										height: 55,
										borderColor: 'transparent',
										borderRadius: 25,
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'space-between',
									}}
								>
									<Text>{item.gender}</Text>
									{value === item.gender && (
										<Ionicons
											name='checkmark-sharp'
											size={25}
											color={
												rTheme.colorScheme === 'light'
													? rTheme.theme?.gluestack.tokens.colors.light900
													: rTheme.theme?.gluestack.tokens.colors.dark900
											}
										/>
									)}
								</Pressable>
							))}
						</View>
						<KeyboardAvoidingView
							style={{
								flexDirection: 'column',
								alignItems: 'flex-start',
								height: '100%',
								width: '100%',
							}}
						>
							<Input
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
								blurOnSubmit={false}
								onSubmitEditing={handleSubmit(onSubmit)}
								autoFocus
								placeholder='Gender....'
								returnKeyType='done'
								autoCapitalize='none'
								autoComplete='off'
								keyboardType='default'
								fontSize={'md'}
								p={'$4'}
								rounded={'md'}
								rightElement={
									<Box ml={'$3'}>
										{UPIILoading && dirtyFields.gender ? (
											<ActivityIndicator
												size='small'
												color={rTheme.theme?.gluestack.tokens.colors.primary500}
											/>
										) : (
											dirtyFields.gender && (
												<Pressable onPress={() => reset()}>
													<Text>Reset</Text>
												</Pressable>
											)
										)}
									</Box>
								}
							/>
							<Text>{errors?.gender?.message}</Text>
							<Box
								flexDirection={'row'}
								justifyContent={'space-between'}
								alignItems={'center'}
								sx={{
									minHeight: 70,
									w: '100%',
								}}
								p={'$5'}
							>
								<Text style={{ alignSelf: 'center', marginHorizontal: 10 }}>ERROR GOES HERE</Text>
								{(dirtyFields.gender || !!errors.gender) && (
									<Button
										disabled={false}
										onPress={handleSubmit(onSubmit)}
										rounded={'$md'}
										sx={{
											_dark: {
												bg: '$dark500',
											},
											_light: {
												bg: '$light500',
											},
										}}
										px={'$10'}
										alignSelf={'center'}
									>
										<Text>Update</Text>
									</Button>
								)}
							</Box>
						</KeyboardAvoidingView>
					</>
				)}
			/>
		</ScrollView>
	)
}
