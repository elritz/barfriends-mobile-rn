import { VStack } from "#/components/ui/vstack";
import { Text } from "#/components/ui/text";
import { Pressable } from "#/components/ui/pressable";
import { Heading } from "#/components/ui/heading";
import { HStack } from "#/components/ui/hstack";
import { Box } from "#/components/ui/box";
import { Badge } from "#/components/ui/badge";
import { useRefreshDeviceManagerQuery } from '#/graphql/generated'
import { useRouter } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'

const HorizontalMessageNotification = ({ item }) => {
	const router = useRouter()
	// console.log("🚀 ~ HorizontalMessageNotification ~ item:", item)
	const { data: rdmData, loading: rdmLoading, error: rdmError } =
		useRefreshDeviceManagerQuery({
			fetchPolicy: 'cache-first',
		})



	const ChatContainer = ({ isGroup, item }) => {
		const member = item.Members.filter(item => item.id !== rdmData?.refreshDeviceManager?.Profile?.id)
		console.log('item.id :>> ', item.id);
		return (
            <Pressable
				onPress={() => {
					router.push({
						// pathname: `/(app)/conversation/${item.id}`,
						pathname: `/(app)/animatedconversation/${item.id}`,
					})
				}}
				className="h-[85px]"
			>
                <Box className="flex-1 bg-transparent rounded-none flex-row pt-2">
					<VStack className="w-[50px] h-full rounded-none items-center justify-start">
						<Box
                            className="w-[45px] h-[45px] items-center justify-center  light:bg-light-200  dark:bg-light-900">
							{isGroup ?
								<MaterialIcons name="group" size={24} color="black" />
								:
								<MaterialIcons name="person" size={24} color="black" />
							}
						</Box>
					</VStack>
					<VStack className="flex-1 ml-1 mb-2">
						<HStack >
							<Box className="bg-transparent flex-1 mr-1">
								<Heading
                                    numberOfLines={1}
                                    // bg={'$amber500'}
                                    lineBreakMode='tail'
                                    allowFontScaling={true}
                                    minimumFontScale={0.80}
                                    maxFontSizeMultiplier={0.25}
                                    className="leading-sm text-md text-[left] font-bold">
									{isGroup ?
										item.name
										:
										member[0].IdentifiableInformation.fullname
									}
								</Heading>
							</Box>
							<Box className="bg-transparent" >
								<Text
                                    numberOfLines={1}
                                    lineBreakMode='tail'
                                    allowFontScaling={true}
                                    writingDirection='rtl'
                                    className="flex-reverse text-[right] text-sm">
									2024-05-01
								</Text>
							</Box>
						</HStack>
						<HStack
                            className="flex-1 justify-between border-b-0.25 border-b-light-800  dark:border-b-light-9000">
							<Text
                                numberOfLines={2}
                                textBreakStrategy={'balanced'}
                                lineBreakMode={'tail'}
                                className="flex-1 text-sm leading-xs">
								{item.Messages[0].content.message}
							</Text>
							<Box className="bg-transparent pt-2">

								<Box
                                    className="mx-1 max-h-[8px] min-h-[8px] max-w-[8px] min-w-[8px] bg-primary-500 rounded-full z-1 self-center" />
							</Box>
						</HStack>
					</VStack>
				</Box>
            </Pressable >
        );
	}

	return (
        <ChatContainer
			item={item}
			isGroup={item.Members.length === 2 ? false : true}
		/>
    );

}





export default HorizontalMessageNotification
