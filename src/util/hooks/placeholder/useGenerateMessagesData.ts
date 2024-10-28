import {useCallback} from 'react'
import {faker} from '@faker-js/faker'

export type Message = {
  id: string
  message: string
  sender: boolean
}

const useGenerateMessagesData = () => {
  let content: Message[] = []

  const generateContent = useCallback(
    (numOfMessages: number) => {
      for (let i = 0; i < numOfMessages; i++) {
        const newContent = {
          id: faker.string.uuid(),
          message: faker.lorem.text(),
          sender: faker.datatype.boolean(),
        }
        content.push(newContent)
      }

      return content
    },
    [content],
  )

  return {generateMessages: generateContent, messages: content}
}

export default useGenerateMessagesData
