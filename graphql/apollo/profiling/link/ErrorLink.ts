// TODO: FN(Errorlink should resetted by UI func)
import { onError } from '@apollo/client/link/error'

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
	if (graphQLErrors) {
		for (let err of graphQLErrors) {
			switch (err?.extensions?.code) {
				case 'UNAUTHENTICATED':
					const oldHeaders = operation.getContext().headers
					operation.setContext({
						headers: {
							...oldHeaders,
						},
					})

					return forward(operation)
			}
		}
	}
	if (networkError) {
		console.log("🚀 ~ errorLink ~ networkError:", networkError)
		console.log('NETWORKERROR   ============ ', networkError.name, '  ============ ')
		switch (networkError.name) {
			case 'ServerError':
				console.log('here :>> ',);
				return forward(operation)
			case 'TypeError':
				console.log('here :>> 22',);
				return forward(operation)
			case '500':
					console.log('here :>> 224',);
					return forward(operation)
			case undefined:
				console.log('here :>> 2244',);
				return forward(operation)
			default:
				console.log('here :>> 224455',);
				return forward(operation)
		}
	}
})
export default errorLink

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors) {
//     graphQLErrors.forEach(({ message, locations, path }) => {
//       // show some popup or any global related handling to your errors
//     });
//   }
//   if (networkError) {

//     return new Observable(obs => {
//       obs.error(
//         new ApolloError({
//           errorMessage: networkError.message,
//           graphQLErrors,
//           networkError
//         })
//       );
//     });
//   }
// });
