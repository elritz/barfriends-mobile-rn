
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import {
  KeyboardGestureArea,
  useKeyboardHandler,
} from "react-native-keyboard-controller";
import Reanimated, {
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const AnimatedTextInput = Reanimated.createAnimatedComponent(Box);
import { StyleSheet } from "react-native";
import Message from "#/components/screens/conversations/Message";
import { history } from "#/components/screens/conversations/Message/data";
import { Input, InputField, Box } from "@gluestack-ui/themed";
import { FontAwesome6 } from "@expo/vector-icons";
import { useReactiveVar } from "@apollo/client";
import { ThemeReactiveVar } from "reactive/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    flex: 1,
  },
  header: {
    color: "black",
    marginRight: 12,
  },
  inverted: {
    transform: [
      {
        rotate: "180deg",
      },
    ],
  },
  content: {
    flex: 1,
  },
});

const useKeyboardAnimation = () => {
  const progress = useSharedValue(0);
  const height = useSharedValue(0);
  const inset = useSharedValue(0);
  const offset = useSharedValue(0);
  const scroll = useSharedValue(0);
  const shouldUseOnMoveHandler = useSharedValue(false);

  useKeyboardHandler({
    onStart: (e) => {
      "worklet";

      // i. e. the keyboard was under interactive gesture, and will be showed
      // again. Since iOS will not schedule layout animation for that we can't
      // simply update `height` to destination and we need to listen to `onMove`
      // handler to have a smooth animation
      if (progress.value !== 1 && progress.value !== 0 && e.height !== 0) {
        shouldUseOnMoveHandler.value = true;
        return;
      }

      progress.value = e.progress;
      height.value = e.height;

      inset.value = e.height;
      // Math.max is needed to prevent overscroll when keyboard hides (and user scrolled to the top, for example)
      offset.value = Math.max(e.height + scroll.value, 0);
    },
    onInteractive: (e) => {
      "worklet";

      progress.value = e.progress;
      height.value = e.height;
    },
    onMove: (e) => {
      "worklet";

      if (shouldUseOnMoveHandler.value) {
        progress.value = e.progress;
        height.value = e.height;
      }
    },
    onEnd: (e) => {
      "worklet";

      height.value = e.height;
      progress.value = e.progress;
      shouldUseOnMoveHandler.value = false;
    },
  });

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scroll.value = e.contentOffset.y - inset.value;
    },
  });

  return { height, progress, onScroll, inset, offset };
};

const TEXT_INPUT_HEIGHT = 80;

const contentContainerStyle = {
  paddingBottom: TEXT_INPUT_HEIGHT,
};
const AnimatedBoxInput = Reanimated.createAnimatedComponent(Box);

function InteractiveKeyboard() {
  const ref = useRef<Reanimated.ScrollView>(null);
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const insets = useSafeAreaInsets()
  const { height, onScroll, inset, offset } = useKeyboardAnimation();
  const scrollToBottom = useCallback(() => {
    ref.current?.scrollToEnd({ animated: false });
  }, []);

  const BoxInputStyle = useAnimatedStyle(
    () => ({
      position: "absolute",
      minHeight: TEXT_INPUT_HEIGHT,
      height: 'auto',
      width: "100%",
      transform: [{ translateY: -height.value }],
      paddingHorizontal: 10,
      fontSize: 15,
    }),
    [],
  );

  const props = useAnimatedProps(() => ({
    contentInset: {
      bottom: inset.value,
    },
    contentOffset: {
      x: 0,
      y: offset.value,
    },
  }));

  return (
    <View style={styles.container}>
      <Reanimated.ScrollView
        ref={ref}
        onContentSizeChange={scrollToBottom}
        contentContainerStyle={contentContainerStyle}
        keyboardDismissMode="interactive"
        // simulation of `automaticallyAdjustKeyboardInsets` behavior on RN < 0.73
        animatedProps={props}
        onScroll={onScroll}
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior="never"
      >
        {history.map((message, index) => (
          <Message key={index} {...message} />
        ))}
      </Reanimated.ScrollView>
      <AnimatedBoxInput style={[BoxInputStyle, { backgroundColor: rTheme.colorScheme === 'light' ? rTheme.theme?.gluestack.tokens.colors.light100 : rTheme.theme?.gluestack.tokens.colors.black }]}>
        {/* <AnimatedBoxInput style={BoxInputStyle}> */}
        <Input rounded={'$xl'} alignItems="center" height={'auto'} minHeight={40} maxHeight={150} mt={'$2'}>
          <InputField height={'auto'} multiline onPressIn={() => ref.current?.scrollToEnd()} fontSize={'$lg'} />
          <Box bg={'$primary500'} mr={'$2'} p={'$1'} alignItems="center" justifyContent="center" h={25} w={25} rounded={'$full'}>
            <FontAwesome6 name={'arrow-up'} fontSize={'$xl'} size={16} color={'#ffffff'} />
          </Box>
        </Input>
      </AnimatedBoxInput>
    </View>
  );
}

export default InteractiveKeyboard;

// import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { Button, Text, View } from "react-native";
// import {
//   KeyboardAwareScrollView,
//   KeyboardStickyView,
//   useKeyboardHandler,
// } from "react-native-keyboard-controller";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// // import TextInput from "#/components/screens/conversations/TextInput";
// import Message from "#/components/screens/conversations/Message";
// import { history } from "#/components/screens/conversations/Message/data";
// import { StyleSheet } from "react-native";
// import Reanimated, {
//   useAnimatedProps,
//   useAnimatedScrollHandler,
//   useAnimatedStyle,
//   useSharedValue,
// } from "react-native-reanimated";
// import { useTheme } from "@gluestack-style/react";
// import { useReactiveVar } from "@apollo/client";
// import { ThemeReactiveVar } from "reactive/theme";
// import { Box, InputField, Input, InputIcon } from "@gluestack-ui/themed";
// import { FontAwesome6 } from "@expo/vector-icons";

// export const styles = StyleSheet.create({
//   container: {
//     justifyContent: "flex-end",
//     flex: 1,
//   },
//   content: {
//     paddingTop: 50,
//   },
//   pageContainer: {
//     flex: 1,
//   },
//   footer: {
//     backgroundColor: "green",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//     width: "100%",
//     gap: 10,
//   },
//   footerText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   circle: {
//     position: "absolute",
//     bottom: 0,
//     right: 30,
//     justifyContent: "flex-end",
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: "#002099",
//   },
//   header: {
//     color: "black",
//     paddingRight: 12,
//   },
//   inputInFooter: {
//     width: 200,
//     backgroundColor: "yellow",
//   },
// });
// // const AnimatedTextInput = Reanimated.createAnimatedComponent(TextInput);
// const AnimatedBoxInput = Reanimated.createAnimatedComponent(Box);

// const useKeyboardAnimation = () => {
//   const progress = useSharedValue(0);
//   const height = useSharedValue(0);
//   const inset = useSharedValue(0);
//   const offset = useSharedValue(0);
//   const scroll = useSharedValue(0);
//   const shouldUseOnMoveHandler = useSharedValue(false);

//   useKeyboardHandler({
//     onStart: (e) => {
//       "worklet";

//       // i. e. the keyboard was under interactive gesture, and will be showed
//       // again. Since iOS will not schedule layout animation for that we can't
//       // simply update `height` to destination and we need to listen to `onMove`
//       // handler to have a smooth animation
//       if (progress.value !== 1 && progress.value !== 0 && e.height !== 0) {
//         shouldUseOnMoveHandler.value = true;
//         return;
//       }

//       progress.value = e.progress;
//       height.value = e.height;

//       inset.value = e.height;
//       // Math.max is needed to prevent overscroll when keyboard hides (and user scrolled to the top, for example)
//       offset.value = Math.max(e.height + scroll.value, 0);
//     },
//     onInteractive: (e) => {
//       "worklet";

//       progress.value = e.progress;
//       height.value = e.height;
//     },
//     onMove: (e) => {
//       "worklet";

//       if (shouldUseOnMoveHandler.value) {
//         progress.value = e.progress;
//         height.value = e.height;
//       }
//     },
//     onEnd: (e) => {
//       "worklet";

//       height.value = e.height;
//       progress.value = e.progress;
//       shouldUseOnMoveHandler.value = false;
//     },
//   });

//   const onScroll = useAnimatedScrollHandler({
//     onScroll: (e) => {
//       scroll.value = e.contentOffset.y - inset.value;
//     },
//   });

//   return { height, progress, onScroll, inset, offset };
// };

// const TEXT_INPUT_HEIGHT = 90;

// const contentContainerStyle = {
//   paddingBottom: TEXT_INPUT_HEIGHT,
// };

// export default () => {
//   const ref = useRef<Reanimated.ScrollView>(null);
//   const { height, onScroll, inset, offset } = useKeyboardAnimation();
//   const rTheme = useReactiveVar(ThemeReactiveVar)
//   const insets = useSafeAreaInsets()
//   const scrollToBottom = useCallback(() => {
//     ref.current?.scrollToEnd({ animated: false });
//   }, []);

//   const props = useAnimatedProps(() => ({
//     contentInset: {
//       bottom: inset.value,
//     },
//     contentOffset: {
//       x: 0,
//       y: offset.value,
//     },
//   }));

//   const BoxInputStyle = useAnimatedStyle(
//     () => ({
//       position: "absolute",
//       height: TEXT_INPUT_HEIGHT,
//       width: "100%",
//       transform: [{ translateY: -height.value }],
//       paddingBottom: insets.bottom,
//       paddingHorizontal: 10,
//       paddingTop: 10,
//       fontSize: 15,
//     }),
//     [],
//   );

//   return (
//     <View style={styles.container}>
//       <Reanimated.ScrollView
//         ref={ref}
//         onContentSizeChange={scrollToBottom}
//         contentContainerStyle={contentContainerStyle}
//         keyboardDismissMode="interactive"
//         // simulation of `automaticallyAdjustKeyboardInsets` behavior on RN < 0.73
//         animatedProps={props}
//         onScroll={onScroll}
//         automaticallyAdjustContentInsets={false}
//         contentInsetAdjustmentBehavior="never"
//       >
//         {history.map((message, index) => (
//           <Message key={index} {...message} />
//         ))}
//       </Reanimated.ScrollView>
//       <AnimatedBoxInput style={[BoxInputStyle, { backgroundColor: rTheme.colorScheme === 'light' ? rTheme.theme?.gluestack.tokens.colors.light100 : rTheme.theme?.gluestack.tokens.colors.light900 }]}>
//         {/* <AnimatedBoxInput style={BoxInputStyle}> */}
//         <Input rounded={'$full'} alignItems="center" >
//           <InputField onPressIn={() => ref.current?.scrollToEnd()} />
//           <Box bg={'$primary500'} mr={'$2'} p={'$1'} alignItems="center" justifyContent="center" h={25} w={25} rounded={'$full'}>
//             <FontAwesome6 name={'arrow-up'} fontSize={'$xl'} size={16} color={'#ffffff'} />
//           </Box>
//         </Input>
//       </AnimatedBoxInput>
//     </View>
//   );
// }


// import React from "react";
// import { FlatList, TextInput, View } from "react-native";
// import { useKeyboardHandler } from "react-native-keyboard-controller";
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
// } from "react-native-reanimated";
// import Message from "#/components/screens/conversations/Message";
// import { history } from "#/components/screens/conversations/Message/data";

// import type { MessageProps } from "#/components/screens/conversations/Message/types";
// import type { ListRenderItem } from "react-native";

// import { StyleSheet } from "react-native";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     color: "black",
//     marginRight: 12,
//   },
//   contentContainer: { justifyContent: "flex-end", flexGrow: 1 },
//   textInput: { height: 50, width: "100%", backgroundColor: "#BCBCBC" },
// });

// const reversedMessages = [...history].reverse();

// const RenderItem: ListRenderItem<MessageProps> = ({ item, index }) => {
//   return <Message key={index} {...item} />;
// };

// const useGradualAnimation = () => {
//   const height = useSharedValue(0);

//   useKeyboardHandler(
//     {
//       onMove: (e) => {
//         "worklet";

//         height.value = e.height;
//       },
//       onEnd: (e) => {
//         "worklet";

//         height.value = e.height;
//       },
//     },
//     [],
//   );

//   return { height };
// };

// function ReanimatedChatFlatList() {
//   const { height } = useGradualAnimation();

//   const fakeView = useAnimatedStyle(
//     () => ({
//       height: Math.abs(height.value),
//     }),
//     [],
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         inverted
//         initialNumToRender={15}
//         contentContainerStyle={styles.contentContainer}
//         data={reversedMessages}
//         renderItem={RenderItem}
//       />
//       <TextInput style={styles.textInput} />
//       <Animated.View style={fakeView} />
//     </View>
//   );
// }

// export default ReanimatedChatFlatList;