import { HttpLink } from '@apollo/client'
import { SERVER_ENDPOINT } from '@env'

console.log('🚀 ~ file: HttpLink.ts:8 ~ SERVER_ENDPOINT:', SERVER_ENDPOINT)

const httpLink = new HttpLink({
	uri: `${SERVER_ENDPOINT}`,
	// uri: `http://localhost:4000/graphql`,
})

export default httpLink
