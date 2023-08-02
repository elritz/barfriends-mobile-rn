import { useReactiveVar } from '@apollo/client'
import { Box, Heading, Pressable, Text, VStack } from '@components/core'
import { Feather } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useIsFocused } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar, ThemeReactiveVar } from '@reactive'
import diffNow from '@util/@fn/luxon'
import { secureStorageItemCreate } from '@util/hooks/local/useSecureStorage'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'

export default () => {
	const router = useRouter()
	const isFocused = useIsFocused()
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const [legalAge] = useState<number>(19)

	const {
		control,
		setError,
		clearErrors,
		setValue,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			date: new Date(),
		},
		mode: 'onChange',
		reValidateMode: 'onChange',
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const onDateChange = async (selectedDate: Date | undefined): Promise<boolean> => {
		setValue('date', selectedDate as Date)
		if (selectedDate) {
			const { days, months, years } = diffNow(selectedDate)
			clearErrors('date')
			if (years === 0) {
				setError('date', {
					type: 'validate',
					message: 'You must exsist to sign up.',
				})
				return false
			} else if (years + 1 === legalAge && months >= 11 && days >= 27) {
				await secureStorageItemCreate({
					key: 'BIRTHDAY_TOKEN',
					value: String(selectedDate),
				})
			} else if (years < legalAge) {
				setError('date', {
					type: 'validate',
					message: `Must be closer to ${legalAge} to join.`,
				})
				return false
			}
			setValue('date', selectedDate)
			return true
		}
		setError('date', {
			type: 'validate',
			message: `Must be closer to ${legalAge} to join.`,
		})
		return false
	}

	const onSubmit = async (): Promise<void | null> => {
		try {
			if (errors.date) {
				setError('date', {
					type: 'validate',
					message: 'Enter a valid birthday',
				})
			}
			const birthday = getValues('date')
			CredentialPersonalProfileReactiveVar({
				...credentialPersonalProfileVar,
				birthday: String(birthday),
			})
			router.push({
				pathname: '(app)/credential/personalcredentialstack/name',
			})
		} catch (e) {
			return setError('date', {
				type: 'validate',
				message: 'Something went wrong',
			})
		}
	}

	useEffect(() => {
		if (!credentialPersonalProfileVar.birthday) {
			setError('date', { type: 'validate' })
		} else {
			setValue('date', new Date(credentialPersonalProfileVar.birthday))
		}
	}, [isFocused])

	return (
		<Box
			flex={1}
			alignItems='center'
			flexDirection='column'
			justifyContent='space-between'
			mt={'$5'}
			bg='$transparent'
		>
			<Heading mt={'$4'} fontWeight={'$black'} fontSize={'$3xl'}>
				What's your birthday
			</Heading>
			<>
				<Controller
					control={control}
					name='date'
					render={({ field: { value } }) => (
						<View style={{ width: '100%', height: '70%' }}>
							<DateTimePicker
								display='spinner'
								themeVariant={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
								mode='date'
								value={value}
								maximumDate={new Date()}
								onChange={(e, selectedDate) => onDateChange(selectedDate)}
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
							isOldEnough: value => onDateChange(value) || 'Must be less young to join.',
						},
					}}
				/>
				<Text color={'$error500'}>
					{errors.date && errors.date.type ? errors?.date?.message : null}
				</Text>
			</>
			<Box
				bg='$transparent'
				sx={{
					h: 90,
				}}
				display={'flex'}
				justifyContent={'center'}
				alignItems={'center'}
				w={'100%'}
				mb={'$5'}
			>
				<Box
					flexDirection={'row'}
					justifyContent={'space-between'}
					alignContent={'space-around'}
					bg='$transparent'
					sx={{
						h: 90,
						px: '2.5%',
					}}
				>
					<VStack justifyContent={'space-around'}>
						<Pressable disabled={!!errors.date} onPress={handleSubmit(onSubmit)}>
							<Box
								alignItems='center'
								justifyContent='center'
								sx={{
									h: 60,
									w: 60,
								}}
								rounded={'$full'}
								bg='$primary500'
							>
								<Feather name='arrow-right' size={32} color={errors?.date ? '#292524' : 'white'} />
							</Box>
						</Pressable>
					</VStack>
				</Box>
			</Box>
		</Box>
	)
}
