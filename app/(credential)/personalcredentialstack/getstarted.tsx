import {SafeAreaView} from 'react-native-safe-area-context'
import {Link, useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {Feather} from '@expo/vector-icons'

import CompanyCoasterLogoDynamic from '#/assets/images/company/CompanyCoasterLogoDynamic'
import {usePrivacyTermsDocumentsQuery} from '#/graphql/generated'
import {CredentialPersonalProfileReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Heading} from '#/src/components/ui/heading'
import {Pressable} from '#/src/components/ui/pressable'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'

export default () => {
  const credentialPersonalProfileVar = useReactiveVar(
    CredentialPersonalProfileReactiveVar,
  )
  const router = useRouter()

  const {data: PTSData, loading: PTSLoading} = usePrivacyTermsDocumentsQuery({
    onError: () => {
      setTimeout(() => {
        router.replace({
          pathname: '/(app)/hometab/venuefeed',
        })
      }, 2000)
    },
  })

  const _press = () => {
    CredentialPersonalProfileReactiveVar({
      ...credentialPersonalProfileVar,
      ServiceId: PTSData?.privacyTermsDocuments?.termsofservice?.id,
      PrivacyId: PTSData?.privacyTermsDocuments?.privacy?.id,
    })
    router.push({
      pathname: '/(credential)/personalcredentialstack/phone',
    })
  }

  return (
    <SafeAreaView>
      <VStack className="mx-4 h-full items-center justify-between">
        <Box />
        <Box className="justify-center bg-transparent">
          <CompanyCoasterLogoDynamic backgroundColor="black" />
          <Heading
            testID={'title-text'}
            className="leading-3xl mt-4 text-4xl font-black">
            Let's Fucking Gooooooo out tonight!
          </Heading>
          {/* <Pressable disabled={PTSLoading} onPress={() => _pressTermsServices()}> */}
          <Link href={'/(information)/latestprivacyservicetoptab'}>
            <Text className="text-lg">
              By continuing, you agree to the
              <Text className="text-lg font-bold text-primary-500">
                {' '}
                Term of the Services
              </Text>
              <Text className="text-lg"> and</Text>
              <Text className="text-lg font-bold text-primary-500">
                {' '}
                Privacy Policies.
              </Text>
            </Text>
          </Link>
          {/* </Pressable> */}
        </Box>
        <VStack space="xs" className="items-center">
          <Pressable
            accessibilityRole="button"
            disabled={PTSLoading || !PTSData?.privacyTermsDocuments}
            onPress={_press}>
            <Box className="h-[60px] w-[60px] items-center justify-center rounded-full bg-primary-500">
              <Feather name="arrow-right" size={32} color={'white'} />
            </Box>
          </Pressable>
        </VStack>
      </VStack>
    </SafeAreaView>
  )
}
