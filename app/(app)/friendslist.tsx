import { Input } from "#/src/components/ui/input";
import { Text } from "#/src/components/ui/text";
import { Button, ButtonIcon } from "#/src/components/ui/button";
import { AddIcon } from "#/src/components/ui/icon";
import { useReactiveVar } from "@apollo/client";
import { ThemeReactiveVar } from "#/reactive";
import { ScrollView } from "react-native";

export default function NewConversation() {
  const rTheme = useReactiveVar(ThemeReactiveVar);
  return (
    <>
      <Input
        variant="underlined"
        className="items-center border border-gray-300 px-4"
      >
        <Text className="mr-2 text-sm text-gray-400">To:</Text>
        <Input
          autoFocus
          borderWidth={"$0"}
          returnKeyType="default"
          underlineColorAndroid="transparent"
          keyboardAppearance={rTheme.colorScheme === "light" ? "light" : "dark"}
        />
        {/* EditIcon is imported from 'lucide-react-native' */}
        <Button
          size="sm"
          hitSlop={{
            top: 12,
            bottom: 12,
            left: 12,
            right: 12,
          }}
          onPress={() => {
            console.log("OPEN SECONDARY modal");
          }}
          className="h-5 w-5 rounded-full border border-primary-500 px-0"
        >
          <ButtonIcon as={AddIcon} />
        </Button>
      </Input>
      <ScrollView></ScrollView>
      <Text> NEW conversation</Text>
    </>
  );
}
