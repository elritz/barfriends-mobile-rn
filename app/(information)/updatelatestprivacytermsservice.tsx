import {Link, useRouter} from 'expo-router'

import {useUpdateProfilePrivacyTermsDocumentUpdateMutation} from '#/graphql/generated'
import {Box} from '#/src/components/ui/box'
import {Button, ButtonSpinner, ButtonText} from '#/src/components/ui/button'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Text} from '#/src/components/ui/text'

export default function TermsServices() {
  const router = useRouter()
  const [updateProfilePrivacyTermsDocuments, {loading}] =
    useUpdateProfilePrivacyTermsDocumentUpdateMutation({
      onCompleted: data => {
        if (data.updateProfilePrivacyTermsDocumentUpdate) {
          router.push({
            pathname: '/(app)/hometab/venuefeed',
          })
        }
      },
    })

  return (
    <Box className="flex-1 p-5">
      <Box className="mt-[45%] flex-1 bg-transparent">
        <Text className="text-lg">Welcome to Barfriends</Text>
        <Heading className="leading-3xl text-4xl">Review the Terms &</Heading>
        <Heading className="leading-3xl text-4xl">Services</Heading>
        <Link href={'/(information)/latestprivacyservicetoptab'}>
          <Text className="text-lg">
            By continuing, you agree to the
            <Text className="text-lg font-bold text-primary-500"> Terms</Text>,
            <Text className="text-lg font-bold text-primary-500">
              {' '}
              Services{' '}
            </Text>
            and
            <Text className="text-lg font-bold text-primary-500">
              {' '}
              Privacy Policy
            </Text>
            .
          </Text>
        </Link>
        <HStack className="mt-5 justify-end">
          <Button
            onPress={() => {
              updateProfilePrivacyTermsDocuments()
            }}
            size="lg"
            className="self-center rounded-full">
            <ButtonText className="mr-2">Continue</ButtonText>
            {loading && <ButtonSpinner size={'small'} />}
          </Button>
        </HStack>
      </Box>
    </Box>
  )
}
