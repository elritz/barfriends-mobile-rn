// import JWT from 'expo-jwt'
// import { SupportedAlgorithms } from 'expo-jwt/dist/types/algorithms'
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// import { jwtDecode } from 'jwt-decode'
// interface GenerateToken {
// 	values: Record<string, unknown>
// 	key: string
// }

// const createToken = ({ values, key }: GenerateToken): string =>
// 	JWT.encode({ values }, key, {
// 		algorithm: SupportedAlgorithms.HS256,
// 	})

// const decodeToken = (token: string, key: string): string | unknown => JWT.decode(token, key)

// const decodeTokenV1 = (token: string): string | unknown => jwtDecode(token)

// export { createToken, decodeTokenV1, decodeToken }
