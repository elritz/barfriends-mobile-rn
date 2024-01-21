import { useReactiveVar } from '@apollo/client'
import { Box, Center, Pressable } from '@gluestack-ui/themed'
import { Ionicons } from '@expo/vector-icons'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import * as ImagePicker from 'expo-image-picker'
import useCloudinaryImageUploading from '@util/uploading/useCloudinaryImageUploading'
import { useState } from 'react'
import { PhotoCreateManyProfileInput, useUploadProfilePhotoMutation } from '@graphql/generated'

export default function ProfilePhotoEmptyState() {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const [isLoading, setLoading] = useState(false)

	return (
		<Box
			sx={{
				h: '100%',
			}}
			justifyContent={'center'}
		>
			<Center>
				<Ionicons
					size={40}
					name={'person'}
					color={
						rTheme.colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light900
							: rTheme.theme?.gluestack.tokens.colors.light100
					}
				/>
			</Center>
			<Box
				sx={{
					_light: {
						borderColor: '$light700',
					},
					_dark: {
						borderColor: '$light400',
					},
					bottom: -15,
					right: -15,
				}}
				borderWidth={'$2'}
				rounded={'$full'}
				alignItems={'center'}
				justifyContent={'center'}
				position={'absolute'}
			>
				<Ionicons
					name='arrow-up-circle'
					color={
						rTheme.colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light900
							: rTheme.theme?.gluestack.tokens.colors.light100
					}
					size={26}
					style={{
						marginLeft: 2,
						borderRadius: 50,
						zIndex: 10,
					}}
				/>
			</Box>
		</Box>
	)
}
