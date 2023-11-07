import { Box } from '@gluestack-ui/themed'

export default ({ children }) => {
	return (
		<Box
			sx={{
				_dark: {
					bg: '$light800',
				},
				_light: {
					bg: '$light50',
				},
			}}
		>
			{children}
		</Box>
	)
}
