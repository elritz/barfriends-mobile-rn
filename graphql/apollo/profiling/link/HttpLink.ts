import { HttpLink } from '@apollo/client'
import { SERVER_ENDPOINT } from '@env'
console.log("🚀 ~ SERVER_ENDPOINT:", SERVER_ENDPOINT)

const httpLink = new HttpLink({
	uri: `${SERVER_ENDPOINT}`,
})

export default httpLink
