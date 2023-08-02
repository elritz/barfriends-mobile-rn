import { Box } from '@components/core'
import { uniqueId } from 'lodash'
import { useWindowDimensions } from 'react-native'

type Props = {
	children: React.ReactNode
	numColumns: number
	bg?: string
	h?: number
}

export default function ActionCard({ children, numColumns, bg, h }: Props) {
	const { width } = useWindowDimensions()
	const itemPadding = (width / 33.33) * numColumns

	return (
		<Box
			key={uniqueId()}
			width={width}
			flexDirection={'column'}
			p={'$2'}
			m={'$1'}
			justifyContent={'center'}
			sx={{
				_dark: {
					bg: bg || '$dark100',
				},
				_light: {
					bg: bg || '$light50',
				},
				h: h,
			}}
			style={{
				width: (width - itemPadding) / numColumns,
				alignItems: 'center',
			}}
			rounded={'$lg'}
		>
			{children}
		</Box>
	)
}
