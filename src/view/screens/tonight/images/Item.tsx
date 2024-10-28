import {Image} from 'react-native'
import {Pressable, StyleSheet, View} from 'react-native'
import {useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {MaterialIcons} from '@expo/vector-icons'

import {PermissionsReactiveVar, ThemeReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Text} from '#/src/components/ui/text'
import {MARGIN, SIZE} from './Config'

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
  },
})

interface TileProps {
  id: string
  uri: string
  onPress: () => void
}

const Item = ({uri, onPress}: TileProps) => {
  const router = useRouter()
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const rPerm = useReactiveVar(PermissionsReactiveVar)

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => {
        rPerm?.medialibrary.granted
          ? onPress()
          : router.push({
              pathname: '/(app)/permission/medialibrary',
            })
      }}>
      <View style={styles.container} pointerEvents="none">
        {uri ? (
          <Image
            accessibilityIgnoresInvertColors
            source={{uri}}
            style={{flex: 1, margin: MARGIN * 2, borderRadius: MARGIN * 10}}
            alt={'Story Image'}
          />
        ) : (
          <Box
            className={` m-${MARGIN * 2} rounded-${MARGIN * 10} flex-1 items-center justify-center`}>
            <MaterialIcons
              size={55}
              name={'add-photo-alternate'}
              color={
                rTheme.colorScheme === 'light'
                  ? rTheme.theme?.gluestack.tokens.colors.light900
                  : rTheme.theme?.gluestack.tokens.colors.light100
              }
            />
            <Text className="text-xl">Add photo</Text>
          </Box>
        )}
      </View>
    </Pressable>
  )
}

export default Item
