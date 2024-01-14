/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/ban-types */
declare module "expo-router" {
  import type { LinkProps as OriginalLinkProps } from 'expo-router/build/link/Link';
  import type { Router as OriginalRouter } from 'expo-router/src/types';
  export * from 'expo-router/build';

  // prettier-ignore
  type StaticRoutes = `/` | `/(app)/_layout` | `/_layout` | `/(app)/conversation` | `/conversation` | `/(app)/explore/_layout` | `/explore/_layout` | `/(app)/explore/` | `/explore/` | `/(app)/explore` | `/(app)/explore/searchresults` | `/explore/searchresults` | `/(app)/explore/searchtext` | `/explore/searchtext` | `/(app)/friendslist` | `/friendslist` | `/(app)/hometab/_layout` | `/hometab/_layout` | `/(app)/hometab/developmentstack/_layout` | `/hometab/developmentstack/_layout` | `/(app)/hometab/developmentstack/asks` | `/hometab/developmentstack/asks` | `/(app)/hometab/developmentstack/` | `/hometab/developmentstack/` | `/(app)/hometab/developmentstack` | `/(app)/hometab/developmentstack/permissionmodals` | `/hometab/developmentstack/permissionmodals` | `/(app)/hometab/developmentstack/preferences` | `/hometab/developmentstack/preferences` | `/(app)/hometab/developmentstack/theme` | `/hometab/developmentstack/theme` | `/(app)/hometab/messagestack/_layout` | `/hometab/messagestack/_layout` | `/(app)/hometab/messagestack/` | `/hometab/messagestack/` | `/(app)/hometab/messagestack` | `/(app)/hometab/profilestack/UserProfileScreen` | `/hometab/profilestack/UserProfileScreen` | `/(app)/hometab/profilestack/_layout` | `/hometab/profilestack/_layout` | `/(app)/hometab/tonight` | `/hometab/tonight` | `/(app)/hometab/venuefeed` | `/hometab/venuefeed` | `/(app)/modal/Emojimood` | `/modal/Emojimood` | `/(app)/modal/MediaLibrary` | `/modal/MediaLibrary` | `/(app)/modal/_layout` | `/modal/_layout` | `/(app)/modal/asks/_layout` | `/modal/asks/_layout` | `/(app)/modal/asks/backgroundlocationnextask` | `/modal/asks/backgroundlocationnextask` | `/(app)/modal/asks/foregroundlocationnextask` | `/modal/asks/foregroundlocationnextask` | `/(app)/modal/asks/notificationnextask` | `/modal/asks/notificationnextask` | `/(app)/modal/devicemanager/DeviceManager` | `/modal/devicemanager/DeviceManager` | `/(app)/modal/devicemanager/_layout` | `/modal/devicemanager/_layout` | `/(app)/newconversation` | `/newconversation` | `/(app)/permission/_layout` | `/permission/_layout` | `/(app)/permission/backgroundlocation` | `/permission/backgroundlocation` | `/(app)/permission/camera` | `/permission/camera` | `/(app)/permission/contacts` | `/permission/contacts` | `/(app)/permission/foregroundlocation` | `/permission/foregroundlocation` | `/(app)/permission/medialibrary` | `/permission/medialibrary` | `/(app)/permission/microphone` | `/permission/microphone` | `/(app)/permission/networkinformation` | `/permission/networkinformation` | `/(app)/permission/notifications` | `/permission/notifications` | `/(app)/public/_layout` | `/public/_layout` | `/(app)/public/contacts` | `/public/contacts` | `/(app)/public/personal/_layout` | `/public/personal/_layout` | `/(app)/public/venue/_layout` | `/public/venue/_layout` | `/(app)/searcharea/_layout` | `/searcharea/_layout` | `/(app)/searcharea/` | `/searcharea/` | `/(app)/searcharea` | `/(app)/searcharea/searchcountry` | `/searcharea/searchcountry` | `/(app)/searcharea/searchcountrystate` | `/searcharea/searchcountrystate` | `/(app)/searcharea/searchh3recommendation` | `/searcharea/searchh3recommendation` | `/(app)/searcharea/searchstatecities` | `/searcharea/searchstatecities` | `/(app)/settings/_layout` | `/settings/_layout` | `/(app)/settings/appearancesettingsscreen` | `/settings/appearancesettingsscreen` | `/(app)/settings/` | `/settings/` | `/(app)/settings` | `/(app)/settings/notificationssettingsscreen` | `/settings/notificationssettingsscreen` | `/(app)/settings/profilesettings/_layout` | `/settings/profilesettings/_layout` | `/(app)/settings/profilesettings/personal/_layout` | `/settings/profilesettings/personal/_layout` | `/(app)/settings/profilesettings/personal/birthday` | `/settings/profilesettings/personal/birthday` | `/(app)/settings/profilesettings/personal/currenttown` | `/settings/profilesettings/personal/currenttown` | `/(app)/settings/profilesettings/personal/description` | `/settings/profilesettings/personal/description` | `/(app)/settings/profilesettings/personal/fullname` | `/settings/profilesettings/personal/fullname` | `/(app)/settings/profilesettings/personal/gender` | `/settings/profilesettings/personal/gender` | `/(app)/settings/profilesettings/personal/hometown` | `/settings/profilesettings/personal/hometown` | `/(app)/settings/profilesettings/personal/` | `/settings/profilesettings/personal/` | `/(app)/settings/profilesettings/personal` | `/(app)/settings/profilesettings/personal/interests` | `/settings/profilesettings/personal/interests` | `/(app)/settings/profilesettings/personal/lookingfor` | `/settings/profilesettings/personal/lookingfor` | `/(app)/settings/profilesettings/personal/relationship` | `/settings/profilesettings/personal/relationship` | `/(app)/settings/profilesettings/personal/username` | `/settings/profilesettings/personal/username` | `/(app)/settings/profilesettings/venue/_layout` | `/settings/profilesettings/venue/_layout` | `/(app)/settings/profilesettings/venue/` | `/settings/profilesettings/venue/` | `/(app)/settings/profilesettings/venue` | `/(app)/settings/securitysettingsscreen` | `/settings/securitysettingsscreen` | `/(credential)/_layout` | `/(credential)/logincredentialstack/_layout` | `/logincredentialstack/_layout` | `/(credential)/logincredentialstack/authenticator` | `/logincredentialstack/authenticator` | `/(credential)/logincredentialstack/confirmationcode` | `/logincredentialstack/confirmationcode` | `/(credential)/logincredentialstack/devicemanager` | `/logincredentialstack/devicemanager` | `/(credential)/logincredentialstack/loginpassword` | `/logincredentialstack/loginpassword` | `/(credential)/personalcredentialstack/_layout` | `/personalcredentialstack/_layout` | `/(credential)/personalcredentialstack/birthday` | `/personalcredentialstack/birthday` | `/(credential)/personalcredentialstack/confirmationcode` | `/personalcredentialstack/confirmationcode` | `/(credential)/personalcredentialstack/create` | `/personalcredentialstack/create` | `/(credential)/personalcredentialstack/email` | `/personalcredentialstack/email` | `/(credential)/personalcredentialstack/getstarted` | `/personalcredentialstack/getstarted` | `/(credential)/personalcredentialstack/name` | `/personalcredentialstack/name` | `/(credential)/personalcredentialstack/password` | `/personalcredentialstack/password` | `/(credential)/personalcredentialstack/phone` | `/personalcredentialstack/phone` | `/(credential)/personalcredentialstack/photo` | `/personalcredentialstack/photo` | `/(credential)/personalcredentialstack/username` | `/personalcredentialstack/username` | `/(credential)/venuecredentialstack/_layout` | `/venuecredentialstack/_layout` | `/(credential)/venuecredentialstack/birthday` | `/venuecredentialstack/birthday` | `/(credential)/venuecredentialstack/confirmationcode` | `/venuecredentialstack/confirmationcode` | `/(credential)/venuecredentialstack/create` | `/venuecredentialstack/create` | `/(credential)/venuecredentialstack/email` | `/venuecredentialstack/email` | `/(credential)/venuecredentialstack/getstarted` | `/venuecredentialstack/getstarted` | `/(credential)/venuecredentialstack/name` | `/venuecredentialstack/name` | `/(credential)/venuecredentialstack/password` | `/venuecredentialstack/password` | `/(credential)/venuecredentialstack/phone` | `/venuecredentialstack/phone` | `/(credential)/venuecredentialstack/photo` | `/venuecredentialstack/photo` | `/(credential)/venuecredentialstack/username` | `/venuecredentialstack/username` | `/(error)/` | `/(error)` | `/(information)/_layout` | `/(information)/latestprivacyservicetoptab` | `/latestprivacyservicetoptab` | `/(information)/latestprivacytermsservicetabstack/_layout` | `/latestprivacytermsservicetabstack/_layout` | `/(information)/latestprivacytermsservicetabstack/privacy` | `/latestprivacytermsservicetabstack/privacy` | `/(information)/latestprivacytermsservicetabstack/services` | `/latestprivacytermsservicetabstack/services` | `/(information)/updatelatestprivacytermsservice` | `/updatelatestprivacytermsservice`;
  // prettier-ignore
  type DynamicRoutes<T extends string> = `/(app)/modal/devicemanager/${SingleRoutePart<T>}` | `/modal/devicemanager/${SingleRoutePart<T>}` | `/(app)/public/personal/${SingleRoutePart<T>}` | `/public/personal/${SingleRoutePart<T>}` | `/(app)/public/venue/${SingleRoutePart<T>}` | `/public/venue/${SingleRoutePart<T>}`;
  // prettier-ignore
  type DynamicRouteTemplate = `/(app)/modal/devicemanager/[profileid]` | `/(app)/public/personal/[username]` | `/(app)/public/venue/[username]`;

  type RelativePathString = `./${string}` | `../${string}` | '..';
  type AbsoluteRoute = DynamicRouteTemplate | StaticRoutes;
  type ExternalPathString = `http${string}`;
  type ExpoRouterRoutes = DynamicRouteTemplate | StaticRoutes | RelativePathString;
  type AllRoutes = ExpoRouterRoutes | ExternalPathString;

  /****************
   * Route Utils  *
   ****************/

  type SearchOrHash = `?${string}` | `#${string}`;
  type UnknownInputParams = Record<string, string | number | (string | number)[]>;
  type UnknownOutputParams = Record<string, string | string[]>;

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
    : S extends `(${string})`
    ? never
    : S extends `[${string}]`
    ? never
    : S;

  /**
   * Return only the CatchAll router part. If the string has search parameters or a hash return never
   */
  type CatchAllRoutePart<S extends string> = S extends `${string}${SearchOrHash}`
    ? never
    : S extends ''
    ? never
    : S extends `${string}(${string})${string}`
    ? never
    : S extends `${string}[${string}]${string}`
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
   * Returns a Record of the routes parameters as strings and CatchAll parameters
   *
   * There are two versions, input and output, as you can input 'string | number' but
   *  the output will always be 'string'
   *
   * /[id]/[...rest] -> { id: string, rest: string[] }
   * /no-params      -> {}
   */
  type InputRouteParams<Path> = {
    [Key in ParameterNames<Path> as Key extends `...${infer Name}`
      ? Name
      : Key]: Key extends `...${string}` ? (string | number)[] : string | number;
  } & UnknownInputParams;

  type OutputRouteParams<Path> = {
    [Key in ParameterNames<Path> as Key extends `...${infer Name}`
      ? Name
      : Key]: Key extends `...${string}` ? string[] : string;
  } & UnknownOutputParams;

  /**
   * Returns the search parameters for a route.
   */
  export type SearchParams<T extends AllRoutes> = T extends DynamicRouteTemplate
    ? OutputRouteParams<T>
    : T extends StaticRoutes
    ? never
    : UnknownOutputParams;

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
  export type Route<T> = T extends string
    ? T extends DynamicRouteTemplate
      ? never
      :
          | StaticRoutes
          | RelativePathString
          | ExternalPathString
          | (T extends `${infer P}${SearchOrHash}`
              ? P extends DynamicRoutes<infer _>
                ? T
                : never
              : T extends DynamicRoutes<infer _>
              ? T
              : never)
    : never;

  /*********
   * Href  *
   *********/

  export type Href<T> = T extends Record<'pathname', string> ? HrefObject<T> : Route<T>;

  export type HrefObject<
    R extends Record<'pathname', string>,
    P = R['pathname']
  > = P extends DynamicRouteTemplate
    ? { pathname: P; params: InputRouteParams<P> }
    : P extends Route<P>
    ? { pathname: Route<P> | DynamicRouteTemplate; params?: never | InputRouteParams<never> }
    : never;

  /***********************
   * Expo Router Exports *
   ***********************/

  export type Router = Omit<OriginalRouter, 'push' | 'replace' | 'setParams'> & {
    /** Navigate to the provided href. */
    push: <T>(href: Href<T>) => void;
    /** Navigate to route without appending to the history. */
    replace: <T>(href: Href<T>) => void;
    /** Update the current route query params. */
    setParams: <T = ''>(params?: T extends '' ? Record<string, string> : InputRouteParams<T>) => void;
  };

  /** The imperative router. */
  export const router: Router;

  /************
   * <Link /> *
   ************/
  export interface LinkProps<T> extends OriginalLinkProps {
    href: Href<T>;
  }

  export interface LinkComponent {
    <T>(props: React.PropsWithChildren<LinkProps<T>>): JSX.Element;
    /** Helper method to resolve an Href object into a string. */
    resolveHref: <T>(href: Href<T>) => string;
  }

  /**
   * Component to render link to another route using a path.
   * Uses an anchor tag on the web.
   *
   * @param props.href Absolute path to route (e.g. `/feeds/hot`).
   * @param props.replace Should replace the current route without adding to the history.
   * @param props.asChild Forward props to child component. Useful for custom buttons.
   * @param props.children Child elements to render the content.
   */
  export const Link: LinkComponent;
  
  /** Redirects to the href as soon as the component is mounted. */
  export const Redirect: <T>(
    props: React.PropsWithChildren<{ href: Href<T> }>
  ) => JSX.Element;

  /************
   * Hooks *
   ************/
  export function useRouter(): Router;

  export function useLocalSearchParams<
    T extends AllRoutes | UnknownOutputParams = UnknownOutputParams
  >(): T extends AllRoutes ? SearchParams<T> : T;

  /** @deprecated renamed to `useGlobalSearchParams` */
  export function useSearchParams<
    T extends AllRoutes | UnknownOutputParams = UnknownOutputParams
  >(): T extends AllRoutes ? SearchParams<T> : T;

  export function useGlobalSearchParams<
    T extends AllRoutes | UnknownOutputParams = UnknownOutputParams
  >(): T extends AllRoutes ? SearchParams<T> : T;

  export function useSegments<
    T extends AbsoluteRoute | RouteSegments<AbsoluteRoute> | RelativePathString
  >(): T extends AbsoluteRoute ? RouteSegments<T> : T extends string ? string[] : T;
}
