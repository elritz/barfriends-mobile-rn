import {ApolloClient} from '@apollo/client'

import {cache} from './cache'
import link from './link'

const messageClient = new ApolloClient({
  link,
  cache,
  defaultOptions: {watchQuery: {fetchPolicy: 'cache-and-network'}},
})

export default messageClient
