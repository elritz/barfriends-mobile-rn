import {useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {MaterialIcons} from '@expo/vector-icons'
import PropTypes from 'prop-types'

import {useRefreshDeviceManagerQuery} from '#/graphql/generated'
import {ThemeReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Pressable} from '#/src/components/ui/pressable'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'

interface MessageData {
  id: string
  name?: string
  Members: {
    id: string
    IdentifiableInformation: {
      fullname?: string
    }
  }[]
  Messages: {
    content: {
      message: string
    }
  }[]
}

const HorizontalMessageNotification = ({
  item: messageData,
}: {
  item: MessageData
}) => {
  const router = useRouter()
  const rThemeVar = useReactiveVar(ThemeReactiveVar)
  const {data: rdmData} = useRefreshDeviceManagerQuery({})

  const ChatContainer = ({
    isGroup,
    item,
  }: {
    isGroup: boolean
    item: MessageData
  }) => {
    const member = item.Members.filter(
      item => item.id !== rdmData?.refreshDeviceManager?.Profile?.id,
    )

    return (
      <Pressable
        accessibilityRole="button"
        onPress={() => {
          router.push({
            pathname: `/(app)/animatedconversation/[animatedconversationid]`,
            params: {
              animatedconversationid: item.id,
              name: isGroup
                ? item.name
                : member[0].IdentifiableInformation.fullname,
            },
          })
        }}
        className="h-[115px]">
        <HStack space="sm" className="flex-1 flex-row pt-2">
          <VStack className="h-full items-center justify-start">
            <Box className="mt-2 h-[65px] w-[65px] items-center justify-center rounded-lg bg-light-200 dark:bg-light-800">
              {isGroup ? (
                <MaterialIcons
                  name="group"
                  size={27}
                  color={rThemeVar.colorScheme === 'light' ? 'black' : 'white'}
                />
              ) : (
                <MaterialIcons
                  name="person"
                  size={24}
                  color={rThemeVar.colorScheme === 'light' ? 'black' : 'white'}
                />
              )}
            </Box>
          </VStack>
          <HStack
            className="flex-1 border-light-300 dark:border-light-500"
            style={{borderBottomWidth: 0.25}}>
            <VStack className="mb-2 ml-1 mr-1 flex-1 pt-2">
              <Heading
                numberOfLines={1}
                lineBreakMode="tail"
                allowFontScaling={true}
                minimumFontScale={0.8}
                size="2xl"
                maxFontSizeMultiplier={0.25}
                className="text-left font-medium capitalize dark:color-white">
                {isGroup
                  ? item.name
                  : member[0].IdentifiableInformation?.fullname}
              </Heading>
              <HStack className="flex-1 justify-between">
                <Text
                  numberOfLines={1}
                  textBreakStrategy={'balanced'}
                  lineBreakMode={'tail'}
                  size="xl"
                  className="leading-xs flex-1 dark:color-slate-100">
                  {item.Messages[0].content.message}
                </Text>
              </HStack>
            </VStack>
            <Box className="mx-2 justify-center pt-2">
              <Box className="z-1 max-h-[10px] min-h-[10px] min-w-[10px] max-w-[10px] self-center rounded-full bg-primary-500" />
            </Box>
          </HStack>
        </HStack>
      </Pressable>
    )
  }

  ChatContainer.propTypes = {
    isGroup: PropTypes.bool.isRequired,
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      Members: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          IdentifiableInformation: PropTypes.shape({
            fullname: PropTypes.string,
          }),
        }),
      ).isRequired,
      Messages: PropTypes.arrayOf(
        PropTypes.shape({
          content: PropTypes.shape({
            message: PropTypes.string,
          }),
        }),
      ).isRequired,
    }).isRequired,
  }

  return (
    <ChatContainer
      item={messageData}
      isGroup={messageData.Members.length === 2 ? false : true}
    />
  )
}

export default HorizontalMessageNotification
