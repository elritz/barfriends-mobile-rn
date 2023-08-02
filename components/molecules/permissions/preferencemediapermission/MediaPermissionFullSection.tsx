import { useReactiveVar } from '@apollo/client'
import { Box, Button, Heading, Text } from '@components/core'
import { PermissionMediaReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { uniqueId } from 'lodash'
import { AnimatePresence, MotiView } from 'moti'

export default function MediaPermissionFullSection() {
	const router = useRouter()
	const rPermissionMediaVar = useReactiveVar(PermissionMediaReactiveVar)

	return (
		<AnimatePresence key={uniqueId()}>
			{!rPermissionMediaVar?.granted && (
				<MotiView
					from={{
						opacity: 0,
						scale: 0.9,
					}}
					animate={{
						opacity: 1,
						scale: 1,
					}}
					exit={{
						opacity: 0,
						scale: 0.9,
					}}
				>
					<Box
						bg='$transparent'
						style={{
							width: '100%',
							alignItems: 'center',
						}}
					>
						<Heading
							fontSize={'$lg'}
							style={{
								width: '100%',
								marginVertical: 10,
							}}
						>
							Media Permission
						</Heading>
						<Text fontSize={'$lg'} style={{ width: '100%' }}>
							Using your photos on your device.
						</Text>
						<Button
							onPress={() =>
								router.push({
									pathname: '(app)/permission/medialibrary',
								})
							}
							size={'sm'}
							mt={'$4'}
							sx={{
								w: '85%',
							}}
						>
							<Text fontSize={'$sm'} fontWeight='$bold'>
								Use Current Location
							</Text>
						</Button>
					</Box>
				</MotiView>
			)}
		</AnimatePresence>
	)
}
