// TODO: FN(Errorlink should resetted by UI func)
import {onError} from '@apollo/client/link/error'

const errorLink = onError(
  ({graphQLErrors, networkError, operation, forward}) => {
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
      if (__DEV__) {
        console.log('~ errorLink ~ networkError:', networkError)
        console.log(
          'NETWORK ERROR   ============ ',
          networkError.cause,
          networkError.name,
          '  ============ ',
        )
      }
      switch (networkError.name) {
        case 'ServerError':
          return forward(operation)
        case 'TypeError':
          return forward(operation)
        case '500':
          return forward(operation)
        case undefined:
          return forward(operation)
        default:
          return forward(operation)
      }
    }
  },
)
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
