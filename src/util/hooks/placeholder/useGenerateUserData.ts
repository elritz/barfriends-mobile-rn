import {useCallback} from 'react'
import {faker} from '@faker-js/faker'

export type User = {
  id: string
  name: string
  avatar: string
  badge: number
  status: string
  username: string
  blurhash?: '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['
}

const useGenerateUserData = () => {
  const content: User[] = []

  const generateContent = useCallback(
    (numOfUsers: number) => {
      for (let i = 0; i < numOfUsers; i++) {
        const newContent = {
          id: faker.string.uuid(),
          name: `${faker.person.firstName()} ${faker.person.lastName()}`,
          avatar: faker.image.url({width: 50, height: 50}),
          badge: faker.number.int(15),
          status: faker.datatype.boolean() ? 'online' : 'offline',
          username: faker.internet.userName(),
        }
        content.push(newContent)
      }
      return content
    },
    [content],
  )

  return {generateUsers: generateContent, users: content}
}

export default useGenerateUserData
