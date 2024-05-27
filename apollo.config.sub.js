module.exports = {
	client: {
		includes: [`./graphql/DM/**/*.ts`],
		excludes: [
			`./graphql/generated/index.ts`,
			`./graphql/generated/schema.graphql`,
			`./graphql/generated/schema.graphql.json`,
		],
		service: 'barfriends',
		service: {
			name: 'subscriptions',
			// url: 'http://192.168.86.23:5004/graphql/stream',
			// url: 'https://localhost:5004/graphql/stream',
			url: `https://${process.env.IP_ADDRESS}:5004`
		},
	},
}
