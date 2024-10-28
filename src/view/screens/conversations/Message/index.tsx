import React from 'react'
import {StyleSheet} from 'react-native'
import {useReactiveVar} from '@apollo/client'

import {ThemeReactiveVar} from '#/reactive'
import {Text} from '#/src/components/ui/text'
import {View} from '#/src/components/ui/view'
import type {MessageProps} from './types'

const container = {
  borderRadius: 10,
  padding: 10,
  margin: 10,
  marginVertical: 5,
}
export default function Message({text, sender}: MessageProps) {
  const rTheme = useReactiveVar(ThemeReactiveVar)

  const styles = StyleSheet.create({
    senderContainer: {
      alignSelf: 'flex-end',
      backgroundColor:
        rTheme.colorScheme === 'light'
          ? rTheme.theme?.gluestack.tokens.colors.primary500
          : rTheme.theme?.gluestack.tokens.colors.primary400,
      ...container,
    },
    recipientContainer: {
      alignSelf: 'flex-start',
      backgroundColor:
        rTheme.colorScheme === 'light'
          ? rTheme.theme?.gluestack.tokens.colors.light300
          : rTheme.theme?.gluestack.tokens.colors.light800,
      ...container,
    },
  })

  return (
    <View style={sender ? styles.senderContainer : styles.recipientContainer}>
      <Text
        className={` ${sender ? 'text-light-200' : 'text-black'} ${sender ? 'dark:text-white' : 'dark:text-light-100'} ${sender ? 'font-medium' : 'font-normal'} text-[15px]`}>
        {text}
      </Text>
    </View>
  )
}
