import {Box} from '#/src/components/ui/box'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Pressable} from '#/src/components/ui/pressable'
import {VStack} from '#/src/components/ui/vstack'
import {ThemeReactiveVar} from '#/src/state/reactive'
import {useReactiveVar} from '@apollo/client'
import {Feather} from '@expo/vector-icons'
import {Divider} from '#/src/components/ui/divider'
import {FlashList} from '@shopify/flash-list'
import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const Settings: React.FC = () => {
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const data = []
  return (
    <Box className="flex-1">
      <FlashList
        data={data}
        contentInset={{top: 20}}
        estimatedItemSize={50}
        ItemSeparatorComponent={() => <Divider className="my-5" />}
        renderItem={({item}) => {
          return (
            <Pressable onPress={item.onPress} className="mx-3 ">
              <VStack className="">
                <Heading className="text-lg">{item.title}</Heading>
                <HStack className="items-center justify-between  py-4">
                  <Text
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                    className="text-md max-w-[80%] flex-1 font-black capitalize">
                    {item.value}
                  </Text>
                  <View style={{marginHorizontal: 2}}>
                    <Feather
                      color={rTheme.theme?.gluestack.tokens.colors.primary500}
                      size={25}
                      name="copy"
                    />
                  </View>
                </HStack>
              </VStack>
            </Pressable>
          )
        }}
      />
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
})

export default Settings
