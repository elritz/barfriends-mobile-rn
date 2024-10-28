import type {CodegenConfig} from '@graphql-codegen/cli'

import getLocalIPAddress from './src/util/helpers/getLocalIPAddress'

console.log(`Local IP Address: ${getLocalIPAddress()}`)
const config: CodegenConfig = {
  overwrite: true,
  schema: `http://localhost:4000/graphql`,
  // schema: `${getLocalIPAddress()}:4000/graphql`,
  documents: './graphql/DM/**/*.*.ts',
  generates: {
    './graphql/generated/index.ts': {
      schema: './schema.graphql',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
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
