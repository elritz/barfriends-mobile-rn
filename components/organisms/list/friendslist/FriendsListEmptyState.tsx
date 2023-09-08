import { useReactiveVar } from '@apollo/client'
import { Box, Button, Heading, Pressable, Text, VStack } from '@components/core'
import { Ionicons } from '@expo/vector-icons'
import { PermissionContactsReactiveVar, ThemeReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'

export const FriendsListEmptyState = () => {
	const router = useRouter()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const permissionContactsVar = useReactiveVar(PermissionContactsReactiveVar)
	return (
		<VStack
			space={'$3'}
			my={'$5'}
			p={'$5'}
			justifyContent={'center'}
			alignItems={'center'}
			rounded={'$md'}
		>
			<Box bg='$transparent' alignItems={'center'}>
				<Heading lineHeight={'$xl'} px={'$2'} textAlign='center' fontSize={'$2xl'}>
					{`No revel\n Find your friends below`}
				</Heading>
			</Box>
			<VStack space={'md'} w={'$full'} alignItems={'center'} mt={'$4'}>
				<Button
					w={'100%'}
					size={'lg'}
					onPress={() =>
						router.push({
							pathname: '/(app)/permission/contacts',
						})
					}
				>
					<Button.Text fontSize={'$lg'} fontWeight={'$bold'}>
						{permissionContactsVar?.granted ? 'All Contacts' : 'Use Contacts'}
					</Button.Text>
				</Button>
				<Pressable
					w={'100%'}
					alignItems='center'
					flexDirection='row'
					justifyContent='center'
					onPress={() => {
						router.push({
							pathname: '/(app)/explore/searchtext',
							params: {
								searchtext: '',
							},
						})
					}}
				>
					<Ionicons
						name='search'
						size={25}
						color={
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light900
								: rTheme.theme?.gluestack.tokens.colors.dark900
						}
					/>
					<Text
						ml='$2'
						textTransform='uppercase'
						fontSize={'$lg'}
						fontWeight={'$bold'}
						alignSelf='center'
					>
						search
					</Text>
				</Pressable>
			</VStack>
		</VStack>
	)
}
