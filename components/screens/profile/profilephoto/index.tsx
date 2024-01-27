import { useReactiveVar } from '@apollo/client'
import ProfilePhotoEmptyState from './ProfilePhotoEmptyState'
import { Box, Pressable } from '@gluestack-ui/themed'
import {
	Maybe,
	Photo,
	PhotoCreateManyProfileInput,
	useUploadProfilePhotoMutation,
} from '@graphql/generated'
import { ActivityIndicator, Image } from 'react-native'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import useCloudinaryImageUploading from '@util/uploading/useCloudinaryImageUploading'

type Props = {
	photo: Maybe<Photo> | undefined
}

export default function ProfilePhoto({ photo }: Props) {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [isLoading, setLoading] = useState(false)

	const [addProfilePhotosMutation, { data, loading, error }] = useUploadProfilePhotoMutation({
		onCompleted: data => {
			AuthorizationReactiveVar({
				...rAuthorizationVar,
				Profile: {
					...rAuthorizationVar?.Profile,
					profilePhoto: {
						...data.uploadProfilePhoto,
					},
				},
			})
		},
	})
	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		setTimeout(() => {
			setLoading(true)
		}, 1500)
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			presentationStyle: ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
			selectionLimit: 1,
			aspect: [4, 3],
			allowsEditing: true,
			allowsMultipleSelection: false,
			quality: 1,
		})

		if (result.assets) {
			const resultSettled = await Promise.allSettled(
				result.assets.map(async item => {
					const data = await useCloudinaryImageUploading(item.uri)
					return data.secure_url
				}),
			)

			const images: PhotoCreateManyProfileInput[] = resultSettled
				.filter(item => item.status === 'fulfilled' && item.value)
				.map(item => ({ url: String(item.value) }))

			addProfilePhotosMutation({
				variables: {
					photos: {
						data: [...images],
					},
				},
			})
			setLoading(false)
		} else {
			setLoading(false)
		}
	}

	if (isLoading) {
		return (
			<Pressable
				p={'$2'}
				alignItems='center'
				justifyContent='center'
				sx={{
					w: 120,
					h: 130,
					_light: {
						bg: '$red300',
					},
					_dark: {
						bg: '$red500',
					},
				}}
				rounded={'$lg'}
			>
				<ActivityIndicator size={'small'} />
			</Pressable>
		)
	}

	if (!photo?.id) {
		return (
			<Pressable
				onPress={pickImage}
				p={'$2'}
				sx={{
					w: 120,
					h: 130,
					_light: {
						bg: '$light300',
					},
					_dark: {
						bg: '$light800',
					},
				}}
				rounded={'$lg'}
			>
				<ProfilePhotoEmptyState />
			</Pressable>
		)
	}

	return (
		<Pressable onPress={pickImage} p={'$2'} rounded={'$lg'}>
			<Box
				sx={{
					h: 130,
					w: 120,
				}}
				rounded={'$lg'}
				overflow={'hidden'}
				mb={'$3'}
			>
				<Image
					source={{
						uri: photo?.url,
					}}
					style={{
						height: '100%',
						width: '100%',
					}}
				/>
			</Box>
		</Pressable>
	)
}
