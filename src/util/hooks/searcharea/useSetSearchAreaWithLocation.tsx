import { LOCAL_STORAGE_SEARCH_AREA } from "#/src/constants/StorageConstants";
import { LocalStoragePreferenceSearchAreaType } from "#/types/preferences";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CurrentLocationReactiveVar,
  PermissionForegroundLocationReactiveVar,
  SearchAreaReactiveVar,
} from "#/reactive";
import * as IntentLauncher from "expo-intent-launcher";
import * as Location from "expo-location";
import { Alert, Linking, Platform } from "react-native";

const useSetSearchAreaWithLocation = async () => {
  const status = await Location.getForegroundPermissionsAsync();
  const rSearchAreaVar = SearchAreaReactiveVar();
  const rPermissionLocationVar = PermissionForegroundLocationReactiveVar();

  const useLocationToSetSearchArea = async (): Promise<boolean> => {
    const getLastKnowPosition = await Location.getLastKnownPositionAsync({
      requiredAccuracy: 50,
      maxAge: 1200000,
    });

    if (getLastKnowPosition) {
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: getLastKnowPosition.coords.latitude,
        longitude: getLastKnowPosition.coords.longitude,
      });

      const valueSearchArea: LocalStoragePreferenceSearchAreaType = {
        ...rSearchAreaVar,
        useCurrentLocation: true,
        searchArea: {
          country: {
            name: String(reverseGeocode[0].country),
            isoCode: String(reverseGeocode[0].isoCountryCode),
            coords: {
              latitude: getLastKnowPosition.coords.latitude,
              longitude: getLastKnowPosition.coords.longitude,
            },
          },
          state: {
            name: String(reverseGeocode[0].region),
            isoCode: String(reverseGeocode[0].region),
            coords: {
              latitude: getLastKnowPosition.coords.latitude,
              longitude: getLastKnowPosition.coords.longitude,
            },
          },
          city: {
            name: String(reverseGeocode[0].city),
            isoCode: "",
            coords: {
              latitude: getLastKnowPosition.coords.latitude,
              longitude: getLastKnowPosition.coords.longitude,
            },
          },
          coords: {
            latitude: getLastKnowPosition.coords.latitude,
            longitude: getLastKnowPosition.coords.longitude,
          },
        },
        // kRing: {
        // 	distance: 30,
        // 	value: 3,
        // },
      };

      const newSearchArea = JSON.stringify(valueSearchArea);

      CurrentLocationReactiveVar({
        current: {
          ...getLastKnowPosition,
        },
        reverseGeocoded: reverseGeocode[0],
      });
      SearchAreaReactiveVar({
        ...valueSearchArea,
      });

      await AsyncStorage.setItem(LOCAL_STORAGE_SEARCH_AREA, newSearchArea);

      return true;
    } else {
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.LocationAccuracy.High,
      });

      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      const valueSearchArea: LocalStoragePreferenceSearchAreaType = {
        ...rSearchAreaVar,
        useCurrentLocation: true,
        searchArea: {
          country: {
            name: String(reverseGeocode[0].country),
            isoCode: String(reverseGeocode[0].isoCountryCode),
            coords: {
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
            },
          },
          state: {
            name: String(reverseGeocode[0].region),
            isoCode: String(reverseGeocode[0].region),
            coords: {
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
            },
          },
          city: {
            name: String(reverseGeocode[0].city),
            isoCode: "",
            coords: {
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
            },
          },
          coords: {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          },
        },
      };

      const newSearchArea = JSON.stringify(valueSearchArea);

      CurrentLocationReactiveVar({
        current: {
          ...currentLocation,
        },
        reverseGeocoded: reverseGeocode[0],
      });
      SearchAreaReactiveVar({
        ...valueSearchArea,
      });

      await AsyncStorage.setItem(LOCAL_STORAGE_SEARCH_AREA, newSearchArea);

      return true;
    }
  };

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Location Permission Status",
      `Currently the location permission is ${rPermissionLocationVar?.status}. Go to settings to change this for Barfriends.`,
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Settings", onPress: () => handleOpenPhoneSettings() },
      ],
    );

  const handleOpenPhoneSettings = async () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings://");
    } else {
      IntentLauncher.startActivityAsync(
        IntentLauncher.ActivityAction.LOCATION_SOURCE_SETTINGS,
      );
    }
  };

  if (status.granted) {
    return useLocationToSetSearchArea();
  } else if (status.canAskAgain) {
    const status = await Location.requestForegroundPermissionsAsync();
    PermissionForegroundLocationReactiveVar(status);
    if (status.granted) {
      return useLocationToSetSearchArea();
    } else {
      createTwoButtonAlert();
    }
  }
};

export default useSetSearchAreaWithLocation;
