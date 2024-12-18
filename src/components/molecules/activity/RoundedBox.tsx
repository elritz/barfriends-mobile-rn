import {ReactNode} from 'react'
import {BlurView} from 'expo-blur'
import {useReactiveVar} from '@apollo/client'

import {useRefreshDeviceManagerQuery} from '#/graphql/generated'
import {ThemeReactiveVar} from '#/src/state/reactive'

interface RoundedBoxProps {
  children: ReactNode
}

const RoundedBox = ({children}: RoundedBoxProps) => {
  const rTheme = useReactiveVar(ThemeReactiveVar)

  const {data: rdmData} = useRefreshDeviceManagerQuery()

  return (
    <BlurView
      intensity={60}
      tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
      style={{
        flex: 1,
        height: 200,
        paddingHorizontal: 10,
        paddingVertical: 2,
        margin: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor:
          rdmData?.refreshDeviceManager?.__typename ===
            'AuthorizationDeviceProfile' &&
          rdmData?.refreshDeviceManager.Profile?.tonightStory?.emojimood
            ? 'transparent'
            : rTheme.colorScheme === 'light'
              ? rTheme.theme.gluestack.tokens.colors.light300
              : rTheme.theme.gluestack.tokens.colors.light800,
      }}>
      {children}
    </BlurView>
  )
}

export default RoundedBox
