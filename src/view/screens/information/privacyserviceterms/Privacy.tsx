import { Box } from "#/src/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import TermsLoadingState from "#/src/view/screens/settings/TermsLoadingState";
import { usePrivacyTermsDocumentsQuery } from "#/graphql/generated";
import { ThemeReactiveVar } from "#/reactive";
import { ScrollView } from "react-native";
import { useWindowDimensions } from "react-native";
import RenderHTML from "react-native-render-html";

export default function Privacy() {
  const rTheme = useReactiveVar(ThemeReactiveVar);
  const { width } = useWindowDimensions();

  const { data, loading, error } = usePrivacyTermsDocumentsQuery({
    onCompleted(data) {
      const source = {
        html: data?.privacyTermsDocuments.privacy.content,
      };
    },
  });

  if ((loading && !data) || !data?.privacyTermsDocuments) {
    return <TermsLoadingState />;
  }

  return (
    <Box style={{ flex: 1 }} className="bg-transparent p-3">
      <ScrollView>
        <RenderHTML
          contentWidth={width}
          source={{ html: data.privacyTermsDocuments.privacy.content }}
          enableCSSInlineProcessing={true}
          allowedStyles={["color", "backgroundColor"]}
          classesStyles={{
            "body-1": {
              color:
                rTheme.colorScheme === "light"
                  ? rTheme.theme?.gluestack.tokens.colors.light900
                  : rTheme.theme?.gluestack.tokens.colors.light100,
              fontSize: 19,
            },
            "lisitem-1": {
              color:
                rTheme.colorScheme === "light"
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
  );
}
