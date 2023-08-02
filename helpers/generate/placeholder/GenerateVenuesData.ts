import { Venue } from '@graphql/generated'
import faker from 'faker'
import GenerateUserData from './GenerateUserData'

const GenerateVenuesData = (numOfVenues: number, numOfMessages: number): Venue[] => {
	const list: Venue[] = []

	const GenerateGenresData = () => {
		const genres = []
		for (let i = 0; i < faker.datatype.number(5); i++) {
			genres.push(faker.music.genre())
		}
		return genres
	}

	for (let i = 0; i < numOfVenues; i++) {
		const genres = GenerateGenresData()
		list.push({
			id: faker.datatype.uuid(),
			name: faker.company.companyName(),
			avatar: faker.image.imageUrl(100, 150, 'dance', true, true),
			// avatar: 'https://source.unsplash.com/random?sig=',
			details: {
				attendance: {
					total: GenerateUserData(25),
					joined: GenerateUserData(20),
					friends: GenerateUserData(5),
				},
				description: faker.lorem.paragraph(3),
				address: faker.address.streetAddress(true),
				type: genres,
				capacity: faker.datatype.number(400),
			},
			distance: faker.datatype.number(1600),
		})
	}
	return list
}

export default GenerateVenuesData
