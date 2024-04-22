import { Box } from '@gluestack-ui/themed'
import { uniqueId } from 'lodash'
import { useWindowDimensions } from 'react-native'

type Props = {
	children: React.ReactNode
	numColumns: number
	bg?: string
	h?: number
}

export default function ActionCard({ children, numColumns, bg, h }: Props) {

	return (
		<Box
			key={uniqueId()}
			p={'$2'}
			justifyContent={'center'}
			sx={{
				_dark: {
					bg: '$light800',
				},
				_light: {
					bg: '$light50',
				},
				h: h || 'auto',
			}}
			flex={1}
			style={{
				alignItems: 'center',
			}}
			rounded={'$lg'}
		>
			{children}
		</Box>
	)
}
