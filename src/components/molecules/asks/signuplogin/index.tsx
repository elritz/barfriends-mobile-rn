import { Divider } from "#/src/components/ui/divider";
import { Heading } from "#/src/components/ui/heading";
import { Pressable } from "#/src/components/ui/pressable";
import { Button, ButtonText } from "#/src/components/ui/button";
import { Text } from "#/src/components/ui/text";
import { VStack } from "#/src/components/ui/vstack";
import DeviceManagerProfiles from "#/src/components/organisms/list/DeviceManagerProfiles";
import GetSignInUpText from "#/src/util/helpers/data/SignupinText";
import { router, useRouter } from "expo-router";

const text = GetSignInUpText();

type Props = {
  signupTextId?: number;
};
export default (props: Props) => {
  const _pressToLogin = () => {
    router.push({
      pathname: "/(credential)/logincredentialstack/authenticator",
    });
  };
  const _pressToSignup = () => {
    router.push({
      pathname: "/(credential)/personalcredentialstack/getstarted",
    });
  };

  return (
    <VStack space="lg">
      <VStack className="items-center">
        <Heading
          numberOfLines={3}
          ellipsizeMode="tail"
          adjustsFontSizeToFit
          minimumFontScale={0.5}
          className="w-[265px] self-center pb-2 text-center text-xl font-black uppercase"
        >
          {text[props.signupTextId || 1].title}
        </Heading>
        <Text
          allowFontScaling
          className="self-center text-center text-lg font-bold"
        >
          {/* {text[props.signupTextId ?? 1].subTitle} */}
          Cool slogans here
        </Text>
        <Text className="text-sm font-bold text-coolGray-500">2 min</Text>
      </VStack>
      <VStack space={"md"} className="items-center">
        <Button
          onPress={() =>
            router.replace({
              pathname: "/(credential)/personalcredentialstack/getstarted",
            })
          }
          className="w-[85%] rounded-md"
        >
          <ButtonText className="text-lg font-bold">Sign up</ButtonText>
        </Button>
        <Button
          variant={"link"}
          onPress={() =>
            router.push({
              pathname: "/(credential)/logincredentialstack/authenticator",
            })
          }
          className="w-[90%]"
        >
          <Text className="self-center text-lg font-bold">Log in</Text>
        </Button>
      </VStack>
      <DeviceManagerProfiles />
    </VStack>
  );
};
