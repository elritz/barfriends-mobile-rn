import faker from 'faker'

const GenerateCountryData = () => {
	const list = []

	for (let i = 0; i < 50; i++) {
		const country = faker.address.country()
		const countryCode = faker.address.countryCode()
		list.push({
			id: faker.datatype.uuid(),
			country,
			countryCode,
		})
	}
	return list
}

export default GenerateCountryData
