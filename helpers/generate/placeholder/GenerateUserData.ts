import faker from 'faker'

type GeneratedUsers = {
	id: string
	name: string
	avatar: string
	badge: number
	status: string
	username: string
}

const GenerateUserData = (numOfUsers: number): GeneratedUsers[] => {
	const list: GeneratedUsers[] = []

	for (let i = 0; i < numOfUsers; i++) {
		list.push({
			id: faker.datatype.uuid(),
			name: `${faker.name.firstName()} ${faker.name.lastName()}`,
			avatar: faker.image.imageUrl(50, 50, 'people', true, true),
			badge: faker.datatype.number(15),
			status: faker.datatype.boolean() ? 'online' : 'offline',
			username: faker.internet.userName(),
		})
	}
	return list
}

export default GenerateUserData
