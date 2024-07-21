import { Heading } from "#/components/ui/heading";
import { Box } from "#/components/ui/box";

type Props = {
	total: number
	primary?: boolean
}

const Total = (props: Props) => {
	return (
        <Box
            className="h-[30px]  w-[30px] mx-5 rounded-lg items-center justify-center">
            <Heading className="font-black text-lg text-white">
				{props.total}
			</Heading>
        </Box>
    );
}

export default Total
