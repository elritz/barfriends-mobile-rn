import LogoTransparent from "#/assets/images/company/LogoTransparent";
import ChevronBackArrow from "#/src/components/atoms/ChevronBackArrow";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack
      initialRouteName="getstarted"
      screenOptions={{
        headerBackground: () => <></>,
      }}
    >
      <Stack.Screen
        name={"getstarted"}
        options={{
          title: "",
          headerTransparent: true,
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
      <Stack.Screen
        name={"phone"}
        options={{
          headerTitle: () => <LogoTransparent height={30} width={192} />,
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
      <Stack.Screen
        name={"email"}
        options={{
          headerTitle: () => <LogoTransparent height={30} width={192} />,
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
      <Stack.Screen
        name={"confirmationcode"}
        options={{
          headerTitle: () => <LogoTransparent height={30} width={192} />,
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
      <Stack.Screen
        name={"birthday"}
        options={{
          headerTitle: () => <LogoTransparent height={30} width={192} />,
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
      <Stack.Screen
        name={"name"}
        options={{
          headerTitle: () => <LogoTransparent height={30} width={192} />,
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
      <Stack.Screen
        name={"password"}
        options={{
          headerTitle: () => <LogoTransparent height={30} width={192} />,
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
      <Stack.Screen
        name={"username"}
        options={{
          headerTitle: () => <LogoTransparent height={30} width={192} />,
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
      <Stack.Screen
        name={"create"}
        options={{
          animation: "fade",
          // headerTitle: () => <LogoTransparent height={30} width={192} />,
          headerTitle: "",
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
    </Stack>
  );
}
