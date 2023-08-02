import { useReactiveVar } from '@apollo/client'
import { Pressable, Button, Text } from '@components/core'
import { Ionicons } from '@expo/vector-icons'
import {
	AuthorizationDeviceManager,
	AuthorizationDeviceProfile,
	Profile,
	useUpdateProfileIdentifiableInformationMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { Controller, useForm } from 'react-hook-form'
import { View, ScrollView, SafeAreaView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const relationshipstatuslist = [
	'Single',
	'In a relationship',
	'Engaged',
	'Married',
	'In a civil union',
	'In a domestic partnership',
	'In an open relationship',
	"It's complicated",
	'Separated',
	'Divorced',
	'Widowed',
]

export default () => {
	const insets = useSafeAreaInsets()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)

	const [
		updateProfileIdentifiableInfmationMutation,
		{ data: UPIIData, loading: UPIILoading, error: UPIIError },
	] = useUpdateProfileIdentifiableInformationMutation({
		onCompleted: data => {
			if (data.updateProfileIdentifiableInformation.__typename === 'AuthorizationDeviceManager') {
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
					lookfor:
						data.updateProfileIdentifiableInformation.DeviceProfile?.Profile?.IdentifiableInformation
							?.lookfor,
				})
			}
			if (data.updateProfileIdentifiableInformation.__typename === 'Error') {
				setError('lookfor', { message: data.updateProfileIdentifiableInformation.message })
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
			lookfor: rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.lookfor,
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
		if (dirtyFields.lookfor) {
			updateProfileIdentifiableInfmationMutation({
				variables: {
					data: {
						lookfor: {
							set: data.lookfor,
						},
					},
				},
			})
		}
	}

	return (
		<SafeAreaView>
			<ScrollView>
				<View style={{ alignItems: 'center' }}>
					<Controller
						name='lookfor'
						control={control}
						rules={{
							required: true,
							validate: {},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<>
								{relationshipstatuslist.map((item, i) => {
									return (
										<Pressable
											key={i}
											onPress={() => onChange(item)}
											style={{
												backgroundColor:
													rTheme.colorScheme === 'light'
														? rTheme.theme?.gluestack.tokens.colors.light900
														: rTheme.theme?.gluestack.tokens.colors.dark900,
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
											<Text>{item}</Text>
											{(rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.lookfor === item ||
												value === item) && (
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
									)
								})}
							</>
						)}
					/>
				</View>
			</ScrollView>
			{(dirtyFields.lookfor || !!errors.lookfor) && (
				<SafeAreaView
					style={{
						paddingHorizontal: 10,
						paddingBottom: insets.bottom,
						backgroundColor:
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light900
								: rTheme.theme?.gluestack.tokens.colors.dark900,
						position: 'absolute',
						bottom: 0,
						flexDirection: 'row',
						justifyContent: 'space-between',
						padding: 10,
						alignItems: 'center',
						width: '100%',
						minHeight: 90,
					}}
				>
					<Button
						disabled={false}
						onPress={handleSubmit(onSubmit)}
						borderRadius={14}
						sx={{
							_dark: {
								bg: '$dark500',
							},
							_light: {
								bg: '$light500',
							},
						}}
						px={'$11'}
						style={{
							alignSelf: 'center',
						}}
					>
						<Text>Update</Text>
					</Button>
				</SafeAreaView>
			)}
		</SafeAreaView>
	)
}
