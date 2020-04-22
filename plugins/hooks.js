import * as queries from "~/graphql/queries";
import gql from "graphql-tag";
import client from "~/plugins/amplify";
import fs from 'fs'
import path from 'path'

export default {
  hooks: {
    build: {
      before(builder) {
        const data = await client.query({
          query: gql(queries.getStats),
          fetchPolicy: "network-only"
        });
        const extraFilePath = path.join(builder.nuxt.options.buildDir, 'stats.js')
        fs.writeFileSync(extraFilePath, 'Something extra')
      }
    }
  }
}
