import { Box } from "#/src/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import TabBarIcon from "#/src/components/atoms/TabBarIcon";
import { TabProps } from "#/src/components/atoms/TabBarIcon";
import { Ionicons } from "@expo/vector-icons";
import { ThemeReactiveVar } from "#/reactive";

const VenueFeedTab = (props: TabProps) => {
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
            size={23}
            name={!props.focused ? "grid-outline" : "grid"}
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

export default VenueFeedTab;
