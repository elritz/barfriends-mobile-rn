import { Text } from "#/src/components/ui/text";
import { Center } from "#/src/components/ui/center";
import { Button, ButtonText } from "#/src/components/ui/button";
import { Form } from "./_layout";
import { useReactiveVar } from "@apollo/client";
import {
  StateResponseObject,
  useGetAllStatesByCountryQuery,
} from "#/graphql/generated";
import { ThemeReactiveVar } from "#/reactive";
import { FlashList } from "@shopify/flash-list";
import useContentInsets from "#/src/util/hooks/useContentInsets";
import { useRouter, useLocalSearchParams } from "expo-router";
import { filter } from "lodash";
import { Skeleton } from "moti/skeleton";
import { memo, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { View } from "react-native";

export default function SearchCountryStates() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const rTheme = useReactiveVar(ThemeReactiveVar);
  const contentInsets = useContentInsets();

  const [countryStates, setCountryStates] = useState<StateResponseObject[]>([]);
  const [pagination, setPagination] = useState<number>();
  const formContext = useFormContext<Form>();

  const { watch, getValues, setValue } = formContext;

  const { data, loading, error } = useGetAllStatesByCountryQuery({
    skip: !String(params.countryIsoCode),
    variables: {
      countryIsoCode: String(params.countryIsoCode),
    },
    onCompleted: (data) => {
      setCountryStates(data.getAllStatesByCountry);
      if (data.getAllStatesByCountry.length > 100) {
        setPagination(data.getAllStatesByCountry.length / 4);
      } else {
        setPagination(data.getAllStatesByCountry.length);
      }
    },
  });

  const filterList = (text) => {
    if (!params?.searchtext?.length && data?.getAllStatesByCountry.length) {
      setCountryStates(data.getAllStatesByCountry);
    }

    const filteredData = filter(data?.getAllStatesByCountry, (state) => {
      return contains(state, text.toLowerCase());
    });
    setCountryStates(filteredData);
  };

  const contains = (state, query) => {
    if (state.name.toLowerCase().includes(query)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (params.searchtext) {
      filterList(params.searchtext);
    }
  }, [params.searchtext]);

  if (!params.countryIsoCode) {
    return (
      <Center className="p-10">
        <Text className="text-lg"> No country provided</Text>
      </Center>
    );
  }

  if (loading) {
    return (
      <FlashList
        data={[...Array(20)]}
        contentInset={{
          ...contentInsets,
        }}
        contentContainerStyle={{
          paddingHorizontal: 10,
        }}
        keyExtractor={(item, index) => "key" + index}
        estimatedItemSize={50}
        keyboardDismissMode={"on-drag"}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                marginVertical: 4,
              }}
            />
          );
        }}
        renderItem={({ index, item }) => {
          return (
            <Skeleton
              key={index}
              height={50}
              width={"100%"}
              radius={10}
              colorMode={rTheme.colorScheme === "light" ? "light" : "dark"}
              colors={
                rTheme.colorScheme === "light"
                  ? [
                      String(rTheme.theme?.gluestack.tokens.colors.light100),
                      String(rTheme.theme?.gluestack.tokens.colors.light300),
                    ]
                  : [
                      String(rTheme.theme?.gluestack.tokens.colors.light900),
                      String(rTheme.theme?.gluestack.tokens.colors.light700),
                    ]
              }
            />
          );
        }}
      />
    );
  }

  function CityItem({ index, item }) {
    const _pressItem = async (item) => {
      setValue("state", {
        name: item.name,
        isoCode: item.isoCode,
        coords: {
          latitude: Number(item.latitude),
          longitude: Number(item.longitude),
        },
      });
      router.replace({
        pathname: "/(app)/searcharea/searchstatecities",
        params: {
          countryIsoCode: item.countryCode,
          stateIsoCode: item.isoCode,
        },
      });
    };

    return (
      <Button
        onPress={() => _pressItem(item)}
        key={index}
        isFocused
        className={`${watch("state.name") === item.name || watch("state.isoCode") === item.isoCode ? "bg-primary-500" : "bg-light-50"} ${watch("state.name") === item.name || watch("state.isoCode") === item.isoCode ? "dark:bg-primary-500" : "dark:bg-light-800"} h-[50px] w-full justify-between rounded-md px-2 py-0`}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode={"tail"}
          className="ml-3 mt-0.5 flex-1 text-xl font-medium"
        >
          {item.name}
        </Text>
        {watch("state.name") === item.name ||
        watch("state.isoCode") === item.isoCode ? (
          <Button
            onPress={() => _pressItem(item)}
            size="xs"
            className="mr-3 rounded-full bg-blue-500"
          >
            <ButtonText className="text-xs">Continue</ButtonText>
          </Button>
        ) : null}
      </Button>
    );
  }

  const MemoizedItem = memo(CityItem);

  return (
    <FlashList
      data={countryStates}
      keyboardDismissMode={"on-drag"}
      keyExtractor={(item, index) => "key" + index}
      contentInset={{
        ...contentInsets,
      }}
      contentContainerStyle={{
        paddingHorizontal: 10,
      }}
      ItemSeparatorComponent={() => {
        return (
          <View
            style={{
              marginVertical: 4,
            }}
          />
        );
      }}
      estimatedItemSize={50}
      renderItem={({ item, index }) => {
        return <MemoizedItem index={index} item={item} />;
      }}
    />
  );
}
