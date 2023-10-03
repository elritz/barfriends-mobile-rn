import { useReactiveVar } from '@apollo/client'
import { Box } from '@gluestack-ui/themed'
import TermsLoadingState from '@components/screens/settings/TermsLoadingState'
import { usePrivacyTermsDocumentsQuery } from '@graphql/generated'
import { ThemeReactiveVar } from '@reactive'
import { ScrollView, useWindowDimensions } from 'react-native'
import RenderHTML from 'react-native-render-html'

export default function Service() {
	const { width } = useWindowDimensions()
	const rTheme = useReactiveVar(ThemeReactiveVar)

	const { data, loading, error } = usePrivacyTermsDocumentsQuery()

	if ((loading && !data) || !data?.privacyTermsDocuments) {
		return <TermsLoadingState />
	}
	return (
		<Box bg={'$transparent'} style={{ flex: 1 }} p={'$3'}>
			<ScrollView>
				<RenderHTML
					contentWidth={width}
					source={{ html: data.privacyTermsDocuments.termsofservice.content }}
					enableCSSInlineProcessing={true}
					allowedStyles={['color', 'backgroundColor']}
					classesStyles={{
						'body-1': {
							color:
								rTheme.colorScheme === 'light'
									? rTheme.theme?.gluestack.tokens.colors.light900
									: rTheme.theme?.gluestack.tokens.colors.light100,
							fontSize: 19,
						},
						'lisitem-1': {
							color:
								rTheme.colorScheme === 'light'
									? rTheme.theme?.gluestack.tokens.colors.light900
									: rTheme.theme?.gluestack.tokens.colors.light100,
							fontSize: 19,
						},
						highlight: {
							color: rTheme.theme?.gluestack.tokens.colors.primary500,
						},
					}}
				/>
			</ScrollView>
		</Box>
	)
}
