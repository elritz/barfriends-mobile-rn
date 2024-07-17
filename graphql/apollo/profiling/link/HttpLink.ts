import { HttpLink } from '@apollo/client'

console.log("🚀 ~ process.env.EXPO_PUBLIC_SERVER_ENDPOINT:", process.env.EXPO_PUBLIC_SERVER_ENDPOINT)
const httpLink = new HttpLink({
	uri: `${process.env.EXPO_PUBLIC_SERVER_ENDPOINT}`,
	// uri: `http://localhost:4000/graphql`,
})

export default httpLink
