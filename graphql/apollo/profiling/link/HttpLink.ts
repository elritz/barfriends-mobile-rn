import { HttpLink } from '@apollo/client'

const httpLink = new HttpLink({
	uri: `${process.env.SERVER_ENDPOINT}`,
})

export default httpLink
