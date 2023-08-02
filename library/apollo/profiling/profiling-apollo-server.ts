import { cache } from './cache'
import link from './link'
import { ApolloClient } from '@apollo/client'

const profilingclient = new ApolloClient({
	link,
	cache,
	defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})

export default profilingclient
