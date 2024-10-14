import { RetryLink } from '@apollo/client/link/retry'

const retryLink = new RetryLink({
	delay: {
		initial: 300,
		// max: Infinity,
		max: 5,
		jitter: true,
	},
	attempts: {
		max: 4,
		retryIf: (error, _operation) => !!error,
	},
})

export default retryLink
