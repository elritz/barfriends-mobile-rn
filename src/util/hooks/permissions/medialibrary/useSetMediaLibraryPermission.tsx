// TODO: This is incomplete, and I forget why I was doing this
import * as MediaLibrary from 'expo-media-library'
import { useEffect } from 'react'

const useSetMediaLibraryPermission = (): any => {
	const currentMediaPermission = async () => {
		const mediaLibraryPermission = await MediaLibrary.getPermissionsAsync()
	}

	useEffect(() => {
		currentMediaPermission()
	}, [])
}

export default useSetMediaLibraryPermission
