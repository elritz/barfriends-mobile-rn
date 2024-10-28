import {Pressable} from 'react-native'
import {useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {FontAwesome5} from '@expo/vector-icons'

import {useRefreshDeviceManagerQuery} from '#/graphql/generated'
import useEmojimoodTextColor from '#/hooks/useEmojiMoodTextContrast'
import {ThemeReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Heading} from '#/src/components/ui/heading'
import {Color} from '#/src/util/helpers/color'

const JoinVenue: React.FC<ActivityCardProps> = ({
  isEmojimoodDynamic = false,
}) => {
  const router = useRouter()
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const textColor = useEmojimoodTextColor({
    isEmojimoodDynamic: isEmojimoodDynamic,
  })
  const {
    data: rdmData,
    loading: rdmLoading,
    error: rdmError,
  } = useRefreshDeviceManagerQuery()

  if (
    rdmData?.refreshDeviceManager?.__typename === 'AuthorizationDeviceProfile'
  ) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={() => {
          router.push({
            pathname: '/(app)/hometab/venuefeed',
          })
        }}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Box className="h-16 w-16 items-center justify-center rounded-md bg-darkBlue-400">
          <FontAwesome5
            name="map-marker-alt"
            style={{
              marginLeft: 2,
            }}
            size={30}
            color={
              rTheme.colorScheme === 'light'
                ? rTheme.theme?.gluestack.tokens.colors.light900
                : rTheme.theme?.gluestack.tokens.colors.light100
            }
          />
        </Box>
        <Heading
          style={{
            color: textColor,
          }}
          className="leading-md mt-3 w-auto text-center text-lg font-black uppercase">
          Find venues near you
        </Heading>
      </Pressable>
    )
  }
}

export default JoinVenue
