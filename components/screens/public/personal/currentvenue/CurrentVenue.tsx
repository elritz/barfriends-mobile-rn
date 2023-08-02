import { Box, Button, Heading, Text, VStack } from '@components/core'

export default function CurrentVenue() {
	return (
		<VStack
			space={'md'}
			sx={{
				_light: {
					bg: 'light.100',
				},
				_dark: {
					bg: 'light.800',
				},
			}}
			rounded={'$xl'}
			flex={1}
			p={'$3'}
		>
			<VStack space={'md'} mb={'$md'}>
				<Box
					sx={{
						h: 16,
						w: 16,
					}}
					bg={'$red200'}
					rounded={'$md'}
				/>
				<Heading
					numberOfLines={2}
					fontSize={'$lg'}
					fontWeight={'$black'}
					allowFontScaling
					ellipsizeMode={'clip'}
				>
					Current Venue relazziuf long namewlke;jbqwe qwem
				</Heading>
			</VStack>
			<Button variant={'link'} size={'lg'}>
				<Text>View</Text>
			</Button>
		</VStack>
	)
}
