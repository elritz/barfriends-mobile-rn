import { Button, ButtonText } from "#/src/components/ui/button";
import { useReactiveVar } from "@apollo/client";
import { PermissionForegroundLocationReactiveVar } from "#/reactive";
import { useRouter } from "expo-router";

export default function PermissionButtonSearchAreaLocation() {
  const route = useRouter();
  const rPermissionLocationVar = useReactiveVar(
    PermissionForegroundLocationReactiveVar,
  );

  const _press = async () => {
    rPermissionLocationVar?.granted
      ? route.push({
          pathname: "/(app)/searcharea/",
        })
      : route.push({
          pathname: "/(app)/permission/foregroundlocation",
        });
  };

  return (
    <Button
      onPress={async () => await _press()}
      className="mt-4 w-[95%] rounded-md"
    >
      <ButtonText className="text-lg font-bold uppercase">CONTINUE</ButtonText>
    </Button>
  );
}
