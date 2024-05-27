import React from "react";
import styles from "./styles";

import type { MessageProps } from "./types";

import { StyleSheet } from "react-native";
import { useReactiveVar } from "@apollo/client";
import { ThemeReactiveVar } from "reactive/theme";
import { Text, View } from "@gluestack-ui/themed";

const container = {
  borderRadius: 10,
  padding: 10,
  margin: 10,
  marginVertical: 5,
};
export default function Message({ text, sender }: MessageProps) {
  const rTheme = useReactiveVar(ThemeReactiveVar)

  const styles = StyleSheet.create({
    senderContainer: {
      alignSelf: "flex-end",
      backgroundColor: rTheme.colorScheme === 'light' ? rTheme.theme?.gluestack.tokens.colors.primary500 : rTheme.theme?.gluestack.tokens.colors.primary400,
      ...container,
    },
    recipientContainer: {
      alignSelf: "flex-start",
      backgroundColor: rTheme.colorScheme === 'light' ? rTheme.theme?.gluestack.tokens.colors.light300 : rTheme.theme?.gluestack.tokens.colors.light800,
      ...container,
    },
  });

  return (
    <View style={sender ? styles.senderContainer : styles.recipientContainer}>
      <Text
        sx={{
          _light: {
            color: sender ? '$light200' : '$black',
          },
          _dark: {
            color: sender ? '$white' : '$light100',
          },
          fontWeight: sender ? '$medium' : '$normal',
          fontSize: 15
        }}
        // size="md"
      >{text}</Text>
    </View>
  );
}
