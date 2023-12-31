import * as ImageManipulator from 'expo-image-manipulator'
import { ImagePickerAsset } from 'expo-image-picker'

const useCloudinaryImageUploading = async (photos: ImagePickerAsset[]): Promise<any> => {
	const cloudinaryPhotos = photos.map(async photo => {
		const { base64 } = await ImageManipulator.manipulateAsync(photo.uri, [], {
			compress: 0.6,
			base64: true,
		})

		const base64Img = `data:image/jpg;base64,${base64}`
		const CloudinaryURL = 'https://api.cloudinary.com/v1_1/ritz/image/upload'

		const imageOptions = { file: base64Img, upload_preset: 'barfriends' }

		const cloudinaryData = await fetch(CloudinaryURL, {
			body: JSON.stringify(imageOptions),
			headers: {
				'content-type': 'application/json',
			},
			method: 'POST',
		})
			.then(async r => {
				const data = await r
					.json()
					.then(res => res)
					.catch(err => err)
				return data
			})
			.catch(err => err)

		return cloudinaryData
	})
	return cloudinaryPhotos
}

export default useCloudinaryImageUploading
