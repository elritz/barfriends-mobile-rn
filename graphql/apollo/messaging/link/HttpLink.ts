import {HttpLink} from '@apollo/client'

if (__DEV__) {
  console.log(
    '🚀 ~ file: HttpLink.ts:8 ~ process.env.SERVER_ENDPOINT:',
    process.env.EXPO_PUBLIC_SERVER_ENDPOINT,
  )
}
const httpLink = new HttpLink({
  uri: `${process.env.EXPO_PUBLIC_SERVER_ENDPOINT}`,
})

export default httpLink
