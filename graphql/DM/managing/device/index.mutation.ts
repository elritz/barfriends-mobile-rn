import { gql } from '@apollo/client'

export const UPSERT_DEVICE_PUSH_TOKEN_MUTATION = gql`
	mutation upsertDevicePushToken($androidToken: String, $appleToken: String, $expoToken: String) {
		upsertDevicePushToken(androidToken: $androidToken, appleToken: $appleToken, expoToken: $expoToken)
	}
`
