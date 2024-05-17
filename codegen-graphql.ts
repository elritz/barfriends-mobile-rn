import type { CodegenConfig } from '@graphql-codegen/cli'

console.log("🚀 ~ process.env:", process.env)
const config: CodegenConfig = {
	overwrite: true,
	// schema: `${process.env.SERVER_ENDPOINT}`,
	schema: 'http://192.168.86.36:4000/graphql',
	documents: 'graphql/DM/**/*.*.ts',
	generates: {
		'./graphql/generated/index.ts': {
			schema: './schema.graphql',
			plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
		},
		'./graphql.schema.json': {
			plugins: ['introspection'],
		},
		'./graphql/generated/schema.graphql': {
			plugins: ['schema-ast'],
		},
	},
}

export default config
