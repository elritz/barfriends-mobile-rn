import { VStack } from "#/components/ui/vstack";
import { Pressable } from "#/components/ui/pressable";
import { Icon, SlashIcon } from "#/components/ui/icon";
import { Heading } from "#/components/ui/heading";
import { Button, ButtonText } from "#/components/ui/button";
import { Box } from "#/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import { FontAwesome5 } from "@expo/vector-icons";
import { useGetSecureFriendQrCodeDataLazyQuery } from "#/graphql/generated";
import {
  AuthorizationReactiveVar,
  PermissionCameraReactiveVar,
  ThemeReactiveVar,
} from "#/reactive";
import { useDisclose } from "#/util/hooks/useDisclose";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";

const LOGO_COASTER = require("../../../../../../../assets/images/company/company_coaster.png");

type Props = {
  qrcodesize: number;
  logosize?: number;
  showIcon?: boolean;
  color?: string | undefined;
};

export default function QuickBarfriendCard({
  qrcodesize,
  logosize,
  showIcon,
  color,
}: Props) {
  const router = useRouter();
  const rTheme = useReactiveVar(ThemeReactiveVar);
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar);
  const rPermissionCamera = useReactiveVar(PermissionCameraReactiveVar);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [dataQR, setDataQR] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const [getSecureFriendCodeQrData, { data, loading, error }] =
    useGetSecureFriendQrCodeDataLazyQuery({
      onCompleted: (data) => {
        const dataQRString = JSON.stringify({
          dataHash: data.getSecureFriendQRCodeData,
          qrCodeProfileId: rAuthorizationVar?.Profile?.id,
        });
        setDataQR(dataQRString);
      },
      onError: (err) => {
        setRetryCount((prevCount) => prevCount + 1);
      },
    });

  useEffect(() => {
    getSecureFriendCodeQrData();
  }, []);

  if (loading) return null;

  if (error || !dataQR) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Icon as={SlashIcon} className="h-7 w-7 text-error-500" />
        <Heading className="leading-md text-center text-lg font-black">
          QR code not generated
        </Heading>
        <Button
          variant="link"
          onPress={() => getSecureFriendCodeQrData()}
          disabled={retryCount > 5}
        >
          <ButtonText>Refresh</ButtonText>
        </Button>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Pressable
        style={{ alignItems: "center", justifyContent: "center" }}
        onPress={() =>
          rPermissionCamera?.granted
            ? onOpen()
            : router.push({
                pathname: "/(app)/permission/camera",
              })
        }
      >
        <Box className="h-16 w-16 items-center justify-center rounded-md bg-primary-400">
          <FontAwesome5
            name={"user"}
            size={30}
            color={
              rTheme.colorScheme === "light"
                ? rTheme.theme?.gluestack.tokens.colors.light900
                : rTheme.theme?.gluestack.tokens.colors.light100
            }
          />
        </Box>
        <Heading className="leading-lg mt-3 text-center text-lg font-black uppercase">
          Fine Friends
        </Heading>
        <VStack className="flex-column mt-2 items-center justify-around"></VStack>
      </Pressable>
    </View>
  );
}
