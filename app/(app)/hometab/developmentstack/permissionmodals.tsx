import { Divider, HStack, Heading, Pressable } from '@components/core'
import { FlashList } from '@shopify/flash-list'
import { useRouter } from 'expo-router'

export default function Preferences() {
	const router = useRouter()
	return (
		<FlashList
			estimatedItemSize={65}
			data={[
				{
					name: 'Foreground Location',
					route: () => {
						router.push({
							pathname: '(app)/permission/foregroundlocation',
						})
					},
				},
				{
					name: 'Background Location',
					route: () => {
						router.push({
							pathname: '(app)/permission/backgroundlocation',
						})
					},
				},
				{
					name: 'Contacts',
					route: () => {
						router.push({
							pathname: '(app)/permission/contacts',
						})
					},
				},
				{
					name: 'Notifications',
					route: () => {
						router.push({
							pathname: '(app)/permission/notifications',
						})
					},
				},
				{
					name: 'Media Library',
					route: () => {
						router.push({
							pathname: '(app)/permission/medialibrary',
						})
					},
				},
				{
					name: 'Camera',
					route: () => {
						router.push({
							pathname: '(app)/permission/camera',
						})
					},
				},
				{
					name: 'Microphone',
					route: () => {
						router.push({
							pathname: '(app)/permission/microphone',
						})
					},
				},
			]}
			keyExtractor={i => i.name}
			numColumns={1}
			contentInset={{ top: 10 }}
			renderItem={({ item }) => {
				return (
					<Pressable onPressIn={item.route}>
						<Divider />
						<HStack
							sx={{
								h: 45,
							}}
							flex={1}
							alignItems={'center'}
						>
							<Heading px={'$4'} fontSize={'$md'}>
								{item.name}
							</Heading>
						</HStack>
						<Divider />
					</Pressable>
				)
			}}
		/>
	)
}
