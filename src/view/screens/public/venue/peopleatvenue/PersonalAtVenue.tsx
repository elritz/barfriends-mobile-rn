import {View} from 'react-native'
import {useRouter} from 'expo-router'
import {uniqueId} from 'lodash'

import {Pressable} from '#/src/components/ui/pressable'

const PersonalAtVenue = () => {
  const router = useRouter()
  return (
    <Pressable
      accessibilityRole="button"
      key={uniqueId()}
      onPress={() => {
        router.push({
          pathname: `/(app)/public/venue/[username]`,
          params: {
            username: 'philz',
          },
        })
      }}
      className="mx-1 grow-[1px] self-center">
      {/* <Image
				source={{ uri: item.photos[0].url }}
				alt={'User image'}
				borderRadius={'xl'}
				style={{
					width: '100%',
					height,
					borderWidth: 3,
					borderColor: 'white',
				}}
			/> */}
      <View
        style={{
          width: '100%',
          justifyContent: 'flex-start',
        }}>
        {/* <Text fontSize={'xs'}>{item.name}</Text> */}
      </View>
    </Pressable>
  )
}

export default PersonalAtVenue
