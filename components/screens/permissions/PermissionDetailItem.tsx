import { Box, Text } from '@components/core'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default function PermissionDetailItem({ title, detail, icon }) {
	return (
		<Box bg='$transparent' px={'$1'} my={'$1'} style={{ flexDirection: 'row' }}>
			<Box bg='$transparent' mt={'$1'}>{icon}</Box>
			<Box
				bg='$transparent'
				justifyContent={'flex-start'}
				flexDirection={'column'}
				flex={1}
				sx={{
					w: wp(95),
				}}
			>
				<Text style={{ marginVertical: 5, fontSize: 18, fontWeight: '700' }}>{title}</Text>
				<Text fontSize={'$md'}>{detail}</Text>
			</Box>
		</Box>
	)
}
