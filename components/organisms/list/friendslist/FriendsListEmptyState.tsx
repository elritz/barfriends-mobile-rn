import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { Box, Button, ButtonText, Heading, Pressable, Text, VStack } from '@gluestack-ui/themed'
import { PermissionContactsReactiveVar, ThemeReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'

export const FriendsListEmptyState = () => {
	const router = useRouter()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const permissionContactsVar = useReactiveVar(PermissionContactsReactiveVar)
	return (
		<VStack
			space={'md'}
			my={'$5'}
			p={'$5'}
			justifyContent={'center'}
			alignItems={'center'}
			rounded={'$md'}
		>
			<Box bg='$transparent' alignItems={'center'}>
				<Heading lineHeight={'$xl'} px={'$2'} textAlign='center' fontSize={'$2xl'}>
					{`No barfriends\n Find your friends below`}
				</Heading>
			</Box>
			<VStack space={'md'} w={'$full'} alignItems={'center'} mt={'$4'}>
				<Button
					w={'100%'}
					size={'lg'}
					onPress={() =>
						router.navigate({
							pathname: '/(app)/permission/contacts',
						})
					}
				>
					<ButtonText fontSize={'$lg'} fontWeight={'$bold'}>
						{permissionContactsVar?.granted ? 'All Contacts' : 'Use Contacts'}
					</ButtonText>
				</Button>
				<Pressable
					w={'100%'}
					alignItems='center'
					flexDirection='row'
					justifyContent='center'
					onPress={() => {
						router.navigate({
							pathname: '/(app)/explore/searchtext',
							params: {
								searchtext: '',
							},
						})
					}}
				>
					<Ionicons
						name='search'
						size={20}
						color={
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light900
								: rTheme.theme?.gluestack.tokens.colors.light100
						}
					/>
					<Text ml='$2' fontSize={'$lg'} fontWeight={'$bold'}>
						Search
					</Text>
				</Pressable>
			</VStack>
		</VStack>
	)
}
