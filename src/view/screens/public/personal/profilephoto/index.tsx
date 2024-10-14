import { Box } from "#/src/components/ui/box";
import { Maybe, Photo } from "#/graphql/generated";
import { Image } from "react-native";

type Props = {
  photo: Maybe<Photo> | undefined;
};

export default function ProfilePhoto({ photo }: Props) {
  if (!photo?.id) {
    return <></>;
  }

  return (
    <Box className="mb-3 h-[150px] w-[150px] overflow-hidden rounded-md">
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
  );
}
