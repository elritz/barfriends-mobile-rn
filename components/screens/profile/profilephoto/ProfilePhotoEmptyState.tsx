import { Pressable } from "#/components/ui/pressable";
import { Center } from "#/components/ui/center";
import { Box } from "#/components/ui/box";
import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '#/reactive'
import * as ImagePicker from 'expo-image-picker'
import useCloudinaryImageUploading from '#/util/uploading/useCloudinaryImageUploading'
import { useState } from 'react'
import { PhotoCreateManyProfileInput, useUploadProfilePhotoMutation } from '#/graphql/generated'

export default function ProfilePhotoEmptyState() {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const [isLoading, setLoading] = useState(false)

	return (
        <Box className="h-[100%] justify-center">
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
                className="border-light-700  dark:border-light-400 -bottom-15  -right-15 border-2 rounded-full items-center justify-center absolute">
				<Ionicons
					name='arrow-up-circle'
					color={
						rTheme.colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light900
							: rTheme.theme?.gluestack.tokens.colors.light100
					}
					size={26}
					style={{
						borderRadius: 50,
						zIndex: 10,
					}}
				/>
			</Box>
        </Box>
    );
}
