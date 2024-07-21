import { VStack } from "#/components/ui/vstack";
import { Text } from "#/components/ui/text";
import { Pressable } from "#/components/ui/pressable";
import { Heading } from "#/components/ui/heading";
import { Box } from "#/components/ui/box";
import { useReactiveVar } from '@apollo/client'
import { Feather } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useIsFocused } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar, ThemeReactiveVar } from '#/reactive'
import { calcDateDiffFromNow } from '#/util/helpers/luxon'
import { secureStorageItemCreate } from '#/util/hooks/local/useSecureStorage'
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
			const { days, months, years } = calcDateDiffFromNow(selectedDate)
			clearErrors('date')
			if (years && years === 0) {
				setError('date', {
					type: 'validate',
					message: 'You must exsist to sign up.',
				})
				return false
			} else if (years && months && days) {
				if (years + 1 === legalAge && months >= 11 && days >= 27) {
					await secureStorageItemCreate({
						key: 'BIRTHDAY_TOKEN',
						value: String(selectedDate),
					})
				}
			} else if (years && years < legalAge) {
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
				pathname: '/(credential)/personalcredentialstack/name',
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
            className="flex-1 items-center flex-column justify-between mt-5 bg-transparent">
            <Heading className="mt-4 font-black text-3xl">
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
				<Text className="text-sm text-error-700">
					{errors.date && errors.date.type ? errors?.date?.message : null}
				</Text>
			</>
            <Box
                className="bg-transparent h-[90px] flex justify-center items-center w-[100%] mb-5">
				<Box
                    className="flex-row justify-between content-around bg-transparent h-[90px]  px-[2.5%]">
					<VStack className="justify-around">
						<Pressable disabled={!!errors.date} onPress={handleSubmit(onSubmit)}>
							<Box
                                className="items-center justify-center h-[60px]  w-[60px] rounded-full bg-primary-500">
								<Feather name='arrow-right' size={32} color={errors?.date ? '#292524' : 'white'} />
							</Box>
						</Pressable>
					</VStack>
				</Box>
			</Box>
        </Box>
    );
}
