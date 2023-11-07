import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { Button, Heading, VStack, Box, Text, ButtonText } from '@gluestack-ui/themed'
import { PermissionContactsReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'

export default function InviteCard() {
	const router = useRouter()
	const rPermissionContactsVar = useReactiveVar(PermissionContactsReactiveVar)

	return (
		<VStack w={'$full'} justifyContent='space-between' flex={1} mb={'$2'}>
			<VStack mt={'$4'} w={'$full'} alignItems={'flex-start'}>
				<Box bg='$red400' h={'$8'} w={'$8'} alignItems='center' justifyContent='center' rounded={'$md'}>
					<Ionicons name='people' size={23} color={'black'} />
				</Box>
				<Heading
					mt={'$2'}
					textTransform={'uppercase'}
					lineHeight={'$xs'}
					fontSize={'$lg'}
					fontWeight={'$black'}
				>
					Share
				</Heading>
				<Text>Invite to revel and to this venue</Text>
			</VStack>
			<Button
				mt={'$2'}
				size={'lg'}
				w={'$full'}
				rounded={'$md'}
				alignItems='center'
				justifyContent='center'
				onPress={() => {
					rPermissionContactsVar?.granted
						? router.push({
								pathname: '/public/contacts',
						  })
						: router.push({
								pathname: '/(app)/permission/contacts',
						  })
				}}
			>
				<ButtonText>Invite</ButtonText>
			</Button>
		</VStack>
	)
}
