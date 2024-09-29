import { Divider } from "#/src/components/ui/divider";
import { Box } from "#/src/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import CardPleaseSignup from "#/src/components/molecules/asks/signuplogin";
import PreferenceNotificationPermission from "#/src/components/molecules/permissions/preferencenotificationpermission/PreferenceNotificationPermission";
import PersonalScreen from "#/src/view/screens/profile/personalprofile/PersonalProfile";
import VenueScreen from "#/src/view/screens/profile/venueprofile/VenueProfile";
import { ProfileType, useGetNotificationsLazyQuery } from "#/graphql/generated";
import {
  AuthorizationReactiveVar,
  PermissionNotificationReactiveVar,
} from "#/reactive";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

const Profile = () => {
  const [refreshing, setRefreshing] = useState(false);
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar);
  const rNotificationPermission = useReactiveVar(
    PermissionNotificationReactiveVar,
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

  const _onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  // if (GNLoading) return null

  const renderProfile = (param: ProfileType) => {
    switch (param) {
      case ProfileType.Guest:
        return (
          <Box className="mx-3 my-5 flex-1 bg-transparent">
            <View>
              <CardPleaseSignup signupTextId={4} />
              <Divider style={{ marginVertical: 20 }} />
            </View>
          </Box>
        );
      case ProfileType.Personal:
        // return <PersonalScreen notifications={GNData} />
        return <PersonalScreen notifications={null} />;
      case ProfileType.Venue:
        return <VenueScreen />;
      default:
        return null;
    }
  };
  return (
    <ScrollView
      contentInset={{ top: 0, left: 0, bottom: 150, right: 0 }}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={_onRefresh} />
      }
    >
      {!rNotificationPermission?.granted && (
        <PreferenceNotificationPermission />
      )}
      {renderProfile(rAuthorizationVar?.Profile?.ProfileType as ProfileType)}
    </ScrollView>
  );
};

export default Profile;
