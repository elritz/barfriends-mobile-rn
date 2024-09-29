import { Pressable } from "#/src/components/ui/pressable";
import { Box } from "#/src/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import ProfilePhotoEmptyState from "./ProfilePhotoEmptyState";
import {
  Maybe,
  Photo,
  PhotoCreateManyProfileInput,
  useUploadProfilePhotoMutation,
} from "#/graphql/generated";
import { ActivityIndicator, Image } from "react-native";
import { AuthorizationReactiveVar, ThemeReactiveVar } from "#/reactive";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import useCloudinaryImageUploading from "#/src/util/uploading/useCloudinaryImageUploading";

type Props = {
  photo: Maybe<Photo> | undefined;
};

export default function ProfilePhoto({ photo }: Props) {
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar);
  const [isLoading, setLoading] = useState(false);

  const [addProfilePhotosMutation, { data, loading, error }] =
    useUploadProfilePhotoMutation({
      onCompleted: (data) => {
        AuthorizationReactiveVar({
          ...rAuthorizationVar,
          Profile: {
            ...rAuthorizationVar?.Profile,
            profilePhoto: {
              ...data.uploadProfilePhoto,
            },
          },
        });
      },
    });
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    setTimeout(() => {
      setLoading(true);
    }, 1500);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      presentationStyle: ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
      selectionLimit: 1,
      aspect: [4, 3],
      allowsEditing: true,
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (result.assets) {
      const resultSettled = await Promise.allSettled(
        result.assets.map(async (item) => {
          const data = await useCloudinaryImageUploading(item.uri);
          return data.secure_url;
        }),
      );

      const images: PhotoCreateManyProfileInput[] = resultSettled
        .filter((item) => item.status === "fulfilled" && item.value)
        .map((item) => ({ url: String(item.value) }));

      addProfilePhotosMutation({
        variables: {
          photos: {
            data: [...images],
          },
        },
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Pressable className="bg-dar h-[110px] w-[100px] items-center justify-center rounded-lg p-2 dark:bg-red-500">
        <ActivityIndicator size={"small"} />
      </Pressable>
    );
  }

  if (!photo?.id) {
    return (
      <Pressable
        onPress={pickImage}
        className="h-[100px] w-[100px] rounded-lg bg-light-300 p-2 dark:bg-light-800"
      >
        <ProfilePhotoEmptyState />
      </Pressable>
    );
  }

  return (
    <Pressable onPress={pickImage} className="items-center justify-center pr-2">
      <Box className="h-[100px] w-[100px] overflow-hidden rounded-lg">
        <Image
          source={{
            uri: photo?.url,
          }}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </Box>
    </Pressable>
  );
}
