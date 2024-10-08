import NavigationDragIcon from "#/src/components/atoms/NavigationDragIcon";
import { Stack } from "expo-router";

export default () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerTitle: () => <NavigationDragIcon />,
        headerLeft: () => null,
      }}
    >
      <Stack.Screen name={"networkinformation"} />
      <Stack.Screen name={"foregroundlocation"} />
      <Stack.Screen name={"backgroundlocation"} />
      <Stack.Screen name={"medialibrary"} />
      <Stack.Screen name={"notifications"} />
      <Stack.Screen name={"camera"} />
      <Stack.Screen name={"microphone"} />
    </Stack>
  );
};
