import { useReactiveVar } from '@apollo/client'
import LogoTransparent from '@assets/images/company/LogoTransparent'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import { Button, HStack, Text } from '@components/core'
import { Emojimood, Story, useUpdateStoryEmojimoodMutation } from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { BlurView } from 'expo-blur'
import { Stack } from 'expo-router'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export type FormType = {
	emojimood: Emojimood
}

export default () => {
	const insets = useSafeAreaInsets()
	const [updatedEmojimoodSuccess, setUpdateEmojimoodSuccess] = useState(false)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)
	useEffect(() => {}, [rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.emojimood?.id])

	const methods = useForm<FormType>({
		defaultValues: {
			emojimood: {
				id: '',
				emojiname: '',
				colors: rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.emojimood?.colors || [''],
				emoji: '',
			},
		},
	})

	const [updateStoryEmojimoodMutation, { data, loading, error }] = useUpdateStoryEmojimoodMutation({
		onCompleted: data => {
			if (data.updateStoryEmojimood && rAuthorizationVar?.DeviceProfile?.Profile) {
				AuthorizationReactiveVar({
					...rAuthorizationVar,
					DeviceProfile: {
						...rAuthorizationVar?.DeviceProfile,
						Profile: {
							...rAuthorizationVar.DeviceProfile.Profile,
							tonightStory: {
								...(data.updateStoryEmojimood as Story),
							},
						},
					},
				})
				setUpdateEmojimoodSuccess(true)
				setTimeout(() => {
					setUpdateEmojimoodSuccess(false)
				}, 1500)
			} else {
				setUpdateEmojimoodSuccess(false)
			}
		},
	})

	return (
		<FormProvider {...methods}>
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: 'transparent',
					},
					headerShown: false,
					animation: 'fade',
				}}
			>
				<Stack.Screen
					name={'DeviceManager'}
					options={{
						headerShown: true,
						headerTitle: () => <LogoTransparent height={30} width={192} />,
						headerLeft: () => <ChevronBackArrow />,
						animation: 'fade',
					}}
				/>
				<Stack.Screen
					name={'Emojimood'}
					options={{
						headerShown: true,
						title: '',
						headerTransparent: true,
						presentation: 'fullScreenModal',
						header: () => {
							return (
								<BlurView tint={rTheme.deviceColorScheme === 'light' ? 'light' : 'dark'} intensity={70}>
									<HStack
										justifyContent='space-between'
										alignItems='center'
										paddingTop={insets.top}
										pb={'$1'}
										pr={'$2'}
									>
										<ChevronBackArrow />
										{methods.watch('emojimood.id') ||
										(rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.emojimood?.id &&
											methods.watch('emojimood.id') !==
												rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.emojimood?.id) ? (
											<Button
												size='xs'
												sx={{
													_dark: {
														bg: updatedEmojimoodSuccess ? '$green500' : loading ? '$gray500' : '$blue600',
													},
													_light: {
														bg: updatedEmojimoodSuccess ? '$green500' : loading ? '$gray500' : '$blue600',
													},
												}}
												rounded={'$full'}
												onPress={() => {
													updateStoryEmojimoodMutation({
														variables: {
															emojimoodId: parseInt(methods.getValues('emojimood.id')),
														},
													})
												}}
											>
												<Button.Text fontWeight='$bold' fontSize={'$sm'}>
													{loading ? 'Updating' : updatedEmojimoodSuccess ? 'Updated' : 'Update'}
												</Button.Text>
											</Button>
										) : null}
									</HStack>
								</BlurView>
							)
						},
					}}
				/>
			</Stack>
		</FormProvider>
	)
}
