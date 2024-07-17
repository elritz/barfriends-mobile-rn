import type { CodegenConfig } from '@graphql-codegen/cli'
console.log('process.env.SERVER_ENDPOINT :>> ', process.env.SERVER_ENDPOINT);
const config: CodegenConfig = {
	overwrite: true,
	// schema: `http://localhost:4000/graphql`,
	schema: `http://192.168.86.36:4000/graphql`,
	documents: './graphql/DM/**/*.*.ts',
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
