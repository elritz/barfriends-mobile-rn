import { Text } from "#/components/ui/text";
import { Box } from "#/components/ui/box";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default function PermissionDetailItem({ title, detail, icon }) {
	return (
        <Box style={{ flexDirection: 'row' }} className="bg-transparent px-1 my-1">
            <Box className="bg-transparent mt-1">{icon}</Box>
            <Box className="bg-transparent justify-start flex-column flex-1 w-[undefined]">
				<Text style={{ marginVertical: 5, fontSize: 18, fontWeight: '700' }}>{title}</Text>
				<Text className="text-md">{detail}</Text>
			</Box>
        </Box>
    );
}
