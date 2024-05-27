
module.exports = {
	client: {
		includes: [`./graphql/DM/**/*.ts`],
		excludes: [
			`./graphql/generated/index.ts`,
			`./graphql/generated/schema.graphql`,
			`./graphql/generated/schema.graphql.json`,
		],
		// service: 'barfriends',
		service: {
			name: 'barfriends',
			url: `${process.env.SERVER_ENDPOINT}`,
		},
	},
}
