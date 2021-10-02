import { join } from 'path'
import { mergeResolvers } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'

const arrayResolvers = loadFilesSync(join(__dirname, './resolvers'), { extensions: ['js','ts'] });

export default mergeResolvers(arrayResolvers)