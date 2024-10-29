import {LinearGradient} from 'expo-linear-gradient'
import {useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {MaterialIcons} from '@expo/vector-icons'

import {useRefreshDeviceManagerQuery} from '#/graphql/generated'
import useEmojimoodTextColor from '#/hooks/useEmojiMoodTextContrast'
import {ThemeReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Heading} from '#/src/components/ui/heading'
import {Pressable} from '#/src/components/ui/pressable'
import {Text} from '#/src/components/ui/text'
import {ActivityCardProps} from '..'

const AddEmoji: React.FC<ActivityCardProps> = ({
  isEmojimoodDynamic = false,
}) => {
  const router = useRouter()
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const textColor = useEmojimoodTextColor({
    isEmojimoodDynamic: isEmojimoodDynamic,
  })
  const {data: rdmData} = useRefreshDeviceManagerQuery()

  if (
    rdmData?.refreshDeviceManager?.__typename === 'AuthorizationDeviceProfile'
  ) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={() =>
          router.push({
            pathname: '/(app)/modal/emojimood',
          })
        }
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 10,
        }}>
        <Box className="h-16 w-16 items-center justify-center rounded-lg bg-amber-300">
          {!rdmData?.refreshDeviceManager.Profile?.tonightStory?.emojimood ? (
            <MaterialIcons
              size={30}
              name="emoji-emotions"
              color={
                rTheme.colorScheme === 'light'
                  ? rTheme.theme?.gluestack.tokens.colors.light900
                  : rTheme.theme?.gluestack.tokens.colors.light100
              }
            />
          ) : (
            <LinearGradient
              style={{
                flex: 1,
                width: '100%',
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              colors={
                rdmData?.refreshDeviceManager?.Profile?.tonightStory.emojimood
                  .colors as string[]
              }>
              <Text>
                {
                  rdmData?.refreshDeviceManager.Profile.tonightStory.emojimood
                    .emoji
                }
              </Text>
            </LinearGradient>
          )}
        </Box>
        <Heading
          style={{
            color: textColor,
          }}
          className="leading-lg mt-3 text-center text-lg font-black uppercase">
          Add an emojimood
        </Heading>
      </Pressable>
    )
  }
}

export default AddEmoji
