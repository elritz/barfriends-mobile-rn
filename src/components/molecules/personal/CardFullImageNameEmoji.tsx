import {useWindowDimensions} from 'react-native'
import {Image} from 'expo-image'
import {LinearGradient} from 'expo-linear-gradient'
import {useRouter} from 'expo-router'

import {Relationship} from '#/graphql/generated'
import {Box} from '#/src/components/ui/box'
import {Pressable} from '#/src/components/ui/pressable'
import {Text} from '#/src/components/ui/text'

interface CardFullImageNameEmojiProps {
  item: Relationship
  cardWidth: number
}

export const CardFullImageNameEmoji = ({
  item,
  cardWidth,
}: CardFullImageNameEmojiProps) => {
  const {width} = useWindowDimensions()
  const router = useRouter()
  if (!item) {
    return null
  }
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => {
        router.push({
          pathname: `/(app)/public/personal/${item?.friendProfile?.IdentifiableInformation?.username}`,
        })
      }}>
      <Box
        style={{
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          margin: width / (width / 3),
          height: 170,
          width: cardWidth,
        }}>
        <Box className="absolute bottom-0 left-0 right-0 z-10 w-[100%] overflow-hidden rounded-md">
          <LinearGradient colors={['transparent', '#000000d1']}>
            <Box style={{padding: 4}}>
              <Text className="text-md text-center font-[bold] text-white dark:text-white">
                {/* {capitalizeFirstLetter(item.friendProfile?.IdentifiableInformation?.firstname)} */}
                {item.friendProfile?.IdentifiableInformation?.firstname}
              </Text>
              <Text className="text-center font-[bold] text-white">
                @{item.friendProfile?.IdentifiableInformation?.username}
              </Text>
            </Box>
          </LinearGradient>
        </Box>
        <Image
          alt={'Profile image'}
          source={{uri: item.friendProfile?.profilePhoto?.url}}
          contentFit="cover"
          style={{
            height: 170,
            flexDirection: 'column-reverse',
            borderRadius: 10,
          }}
        />
      </Box>
    </Pressable>
  )
}
