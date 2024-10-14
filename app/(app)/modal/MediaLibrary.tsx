import { Heading } from "#/src/components/ui/heading";
import { FlashList } from "@shopify/flash-list";
import * as MediaLibrary from "expo-media-library";
import { useState } from "react";
import { View, Pressable, Image } from "react-native";

interface MediaLibraryProps {}

export default ({}) => {
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState([]);
  const [numberOfPhotos, setNumberOfPhotos] = useState(100);
  const [lastPhotoID, setLastPhotoID] = useState("");
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [showPhotos, setShowPhotos] = useState(false);
  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (!status) return null;

  const _getPhotosAsync = async () => {
    const photos = await MediaLibrary.getAssetsAsync({
      first: numberOfPhotos,
      sortBy: ["creationTime"],
    });
    const { id } = photos.assets[photos.assets.length - 1];
    setLastPhotoID(id);
    const [mPhotos, setPhotos] = useState<MediaLibrary.Asset[] | undefined>(
      undefined,
    );
    // ...
    setPhotos((photos) => photos);
  };

  const _pressedImageCameraRollItem = (item) => {
    if (item.uri === selectedPhoto) {
      setSelectedPhoto([]);
    } else {
      setSelectedPhoto(item.uri);
    }
  };

  const handleLoadMore = async () => {
    const GetNewPhotos = await MediaLibrary.getAssetsAsync({
      first: numberOfPhotos,
      last: lastPhotoID,
      after: lastPhotoID,
      endCursor: lastPhotoID,
      hasNextPage: true,
    });
    const { id } = GetNewPhotos.assets[GetNewPhotos.assets.length - 1];

    setLastPhotoID(id);
    setPhotos(GetNewPhotos.assets);
  };

  return (
    <View>
      <Heading className="text-2xl font-black uppercase">
        Show Media Library
      </Heading>
      <Heading className="text-2xl font-black">Take Photo Options</Heading>
      <FlashList
        estimatedItemSize={100}
        style={{ flex: 1 }}
        data={photos}
        numColumns={3}
        renderItem={({ item }) => (
          <Pressable onPress={() => _pressedImageCameraRollItem(item)}>
            <Image
              style={{
                width: 50,
                height: 50,
              }}
              source={{ uri: item.uri }}
            />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.4}
        onEndReached={() => handleLoadMore()}
      />
    </View>
  );
};
