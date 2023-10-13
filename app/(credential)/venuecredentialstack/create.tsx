import { useReactiveVar } from '@apollo/client'
import CompanyCoasterLogoDynamic from '@assets/images/company/CompanyCoasterLogoDynamic'
import { Feather } from '@expo/vector-icons'
import { Box, Heading, Pressable, Spinner, Text, VStack } from '@gluestack-ui/themed'
import {
	AuthorizationDeviceProfile,
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
			if (data.createPersonalProfile?.__typename === 'AuthorizationDeviceProfile') {
				const deviceManager = data.createPersonalProfile as AuthorizationDeviceProfile
				AuthorizationReactiveVar(deviceManager)
				router.push({
					pathname: '/(app)/hometab/venuefeed',
				})
			}
		},
	})

	const [switchDeviceProfileMutation, { data: SDPData, loading: SDPLoading, error: SDPError }] =
		useSwitchDeviceProfileMutation({
			onError: error => {},
			onCompleted: data => {
				if (data.switchDeviceProfile.__typename === 'AuthorizationDeviceProfile') {
					const deviceManager = data.switchDeviceProfile as AuthorizationDeviceProfile
					AuthorizationReactiveVar(deviceManager)
					router.push({
						pathname: '/(app)/hometab/venuefeed',
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
						Time to Revel
					</Heading>
					<Box bg='$transparent'>
						<Text textAlign='center' fontSize={'$lg'}>
							We are those we hang around.
						</Text>
						<Text mt={'$3'} textAlign='center' fontSize={'$lg'}>
							If you're not feeling it find and make new experiences. We help do that.
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
							<Spinner color={'black'} size='small' />
						) : (
							<Feather name='arrow-right' size={32} color={'white'} />
						)}
					</Box>
				</Pressable>
			</VStack>
		</SafeAreaView>
	)
}
