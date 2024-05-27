import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

const WSLink = new GraphQLWsLink(
	createClient({
		url: `ws://${process.env.IP_ADDRESS}:5004/graphql`,
	}),
)
export default WSLink

// import { ApolloLink, Operation, FetchResult, Observable } from '@apollo/client/core'
// import { print, GraphQLError } from 'graphql'
// import { createClient, ClientOptions, Client } from 'graphql-sse'

// class SSELink extends ApolloLink {
// 	private client: Client

// 	constructor(options: ClientOptions) {
// 		super()
// 		this.client = createClient(options)
// 	}

// 	public request(operation: Operation): Observable<FetchResult> {
// 		return new Observable(sink => {
// 			return this.client.subscribe<FetchResult>(
// 				{ ...operation, query: print(operation.query) },
// 				{
// 					next: sink.next.bind(sink),
// 					complete: sink.complete.bind(sink),
// 					error: sink.error.bind(sink),
// 				},
// 			)
// 		})
// 	}
// }

// const WSLink = new SSELink({
// 	url: 'https://localhost:5004/graphql/stream',
// 	// headers: () => {
// 	// 	const session = getSession()
// 	// 	if (!session) return {}
// 	// 	return {
// 	// 		Authorization: `Bearer ${session.token}`,
// 	// 	}
// 	// },
// })
// export default WSLink
