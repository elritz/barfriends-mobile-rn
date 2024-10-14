import { Button, ButtonText } from "#/src/components/ui/button";
import { useReactiveVar } from "@apollo/client";
import { PermissionNotificationReactiveVar } from "#/reactive";
import useSetSearchAreaWithLocation from "#/src/util/hooks/searcharea/useSetSearchAreaWithLocation";
import { useRouter } from "expo-router";

export default function SearchAreaLocationPermissionButton() {
  const router = useRouter();
  const rPermissionNotificationVar = useReactiveVar(
    PermissionNotificationReactiveVar,
  );

  const _press = async () => {
    rPermissionNotificationVar?.granted
      ? await useSetSearchAreaWithLocation()
      : router.push({
          pathname: "/(app)/permission/notifications",
        });
  };

  return (
    <Button
      variant="solid"
      onPress={async () => _press()}
      className="mt-15 w-[85%]"
    >
      <ButtonText>Continue</ButtonText>
    </Button>
  );
}
