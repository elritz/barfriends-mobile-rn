import { useReactiveVar } from '@apollo/client'
import { Button, Heading, VStack, Box, Text } from '@components/core'
import { Ionicons } from '@expo/vector-icons'
import { PermissionContactsReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'

export default function InviteCard() {
	const router = useRouter()
	const rPermissionContactsVar = useReactiveVar(PermissionContactsReactiveVar)

	return (
		<VStack w={'$full'} justifyContent='space-between' flex={1} mb={'$2'}>
			<VStack mt={'$4'} w={'$full'} alignItems={'flex-start'}>
				<Box bg='$red400' h={'$10'} w={'$10'} alignItems='center' justifyContent='center'>
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
				<Text>Invite to bfs and to this venue</Text>
			</VStack>
			<Button
				mt={'$2'}
				size={'lg'}
				w={'$full'}
				alignItems='center'
				justifyContent='center'
				onPress={() => {
					rPermissionContactsVar?.granted
						? router.push({
								pathname: '/public/contacts',
						  })
						: router.push({
								pathname: '(app)/permission/contacts',
						  })
				}}
				width={'$full'}
				rounded={'$md'}
			>
				<Button.Text>Invite</Button.Text>
			</Button>
		</VStack>
	)
}
