import AnimatedSplashScreen from '@components/screens/splash/AnimatedSplashScreen'
import { useEffect, useState } from 'react'

function AnimatedAppLoader({ children, assets }) {
	const [isAppSplashIsReady, setAppSplashIsReady] = useState(false)

	useEffect(() => {
		async function prepare() {
			try {
				setAppSplashIsReady(true)
			} catch (e) {
				console.warn(e)
			}
		}
		prepare()
	}, [assets])

	if (!isAppSplashIsReady) {
		return null
	}

	return <AnimatedSplashScreen assets={assets}>{children}</AnimatedSplashScreen>
}

export default AnimatedAppLoader
