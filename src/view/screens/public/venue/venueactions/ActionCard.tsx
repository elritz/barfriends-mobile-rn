import { Box } from "#/src/components/ui/box";
import { uniqueId } from "lodash";
import { useWindowDimensions } from "react-native";

type Props = {
  children: React.ReactNode;
  numColumns: number;
  bg?: string;
  h?: number;
};

export default function ActionCard({ children, numColumns, bg, h }: Props) {
  return (
    <Box
      key={uniqueId()}
      style={{
        alignItems: "center",
        height: h,
      }}
      className={`flex-1 justify-center rounded-lg bg-light-50 p-2 dark:bg-light-800`}
    >
      {children}
    </Box>
  );
}
