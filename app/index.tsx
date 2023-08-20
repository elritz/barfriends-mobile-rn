import { useReactiveVar } from '@apollo/client'
import { Box } from '@components/core'
import { useCheckPrivacyTermsDocumentUpdateQuery } from '@graphql/generated'
import { ThemeReactiveVar } from '@reactive'
import { Redirect } from 'expo-router'
import { uniqueId } from 'lodash'
import { MotiView } from 'moti'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Easing } from 'react-native-reanimated'

const size = 500

export default () => {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const [isLoading, setLoading] = useState(true)
	const { data, loading, error } = useCheckPrivacyTermsDocumentUpdateQuery({
		onCompleted: data => {
			setTimeout(() => {
				setLoading(false)
			}, 1500)
			if (
				data.checkPrivacyTermsDocumentUpdate.__typename === 'LatestPrivacyAndTermsDocumentResponse'
			) {
				// router.replace({
				// 	pathname: '(information)/latestprivacyservicetoptab',
				// })
			}
			if (data.checkPrivacyTermsDocumentUpdate.__typename === 'Error') {
				// router.replace({
				// 	pathname: '(app)/hometab/venuefeed',
				// })
			}
		},
	})

	const styles = StyleSheet.create({
		dot: {
			height: size,
			width: size,
			borderRadius: size / 1.5,
			backgroundColor:
				rTheme.colorScheme === 'light'
					? rTheme.theme?.gluestack.tokens.colors.light200
					: rTheme.theme?.gluestack.tokens.colors.dark100,
		},
	})
	const LoadingAnimationLocation = () => {
		return (
			<Box
				bg={'transparent'}
				style={[
					styles.dot,
					{
						marginLeft: '50%',
						transform: [{ translateX: -size / 2 }],
						alignContent: 'center',
						justifyContent: 'center',
					},
				]}
			>
				{[...Array(4).keys()].map((item, index) => {
					return (
						<MotiView
							key={uniqueId()}
							style={[styles.dot, StyleSheet.absoluteFillObject]}
							from={{
								opacity: 0.5,
								scale: 1,
							}}
							animate={{
								opacity: 0,
								scale: 2.5,
							}}
							transition={{
								type: 'timing',
								duration: 2000,
								easing: Easing.out(Easing.ease),
								loop: true,
								repeatReverse: true,
								delay: index * 600,
							}}
						/>
					)
				})}
			</Box>
		)
	}

	if (!data || isLoading) {
		return (
			<View
				style={{
					flex: 1,
					alignContent: 'center',
					marginTop: size * 1.5,
				}}
			>
				<LoadingAnimationLocation />
			</View>
		)
	}

	if (data.checkPrivacyTermsDocumentUpdate.__typename === 'Error') {
		return <Redirect href={'(app)/hometab/venuefeed'} />
	}
	if (data.checkPrivacyTermsDocumentUpdate.__typename === 'LatestPrivacyAndTermsDocumentResponse') {
		return <Redirect href={'(information)/latestprivacyservicetoptab'} />
	}
}
