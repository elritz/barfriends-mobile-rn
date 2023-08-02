import { router } from 'expo-router'
import { useEffect } from 'react'

const AuthProvider = props => {
	useEffect(() => {
		setTimeout(() => {
			router.push({
				pathname: '(app)/hometab/venuefeed',
			})
		}, 1)
	}, [])

	return <>{props.children}</>
}

export default AuthProvider
