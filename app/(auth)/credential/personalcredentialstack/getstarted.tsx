import { useReactiveVar } from '@apollo/client'
import CompanyCoasterLogoDynamic from '@assets/images/company/CompanyCoasterLogoDynamic'
import { Box, Heading, Pressable, Text, VStack } from '@components/core'
import { Feather } from '@expo/vector-icons'
import { usePrivacyTermsDocumentsQuery } from '@graphql/generated'
import { CredentialPersonalProfileReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default () => {
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const router = useRouter()

	const { data: PTSData, loading: PTSLoading, error: PTSError } = usePrivacyTermsDocumentsQuery()

	const _press = () => {
		CredentialPersonalProfileReactiveVar({
			...credentialPersonalProfileVar,
			ServiceId: PTSData?.privacyTermsDocuments.termsofservice.id,
			PrivacyId: PTSData?.privacyTermsDocuments.privacy.id,
		})
		router.push({
			pathname: '(app)/credential/personalcredentialstack/phone',
		})
	}
	const _pressTermsServices = tab => {
		switch (tab) {
			case 'terms':
				router.push({
					pathname: '(app)/settings/privacytermsservicetabstack',
				})
		}
	}

	return (
		<SafeAreaView>
			<VStack justifyContent={'space-between'} h={'$full'} alignItems='center' mx={'$4'}>
				<Box />
				<Box bg='$transparent' justifyContent={'center'}>
					<CompanyCoasterLogoDynamic backgroundColor='black' />
					<Heading
						testID={'title-text'}
						mt={'$4'}
						fontWeight={'$black'}
						fontSize={'$4xl'}
						lineHeight={'$3xl'}
					>
						Let's Fucking Gooooooo out tonight!
					</Heading>
					<Pressable disabled={PTSLoading} onPress={() => _pressTermsServices('terms')}>
						<Text fontSize={'$lg'}>
							By continuing, you agree to the
							<Text fontSize={'$lg'} fontWeight={'$bold'} color={'$primary500'}>
								{' '}
								Term of the Services
							</Text>
							<Text fontSize={'$lg'}> and</Text>
							<Text fontSize={'$lg'} fontWeight={'$bold'} color={'$primary500'}>
								{' '}
								Privacy Policies.
							</Text>
						</Text>
					</Pressable>
				</Box>
				<>
					<Pressable disabled={PTSLoading} onPress={_press}>
						<Box
							alignItems='center'
							justifyContent='center'
							sx={{
								h: 60,
								w: 60,
							}}
							rounded={'$full'}
							bg='$primary500'
						>
							<Feather name='arrow-right' size={32} color={'white'} />
						</Box>
					</Pressable>
				</>
			</VStack>
		</SafeAreaView>
	)
}
