import { gql } from '@apollo/client'

export const UPSERT_DEVICE_PUSH_TOKEN_MUTATION = gql`
	mutation upsertDevicePushToken($token: String, $type: String, $expoToken: String) {
		upsertDevicePushToken(token: $token, type: $type, expoToken: $expoToken)
	}
`
