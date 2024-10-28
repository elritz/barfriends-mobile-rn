import {ApolloClient} from '@apollo/client'

import {cache} from './cache'
import link from './link'

const profilingclient = new ApolloClient({
  link,
  cache,
  defaultOptions: {watchQuery: {fetchPolicy: 'cache-and-network'}},
})

export default profilingclient
