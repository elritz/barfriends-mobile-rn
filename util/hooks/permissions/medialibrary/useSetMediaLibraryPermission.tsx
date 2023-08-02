import { useEffect } from 'react'

import * as MediaLibrary from 'expo-media-library'

const useSetMediaLibraryPermission = (): any => {
	const currentMediaPermission = async () => {
		const mediaLibraryPermission = await MediaLibrary.getPermissionsAsync()
	}

	useEffect(() => {
		currentMediaPermission()
	}, [])
}

export default useSetMediaLibraryPermission
