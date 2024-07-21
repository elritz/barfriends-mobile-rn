import { useReactiveVar } from "@apollo/client";
import SearchAccounts from "#/components/screens/search/textsearchtabs/SearchAccounts";
import SearchVenues from "#/components/screens/search/textsearchtabs/SearchVenues";
import { ThemeReactiveVar } from "#/reactive";
import useContentInsets from "#/util/hooks/useContentInsets";
import { useState } from "react";
import { Pressable, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Text } from "react-native";
import { View } from "react-native";

const renderScene = SceneMap({
  second: SearchAccounts,
  third: SearchVenues,
});

export default function searchresulttabs() {
  const contentInsets = useContentInsets();

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
                borderBottomColor: index === i ? "black" : "transparent",
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
    // return (
    // 	<TabBar
    // 		{...props}
    // 		indicatorStyle={{
    // 			backgroundColor: rTheme.theme?.gluestack.tokens.colors.primary500,
    // 		}}
    // 		style={{
    // 			flexDirection: 'row',
    // 			backgroundColor:
    // 				rTheme.colorScheme === 'dark'
    // 					? rTheme.theme?.gluestack.tokens.colors.light900
    // 					: rTheme.theme?.gluestack.tokens.colors.light50,
    // 		}}
    // 		renderLabel={({ route, focused, color }) => {
    // 			return (
    // 				<Text style={{ margin: 8, fontWeight: focused ? '800' : '500', color: 'black' }}>{route.title}</Text>
    // 			)
    // 		}
    // 		}
    // 	/>
    // )
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
