import { Text } from "#/src/components/ui/text";
import { Heading } from "#/src/components/ui/heading";
import { Button } from "#/src/components/ui/button";
import { Box } from "#/src/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import { PermissionMediaReactiveVar } from "#/reactive";
import { useRouter } from "expo-router";
import { uniqueId } from "lodash";
import { AnimatePresence, MotiView } from "moti";

export default function MediaPermissionFullSection() {
  const router = useRouter();
  const rPermissionMediaVar = useReactiveVar(PermissionMediaReactiveVar);

  return (
    <AnimatePresence key={uniqueId()}>
      {!rPermissionMediaVar?.granted && (
        <MotiView
          from={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
          }}
        >
          <Box
            style={{
              width: "100%",
              alignItems: "center",
            }}
            className="bg-transparent"
          >
            <Heading
              style={{
                width: "100%",
                marginVertical: 10,
              }}
              className="text-lg"
            >
              Media Permission
            </Heading>
            <Text style={{ width: "100%" }} className="text-lg">
              Using your photos on your device.
            </Text>
            <Button
              onPress={() =>
                router.push({
                  pathname: "/(app)/permission/medialibrary",
                })
              }
              size={"sm"}
              className="mt-4 w-[85%]"
            >
              <Text className="text-sm font-bold">Use Current Location</Text>
            </Button>
          </Box>
        </MotiView>
      )}
    </AnimatePresence>
  );
}
