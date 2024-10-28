import {useCallback} from 'react'
import {faker} from '@faker-js/faker'

import useGenerateMessageData, {Message} from './useGenerateMessagesData'
import useGenerateUserData, {User} from './useGenerateUserData'

export type Conversation = {
  id: string
  user: User
  messages: Message[]
}

const useGenerateConversations = () => {
  let content: Conversation[] = []
  const {generateUsers} = useGenerateUserData()
  const {generateMessages} = useGenerateMessageData()

  const generateContent = useCallback(
    (numOfConversations: number) => {
      for (let i = 0; i < numOfConversations; i++) {
        const messages = generateMessages(15)
        const users = generateUsers(1)

        const newContent = {
          id: faker.string.uuid(),
          user: users[0],
          messages: messages,
        }
        content.push(newContent)
      }
      return content
    },
    [content],
  )

  return {generateConversations: generateContent, conversations: content}
}

export default useGenerateConversations
