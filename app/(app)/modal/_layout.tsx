import { useReactiveVar } from '@apollo/client'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import { Button, ButtonText, HStack, Text } from '@gluestack-ui/themed'
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
	useEffect(() => {}, [rAuthorizationVar?.Profile?.tonightStory?.emojimood?.id])

	const methods = useForm<FormType>({
		defaultValues: {
			emojimood: {
				id: '',
				emojiname: '',
				colors: rAuthorizationVar?.Profile?.tonightStory?.emojimood?.colors || [''],
				emoji: '',
			},
		},
	})

	const [updateStoryEmojimoodMutation, { data, loading, error }] = useUpdateStoryEmojimoodMutation({
		onCompleted: data => {
			if (data.updateStoryEmojimood && rAuthorizationVar?.Profile) {
				AuthorizationReactiveVar({
					...rAuthorizationVar,
					Profile: {
						...rAuthorizationVar.Profile,
						tonightStory: {
							...(data.updateStoryEmojimood as Story),
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
					contentStyle: {
						backgroundColor: 'transparent',
					},
					headerShown: false,
					animation: 'fade',
					presentation: 'modal',
				}}
			>
				<Stack.Screen
					name={'devicemanager'}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name={'asks'}
					options={{
						headerShown: false,
					}}
				/>

				<Stack.Screen
					name={'Emojimood'}
					options={{
						headerShown: true,
						title: '',
						headerTransparent: true,
						header: () => {
							return (
								<BlurView tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'} intensity={70}>
									<HStack justifyContent='space-between' alignItems='center' py={'$3'} pr={'$2'}>
										<ChevronBackArrow />
										{methods.watch('emojimood.id') ||
										(rAuthorizationVar?.Profile?.tonightStory?.emojimood?.id &&
											methods.watch('emojimood.id') !==
												rAuthorizationVar?.Profile?.tonightStory?.emojimood?.id) ? (
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
												<ButtonText fontWeight='$bold' fontSize={'$sm'}>
													{loading ? 'Updating' : updatedEmojimoodSuccess ? 'Updated' : 'Update'}
												</ButtonText>
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
