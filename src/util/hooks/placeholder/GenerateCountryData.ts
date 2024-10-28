import {faker} from '@faker-js/faker'

const GenerateCountryData = () => {
  const list: {id: string; country: string; countryCode: string}[] = []

  for (let i = 0; i < 50; i++) {
    const country = faker.location.country()
    const countryCode = faker.location.countryCode()
    list.push({
      id: faker.string.uuid(),
      country,
      countryCode,
    })
  }
  return list
}

export default GenerateCountryData
