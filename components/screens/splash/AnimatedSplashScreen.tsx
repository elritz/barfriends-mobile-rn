import { useReactiveVar } from '@apollo/client'
import { ENVIRONMENT } from '@env'
import VectorFonts from '@helpers/VectorFonts'
import { ThemeReactiveVar } from '@reactive'
import { cacheFonts, cacheImages } from '@util/hooks/local/useCacheImages'
import { useAssets } from 'expo-asset'
import { SplashScreen } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, Image } from 'react-native'

function AnimatedSplashScreen({ children }) {
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	const [isSplashAnimationComplete, setAnimationComplete] = useState(false)
	const [isAppReady, setAppReady] = useState(false)

	const [assets, Aerror] = useAssets([
		require(`../../../assets/images/splash/splash.${ENVIRONMENT}.light.png`),
		require(`../../../assets/images/splash/splash.${ENVIRONMENT}.dark.png`),
	])

	useEffect(() => {
		if (isAppReady) {
			setTimeout(() => setAnimationComplete(true), 1)
			SplashScreen.hideAsync()
		}
	}, [isAppReady])

	useEffect(() => {
		// Perform some sort of async data or asset fetching.
		setTimeout(() => {
			// When all loading is setup, unmount the splash screen component.
			setTimeout(() => setAppReady(true), 1000)
		}, 1000)
	}, [])

	const onImageLoaded = useCallback(async () => {
		try {
			const imageAssets = cacheImages([])
			const fontAssets = cacheFonts([...VectorFonts])

			await Promise.all([...imageAssets, ...fontAssets])
		} catch (e) {
			console.warn(e)
			// handle errors
		} finally {
			setAppReady(true)
		}
	}, [])

	if (!assets) {
		return null
	}

	if (assets && !isSplashAnimationComplete) {
		return (
			<View
				pointerEvents='none'
				style={[
					StyleSheet.absoluteFill,
					{
						backgroundColor: rThemeVar.colorScheme === 'light' ? '#f1f1f1' : '#0d0d0d',
					},
				]}
			>
				<Image
					onLoad={onImageLoaded}
					source={
						rThemeVar.localStorageColorScheme === 'system'
							? rThemeVar.colorScheme === 'light'
								? assets[0]
								: assets[1]
							: rThemeVar.colorScheme === 'light'
							? assets[0]
							: assets[1]
					}
					style={{
						width: '100%',
						height: '100%',
						resizeMode: 'cover',
					}}
				/>
			</View>
		)
	}

	return (
		<View
			style={{
				flex: 1,
			}}
		>
			{children}
		</View>
	)
}

export default AnimatedSplashScreen
