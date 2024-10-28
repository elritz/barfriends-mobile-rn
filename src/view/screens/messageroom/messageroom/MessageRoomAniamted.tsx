// TODO: FN() - line 83 -- MessageRoomAniamted ~ onPressIn'
import {View} from 'react-native'
import {useReanimatedKeyboardAnimation} from 'react-native-keyboard-controller'
import Reanimated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {BlurView} from 'expo-blur'
import {useReactiveVar} from '@apollo/client'

import {ThemeReactiveVar} from '#/reactive'
import Message from './data'
import {history} from './Message'

const MessageRoomAniamted = () => {
  const INPUT_CONTAINER_HEIGHT = 80
  const {bottom} = useSafeAreaInsets()
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const {height: platform} = useReanimatedKeyboardAnimation()
  const height = useDerivedValue(() => platform.value)

  const aFlatListStyle = useAnimatedStyle(
    () => ({
      transform: [{translateY: height.value + INPUT_CONTAINER_HEIGHT}],
    }),
    [],
  )
  const textInputContainerStyle = useAnimatedStyle(
    () => ({
      width: '100%',
      paddingBottom: bottom,
      height: INPUT_CONTAINER_HEIGHT,
      transform: [{translateY: height.value}],
    }),
    [],
  )

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Reanimated.FlatList
        keyboardDismissMode={'interactive'}
        showsVerticalScrollIndicator={false}
        style={aFlatListStyle}
        data={history}
        contentInset={{top: 20, bottom: INPUT_CONTAINER_HEIGHT + bottom}}
        renderItem={item => {
          return <Message {...item.item} />
        }}
      />
      <Reanimated.View
        style={[
          {
            height: INPUT_CONTAINER_HEIGHT + bottom,
          },
          textInputContainerStyle,
        ]}>
        <BlurView
          style={{
            minWidth: '100%',
            height: INPUT_CONTAINER_HEIGHT,
            backgroundColor: 'transparent',
          }}
          tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}>
          {/* <Input
						bg={_nbMode.colorMode === 'light' ? 'light.100' : 'dark.100'}
						_focus={{
							bg: _nbMode.colorMode === 'light' ? 'light.100' : 'dark.100',
							borderColor: 'transparent',
						}}
						keyboardAppearance={colorScheme}
						onPressIn={() => null}
						variant={'filled'}
						size={'2xl'}
						mx={2}
						my={'auto'}
						borderRadius={'md'}
						multiline
						placeholder=''
						position={'absolute'}
						top={3}
						InputRightElement={
							<Icon
								size={'lg'}
								color={_nbMode.colorMode === 'light' ? 'dark.100' : 'light.100'}
								mx={2}
								as={Ionicons}
								name={'send'}
							/>
						}
					/> */}
        </BlurView>
      </Reanimated.View>
    </View>
  )
}

export default MessageRoomAniamted
