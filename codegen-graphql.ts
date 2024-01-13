import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
	overwrite: true,
	schema: `http://${process.env.IP_ADDRESS}:4000/graphql`,
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
