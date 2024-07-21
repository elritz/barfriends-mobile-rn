import { Box } from "#/components/ui/box";

export default ({ children }) => {
	return (
        <Box
			className="dark:bg-light-800 bg-light-50"
		>
            {children}
        </Box>
    );
}
