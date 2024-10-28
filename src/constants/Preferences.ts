import {Contact} from 'expo-contacts'
import {
  Accuracy,
  LocationPermissionResponse,
  PermissionResponse,
  PermissionStatus,
} from 'expo-location'
import {NetworkState, NetworkStateType} from 'expo-network'
import {NotificationPermissionsStatus} from 'expo-notifications'
import {DateTime} from 'luxon'

import {TermsServiceType} from '#/types/app'
import {
  DefaultPreferenceToPermissionType,
  LocalStorageInformationJoinVenueType,
  LocalStoragePreferenceSearchAreaType,
  LocalStoragePreferenceSystemsOfUnitsType,
  LocalStoragePreferenceThemeType,
  LocationType,
  ServerNetworkType,
  SystemsOfUnits,
} from '#/types/preferences'

export const NowPreferencePermissionInitialState: DefaultPreferenceToPermissionType =
  {
    dateLastShown: DateTime.now(),
    dateToShowAgain: DateTime.now(),
    numberOfTimesDismissed: 0,
    canShowAgain: true,
  }

export const TomorrowPreferencePermissionInitialState: DefaultPreferenceToPermissionType =
  {
    dateLastShown: DateTime.now(),
    dateToShowAgain: DateTime.now().plus({days: 1}),
    numberOfTimesDismissed: 0,
    canShowAgain: true,
  }

export const DaysPreferencePermissionInitialState: DefaultPreferenceToPermissionType =
  {
    dateLastShown: DateTime.now(),
    dateToShowAgain: DateTime.now().plus({days: 5}),
    numberOfTimesDismissed: 0,
    canShowAgain: true,
  }

export const HalfMonthPreferencePermissionInitialState: DefaultPreferenceToPermissionType =
  {
    dateLastShown: DateTime.now(),
    dateToShowAgain: DateTime.now().plus({days: 15}),
    numberOfTimesDismissed: 0,
    canShowAgain: true,
  }
export const MonthsPreferencePermissionInitialState: DefaultPreferenceToPermissionType =
  {
    dateLastShown: DateTime.now(),
    dateToShowAgain: DateTime.now().plus({months: 1}),
    numberOfTimesDismissed: 0,
    canShowAgain: true,
  }

export const InitialStateJoiningInformationPreferencePermission: LocalStorageInformationJoinVenueType =
  {
    dateLastShown: DateTime.now(),
    dateToShowAgain: DateTime.now().plus({days: 5}),
    numberOfTimesDismissed: 0,
    canShowAgain: true,
  }

export const InitialStateSearchArea: LocalStoragePreferenceSearchAreaType = {
  useCurrentLocation: false,
  searchArea: {
    country: {
      coords: {
        latitude: 0,
        longitude: 0,
      },
      isoCode: '',
      name: '',
    },
    state: {
      coords: {
        latitude: 0,
        longitude: 0,
      },
      isoCode: '',
      name: '',
    },
    city: {
      coords: {
        latitude: 0,
        longitude: 0,
      },
      isoCode: '',
      name: '',
    },
    coords: {
      latitude: 0,
      longitude: 0,
    },
  },
  kRing: {
    value: 1,
    distance: 30,
  },
}

export const InitialStatePreferenceThemeColorScheme: LocalStoragePreferenceThemeType =
  {
    colorScheme: 'system',
  }

export const InitialStatePreferenceSystemsOfUnits: LocalStoragePreferenceSystemsOfUnitsType =
  {
    canShowAgain: true,
    numberOfTimesDismissed: 0,
    dateToShowAgain: DateTime.now(),
    dateLastShown: DateTime.now(),
    system: SystemsOfUnits.Metric,
  }

export const InitialStateTermsService: TermsServiceType = {
  update: false,
}

export const InitialStateLocation: LocationType = {
  watchPosition: {
    accuracy: Accuracy.Balanced,
    distanceInterval: 10,
    timeInterval: 5000,
  },
  current: {
    coords: {
      accuracy: null,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      latitude: 0,
      longitude: 0,
      speed: null,
    },
    timestamp: 0,
  },
  reverseGeocoded: {
    formattedAddress: null,
    city: null,
    country: null,
    district: null,
    isoCountryCode: null,
    streetNumber: null,
    name: null,
    postalCode: null,
    region: null,
    street: null,
    subregion: null,
    timezone: null,
  },
}

export const InitialStateDeviceNetwork: NetworkState = {
  isConnected: true,
  isInternetReachable: true,
  type: NetworkStateType.CELLULAR,
}

export const InitialStateServerNetwork: ServerNetworkType = {
  isConnected: true,
}

export const InitialStatePermissionCamera: PermissionResponse = {
  canAskAgain: false,
  expires: 'never',
  granted: false,
  status: PermissionStatus.UNDETERMINED,
}

export const InitialStatePermissionContacts: PermissionResponse = {
  canAskAgain: false,
  expires: 'never',
  granted: false,
  status: PermissionStatus.UNDETERMINED,
}

export const InitialStateContacts: Contact[] | null = []

export const InitialStateForegroundLocationPermission: LocationPermissionResponse =
  {
    canAskAgain: false,
    expires: 'never',
    granted: false,
    status: PermissionStatus.UNDETERMINED,
  }

export const InitialStateBackgroundLocationPermission: LocationPermissionResponse =
  {
    canAskAgain: false,
    expires: 'never',
    granted: false,
    status: PermissionStatus.UNDETERMINED,
  }

export const InitialStatePermissionMedia: PermissionResponse = {
  canAskAgain: false,
  expires: 'never',
  granted: false,
  status: PermissionStatus.UNDETERMINED,
}

export const InitialStatePermissionMicrophone: PermissionResponse = {
  canAskAgain: false,
  expires: 'never',
  granted: false,
  status: PermissionStatus.UNDETERMINED,
}

export const InitialStatePermissionNotifications: NotificationPermissionsStatus =
  {
    canAskAgain: false,
    expires: 'never',
    granted: false,
    status: PermissionStatus.UNDETERMINED,
    ios: {
      alertStyle: 0,
      allowsAlert: false,
      allowsAnnouncements: false,
      allowsBadge: false,
      allowsCriticalAlerts: null,
      allowsDisplayInCarPlay: null,
      allowsDisplayInNotificationCenter: true,
      allowsDisplayOnLockScreen: false,
      allowsPreviews: 2,
      allowsSound: false,
      providesAppNotificationSettings: true,
      status: 3,
    },
  }

export const InitalStateStorage = {
  information: {
    joinvenue: {
      name: 'Information Join Venue',
      ...InitialStateJoiningInformationPreferencePermission,
    },
  },
  preferences: {
    searcharea: {name: 'Preference Search Area', ...InitialStateSearchArea},
    theme: {
      name: 'Preference Theme Scheme',
      ...InitialStatePreferenceThemeColorScheme,
    },
    notification: {
      name: 'Preference Notifications',
      ...NowPreferencePermissionInitialState,
    },
    locationbackground: 'Preference Location Background',
    ...NowPreferencePermissionInitialState,
    locationforground: 'Preference Location Foreground',
    ...NowPreferencePermissionInitialState,
    systemunits: {
      name: 'Preference System Units',
      ...InitialStatePreferenceSystemsOfUnits,
    },
  },
}
