/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(app)` | `/(app)/animatedconversation` | `/(app)/explore` | `/(app)/explore/` | `/(app)/explore/searchresults` | `/(app)/explore/searchtext` | `/(app)/friendslist` | `/(app)/hometab` | `/(app)/hometab/conversations` | `/(app)/hometab/developmentstack` | `/(app)/hometab/developmentstack/` | `/(app)/hometab/developmentstack/account` | `/(app)/hometab/developmentstack/network` | `/(app)/hometab/developmentstack/notifications` | `/(app)/hometab/developmentstack/permissions` | `/(app)/hometab/developmentstack/settings` | `/(app)/hometab/developmentstack/state` | `/(app)/hometab/developmentstack/theme` | `/(app)/hometab/developmentstack/tokens` | `/(app)/hometab/profilestack` | `/(app)/hometab/profilestack/personalprofile` | `/(app)/hometab/profilestack/venueprofile` | `/(app)/hometab/tonight` | `/(app)/hometab/venuefeed` | `/(app)/modal` | `/(app)/modal/devicemanager` | `/(app)/modal/devicemanager/deviceprofilemanager` | `/(app)/modal/emojimood` | `/(app)/modal/medialibrary` | `/(app)/newconversation` | `/(app)/permission` | `/(app)/permission/backgroundlocation` | `/(app)/permission/camera` | `/(app)/permission/contacts` | `/(app)/permission/foregroundlocation` | `/(app)/permission/medialibrary` | `/(app)/permission/microphone` | `/(app)/permission/networkinformation` | `/(app)/permission/notifications` | `/(app)/public` | `/(app)/public/personal` | `/(app)/public/venue` | `/(app)/searcharea` | `/(app)/searcharea/` | `/(app)/searcharea/searchcountry` | `/(app)/searcharea/searchcountrystate` | `/(app)/searcharea/searchh3recommendation` | `/(app)/searcharea/searchstatecities` | `/(app)/settings` | `/(app)/settings/` | `/(app)/settings/appearancesettingsscreen` | `/(app)/settings/notificationssettingsscreen` | `/(app)/settings/profilesettings` | `/(app)/settings/profilesettings/personal` | `/(app)/settings/profilesettings/personal/` | `/(app)/settings/profilesettings/personal/birthday` | `/(app)/settings/profilesettings/personal/currenttown` | `/(app)/settings/profilesettings/personal/description` | `/(app)/settings/profilesettings/personal/fullname` | `/(app)/settings/profilesettings/personal/hometown` | `/(app)/settings/profilesettings/personal/interests` | `/(app)/settings/profilesettings/personal/lookingfor` | `/(app)/settings/profilesettings/personal/relationship` | `/(app)/settings/profilesettings/personal/username` | `/(app)/settings/profilesettings/venue` | `/(app)/settings/profilesettings/venue/` | `/(app)/settings/securitysettingsscreen` | `/(credential)` | `/(credential)/logincredentialstack` | `/(credential)/logincredentialstack/authenticator` | `/(credential)/logincredentialstack/confirmationcode` | `/(credential)/logincredentialstack/devicemanager` | `/(credential)/logincredentialstack/loginpassword` | `/(credential)/personalcredentialstack` | `/(credential)/personalcredentialstack/birthday` | `/(credential)/personalcredentialstack/confirmationcode` | `/(credential)/personalcredentialstack/create` | `/(credential)/personalcredentialstack/email` | `/(credential)/personalcredentialstack/getstarted` | `/(credential)/personalcredentialstack/name` | `/(credential)/personalcredentialstack/password` | `/(credential)/personalcredentialstack/phone` | `/(credential)/personalcredentialstack/photo` | `/(credential)/personalcredentialstack/username` | `/(information)` | `/(information)/latestprivacyservicetoptab` | `/(information)/latestprivacytermsservicetabstack` | `/(information)/latestprivacytermsservicetabstack/privacy` | `/(information)/latestprivacytermsservicetabstack/services` | `/(information)/updatelatestprivacytermsservice` | `/_sitemap` | `/animatedconversation` | `/brokenstate` | `/explore` | `/explore/` | `/explore/searchresults` | `/explore/searchtext` | `/friendslist` | `/hometab` | `/hometab/conversations` | `/hometab/developmentstack` | `/hometab/developmentstack/` | `/hometab/developmentstack/account` | `/hometab/developmentstack/network` | `/hometab/developmentstack/notifications` | `/hometab/developmentstack/permissions` | `/hometab/developmentstack/settings` | `/hometab/developmentstack/state` | `/hometab/developmentstack/theme` | `/hometab/developmentstack/tokens` | `/hometab/profilestack` | `/hometab/profilestack/personalprofile` | `/hometab/profilestack/venueprofile` | `/hometab/tonight` | `/hometab/venuefeed` | `/latestprivacyservicetoptab` | `/latestprivacytermsservicetabstack` | `/latestprivacytermsservicetabstack/privacy` | `/latestprivacytermsservicetabstack/services` | `/logincredentialstack` | `/logincredentialstack/authenticator` | `/logincredentialstack/confirmationcode` | `/logincredentialstack/devicemanager` | `/logincredentialstack/loginpassword` | `/modal` | `/modal/devicemanager` | `/modal/devicemanager/deviceprofilemanager` | `/modal/emojimood` | `/modal/medialibrary` | `/newconversation` | `/permission` | `/permission/backgroundlocation` | `/permission/camera` | `/permission/contacts` | `/permission/foregroundlocation` | `/permission/medialibrary` | `/permission/microphone` | `/permission/networkinformation` | `/permission/notifications` | `/personalcredentialstack` | `/personalcredentialstack/birthday` | `/personalcredentialstack/confirmationcode` | `/personalcredentialstack/create` | `/personalcredentialstack/email` | `/personalcredentialstack/getstarted` | `/personalcredentialstack/name` | `/personalcredentialstack/password` | `/personalcredentialstack/phone` | `/personalcredentialstack/photo` | `/personalcredentialstack/username` | `/public` | `/public/personal` | `/public/venue` | `/searcharea` | `/searcharea/` | `/searcharea/searchcountry` | `/searcharea/searchcountrystate` | `/searcharea/searchh3recommendation` | `/searcharea/searchstatecities` | `/settings` | `/settings/` | `/settings/appearancesettingsscreen` | `/settings/notificationssettingsscreen` | `/settings/profilesettings` | `/settings/profilesettings/personal` | `/settings/profilesettings/personal/` | `/settings/profilesettings/personal/birthday` | `/settings/profilesettings/personal/currenttown` | `/settings/profilesettings/personal/description` | `/settings/profilesettings/personal/fullname` | `/settings/profilesettings/personal/hometown` | `/settings/profilesettings/personal/interests` | `/settings/profilesettings/personal/lookingfor` | `/settings/profilesettings/personal/relationship` | `/settings/profilesettings/personal/username` | `/settings/profilesettings/venue` | `/settings/profilesettings/venue/` | `/settings/securitysettingsscreen` | `/updatelatestprivacytermsservice`;
      DynamicRoutes: `/(app)/animatedconversation/${Router.SingleRoutePart<T>}` | `/(app)/modal/devicemanager/${Router.SingleRoutePart<T>}` | `/(app)/public/personal/${Router.SingleRoutePart<T>}` | `/(app)/public/venue/${Router.SingleRoutePart<T>}` | `/animatedconversation/${Router.SingleRoutePart<T>}` | `/modal/devicemanager/${Router.SingleRoutePart<T>}` | `/public/personal/${Router.SingleRoutePart<T>}` | `/public/venue/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/(app)/animatedconversation/[animatedconversationid]` | `/(app)/modal/devicemanager/[profileid]` | `/(app)/public/personal/[username]` | `/(app)/public/venue/[username]` | `/animatedconversation/[animatedconversationid]` | `/modal/devicemanager/[profileid]` | `/public/personal/[username]` | `/public/venue/[username]`;
    }
  }
}
