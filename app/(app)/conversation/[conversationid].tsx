import { Image } from "#/src/components/ui/image";
import { Box } from "#/src/components/ui/box";
import { Dimensions, StyleSheet } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { ResizeMode, Video } from "expo-av";
import { useKeyboardHandler } from "react-native-keyboard-controller";
import Reanimated, { useSharedValue } from "react-native-reanimated";

const { width } = Dimensions.get("window");

const useKeyboardAnimation = () => {
  const progress = useSharedValue(0);
  const height = useSharedValue(0);

  useKeyboardHandler({
    onMove: (e) => {
      "worklet";

      progress.value = e.progress;
      height.value = e.height;
    },
    onInteractive: (e) => {
      "worklet";

      progress.value = e.progress;
      height.value = e.height;
    },
  });

  return { height, progress };
};

const getVimeoId = (url: string) => {
  const regExp = /^.*(vimeo\.com\/)([0-9]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length >= 9) {
    return match[2];
  }
  return null;
};
const getYouTubeId = (url) => {
  const regExp =
    /^.*(youtu\.be\/|youtube\.com\/(watch\?v=|embed\/|v\/|.*[?&]v=))([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[3].length === 11) {
    return match[3];
  }
  return null;
};

export default function Conversation() {
  const [interpolator, setInterpolator] = useState<"ios" | "linear">("linear");
  const [messages, setMessages] = useState<
    {
      _id: number;
      text: string;
      createdAt: Date;
      user: { _id: number; name: string; avatar: string };
      video?: string;
    }[]
  >([]);
  const _scrollRef = useRef<Reanimated.FlatList<IMessage>>(null);
  const { height, onScroll, inset, offset } = useKeyboardAnimation();
  const insets = useSafeAreaInsets();
  const TEXT_INPUT_HEIGHT = 50;

  const contentContainerStyle = {
    paddingBottom: TEXT_INPUT_HEIGHT,
  };

  const scrollToBottom = useCallback(() => {
    _scrollRef.current?.scrollToEnd({ animated: false });
  }, []);

  const onSend = (newMessages = []) => {
    setMessages(GiftedChat.append(messages, newMessages));
  };

  React.useEffect(() => {
    setMessages([
      {
        _id: 2,
        text: "Hello other develop developer",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "React Native",
          avatar:
            "https://plus.unsplash.com/premium_photo-1676637000058-96549206fe71?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      },
      {
        _id: 3,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar:
            "https://plus.unsplash.com/premium_photo-1676637000058-96549206fe71?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      },
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "GiftedChat",
          avatar: "https://placeimg.com/140/140/any",
        },
        video:
          "https://www.youtube.com/watch?v=dL7nZC9FQOQ&ab_channel=BlacktailStudio",
      },
      {
        _id: 4,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "GiftedChat",
          avatar: "https://placeimg.com/140/140/any",
        },
        video:
          "https://www.youtube.com/watch?v=dL7nZC9FQOQ&ab_channel=BlacktailStudio",
      },
      {
        _id: 5,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "GiftedChat",
          avatar: "https://placeimg.com/140/140/any",
        },
        video:
          "https://www.youtube.com/watch?v=dL7nZC9FQOQ&ab_channel=BlacktailStudio",
      },
      {
        _id: 6,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "GiftedChat",
          avatar: "https://placeimg.com/140/140/any",
        },
        video:
          "https://www.youtube.com/watch?v=dL7nZC9FQOQ&ab_channel=BlacktailStudio",
      },
      {
        _id: 7,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "GiftedChat",
          avatar: "https://placeimg.com/140/140/any",
        },
        video:
          "https://www.youtube.com/watch?v=dL7nZC9FQOQ&ab_channel=BlacktailStudio",
      },
    ]);
  }, []);

  const renderMessageVideo = (props: any) => {
    const { currentMessage } = props;
    if (currentMessage.video.includes("youtube")) {
      if (Platform.OS === "web") {
        return null;
      }
      return (
        <Box className={` w-${width / 1.5} m-2 h-[150px] rounded-md`}>
          <Image
            alt="youtube video thumbnail"
            source={{
              uri: `https://img.youtube.com/vi/${getYouTubeId(
                currentMessage!.video!,
              )}/sddefault.jpg`,
            }}
            className="h-[100%] w-[100%] rounded-lg"
          />
        </Box>
      );
    }
    if (currentMessage.video.includes("vimeo")) {
      if (Platform.OS === "web") {
        return null;
      }
      return (
        <Box className={` w-${width / 1.5} m-2 h-[150px] rounded-md`}>
          <Image
            alt="youtube video thumbnail"
            source={{
              uri: `https://player.vimeo.com/video/${getVimeoId(
                currentMessage!.video!,
              )}`,
            }}
            className="h-[100%] w-[100%] rounded-lg"
          />
        </Box>
      );
    }
    return (
      <Video
        source={{ uri: currentMessage!.video! }}
        style={{
          width: width / 1.5,
          height: 150,
          margin: 13,
          borderRadius: 13,
        }}
        resizeMode={ResizeMode.COVER}
      />
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
        width: "100%",
      }}
    >
      <GiftedChat
        showUserAvatar={false}
        showAvatarForEveryMessage={false}
        scrollToBottom
        // messagesContainerStyle={scrollViewStyle}
        // textInputProps={textInputStyle}
        renderAvatar={null}
        messages={messages}
        renderMessageVideo={renderMessageVideo}
        onSend={(props) => onSend(props)}
        user={{
          _id: 1, // ID of the sender
        }}
      />
      {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
    </SafeAreaView>
  );
}
