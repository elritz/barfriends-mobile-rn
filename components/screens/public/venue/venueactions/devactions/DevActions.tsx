import JoinCard from './joincard/JoinCard'
import LeaveCard from './leavecard/LeaveCard'
import TotalCard from './totalcard/TotalCard'
import { Box, HStack, Heading, Pressable, Text, VStack } from '@components/core'
import { useState } from 'react'

export default function DevActions() {
	const [showDevMode, setShowDevMode] = useState(false)

	return (
		<VStack space={'md'} justifyContent={'space-between'}>
			{showDevMode ? (
				<Box bg={'$transparent'}>
					<Pressable
						onPress={() => {
							setShowDevMode(!showDevMode)
						}}
					>
						<>
							<Heading
								fontSize={'$lg'}
								fontWeight={'$800'}
								textAlign={'center'}
								textTransform={'uppercase'}
							>
								You are in {'\n'}
								<Heading color={'$green400'} fontWeight={'$black'} textAlign='center'>
									Dev Mode!
								</Heading>
							</Heading>
							<Text fontSize={'$md'} mx={'$2'} textAlign={'center'}>
								This section is for quick actions that we may need for testing! As developers!
							</Text>
						</>
					</Pressable>
					<VStack>
						<HStack space={'md'} pt={'$2'} pb={'$2'} mx={'$3'} justifyContent={'space-around'}>
							<TotalCard />
							<JoinCard />
							<LeaveCard />
						</HStack>
					</VStack>
				</Box>
			) : (
				<Pressable
					onPress={() => {
						setShowDevMode(!showDevMode)
					}}
				>
					<Text fontSize={'$md'} mx={'$2'} textAlign={'center'}>
						Show dev mode
					</Text>
				</Pressable>
			)}
		</VStack>
	)
}
