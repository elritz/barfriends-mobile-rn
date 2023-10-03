import { useReactiveVar } from '@apollo/client'
import { Box } from '@gluestack-ui/themed'
import { useCheckPrivacyTermsDocumentUpdateQuery } from '@graphql/generated'
import { ThemeReactiveVar, TermsServiceReactiveVar } from '@reactive'
import { useRouterNotifications } from '@util/hooks/useRouterNotifications'
import { Redirect } from 'expo-router'
import { uniqueId } from 'lodash'
import { MotiView } from 'moti'
import { useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Easing } from 'react-native-reanimated'

const size = 500
const windowHeight = Dimensions.get('window').height

export default () => {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const [isLoading, setLoading] = useState(true)

	useRouterNotifications()

	const { data, loading, error } = useCheckPrivacyTermsDocumentUpdateQuery({
		onCompleted: data => {
			setTimeout(() => {
				setLoading(false)
			}, 500)
			if (
				data.checkPrivacyTermsDocumentUpdate.__typename === 'LatestPrivacyAndTermsDocumentResponse'
			) {
				TermsServiceReactiveVar({
					update: true,
				})
			}
			if (data.checkPrivacyTermsDocumentUpdate.__typename === 'Error') {
				TermsServiceReactiveVar({
					update: false,
				})
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
					: rTheme.theme?.gluestack.tokens.colors.light800,
		},
	})
	const LoadingAnimationLocation = () => {
		return (
			<View
				// bg={'transparent'}
				style={[
					styles.dot,
					{
						marginTop: windowHeight - size / 2,
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
			</View>
		)
	}

	if (!data || isLoading) {
		return (
			<View
				style={{
					flex: 1,
					alignContent: 'center',
					// marginTop: size * 1.5,
					backgroundColor:
						rTheme.colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light100
							: rTheme.theme?.gluestack.tokens.colors.light800,
				}}
			>
				<LoadingAnimationLocation />
			</View>
		)
	}
	return <Redirect href={'/(app)/hometab/venuefeed'} />
	// return <Redirect href={'/(app)/conversation'} />
	// return <Redirect href={'/(app)/hometab/messagestack'} />
	// return <Redirect href={`/(app)/public/personal/${'4068040c-5929-4140-9e28-666904c20243'}`} />
}
