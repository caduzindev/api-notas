import { join } from 'path'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'

const arrayTypes = loadFilesSync(join(__dirname,'./types'),{extensions:['graphql']})

export default mergeTypeDefs(arrayTypes)