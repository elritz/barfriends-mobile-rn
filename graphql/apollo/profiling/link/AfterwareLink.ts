// TODO FN(How can i set the profile here, currently only getting Profile.id)
import { ApolloLink } from '@apollo/client'
import { asyncMap } from '@apollo/client/utilities'
import { AUTHORIZATION, REFRESH } from '#/src/constants/StorageConstants'
import {
	secureStorageItemCreate,
	secureStorageItemDelete,
} from '#/src/util/hooks/local/useSecureStorage'

const afterwareLink = new ApolloLink((operation, forward) =>
	asyncMap(forward(operation), async response => {
		const {
			response: { headers },
		} = operation.getContext()
		if (headers) {
			const authorization = headers.get('authorization')
			const refresh = headers.get('refresh')
			// console.log("🚀 ~ asyncMap ~ refresh:", refresh)

			// await secureStorageItemDelete({
			// 	key: AUTHORIZATION,
			// })		
				if (authorization) {
					await secureStorageItemCreate({
						value: authorization,
						key: AUTHORIZATION,
					})
				}
				
				if(refresh) {
					await secureStorageItemCreate({
						value: refresh,
						key: REFRESH,
					})
				} 
		}
		return response
	}),
)

export default afterwareLink
