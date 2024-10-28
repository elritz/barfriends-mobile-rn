import {faker} from '@faker-js/faker'

import useGenerateUserData from './useGenerateUserData'

const useGenerateVenuesData = <T>(numOfVenues: number): T[] => {
  const list: T[] = []

  const GenerateGenresData = () => {
    const genres: string[] = []
    for (let i = 0; i < faker.datatype.number(5); i++) {
      genres.push(faker.music.genre())
    }
    return genres
  }

  const {generateUsers} = useGenerateUserData()

  for (let i = 0; i < numOfVenues; i++) {
    const genres = GenerateGenresData()
    list.push({
      id: faker.string.uuid(),
      name: faker.company.name(),
      avatar: faker.image.url({width: 100, height: 150}),
      // avatar: 'https://source.unsplash.com/random?sig=',
      details: {
        attendance: {
          total: generateUsers(10),
          joined: generateUsers(20),
          friends: generateUsers(5),
        },
        description: faker.lorem.paragraph(3),
        address: faker.location.streetAddress(true),
        type: genres,
        capacity: faker.number.int(400),
      },
      distance: faker.number.int(1600),
    } as T) // Cast the object as type T
  }

  return list
}

export default useGenerateVenuesData
