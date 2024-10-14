import { Box } from "#/src/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import TabBarIcon from "#/src/components/atoms/TabBarIcon";
import { TabProps } from "#/src/components/atoms/TabBarIcon";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemeReactiveVar } from "#/reactive";
import { MotiPressable } from "moti/interactions";
import { useMemo } from "react";

const MessageTab = (props: TabProps) => {
  const rTheme = useReactiveVar(ThemeReactiveVar);
  return (
    <>
      <TabBarIcon
        icon={
          <Ionicons
            style={{
              zIndex: 100,
              justifyContent: "center",
            }}
            size={25}
            name={
              !props.focused
                ? "chatbubble-ellipses-outline"
                : "chatbubble-ellipses-sharp"
            }
            color={
              !props.focused
                ? rTheme.colorScheme === "dark"
                  ? "white"
                  : "black"
                : props.color
            }
          />
        }
      />
      <Box
        className={` ${false ? "bg-red-500" : "bg-transparent"} h-[4.25px] w-[4.25px] rounded-full`}
      />
    </>
  );
};

export default MessageTab;
