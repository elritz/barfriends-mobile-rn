import { useReactiveVar } from '@apollo/client'
import CompanyCoasterLogoDynamic from '@assets/images/company/CompanyCoasterLogoDynamic'
import { Box, Heading, Pressable, Spinner, Text, VStack } from '@components/core'
import { Feather } from '@expo/vector-icons'
import {
	AuthorizationDeviceManager,
	useCreatePersonalProfileMutation,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar, CredentialPersonalProfileReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default () => {
	const router = useRouter()
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)

	const [createProfilePersonalMutation, { loading: CPPLoading }] = useCreatePersonalProfileMutation({
		variables: {
			data: {
				PrivacyPolicyId: String(credentialPersonalProfileVar.PrivacyId),
				ServicesId: String(credentialPersonalProfileVar.ServiceId),
				birthday: credentialPersonalProfileVar.birthday,
				password: String(credentialPersonalProfileVar.password),
				username: String(credentialPersonalProfileVar.username),
				fullname: `${credentialPersonalProfileVar.firstname} ${credentialPersonalProfileVar.lastname}`,
				address: '',
				EmailInput: {
					email: credentialPersonalProfileVar.email,
				},
				PhoneInput: {
					...credentialPersonalProfileVar.phone,
				},
			},
		},
		onError: error => {},
		onCompleted: async data => {
			if (data.createPersonalProfile?.__typename === 'AuthorizationDeviceManager') {
				const deviceManager = data.createPersonalProfile as AuthorizationDeviceManager
				AuthorizationReactiveVar(deviceManager)
				router.push({
					pathname: '(app)/hometab',
				})
			}
		},
	})

	const [switchDeviceProfileMutation, { data: SDPData, loading: SDPLoading, error: SDPError }] =
		useSwitchDeviceProfileMutation({
			onError: error => {},
			onCompleted: data => {
				if (data.switchDeviceProfile.__typename === 'AuthorizationDeviceManager') {
					const deviceManager = data.switchDeviceProfile as AuthorizationDeviceManager
					AuthorizationReactiveVar(deviceManager)
					router.push({
						pathname: '(app)/hometab',
					})
				}
			},
		})

	const onSubmit = async () => {
		createProfilePersonalMutation()
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<VStack justifyContent={'space-between'} flex={1} alignItems='center' mx={'$4'}>
				<Box bg='$transparent' />
				<VStack space={'md'} alignItems={'center'} justifyContent={'center'}>
					<CompanyCoasterLogoDynamic backgroundColor='black' />
					<Heading fontWeight={'$black'} lineHeight={'$3xl'} fontSize={'$4xl'}>
						Welcome to Bfs
					</Heading>
					<Box bg='$transparent'>
						<Text fontSize={'$lg'}>
							We are those we hang around. If you're not feeling it find and make new friends. We can
							enrich your experience doing that.
						</Text>
					</Box>
				</VStack>

				<Pressable disabled={CPPLoading || SDPLoading} onPress={() => onSubmit()}>
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
						{CPPLoading || SDPLoading ? (
							<Spinner color={'black'} size='large' />
						) : (
							<Feather name='arrow-right' size={32} color={'white'} />
						)}
					</Box>
				</Pressable>
			</VStack>
		</SafeAreaView>
	)
}
