import { VStack } from "#/components/ui/vstack";
import { Text } from "#/components/ui/text";
import { Heading } from "#/components/ui/heading";
import { Button } from "#/components/ui/button";
import { Box } from "#/components/ui/box";

export default function CurrentVenue() {
	return (
        <VStack
            space={'md'}
            className="bg-[light.100]  dark:bg-[light.800] rounded-xl flex-1 p-3">
            <VStack space={'md'} className="mb-4">
				<Box className="h-[16px]  w-[16px] bg-red-200 rounded-md" />
				<Heading
                    numberOfLines={2}
                    allowFontScaling
                    ellipsizeMode={'clip'}
                    className="text-lg font-black">
					Current Venue relazziuf long namewlke;jbqwe qwem
				</Heading>
			</VStack>
            <Button variant={'link'} size={'lg'}>
				<Text>View</Text>
			</Button>
        </VStack>
    );
}
