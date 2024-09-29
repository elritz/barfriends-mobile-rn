import { Text } from "#/src/components/ui/text";
import { useReactiveVar } from "@apollo/client";
import SearchAccounts from "#/src/view/screens/search/textsearchtabs/SearchAccounts";
import SearchVenues from "#/src/view/screens/search/textsearchtabs/SearchVenues";
import { ThemeReactiveVar } from "#/reactive";
import useContentInsets from "#/src/util/hooks/useContentInsets";
import { useState } from "react";
import { View, Pressable, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const renderScene = SceneMap({
  second: SearchAccounts,
  third: SearchVenues,
});

export default function searchresulttabs() {
  const contentInsets = useContentInsets();
  const rTheme = useReactiveVar(ThemeReactiveVar);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    // { key: 'first', title: 'Top' },
    { key: "second", title: "Accounts" },
    { key: "third", title: "Venues" },
  ]);

  const renderTabBar = (props) => {
    return (
      <View
        style={{
          flexDirection: "row",
          paddingTop: 5,
          borderBottomColor: "red",
        }}
      >
        {props.navigationState.routes.map((route, i) => {
          return (
            <Pressable
              style={{
                flex: 1,
                alignItems: "center",
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor:
                  index === i
                    ? rTheme.colorScheme === "light"
                      ? "black"
                      : "white"
                    : "transparent",
              }}
              onPress={() => setIndex(i)}
            >
              <Text style={{ fontWeight: index === i ? "800" : "500" }}>
                {route.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      style={{
        top: contentInsets.top - 10,
      }}
    />
  );
}
