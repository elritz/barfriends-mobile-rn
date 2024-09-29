import { Input, InputField } from "#/src/components/ui/input";
import { CloseIcon } from "#/src/components/ui/icon";
import { VStack } from "#/src/components/ui/vstack";
import { HStack } from "#/src/components/ui/hstack";
import { Pressable } from "#/src/components/ui/pressable";
import { Text } from "#/src/components/ui/text";
import { Button, ButtonText, ButtonIcon } from "#/src/components/ui/button";
import { useReactiveVar } from "@apollo/client";
import ContactItem from "#/src/view/screens/conversations/ContactItem";
import { ThemeReactiveVar } from "#/reactive";
import { FlashList } from "@shopify/flash-list";
import useContentInsets from "#/src/util/hooks/useContentInsets";
import useDebounce from "#/src/util/hooks/useDebounce";
import Fuse from "fuse.js";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const contactslist = [
  { key: "1", value: "mobiles", disabled: true },
  { key: "2", value: "appliances" },
  { key: "3", value: "cameras" },
  { key: "4", value: "computers", disabled: true },
  { key: "5", value: "vegetables" },
  { key: "6", value: "diary Products" },
  { key: "7", value: "drinks" },
  { key: "5", value: "vegetables" },
  { key: "126", value: "diary Products" },
  { key: "12w7", value: "Drinks" },
  { key: "125", value: "Vegetables" },
  { key: "12w6", value: "Diary Products" },
  { key: "12w7", value: "Drinks" },
  { key: "12e5", value: "Vegetables" },
  { key: "12w6", value: "Diary Products" },
  { key: "127", value: "Drinks" },
  { key: "12w5", value: "Vegetables" },
  { key: "12w6", value: "Diary Products" },
  { key: "12w7", value: "Drinks" },
];

export default function NewConversation() {
  const rTheme = useReactiveVar(ThemeReactiveVar);
  const insets = useContentInsets();

  const [searchFilterIsLoading, setSearchFilterIsLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [contacts, setContacts] = useState(
    contactslist.sort((a, b) => {
      const nameA = a.value.toLowerCase();
      const nameB = b.value.toLowerCase();

      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    }),
  );

  const options = {
    keys: ["value"],
  };

  const fuse = new Fuse(contacts, options);

  const { control, setValue, handleSubmit, watch } = useForm({
    defaultValues: {
      selected: selected,
      searchtext: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: undefined,
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: true,
  });

  type onPressProps = {
    listType: "contacts" | "selected" | "searchresult";
    item: any;
  };

  const _pressItemFromList = ({ listType, item }: onPressProps) => {
    switch (listType) {
      case "searchresult":
        const indexToRemoveContacts = contacts.indexOf(item.item);
        const indexToRemoveFiltered = filteredContacts.indexOf(item);

        if (indexToRemoveFiltered !== -1) {
          const filteredSorted = [
            ...filteredContacts.slice(0, indexToRemoveFiltered),
            ...filteredContacts.slice(indexToRemoveFiltered + 1),
          ];
          setFilteredContacts(filteredSorted);

          setSelected((prev) => [...prev, item.item]);
        }

        if (indexToRemoveContacts !== -1) {
          const sorted = [
            ...contacts.slice(0, indexToRemoveContacts),
            ...contacts.slice(indexToRemoveContacts + 1),
          ].sort((a, b) => {
            const nameA = a.value.toLowerCase();
            const nameB = b.value.toLowerCase();

            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          });
          setContacts(sorted);
        }
        return;
      case "contacts":
        const indexToRemove = contacts.indexOf(item);
        if (indexToRemove !== -1) {
          const sorted = [
            ...contacts.slice(0, indexToRemove),
            ...contacts.slice(indexToRemove + 1),
          ].sort((a, b) => {
            const nameA = a.value.toLowerCase();
            const nameB = b.value.toLowerCase();

            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          });
          setContacts(sorted);
          setSelected((prev) => [...prev, item]);
        }
        return;
      case "selected":
        const selectedItemIndex = selected.indexOf(item);
        if (selectedItemIndex !== -1) {
          setSelected([
            ...selected.slice(0, selectedItemIndex),
            ...selected.slice(selectedItemIndex + 1),
          ]);
          setContacts((prev) =>
            [...prev, item].sort((a, b) => {
              const nameA = a.value.toLowerCase();
              const nameB = b.value.toLowerCase();

              if (nameA < nameB) return -1;
              if (nameA > nameB) return 1;
              return 0;
            }),
          );
        } else {
          setContacts((prev) =>
            [...prev, item].sort((a, b) => {
              // Use the 'name' property for comparison
              const nameA = a.value.toLowerCase();
              const nameB = b.value.toLowerCase();

              if (nameA < nameB) return -1;
              if (nameA > nameB) return 1;
              return 0;
            }),
          );
        }

        break;
    }
  };

  const debouncedSearchResults = useDebounce(watch().searchtext, 400);

  const searchFilterFunction = (text) => {
    setSearchFilterIsLoading(true);
    if (text) {
      const result = fuse.search(text);

      setFilteredContacts(result);
    } else {
      setFilteredContacts([]);
    }
    setSearchFilterIsLoading(false);
  };

  useMemo(() => {
    if (watch().searchtext) {
    }
    searchFilterFunction(watch().searchtext);
  }, [debouncedSearchResults]);

  return (
    <>
      <Input
        variant="underlined"
        className="mt-10 h-auto flex-row items-start border-0 border-light-400 px-4 dark:border-light-700"
      >
        <VStack className="flex-1">
          <Controller
            control={control}
            name="selected"
            render={({ field: { value, onChange } }) => (
              <HStack space="sm" className="mx-2 mt-1 flex-wrap">
                {selected.map((item) => (
                  <Button
                    onPress={() => {
                      _pressItemFromList({
                        listType: "selected",
                        item,
                      });
                    }}
                    size="xs"
                    className="my-1 h-7 self-center bg-light-200 px-2 dark:bg-light-700"
                  >
                    <ButtonText className="tracking-lg text-sm font-normal capitalize text-primary-500 dark:text-primary-500">
                      {item.value}
                    </ButtonText>
                  </Button>
                ))}
              </HStack>
            )}
          />
          <Controller
            control={control}
            name="searchtext"
            render={({ field: { value, onChange } }) => (
              <HStack className="mt-2 items-center justify-between">
                <Text className="text-sm">To:</Text>
                <InputField
                  autoFocus
                  returnKeyType="default"
                  onFocus={() => setSearchFilterIsLoading(true)}
                  className="m-2 w-[100%] border-0 py-1 pr-2"
                  underlineColorAndroid="transparent"
                  keyboardAppearance={
                    rTheme.colorScheme === "light" ? "light" : "dark"
                  }
                  value={value}
                  onChangeText={onChange}
                  onSubmitEditing={() => {
                    console.log("submitting");
                  }}
                  blurOnSubmit={false}
                />
                {value.length > 0 && (
                  <Button
                    size="sm"
                    hitSlop={{
                      top: 12,
                      bottom: 12,
                      left: 12,
                      right: 12,
                    }}
                    variant="link"
                    onPress={() => {
                      setValue("searchtext", "");
                    }}
                    className="h-5 w-5 rounded-full border border-primary-500 px-0"
                  >
                    <ButtonIcon as={CloseIcon} />
                  </Button>
                )}
              </HStack>
            )}
          />
        </VStack>
      </Input>
      {watch().searchtext.length && !searchFilterIsLoading ? (
        <FlashList
          data={watch().searchtext.length ? filteredContacts : contacts}
          estimatedItemSize={80}
          keyboardDismissMode="on-drag"
          contentInset={{
            bottom: insets.bottom,
          }}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                onPress={() => {
                  _pressItemFromList({
                    listType: "searchresult",
                    item,
                  });
                }}
              >
                <ContactItem index={index} item={item.item} />
              </Pressable>
            );
          }}
        />
      ) : (
        <FlashList
          data={contacts}
          estimatedItemSize={80}
          keyboardDismissMode="on-drag"
          contentInset={{
            bottom: insets.bottom,
          }}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                onPress={() => {
                  _pressItemFromList({
                    listType: "contacts",
                    item,
                  });
                }}
              >
                <ContactItem index={index} item={item} />
              </Pressable>
            );
          }}
        />
      )}
    </>
  );
}
