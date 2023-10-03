module.exports = {
	client: {
		includes: [`./graphql/DM/**/*.ts`],
		excludes: [
			`./graphql/generated/index.ts`,
			`./graphql/generated/schema.graphql`,
			`./graphql/generated/schema.graphql.json`,
		],
		// service: 'revel',
		service: {
			name: 'revel',
			url: 'http://192.168.86.40:4000/graphql',
		},
	},
}
