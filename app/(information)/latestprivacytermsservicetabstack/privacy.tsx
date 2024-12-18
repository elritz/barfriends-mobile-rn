import {SafeAreaView, ScrollView, useWindowDimensions} from 'react-native'
import RenderHtml from 'react-native-render-html'
import {useReactiveVar} from '@apollo/client'

import {usePrivacyTermsDocumentsQuery} from '#/graphql/generated'
import {ThemeReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import TermsLoadingState from '#/src/view/screens/settings/TermsLoadingState'

export default () => {
  const {width} = useWindowDimensions()
  const rTheme = useReactiveVar(ThemeReactiveVar)

  const {data, loading} = usePrivacyTermsDocumentsQuery()

  if (loading && data) {
    return <TermsLoadingState />
  }

  const source = {
    html: data?.privacyTermsDocuments.privacy.content,
  }

  return (
    <Box className="flex-1 rounded-none">
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'center',
            margin: 10,
          }}>
          <RenderHtml
            contentWidth={width}
            source={source}
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
        </SafeAreaView>
      </ScrollView>
    </Box>
  )
}
