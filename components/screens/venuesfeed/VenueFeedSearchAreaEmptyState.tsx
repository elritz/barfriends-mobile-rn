import PermissionButtonSearchAreaLocation from './PermissionButtonSearchAreaLocation'
import { Box, Heading, Pressable, Text, VStack } from '@components/core'
import { useRouter } from 'expo-router'

export default function VenueFeedSearchAreaEmptyState() {
	const router = useRouter()

	const _pressToSearchArea = () => {
		router.push({
			pathname: '(app)/searcharea',
		})
	}

	return (
		<Box p={'$5'} rounded={'$md'}>
			<Heading
				numberOfLines={3}
				ellipsizeMode='tail'
				adjustsFontSizeToFit
				minimumFontScale={0.5}
				pb={2}
				w={265}
				alignSelf='center'
				textAlign='center'
				textTransform='uppercase'
				fontWeight={'$black'}
				fontSize={'$xl'}
			>
				Where are your venues?
			</Heading>
			<Text fontSize={'$lg'}>
				Finding venues using your device location, or find venues with Search Area filtering.
			</Text>
			<VStack w={'$full'} alignItems={'center'} space={'lg'}>
				<PermissionButtonSearchAreaLocation />
				<Pressable w={'100%'} onPress={_pressToSearchArea}>
					<Text textTransform='uppercase' fontSize={'$lg'} fontWeight={'$bold'} alignSelf='center'>
						Find area
					</Text>
				</Pressable>
			</VStack>
		</Box>
	)
}
