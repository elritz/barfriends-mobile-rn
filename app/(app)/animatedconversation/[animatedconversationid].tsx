
import React, { useCallback, useRef, useState } from "react";
import { View } from "react-native";
import {
  useKeyboardHandler,
} from "react-native-keyboard-controller";
import Reanimated, {
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";
import Message from "@/components/screens/conversations/Message";
import { history } from "@/components/screens/conversations/Message/data";
import { Input, InputField, Box, InputSlot, EyeOffIcon, InputIcon, EyeIcon } from "@gluestack-ui/themed";
import { FontAwesome6 } from "@expo/vector-icons";
import { useReactiveVar } from "@apollo/client";
import { ThemeReactiveVar } from "@/reactive/theme";
// import { ThemeReactiveVar } from "#/reactive/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AnimatedTextInput = Reanimated.createAnimatedComponent(Box);

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
  const [showPassword, setShowPassword] = useState(false)
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }
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
        <Input flexDirection="row" bg="$blue600" rounded={'$xl'} alignItems="center" height={'auto'} minHeight={40} maxHeight={150} mt={'$2'}>
          <InputField flex={1} height={'auto'} multiline onPressIn={() => ref.current?.scrollToEnd()} fontSize={'$lg'} />
          <InputSlot bg={'$primary500'} mr={'$2'} p={'$1'} alignItems="center" justifyContent="center" h={25} w={25} rounded={'$full'}>
            <FontAwesome6 name={'arrow-up'} fontSize={'$xl'} size={16} color={'#ffffff'} />
          </InputSlot>
        </Input>

      </AnimatedBoxInput>
    </View>
  );
}

export default InteractiveKeyboard;