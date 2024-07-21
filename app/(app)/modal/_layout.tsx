import { Text } from "#/components/ui/text";
import { HStack } from "#/components/ui/hstack";
import { Button, ButtonText } from "#/components/ui/button";
import { useReactiveVar } from '@apollo/client'
import ChevronBackArrow from '#/components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import { Emojimood, Story, useUpdateStoryEmojimoodMutation } from '#/graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '#/reactive'
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
                                    <HStack className="justify-between items-center py-3 pr-2">
										<ChevronBackArrow />
										{methods.watch('emojimood.id') ||
										(rAuthorizationVar?.Profile?.tonightStory?.emojimood?.id &&
											methods.watch('emojimood.id') !==
												rAuthorizationVar?.Profile?.tonightStory?.emojimood?.id) ? (
											<Button
                                                size='xs'
                                                onPress={() => {
													updateStoryEmojimoodMutation({
														variables: {
															emojimoodId: parseInt(methods.getValues('emojimood.id')),
														},
													})
												}}
                                                className={` ${updatedEmojimoodSuccess ? "dark:bg-green-500" : loading ? "dark:bg-gray-500" : "dark:bg-blue-600"} ${updatedEmojimoodSuccess ? "bg-green-500" : loading ? "bg-gray-500" : "bg-blue-600"}  rounded-full `}>
												<ButtonText className="font-bold text-sm">
													{loading ? 'Updating' : updatedEmojimoodSuccess ? 'Updated' : 'Update'}
												</ButtonText>
											</Button>
										) : null}
									</HStack>
                                </BlurView>
                            );
						},
					}}
				/>
			</Stack>
        </FormProvider>
    );
}
