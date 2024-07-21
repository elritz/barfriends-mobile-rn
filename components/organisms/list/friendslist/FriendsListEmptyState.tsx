import { VStack } from "#/components/ui/vstack";
import { Text } from "#/components/ui/text";
import { Pressable } from "#/components/ui/pressable";
import { Heading } from "#/components/ui/heading";
import { Button, ButtonText } from "#/components/ui/button";
import { Box } from "#/components/ui/box";
import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { PermissionContactsReactiveVar, ThemeReactiveVar } from '#/reactive'
import { useRouter } from 'expo-router'

export const FriendsListEmptyState = () => {
	const router = useRouter()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const permissionContactsVar = useReactiveVar(PermissionContactsReactiveVar)
	return (
        <VStack space={'md'} className="my-5 p-5 justify-center items-center rounded-md">
            <Box className="bg-transparent items-center">
				<Heading className="leading-xl px-2 text-center text-2xl">
					{`No barfriends\n Find your friends below`}
				</Heading>
			</Box>
            <VStack space={'md'} className="w-full items-center mt-4">
				<Button
					size={'lg'}
					onPress={() =>
						router.push({
							pathname: '/(app)/permission/contacts',
						})
					}
					className="w-[100%]"
				>
					<ButtonText className="text-lg font-bold">
						{permissionContactsVar?.granted ? 'All Contacts' : 'Use Contacts'}
					</ButtonText>
				</Button>
				<Pressable
                    onPress={() => {
						router.push({
							pathname: '/(app)/explore/searchtext',
							params: {
								searchtext: '',
							},
						})
					}}
                    className="w-[100%] items-center flex-row justify-center">
					<Ionicons
						name='search'
						size={20}
						color={
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light900
								: rTheme.theme?.gluestack.tokens.colors.light100
						}
					/>
					<Text className="ml-2 text-lg font-bold">
						Search
					</Text>
				</Pressable>
			</VStack>
        </VStack>
    );
}
