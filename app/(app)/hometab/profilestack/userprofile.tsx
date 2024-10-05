import { Box } from "#/src/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import CardPleaseSignup from "#/src/components/molecules/asks/signuplogin";
import PreferenceNotificationPermission from "#/src/components/molecules/permissions/preferencenotificationpermission/PreferenceNotificationPermission";
import PersonalScreen from "#/src/view/screens/profile/personalprofile/PersonalProfile";
import VenueScreen from "#/src/view/screens/profile/venueprofile/VenueProfile";
import {
  ProfileType,
  useGetNotificationsLazyQuery, // useGetNotificationsLazyQuery
} from "#/graphql/generated";
import {
  AuthorizationReactiveVar,
  PreferencePermissionNotificationReactiveVar,
} from "#/reactive";
import { FlashList } from "@shopify/flash-list";
import useContentInsets from "#/src/util/hooks/useContentInsets";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, Button } from "react-native";

export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar);
  const insets = useContentInsets();

  const rPreferenceNotificationPermission = useReactiveVar(
    PreferencePermissionNotificationReactiveVar,
  );

  const [getNotificationQuery, { data: GNData, loading: GNLoading, error }] =
    useGetNotificationsLazyQuery({
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        if (data.getNotifications) {
          setRefreshing(false);
        }
      },
    });

  useEffect(() => {
    getNotificationQuery();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getNotificationQuery();
  }, [getNotificationQuery]);

  // if (GNLoading) return null

  const renderProfile = (param: ProfileType) => {
    switch (param) {
      case ProfileType.Guest:
        return (
          <Box className="m-2 p-5">
            <CardPleaseSignup signupTextId={4} />
          </Box>
        );
      case ProfileType.Personal:
        return <PersonalScreen />;
      case ProfileType.Venue:
        return <VenueScreen />;
      default:
        return null;
    }
  };

  return (
    // <ScrollView
    // 	showsVerticalScrollIndicator={false}
    // 	scrollEventThrottle={16}
    // 	refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
    // >
    // </ScrollView>
    <FlashList
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefresh} />
      }
      contentInset={{ ...insets, top: 0, bottom: 150 }}
      data={[1]}
      estimatedItemSize={100}
      renderItem={() => {
        return null;
      }}
      ListHeaderComponent={() => {
        return (
          <>
            <Button
              title="Press me"
              onPress={() => {
                throw new Error("Hello, Sentry!");
              }}
            />
            <PreferenceNotificationPermission />
            {renderProfile(
              rAuthorizationVar?.Profile?.ProfileType as ProfileType,
            )}
          </>
        );
      }}
    />
  );
};
