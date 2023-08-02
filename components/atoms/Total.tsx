import { Box, Heading } from '@components/core'

type Props = {
	total: number
	primary?: boolean
}

const Total = (props: Props) => {
	return (
		<Box
			sx={{
				h: 30,
				w: 30,
			}}
			mx={'$5'}
			rounded={'$lg'}
			alignItems='center'
			justifyContent='center'
		>
			<Heading fontWeight={'$black'} fontSize={'$lg'} color={'white'}>
				{props.total}
			</Heading>
		</Box>
	)
}

export default Total
