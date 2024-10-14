import { VStack } from "#/src/components/ui/vstack";
import { Box } from "#/src/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import ChevronBackArrow from "#/src/components/atoms/ChevronBackArrow";
import SearchInput from "#/src/components/molecules/searchinput/SearchInput";
import SearchInputSearchArea from "#/src/components/molecules/searchinput/SearchInputSearchArea";
import { SEARCH_BAR_HEIGHT } from "#/src/constants/ReactNavigationConstants";
import { PlaceType } from "#/types/preferences";
import { SearchAreaReactiveVar, ThemeReactiveVar } from "#/reactive";
import { Stack } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { Platform, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { memo, useEffect, useMemo } from "react";

export type HorizontalCityItemProps = {
  countryCode: string;
  latitude: string;
  longitude: string;
  name: string;
  stateCode: string;
};
export type HorizontalStateItemProps = {
  countryCode: string;
  isoCode: string;
  latitude: string;
  longitude: string;
  name: string;
};

export type HorizontalCountryItemProps = {
  currency: string;
  flag?: string;
  isoCode: string;
  latitude: string;
  longitude: string;
  name: string;
  phonecode: string;
  timezones: Timezone[];
};

type Timezone = {
  abbreviation: string;
  gmtOffset: string;
  gmtOffsetName: string;
  tzName: string;
  zoneName: string;
};

export type Form = {
  country: PlaceType;
  state: PlaceType;
  city: PlaceType;
  done: boolean;
};

export default function _layout() {
  const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar);
  const rTheme = useReactiveVar(ThemeReactiveVar);
  const insets = useSafeAreaInsets();
  const HEADER_HEIGHT = SEARCH_BAR_HEIGHT + 15;
  const h = insets.top + HEADER_HEIGHT;

  const methods = useForm<Form>({
    defaultValues: {
      ...rSearchAreaVar.searchArea,
      done: false,
    },
  });

  useEffect(() => {
    if (
      rSearchAreaVar.searchArea.country.name !==
        methods.getValues("country.name") &&
      methods.getValues("done")
    ) {
      methods.reset(rSearchAreaVar.searchArea);
      methods.setValue("done", false);
    }
  }, [rSearchAreaVar]);

  return (
    <FormProvider {...methods}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "Search Area",
          headerLeft: () => {
            return <ChevronBackArrow />;
          },
        }}
      >
        <Stack.Screen
          name={"index"}
          options={{
            contentStyle: {
              // backgroundColor: rTheme.colorScheme === 'dark' ? 'black' : 'white',
            },
          }}
        />
        <Stack.Screen name={"searchh3recommendation"} />
        <Stack.Screen
          name={"searchcountry"}
          options={{
            animation: "fade",
            headerShown: true,
            headerTransparent: true,
            header: () => {
              return (
                <BlurView
                  style={{
                    paddingTop: insets.top,
                  }}
                  intensity={70}
                  tint={rTheme.colorScheme === "light" ? "light" : "dark"}
                >
                  <VStack className={`justify-start`}>
                    <SearchInputSearchArea placeholder="Search countries" />
                  </VStack>
                </BlurView>
              );
            },
          }}
        />
        <Stack.Screen
          name={"searchcountrystate"}
          options={{
            animation: "fade",
            headerShown: true,
            headerTransparent: true,
            header: () => {
              return (
                <BlurView
                  style={{
                    paddingTop: insets.top,
                  }}
                  intensity={70}
                  tint={rTheme.colorScheme === "light" ? "light" : "dark"}
                >
                  <VStack className={`justify-start`}>
                    <SearchInputSearchArea placeholder="Search states" />
                  </VStack>
                </BlurView>
              );
            },
          }}
        />
        <Stack.Screen
          name={"searchstatecities"}
          options={{
            animation: "fade",
            headerShown: true,
            headerTransparent: true,
            header: () => {
              return (
                <BlurView
                  style={{
                    paddingTop: insets.top,
                  }}
                  intensity={70}
                  tint={rTheme.colorScheme === "light" ? "light" : "dark"}
                >
                  <VStack className={`justify-start`}>
                    <SearchInputSearchArea placeholder="Search cities" />
                  </VStack>
                </BlurView>
              );
            },
          }}
        />
      </Stack>
    </FormProvider>
  );
}
