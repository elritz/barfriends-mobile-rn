import { InMemoryCache } from '@apollo/client'

export const cache: InMemoryCache = new InMemoryCache({
	typePolicies: {
		// LiveVenueTotals2: {
    //   fields: {
    //     out: {
		// 			merge(existing = [], incoming: any[]) {
    //         return [...existing, ...incoming];
    //       },
    //     }
		// 	}
		// },
		// LiveOutVenue: {
		// 		fields: {
		// 			Out: {
		// 				merge(existing = [], incoming: any[]) {
		// 					return [...existing, ...incoming];
		// 				},
		// 			}
		// 	}
		// },
		// LiveOutPersonal: {
		// 		fields: {
		// 			Out: {
		// 				merge(existing = [], incoming: any[]) {
		// 					return [...existing, ...incoming];
		// 				},
		// 			}
		// 	}
		// },
	},
})
