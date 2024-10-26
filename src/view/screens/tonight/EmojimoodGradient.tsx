import {useRefreshDeviceManagerQuery} from '#/graphql/generated'
import {LinearGradient} from 'expo-linear-gradient'
import React, {ReactNode} from 'react'

const EmojimoodGradient = ({children}: {children: ReactNode}) => {
  const {
    data: rdmData,
    loading: rdmLoading,
    error: rdmError,
  } = useRefreshDeviceManagerQuery()

  if (
    rdmData?.refreshDeviceManager?.__typename === 'AuthorizationDeviceProfile'
  ) {
    console.log(rdmData?.refreshDeviceManager.Profile?.tonightStory?.emojimood)
    return (
      <LinearGradient
        style={{flex: 1}}
        colors={
          rdmData?.refreshDeviceManager.Profile?.tonightStory?.emojimood &&
          rdmData?.refreshDeviceManager?.Profile?.tonightStory?.emojimood.colors
            ? rdmData?.refreshDeviceManager?.Profile?.tonightStory?.emojimood
                ?.colors
            : ['#00000000']
        }>
        {children}
      </LinearGradient>
    )
  }

  return (
    <LinearGradient style={{flex: 1}} colors={['#00000000']}>
      {children}
    </LinearGradient>
  )
}

export default React.memo(EmojimoodGradient)
