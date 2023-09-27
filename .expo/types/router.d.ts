/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/ban-types */
declare module "expo-router" {
  import type { LinkProps as OriginalLinkProps } from 'expo-router/build/link/Link';
  export * from 'expo-router/build';

  // prettier-ignore
  type StaticRoutes = `/` | `/(app)/conversation` | `/conversation` | `/(app)/explore/` | `/explore/` | `/(app)/explore` | `/(app)/explore/searchresults` | `/explore/searchresults` | `/(app)/explore/searchtext` | `/explore/searchtext` | `/(app)/friendslist` | `/friendslist` | `/(app)/hometab/developmentstack/` | `/hometab/developmentstack/` | `/(app)/hometab/developmentstack` | `/(app)/hometab/developmentstack/permissionmodals` | `/hometab/developmentstack/permissionmodals` | `/(app)/hometab/developmentstack/preferences` | `/hometab/developmentstack/preferences` | `/(app)/hometab/developmentstack/theme` | `/hometab/developmentstack/theme` | `/(app)/hometab/messagestack/` | `/hometab/messagestack/` | `/(app)/hometab/messagestack` | `/(app)/hometab/profilestack/UserProfileScreen` | `/hometab/profilestack/UserProfileScreen` | `/(app)/hometab/tonight` | `/hometab/tonight` | `/(app)/hometab/venuefeed` | `/hometab/venuefeed` | `/(app)/modal/CameraQR` | `/modal/CameraQR` | `/(app)/modal/DeviceManager` | `/modal/DeviceManager` | `/(app)/modal/Emojimood` | `/modal/Emojimood` | `/(app)/modal/MediaLibrary` | `/modal/MediaLibrary` | `/(app)/newconversation` | `/newconversation` | `/(app)/permission/backgroundlocation` | `/permission/backgroundlocation` | `/(app)/permission/camera` | `/permission/camera` | `/(app)/permission/contacts` | `/permission/contacts` | `/(app)/permission/foregroundlocation` | `/permission/foregroundlocation` | `/(app)/permission/medialibrary` | `/permission/medialibrary` | `/(app)/permission/microphone` | `/permission/microphone` | `/(app)/permission/networkinformation` | `/permission/networkinformation` | `/(app)/permission/notifications` | `/permission/notifications` | `/(app)/public/contacts` | `/public/contacts` | `/(app)/searcharea/` | `/searcharea/` | `/(app)/searcharea` | `/(app)/searcharea/searchcountry` | `/searcharea/searchcountry` | `/(app)/searcharea/searchcountrystate` | `/searcharea/searchcountrystate` | `/(app)/searcharea/searchh3recommendation` | `/searcharea/searchh3recommendation` | `/(app)/searcharea/searchstatecities` | `/searcharea/searchstatecities` | `/(app)/settings/appearancesettingsscreen` | `/settings/appearancesettingsscreen` | `/(app)/settings/` | `/settings/` | `/(app)/settings` | `/(app)/settings/notificationssettingsscreen` | `/settings/notificationssettingsscreen` | `/(app)/settings/profilesettings/personal/birthday` | `/settings/profilesettings/personal/birthday` | `/(app)/settings/profilesettings/personal/currenttown` | `/settings/profilesettings/personal/currenttown` | `/(app)/settings/profilesettings/personal/description` | `/settings/profilesettings/personal/description` | `/(app)/settings/profilesettings/personal/fullname` | `/settings/profilesettings/personal/fullname` | `/(app)/settings/profilesettings/personal/gender` | `/settings/profilesettings/personal/gender` | `/(app)/settings/profilesettings/personal/hometown` | `/settings/profilesettings/personal/hometown` | `/(app)/settings/profilesettings/personal/` | `/settings/profilesettings/personal/` | `/(app)/settings/profilesettings/personal` | `/(app)/settings/profilesettings/personal/interests` | `/settings/profilesettings/personal/interests` | `/(app)/settings/profilesettings/personal/lookingfor` | `/settings/profilesettings/personal/lookingfor` | `/(app)/settings/profilesettings/personal/relationship` | `/settings/profilesettings/personal/relationship` | `/(app)/settings/profilesettings/personal/username` | `/settings/profilesettings/personal/username` | `/(app)/settings/profilesettings/venue/` | `/settings/profilesettings/venue/` | `/(app)/settings/profilesettings/venue` | `/(app)/settings/securitysettingsscreen` | `/settings/securitysettingsscreen` | `/(credential)/logincredentialstack/authenticator` | `/logincredentialstack/authenticator` | `/(credential)/logincredentialstack/confirmationcode` | `/logincredentialstack/confirmationcode` | `/(credential)/logincredentialstack/devicemanager` | `/logincredentialstack/devicemanager` | `/(credential)/logincredentialstack/loginpassword` | `/logincredentialstack/loginpassword` | `/(credential)/personalcredentialstack/birthday` | `/personalcredentialstack/birthday` | `/(credential)/personalcredentialstack/confirmationcode` | `/personalcredentialstack/confirmationcode` | `/(credential)/personalcredentialstack/create` | `/personalcredentialstack/create` | `/(credential)/personalcredentialstack/email` | `/personalcredentialstack/email` | `/(credential)/personalcredentialstack/getstarted` | `/personalcredentialstack/getstarted` | `/(credential)/personalcredentialstack/name` | `/personalcredentialstack/name` | `/(credential)/personalcredentialstack/password` | `/personalcredentialstack/password` | `/(credential)/personalcredentialstack/phone` | `/personalcredentialstack/phone` | `/(credential)/personalcredentialstack/photo` | `/personalcredentialstack/photo` | `/(credential)/personalcredentialstack/username` | `/personalcredentialstack/username` | `/(credential)/venuecredentialstack/birthday` | `/venuecredentialstack/birthday` | `/(credential)/venuecredentialstack/confirmationcode` | `/venuecredentialstack/confirmationcode` | `/(credential)/venuecredentialstack/create` | `/venuecredentialstack/create` | `/(credential)/venuecredentialstack/email` | `/venuecredentialstack/email` | `/(credential)/venuecredentialstack/getstarted` | `/venuecredentialstack/getstarted` | `/(credential)/venuecredentialstack/name` | `/venuecredentialstack/name` | `/(credential)/venuecredentialstack/password` | `/venuecredentialstack/password` | `/(credential)/venuecredentialstack/phone` | `/venuecredentialstack/phone` | `/(credential)/venuecredentialstack/photo` | `/venuecredentialstack/photo` | `/(credential)/venuecredentialstack/username` | `/venuecredentialstack/username` | `/(information)/latestprivacyservicetoptab` | `/latestprivacyservicetoptab` | `/(information)/latestprivacytermsservicetabstack/privacy` | `/latestprivacytermsservicetabstack/privacy` | `/(information)/latestprivacytermsservicetabstack/services` | `/latestprivacytermsservicetabstack/services` | `/(information)/updatelatestprivacytermsservice` | `/updatelatestprivacytermsservice` | `/Users/christianfirmi/Desktop/4/Github/bfs/revel/components/molecules/asks/signinup/` | `/Users/christianfirmi/Desktop/4/Github/bfs/revel/components/core/Text/styled-components/Root` | `/Users/christianfirmi/Desktop/4/Github/bfs/revel/components/layouts/Theme` | `/Users/christianfirmi/Desktop/4/Github/bfs/revel/components/molecules/modals/asks/backgroundlocationnextaskmodal/` | `/Users/christianfirmi/Desktop/4/Github/bfs/revel/components/molecules/modals/asks/foregroundlocationnextaskmodal/` | `/Users/christianfirmi/Desktop/4/Github/bfs/revel/components/molecules/permissions/preferencelocationpermission/PreferenceBackgroundLocationPermissionFullSection` | `/Users/christianfirmi/Desktop/4/Github/bfs/revel/components/molecules/permissions/preferencelocationpermission/PreferenceForegroundLocationPermissionFullSection` | `/Users/christianfirmi/Desktop/4/Github/bfs/revel/components/molecules/permissions/preferencenotificationpermission/PreferenceNotificationPermission` | `/Users/christianfirmi/Desktop/4/Github/bfs/revel/components/molecules/asks/signuplogin/` | `/Users/christianfirmi/Desktop/4/Github/bfs/revel/graphql/apollo/profiling/link/ErrorLink` | `/Users/christianfirmi/Desktop/4/Github/bfs/revel/components/organisms/photos/` | `/Users/christianfirmi/Desktop/4/Github/bfs/revel/components/molecules/search/searchinput/SearchInputVenueFeed` | `/Users/christianfirmi/Desktop/4/Github/bfs/revel/components/screens/public/personal/photos/` | `/Users/christianfirmi/Desktop/4/Github/bfs/revel/components/screens/search/components/SearchCard`;
  // prettier-ignore
  type DynamicRoutes<T extends string> = `/(app)/public/personal/${SingleRoutePart<T>}` | `/public/personal/${SingleRoutePart<T>}` | `/(app)/public/venue/${SingleRoutePart<T>}` | `/public/venue/${SingleRoutePart<T>}`;
  // prettier-ignore
  type DynamicRouteTemplate = `/(app)/public/personal/[profileid]` | `/(app)/public/venue/[profileid]`;

  type RelativePathString = `./${string}` | `../${string}` | '..';
  type AbsoluteRoute = DynamicRouteTemplate | StaticRoutes;
  type ExternalPathString = `http${string}`;
  type ExpoRouterRoutes = DynamicRouteTemplate | StaticRoutes | RelativePathString;
  type AllRoutes = ExpoRouterRoutes | ExternalPathString;

  /****************
   * Route Utils  *
   ****************/

  type SearchOrHash = `?${string}` | `#${string}`;

  /**
   * Return only the RoutePart of a string. If the string has multiple parts return never
   *
   * string   | type
   * ---------|------
   * 123      | 123
   * /123/abc | never
   * 123?abc  | never
   * ./123    | never
   * /123     | never
   * 123/../  | never
   */
  type SingleRoutePart<S extends string> = S extends `${string}/${string}`
    ? never
    : S extends `${string}${SearchOrHash}`
    ? never
    : S extends ''
    ? never
    : S;

  /**
   * Return only the CatchAll router part. If the string has search parameters or a hash return never
   */
  type CatchAllRoutePart<S extends string> = S extends `${string}${SearchOrHash}`
    ? never
    : S extends ''
    ? never
    : S;

  // type OptionalCatchAllRoutePart<S extends string> = S extends `${string}${SearchOrHash}` ? never : S

  /**
   * Return the name of a route parameter
   * '[test]'    -> 'test'
   * 'test'      -> never
   * '[...test]' -> '...test'
   */
  type IsParameter<Part> = Part extends `[${infer ParamName}]` ? ParamName : never;

  /**
   * Return a union of all parameter names. If there are no names return never
   *
   * /[test]         -> 'test'
   * /[abc]/[...def] -> 'abc'|'...def'
   */
  type ParameterNames<Path> = Path extends `${infer PartA}/${infer PartB}`
    ? IsParameter<PartA> | ParameterNames<PartB>
    : IsParameter<Path>;

  /**
   * Returns all segements of a route.
   *
   * /(group)/123/abc/[id]/[...rest] -> ['(group)', '123', 'abc', '[id]', '[...rest]'
   */
  type RouteSegments<Path> = Path extends `${infer PartA}/${infer PartB}`
    ? PartA extends '' | '.'
      ? [...RouteSegments<PartB>]
      : [PartA, ...RouteSegments<PartB>]
    : Path extends ''
    ? []
    : [Path];

  /**
   * Returns a Record of the routes parameters as strings and CatchAll parameters as string[]
   *
   * /[id]/[...rest] -> { id: string, rest: string[] }
   * /no-params      -> {}
   */
  type RouteParams<Path> = {
    [Key in ParameterNames<Path> as Key extends `...${infer Name}`
      ? Name
      : Key]: Key extends `...${string}` ? string[] : string;
  };

  /**
   * Returns the search parameters for a route
   */
  export type SearchParams<T extends AllRoutes> = T extends DynamicRouteTemplate
    ? RouteParams<T>
    : T extends StaticRoutes
    ? never
    : Record<string, string>;

  /**
   * Route is mostly used as part of Href to ensure that a valid route is provided
   *
   * Given a dynamic route, this will return never. This is helpful for conditional logic
   *
   * /test         -> /test, /test2, etc
   * /test/[abc]   -> never
   * /test/resolve -> /test, /test2, etc
   *
   * Note that if we provide a value for [abc] then the route is allowed
   *
   * This is named Route to prevent confusion, as users they will often see it in tooltips
   */
  export type Route<T> = T extends DynamicRouteTemplate
    ? never
    :
        | StaticRoutes
        | RelativePathString
        | ExternalPathString
        | (T extends DynamicRoutes<infer _> ? T : never);

  /*********
   * Href  *
   *********/

  export type Href<T extends string> = Route<T> | HrefObject<T>;

  export type HrefObject<T = AllRoutes> = T extends DynamicRouteTemplate
    ? { pathname: T; params: RouteParams<T> }
    : T extends Route<T>
    ? { pathname: Route<T>; params?: never }
    : never;

  /***********************
   * Expo Router Exports *
   ***********************/

  export type Router = {
    /** Navigate to the provided href. */
    push: <T extends string>(href: Href<T>) => void;
    /** Navigate to route without appending to the history. */
    replace: <T extends string>(href: Href<T>) => void;
    /** Go back in the history. */
    back: () => void;
    /** Update the current route query params. */
    setParams: <T extends string = ''>(
      params?: T extends '' ? Record<string, string> : RouteParams<T>
    ) => void;
  };

  /************
   * <Link /> *
   ************/
  export interface LinkProps<T extends string> extends OriginalLinkProps {
    href: T extends DynamicRouteTemplate ? HrefObject<T> : Href<T>;
  }

  export interface LinkComponent {
    <T extends string>(props: React.PropsWithChildren<LinkProps<T>>): JSX.Element;
    /** Helper method to resolve an Href object into a string. */
    resolveHref: <T extends string>(href: Href<T>) => string;
  }

  export const Link: LinkComponent;

  /************
   * Hooks *
   ************/
  export function useRouter(): Router;
  export function useLocalSearchParams<
    T extends DynamicRouteTemplate | StaticRoutes | RelativePathString
  >(): SearchParams<T>;
  export function useSearchParams<
    T extends AllRoutes | SearchParams<DynamicRouteTemplate>
  >(): T extends AllRoutes ? SearchParams<T> : T;

  export function useGlobalSearchParams<
    T extends AllRoutes | SearchParams<DynamicRouteTemplate>
  >(): T extends AllRoutes ? SearchParams<T> : T;

  export function useSegments<
    T extends AbsoluteRoute | RouteSegments<AbsoluteRoute> | RelativePathString
  >(): T extends AbsoluteRoute ? RouteSegments<T> : T extends string ? string[] : T;
}
