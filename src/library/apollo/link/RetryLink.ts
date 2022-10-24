import { RetryLink } from '@apollo/client/link/retry'

const retryLink = new RetryLink({
	delay: {
		initial: 300,
		max: Infinity,
		jitter: true,
	},
	attempts: {
		max: 5,
		retryIf: (error, _operation) => !!error,
	},
})

export default retryLink
