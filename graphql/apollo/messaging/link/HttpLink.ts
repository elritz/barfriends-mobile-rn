import { HttpLink } from '@apollo/client'
import { SERVER_ENDPOINT } from '@env'

if(__DEV__)  {
	console.log("🚀 ~ file: HttpLink.ts:8 ~ SERVER_ENDPOINT:", SERVER_ENDPOINT)
}
const httpLink = new HttpLink({
	uri: `${SERVER_ENDPOINT}`,
})


export default httpLink
