import { Box, HStack, Heading, Pressable, Text, VStack, Button } from '@components/core'
import { useRemoveAllFromVenueDeveloperMutation } from '@graphql/generated'
import { useState } from 'react'

export default function DevActions() {
	const [showDevMode, setShowDevMode] = useState(false)

	const [removeAllFromVeneues, { data, loading, error }] = useRemoveAllFromVenueDeveloperMutation()

	return (
		<VStack space={'$4'} justifyContent={'space-between'}>
			{showDevMode ? (
				<Box py={'$10'} my={'$5'}>
					<Pressable
						onPress={() => {
							setShowDevMode(!showDevMode)
						}}
					>
						<Box>
							<Heading
								fontSize={'$lg'}
								fontWeight={'$black'}
								textAlign={'center'}
								textTransform={'uppercase'}
							>
								You are in {'\n'}
								<Heading color={'$green400'} fontWeight={'$black'}>
									Dev Mode!
								</Heading>
							</Heading>
							<Text fontSize={'$md'} mx={'$2'} textAlign={'center'}>
								This section is for quick actions that we may need for testing! As developers!
							</Text>
						</Box>
					</Pressable>
					<VStack>
						<HStack space={'$md'} py={'$2'} mx={'$3'} justifyContent={'space-around'}>
							<Button isDisabled={loading} onPress={() => removeAllFromVeneues()}>
								<Button.Text fontWeight='$medium' fontSize='$sm'>
									{loading ? 'Removing patrons' : 'Remove everyone'}
								</Button.Text>
							</Button>
						</HStack>
					</VStack>
				</Box>
			) : (
				<Box py={'$10'} my={'$5'}>
					<Pressable
						onPress={() => {
							setShowDevMode(!showDevMode)
						}}
					>
						<Text fontSize={'$md'} mx={'$2'} textAlign={'center'}>
							Show dev mode
						</Text>
					</Pressable>
				</Box>
			)}
		</VStack>
	)
}
