import { HttpLink } from '@apollo/client'
import { SERVER_ENDPOINT } from '@env'

const httpLink = new HttpLink({
	uri: `${SERVER_ENDPOINT}`,
})
export default httpLink
