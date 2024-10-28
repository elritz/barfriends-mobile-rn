import {ApolloLink, HttpLink, split} from '@apollo/client'
import {getMainDefinition} from '@apollo/client/utilities'

import afterwareLink from './AfterwareLink'
import authLink from './AuthorizationLink'
import errorLink from './ErrorLink'
import httpLink from './HttpLink'
import retryLink from './RetryLink'
import WSLink from './WebSocketLink'

// const directionalLink = new RetryLink().split(
// 	operation => operation.getContext().server === 'subscription',
// 	sseLink,
// 	ApolloLink.from([retryLink, authLink, errorLink, afterwareLink, httpLink]),
// )

const link = split(
  ({query}) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  WSLink,
  // ApolloLink.from([retryLink, authLink, errorLink, afterwareLink, directionalLink]),
  ApolloLink.from([retryLink, authLink, errorLink, afterwareLink, httpLink]),
)

export default link
