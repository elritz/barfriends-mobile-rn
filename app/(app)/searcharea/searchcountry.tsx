import { Text } from "#/src/components/ui/text";
import { Button, ButtonText } from "#/src/components/ui/button";
import { Form } from "./_layout";
import { useReactiveVar } from "@apollo/client";
import {
  CountryResponseObject,
  useGetAllCountriesQuery,
} from "#/graphql/generated";
import { ThemeReactiveVar } from "#/reactive";
import { FlashList } from "@shopify/flash-list";
import useContentInsets from "#/src/util/hooks/useContentInsets";
import { useRouter, useGlobalSearchParams } from "expo-router";
import { filter } from "lodash";
import { Skeleton } from "moti/skeleton";
import { memo, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { View } from "react-native";
import { Box } from "#/src/components/ui/box";

export default function SearchCountry() {
  const router = useRouter();
  const params = useGlobalSearchParams();
  const contentInsets = useContentInsets();

  const rTheme = useReactiveVar(ThemeReactiveVar);
  const [countries, setCountries] = useState<CountryResponseObject[]>([]);
  const [pagination, setPagination] = useState<number>();

  const { watch, setValue } = useFormContext<Form>();

  const { data, loading, error } = useGetAllCountriesQuery({
    onCompleted: (data) => {
      if (data.getAllCountries) {
        setCountries(data?.getAllCountries);
        setPagination(data.getAllCountries.length / 4);
      }
    },
  });

  const filterList = (text) => {
    if (!params?.searchtext?.length && data?.getAllCountries.length) {
      if (data.getAllCountries) {
        setCountries(data.getAllCountries);
      }
    }

    const filteredCountriesData = filter(data?.getAllCountries, (item) => {
      return contains(item, text.toLowerCase());
    });
    setCountries(filteredCountriesData);
  };

  const contains = (item, query) => {
    if (item.name.toLowerCase().includes(query)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (params.searchtext) {
      filterList(params.searchtext);
    } else {
      if (data?.getAllCountries) {
        setCountries(data.getAllCountries);
      }
    }
  }, [params.searchtext]);

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

  function CountryItem({ index, item }) {
    const _pressItem = async (item) => {
      setValue("country", {
        name: item.name,
        isoCode: item.isoCode,
        coords: {
          latitude: Number(item.latitude),
          longitude: Number(item.longitude),
        },
      });
      router.replace({
        pathname: "/(app)/searcharea/searchcountrystate",
        params: {
          countryIsoCode: item.isoCode,
        },
      });
      router.setParams({
        searchtext: "",
      });
    };

    return (
      <Button
        onPress={() => _pressItem(item)}
        key={index}
        isFocused
        className={` ${watch("country.name") === item.name ? "bg-primary-500" : "bg-light-100"} ${watch("country.name") === item.name ? "dark:bg-primary-500" : "dark:bg-light-800"} h-[50px] w-full justify-between rounded-md px-2 py-0`}
      >
        <Box>
          <Text
            numberOfLines={1}
            className="ml-3 mt-0.5 text-center text-xl font-medium"
          >
            {item?.flag} {item.name}
          </Text>
        </Box>
        {watch("country.name") === item.name ? (
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

  const MemoizedItem = memo(CountryItem);

  return (
    <FlashList
      data={countries}
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
        return <MemoizedItem index={index} item={item} />;
      }}
    />
  );
}
