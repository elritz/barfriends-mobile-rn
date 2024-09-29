import { VStack } from "#/src/components/ui/vstack";
import { Text } from "#/src/components/ui/text";
import { Pressable } from "#/src/components/ui/pressable";
import { Heading } from "#/src/components/ui/heading";
import { HStack } from "#/src/components/ui/hstack";
import { Box } from "#/src/components/ui/box";
import { Badge } from "#/src/components/ui/badge";
import { useReactiveVar } from "@apollo/client";
import { useGetInterestsQuery } from "#/graphql/generated";
import { AuthorizationReactiveVar, ThemeReactiveVar } from "#/reactive";
import { FlashList } from "@shopify/flash-list";
import useRandomNumber from "#/src/util/hooks/useRandomNumber";
import { Skeleton } from "moti/skeleton";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default () => {
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar);
  const rTheme = useReactiveVar(ThemeReactiveVar);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { data, loading, error } = useGetInterestsQuery();

  useEffect(() => {
    const tagids = rAuthorizationVar?.Profile?.DetailInformation?.Tags.map(
      (item) => item.id,
    );
    if (tagids && tagids.length) {
      setSelectedTags([...tagids]);
    }
  }, []);

  if (loading) {
    return (
      <Box className="mt-4 flex-1 bg-transparent">
        <FlashList
          numColumns={1}
          scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
          estimatedItemSize={35}
          data={[...Array(6)]}
          showsVerticalScrollIndicator={false}
          renderItem={() => {
            const randWidth = useRandomNumber(100, 240);
            const randInterests = useRandomNumber(5, 15);
            return (
              <VStack className="m-2">
                <Skeleton
                  height={35}
                  width={Number(randWidth)}
                  radius={15}
                  colorMode={rTheme.colorScheme === "light" ? "light" : "dark"}
                  colors={
                    rTheme.colorScheme === "light"
                      ? [
                          String(
                            rTheme.theme?.gluestack.tokens.colors.light100,
                          ),
                          String(
                            rTheme.theme?.gluestack.tokens.colors.light300,
                          ),
                        ]
                      : [
                          String(
                            rTheme.theme?.gluestack.tokens.colors.light900,
                          ),
                          String(
                            rTheme.theme?.gluestack.tokens.colors.light700,
                          ),
                        ]
                  }
                />
                <VStack className="flex-row flex-wrap">
                  {[...Array(randInterests)].map((item) => {
                    const randWidth = useRandomNumber(40, 100);
                    return (
                      <Skeleton
                        height={35}
                        width={Number(randWidth)}
                        radius={15}
                        colorMode={
                          rTheme.colorScheme === "light" ? "light" : "dark"
                        }
                        colors={
                          rTheme.colorScheme === "light"
                            ? [
                                String(
                                  rTheme.theme?.gluestack.tokens.colors
                                    .light100,
                                ),
                                String(
                                  rTheme.theme?.gluestack.tokens.colors
                                    .light300,
                                ),
                              ]
                            : [
                                String(
                                  rTheme.theme?.gluestack.tokens.colors
                                    .light900,
                                ),
                                String(
                                  rTheme.theme?.gluestack.tokens.colors
                                    .light700,
                                ),
                              ]
                        }
                      />
                    );
                  })}
                </VStack>
              </VStack>
            );
          }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      </Box>
    );
  }

  return (
    <Box className="mx-2 mt-4 flex-1 bg-transparent">
      <FlashList
        scrollEnabled
        data={data?.getInterests}
        estimatedItemSize={400}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        extraData={selectedTags}
        renderItem={({ item, index }) => {
          return (
            <VStack key={item.id}>
              <Heading>{item.name}</Heading>
              <HStack space={"sm"} className="flex-1 flex-row flex-wrap">
                {item.Tags.map((tag, index) => {
                  return (
                    <Pressable
                      onPress={() => {
                        if (selectedTags.some((e) => e === tag.id)) {
                          setSelectedTags((prev) => {
                            return [
                              ...prev.filter((tagid, i) => tagid !== tag.id),
                            ];
                          });
                        } else {
                          setSelectedTags((oldArray) => [...oldArray, tag.id]);
                        }
                      }}
                    >
                      <Badge
                        className={` ${
                          selectedTags.some((e) => e === tag.id) ||
                          rAuthorizationVar?.Profile?.DetailInformation?.Tags.some(
                            (e) => e.id === item.id,
                          )
                            ? "bg-primary-500"
                            : "bg-light-200"
                        } ${
                          selectedTags.some((e) => e === tag.id) ||
                          rAuthorizationVar?.Profile?.DetailInformation?.Tags.some(
                            (e) => e.id === item.id,
                          )
                            ? "dark:bg-primary-500"
                            : "dark:bg-light-400"
                        } my-2 rounded-lg px-3 py-2`}
                      >
                        <Text
                          className={` ${rTheme.colorScheme === "light" ? rTheme.theme?.gluestack.tokens.colors.light900 : rTheme.theme?.gluestack.tokens.colors.light100} `}
                        >
                          {tag.emoji}
                          {tag.name}
                        </Text>
                      </Badge>
                    </Pressable>
                  );
                })}
              </HStack>
            </VStack>
          );
        }}
      />
    </Box>
  );
};
