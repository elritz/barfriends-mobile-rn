import GenerateUserData from './GenerateUserData'
import faker from 'faker'

const GenerateMessageData = (numOfUsers: number, numOfMessages: number) => {
	const list = []

	const generateMessages = () => {
		const messages = []
		for (let i = 0; i < numOfMessages; i++) {
			messages.push({
				id: faker.datatype.uuid(),
				message: faker.random.words(20),
				sender: faker.datatype.boolean(),
			})
		}
		return messages
	}

	for (let i = 0; i < numOfUsers; i++) {
		const messages = generateMessages()
		const user = GenerateUserData(1)
		list.push({
			...user[0],
			messages,
		})
	}
	return list
}

export default GenerateMessageData
