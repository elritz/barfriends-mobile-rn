import { Box } from "#/src/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import CardPleaseSignup from "#/src/components/molecules/asks/signuplogin";
import InviteCard from "#/src/components/molecules/activity/invitecard/InviteCard";
import QuickBarfriendCard from "#/src/components/molecules/activity/quickbarfriendcard/QuickBarfriendCard";
import AddEmoji from "#/src/components/molecules/activity/addemoji/AddEmoji";
import JoinVenue from "#/src/components/molecules/activity/joinvenue/JoinVenue";
import Photos from "#/src/view/screens/tonight/photos";
import { AuthorizationReactiveVar, ThemeReactiveVar } from "#/reactive";
import { FlashList } from "@shopify/flash-list";
import useContentInsets from "#/src/util/hooks/useContentInsets";
import { BlurView } from "expo-blur";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useRefreshDeviceManagerQuery } from "#/graphql/generated";
import { SafeAreaView } from "react-native-safe-area-context";
import EmojimoodGradient from "#/src/view/screens/tonight/EmojimoodGradient";
import useEmojimoodTextColor from "#/hooks/useTextContrast copy";

const Wrapper = ({ children }) => {
  const rTheme = useReactiveVar(ThemeReactiveVar);
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar);
  const textColor = useEmojimoodTextColor({
    isEmojimoodDynamic: true,
  });
  const {
    data: rdmData,
    loading: rdmLoading,
    error: rdmError,
  } = useRefreshDeviceManagerQuery({
    fetchPolicy: "cache-first",
  });

  return (
    <BlurView
      intensity={60}
      tint={rTheme.colorScheme === "light" ? "light" : "dark"}
      style={{
        flex: 1,
        height: 200,
        paddingHorizontal: 10,
        paddingVertical: 2,
        margin: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor:
          rdmData?.refreshDeviceManager?.__typename ===
            "AuthorizationDeviceProfile" &&
          rdmData?.refreshDeviceManager.Profile?.tonightStory?.emojimood
            ? "transparent"
            : rTheme.colorScheme === "light"
              ? rTheme.theme.gluestack.tokens.colors.light300
              : rTheme.theme.gluestack.tokens.colors.light800,
      }}
    >
      {children}
    </BlurView>
  );
};

const Tonight = () => {
  const contentInsets = useContentInsets();
  const rTheme = useReactiveVar(ThemeReactiveVar);
  const {
    data: rdmData,
    loading: rdmLoading,
    error: rdmError,
  } = useRefreshDeviceManagerQuery({
    fetchPolicy: "cache-first",
    onCompleted(data) {
      if (
        data.refreshDeviceManager?.__typename === "AuthorizationDeviceProfile"
      ) {
      }
    },
  });

  if (rdmLoading) {
    return null;
  }

  if (
    rdmData?.refreshDeviceManager?.__typename ===
      "AuthorizationDeviceProfile" &&
    rdmData?.refreshDeviceManager.Profile?.ProfileType === "GUEST"
  ) {
    return (
      <ScrollView
        contentInset={{
          ...contentInsets,
        }}
        automaticallyAdjustContentInsets
      >
        <SafeAreaView>
          <Box className={`mx-2 my-2 p-5 pt-10`}>
            <CardPleaseSignup signupTextId={1} />
          </Box>
        </SafeAreaView>
      </ScrollView>
    );
  }

  if (
    rdmData?.refreshDeviceManager?.__typename === "AuthorizationDeviceProfile"
  ) {
    return (
      <EmojimoodGradient>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
          }}
        >
          <FlashList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 5,
            }}
            ListHeaderComponentStyle={{
              marginBottom: 20,
            }}
            contentInset={{
              ...contentInsets,
            }}
            ListHeaderComponent={() => {
              return <Photos isEmojimoodDynamic />;
            }}
            data={[
              {
                _typename: "addemoji",
                item: <AddEmoji isEmojimoodDynamic />,
              },
              {
                _typename: "joinvenue",
                item: <JoinVenue isEmojimoodDynamic />,
              },
              {
                _typename: "quickbarfriend",
                item: (
                  <QuickBarfriendCard
                    color={rTheme.colorScheme === "light" ? "black" : "white"}
                    showIcon={false}
                    logosize={40}
                    qrcodesize={140}
                    isEmojimoodDynamic
                  />
                ),
              },
              {
                _typename: "invite",
                item: <InviteCard isEmojimoodDynamic />,
              },
            ]}
            numColumns={2}
            estimatedItemSize={200}
            renderItem={({ index, item }) => {
              return <Wrapper>{item.item}</Wrapper>;
            }}
          />
        </ScrollView>
      </EmojimoodGradient>
    );
  }
};

export default Tonight;
