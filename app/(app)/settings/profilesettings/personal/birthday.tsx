import { useReactiveVar } from '@apollo/client'
import DatePicker from '@components/atoms/inputs/DatePicker'
import { Box, Button, Text } from '@components/core'
import {
	AuthorizationDeviceManager,
	AuthorizationDeviceProfile,
	Profile,
	useUpdateOneProfileMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import diffNow from '@util/@fn/luxon'
import { secureStorageItemCreate } from '@util/hooks/local/useSecureStorage'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default () => {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [legalAge] = useState<number>(19)
	const router = useRouter()

	const [updateOneProfilMutation, { data, loading: UOPLoading, error }] =
		useUpdateOneProfileMutation({
			onError: error => {
				setError('date', error)
			},
			onCompleted: data => {
				const profile = data.updateOneProfile as Profile
				const deviceManager = rAuthorizationVar as AuthorizationDeviceManager
				const deviceprofile = rAuthorizationVar?.DeviceProfile as AuthorizationDeviceProfile

				AuthorizationReactiveVar({
					...deviceManager,
					DeviceProfile: {
						...deviceprofile,
						Profile: profile,
					},
				})
				router.back()
				// reset({ date: data.updateOneProfile.IdentifiableInformation.birthday })
			},
		})

	const {
		control,
		setError,
		clearErrors,
		setValue,
		getValues,
		reset,
		handleSubmit,
		watch,
		formState: { isDirty, dirtyFields, errors },
	} = useForm({
		defaultValues: {
			date:
				new Date(rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.birthday) || '',
		},
		mode: 'onChange',
		reValidateMode: 'onChange',
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const validateDate1 = async (selectedDate: Date | undefined): Promise<boolean> => {
		if (!selectedDate) {
			return false
		}
		const { days, months, years } = diffNow(selectedDate)
		if (years === 0) {
			return false
		}
		return true
	}

	const validateDate2 = async (selectedDate: Date | undefined): Promise<boolean> => {
		if (!selectedDate) {
			return false
		}
		const { days, months, years } = diffNow(selectedDate)
		if (years + 1 === legalAge && months >= 11 && days >= 27) {
			await secureStorageItemCreate({
				key: 'BIRTHDAY',
				value: String(selectedDate),
			})
			return true
		} else if (years < legalAge) {
			return false
		}
		return true
	}

	const onSubmit = (data: any) => {
		updateOneProfilMutation({
			variables: {
				where: {
					id: rAuthorizationVar?.DeviceProfile?.Profile?.id,
				},
				data: {
					IdentifiableInformation: {
						update: {
							birthday: {
								set: data.date,
							},
						},
					},
				},
			},
		})
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
				alignItems: 'center',
				flexDirection: 'column',
				justifyContent: 'space-between',
				marginHorizontal: '5%',
			}}
		>
			<>
				<Controller
					control={control}
					name='date'
					render={({ field: { value, onChange } }) => (
						<View style={{ width: '100%', height: '70%' }}>
							<DatePicker
								display='spinner'
								mode='date'
								value={value}
								maxDate={new Date()}
								onChange={(e, selectedDate) => onChange(selectedDate)}
								style={{
									width: '100%',
									height: '100%',
								}}
							/>
						</View>
					)}
					rules={{
						required: {
							value: true,
							message: 'Your birthday is required to continue.',
						},
						validate: {
							validateYear1: async value => (await validateDate1(value)) || 'You must exsist to sign up.',
							validateYear2: async value =>
								(await validateDate2(value)) || `Must be closer to ${legalAge} to join.`,
						},
					}}
				/>
			</>
			<Text>{errors.date && errors?.date.message}</Text>
			<Box justifyContent={'center'} sx={{}} py={'15px'} width={'100%'}>
				{dirtyFields.date && (
					<Button
						disabled={UOPLoading}
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
						my={'$5'}
						size={'lg'}
					>
						<Text>Update</Text>
					</Button>
				)}
			</Box>
		</SafeAreaView>
	)
}
