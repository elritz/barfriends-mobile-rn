import { SERVER_ENDPOINT } from '@env'

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
			url: `${SERVER_ENDPOINT}`,
		},
	},
}
