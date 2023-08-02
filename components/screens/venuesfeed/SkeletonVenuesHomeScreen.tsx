import { Center, HStack, VStack } from '@components/core'
import { Skeleton } from 'moti/skeleton'
import { Dimensions } from 'react-native'

export default function SkeletonVenuesHomeScreen() {
	const { width } = Dimensions.get('window')

	const loadingSkelWidth = width / 2.15

	return (
		<Center>
			<VStack space={'$2'}>
				{[...Array(6)].map((item, index) => {
					return (
						<HStack key={index} space={'md'} overflow='hidden'>
							{[...Array(2)].map((item, index) => {
								return <Skeleton key={index} radius={'round'} boxHeight={280} width={loadingSkelWidth} />
							})}
						</HStack>
					)
				})}
			</VStack>
		</Center>
	)
}
