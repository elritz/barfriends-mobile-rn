import { useReactiveVar } from '@apollo/client'
import LogoTransparent from '@assets/images/company/LogoTransparent'
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
	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: 'transparent',
				},
				contentStyle: {
					backgroundColor: 'transparent',
				},
				headerTitle: () => <LogoTransparent height={30} width={192} />,
				headerLeft: () => <ChevronBackArrow />,
				animation: 'fade',
				presentation: 'modal',
			}}
		>
			<Stack.Screen name={'backgroundlocationnextask'} />
			<Stack.Screen name={'foregroundlocationnextask'} />
			<Stack.Screen name={'notificationnextask'} />
		</Stack>
	)
}
