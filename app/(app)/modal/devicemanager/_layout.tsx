import LogoTransparent from "#/assets/images/company/LogoTransparent";
import ChevronBackArrow from "#/src/components/atoms/ChevronBackArrow";
import { Emojimood } from "#/graphql/generated";
import { Stack } from "expo-router";

export type FormType = {
  emojimood: Emojimood;
};

export default () => {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={"deviceprofilemanager"}
        options={{
          headerShown: true,
          headerTitle: () => <LogoTransparent height={30} width={192} />,
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
      <Stack.Screen
        name={"[profileid]"}
        options={{
          headerShown: true,
          headerTitle: () => <LogoTransparent height={30} width={192} />,
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
    </Stack>
  );
};
