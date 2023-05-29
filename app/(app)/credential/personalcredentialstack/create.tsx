import { useReactiveVar } from '@apollo/client'
import CompanyCoasterLogoDynamic from '@assets/images/company/CompanyCoasterLogoDynamic'
import { Feather } from '@expo/vector-icons'
import {
	AuthorizationDeviceManager,
	ProfileType,
	useCreatePersonalProfileMutation,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar, CredentialPersonalProfileReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { Text, Box, Heading, Button, VStack, Icon } from 'native-base'

export default () => {
	const router = useRouter()
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)

	const [switchDeviceProfileMutation, { data: SDPData, loading: SDPLoading, error: SDPError }] =
		useSwitchDeviceProfileMutation({
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

	const [createProfilePersonal, { loading: CPPLoading }] = useCreatePersonalProfileMutation({
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
		onCompleted: async data => {
			if (data.createPersonalProfile?.__typename === 'AuthorizationDeviceManager') {
				switchDeviceProfileMutation({
					variables: {
						profileId: String(data?.createPersonalProfile.id),
						profileType: ProfileType.Personal,
					},
				})
			}
		},
	})

	const onSubmit = async () => {
		createProfilePersonal()
	}

	return (
		<VStack safeArea justifyContent={'space-between'} h={'full'} alignItems='center' mx={4}>
			<VStack space={2} alignItems={'center'} justifyContent={'center'} height={'lg'}>
				<CompanyCoasterLogoDynamic />
				<Box>
					<Heading fontWeight={'black'} fontSize={'4xl'}>
						Welcome to Bfs
					</Heading>
				</Box>
				<Box borderRadius={'md'}>
					<Text fontSize={'lg'}>
						Enrich your experience. We are those we hang around. If you're not feeling it find new
						friends.
					</Text>
				</Box>
			</VStack>
			<Button
				onPress={onSubmit}
				alignSelf={'center'}
				isLoading={CPPLoading || SDPLoading}
				size={'lg'}
				rightIcon={<Icon color='white' as={Feather} name='arrow-right' size={'md'} />}
				variant={'solid'}
				borderRadius={'md'}
				h={60}
				fontSize={'lg'}
			>
				Complete
			</Button>
		</VStack>
	)
}
