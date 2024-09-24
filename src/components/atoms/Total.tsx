import { Heading } from "#/src/components/ui/heading";
import { Box } from "#/src/components/ui/box";

type Props = {
  total: number;
  primary?: boolean;
};

const Total = (props: Props) => {
  return (
    <Box className="mx-5 h-[30px] w-[30px] items-center justify-center rounded-lg">
      <Heading className="text-lg font-black text-white">{props.total}</Heading>
    </Box>
  );
};

export default Total;
