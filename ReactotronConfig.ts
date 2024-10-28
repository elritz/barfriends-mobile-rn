import {NormalizedCacheObject} from '@apollo/client'
import {ArgType} from 'reactotron-core-client' // Add this import
import type {ReactotronReactNative} from 'reactotron-react-native'
import Reactotron from 'reactotron-react-native'
import mmkvPlugin from 'reactotron-react-native-mmkv'

import profilingclient from '#/graphql/apollo/profiling/profiling-apollo-server'
// import { storage } from "./src/state/" // <--- update this location

function getNestedCacheValue(keyPath: string): any {
  // Extract the entire cache
  const cache: NormalizedCacheObject = profilingclient.cache.extract()

  // Define a regular expression to match keys and array accessors
  const pathSegmentRegex = /[^.[\]]+|\[\d+\]/g

  // Extract path segments, including array indices
  const pathSegments = keyPath.match(pathSegmentRegex) || []

  // Navigate through the path segments to get to the desired value
  const value = pathSegments.reduce((acc, segment) => {
    // Check if the segment is an array accessor, e.g., [1]
    if (segment.startsWith('[') && segment.endsWith(']')) {
      // Extract the index from the segment and convert it to a number
      const index = parseInt(segment.slice(1, -1), 10)
      return acc ? acc[index] : undefined
    }
    // Handle normal object property access
    return acc ? acc[segment] : undefined
  }, cache)

  return value ?? null // Return null if the value is undefined at any point
}

Reactotron
  // .setAsyncStorageHandler(AsyncStorage)
  // .use(mmkvPlugin<ReactotronReactNative>({ storage }))
  .configure({}) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!

Reactotron.onCustomCommand({
  title: 'Extract Apollo Client Cache by Key',
  description: 'Retrieves a specific key from the Apollo Client cache',
  command: 'extractApolloCacheByKey',
  args: [{name: 'key', type: ArgType.String}],
  handler: args => {
    const {key} = args ?? {}
    if (key) {
      const findValue = getNestedCacheValue(key)
      if (findValue) {
        Reactotron.display({
          name: 'Apollo Cache',
          preview: `Cache Value for Key: ${key}`,
          value: findValue,
        })
      } else {
        Reactotron.display({
          name: 'Apollo Cache',
          preview: `Value not available for key: ${key}`,
        })
      }
    } else {
      Reactotron.log('Could not extract cache value. No key provided.')
    }
  },
})

Reactotron.onCustomCommand({
  title: 'Extract Apollo Client Cache',
  description: 'Gets the updated InMemory cache from Apollo Client',
  command: 'extractApolloCache',
  handler: () => {
    Reactotron.display({
      name: 'Apollo Cache',
      preview: 'Cache Snapshot',
      value: profilingclient.cache.extract(),
    })
  },
})
