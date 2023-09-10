import { cache } from './cache'
import link from './link'
import { ApolloClient } from '@apollo/client'

const messageClient = new ApolloClient({
	link,
	cache,
	defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})

export default messageClient
