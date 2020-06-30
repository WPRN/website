<template>
  <div>
    <v-data-table
      :expanded.sync="expanded"
      :items="projects"
      :loading="loading"
      item-key="id"
      :server-items-length="total"
      :class="{ ' elevation-1 ' : $vuetify.breakpoint.mdAndUp}"
      class="px-1"
      :options.sync="options"
      :footer-props="{ itemsPerPageOptions: [5, 10, 20, 50, 100] }"
      :headers-length="6"
      :dense="$vuetify.breakpoint.mdAndDown"
      @update:page="$vuetify.goTo(0)"
    >
      <!-- FILTERS -->
      <template v-slot:top>
        <ProjectFilters :loading="loading" />
        <div
          v-if="total"
          class="mt-3 ml-1"
        >
          {{ total }}&nbsp;{{ total > 1 ? "Results" : "Result" }}
        </div>
      </template>
      <!-- HEADERS -->
      <template v-slot:header>
        <tr>
          <th class="pl-8">
            Name
          </th>
          <th class="px-1">
            Institution
          </th>
          <th class="px-2">
            Discipline
          </th>
          <th class="px-2">
            Thematic
          </th>
          <th class="px-2">
            Type
          </th>
          <th class="px-2">
            Location
          </th>
        </tr>
      </template>
      <!--  LOADING STATE -->
      <template v-slot:loading>
        <v-skeleton-loader
          transition="scale-transition"
          type="table-tbody"
          width="100%"
        />
      </template>
      <!-- NO DATA STATE -->
      <template v-slot:no-data>
        <template v-if="!filtering">
          <div
            class="my-3"
            width="100%"
          >
            There are no projects to display
          </div>
        </template>
        <template v-else>
          <div
            width="100%"
          >
            No projects match your search.
            <br>
            <v-btn
              v-if="filtering"
              outlined
              small
              color="white"
              class="ma-3"
              @click="
                $router.push({ query: {} })
                page = 1
              "
            >
              <v-icon>mdi-refresh</v-icon>&nbsp;Reset filters
            </v-btn>
          </div>
        </template>
      </template>
      <!-- RESULT ROW -->
      <template v-slot:item="{ item }">
        <ProjectRow
          :item="item"
          :expanded="expanded"
          :filters="filters"
          @expand="
            expanded.includes(item) ? (expanded = []) : (expanded = [item])
          "
        />
      </template>
      <template v-slot:expanded-item="{ item }">
        <td
          colspan="6"
          class="px-0"
        >
          <ProjectExpandedRow
            :project="item"
            :filters="filters"
            :expanded="expanded"
            @contact="contact = true"
          />
        </td>
        <ContactDialog
          :id="item.pubId"
          :open="contact"
          @close="contact = false"
        />
      </template>
    </v-data-table>
  </div>
</template>
<script>
import * as queries from '~/graphql/queries'
import ProjectFilters from '~/components/projectList/ProjectFilters'
import ProjectRow from '~/components/projectList/ProjectRow'
import ProjectExpandedRow from '~/components/projectList/ProjectExpandedRow'
import ContactDialog from '~/components/contact/ContactDialog'
import gql from 'graphql-tag'
import client from '~/plugins/amplify'
import stopWords from '~/assets/stopWords'

import {
  zones,
  countries,
  types,
  fields,
  state,
  thematics
} from '~/assets/data'
export default {
  components: {
    ContactDialog,
    ProjectExpandedRow,
    ProjectFilters,
    ProjectRow
  },
  props: {},
  data () {
    return {
      zones,
      countries,
      types,
      fields,
      state,
      thematics,
      contact: false,
      loading: false,
      projects: [],
      expanded: [],
      filtering: false,
      projectId: '',
      nextToken: false,
      total: 0,
      options: {
        itemsPerPage: 20,
        page: 1,
        sortBy: [],
        sortDesc: [true]
      },
      search: '',
      filters: {
        field:
          this.$route.query && this.$route.query.field
            ? JSON.parse(this.$route.query.field)
            : [],
        type:
          this.$route.query && this.$route.query.type
            ? JSON.parse(this.$route.query.type)
            : [],
        thematics:
          this.$route.query && this.$route.query.thematics
            ? JSON.parse(this.$route.query.thematics)
            : [],
        status:
          this.$route.query && this.$route.query.status
            ? JSON.parse(this.$route.query.status)
            : '',
        zone:
          this.$route.query && this.$route.query.zone
            ? JSON.parse(this.$route.query.zone)
            : [],
        country:
          this.$route.query && this.$route.query.country
            ? JSON.parse(this.$route.query.country)
            : [],
        verified: this.$route.query ? this.$route.query.verified : false,
        featured: this.$route.query ? this.$route.query.featured : false,
        search:
          this.$route.query && this.$route.query.search
            ? JSON.parse(this.$route.query.search)
            : ''
      }
    }
  },
  computed: {},
  watch: {
    options () {
      this.refreshQuery()
    },
    '$route.query' () {
      this.filtering = false
      let previousFilters = JSON.parse(JSON.stringify(this.filters))
      Object.keys(this.filters).forEach((key) => {
        if (typeof this.$route.query[key] !== 'undefined') {
          this.filters[key] = JSON.parse(this.$route.query[key])
          this.filtering = true
        } else {
          switch (typeof this.filters[key]) {
            case 'boolean':
              this.filters[key] = false
              break
            case 'string':
              this.filters[key] = ''
              break
            case 'object':
              this.filters[key] = []
              break
            default:
              break
          }
        }
      })
      if (this.filters !== previousFilters) this.options.page = 1
      this.refreshQuery()
    }
  },
  created () {},
  mounted () {
    this.refreshQuery()
  },
  methods: {
    updateCheckBox () {
      if (this.filters.featured) {
        this.filters.verified = true
      }
      this.refreshQuery()
    },
    /*    addDisjonctiveFilterToQuery (item, filter) {
      if (this.filters[item] && this.filters[item].length) {
        if (this.filters[item].length === 1) {
          filter[item] = { matchPhrase: this.filters[item] }
        } else {
          let or = []
          this.filters[item].forEach((val) => {
            or.push({ item: { matchPhrase: val } })
          })
          filter.and.push({ or })
        }
      }
      return filter
    }, */
    async refreshQuery (model) {
      try {
        // clean models from search string artefacts
        if (model) {
          if (model === 'field') {
            this.filters.field = this.filters.field.filter((item) =>
              fields.includes(item)
            )
          }
          if (model === 'country') {
            this.filters.country = this.filters.country.filter((item) =>
              this.filters.zone === ['worldwide']
                ? Object.keys(countries)
                  .map((countryKey) => countries[countryKey])
                  .flat()
                  .includes(item)
                : Object.keys(countries).filter(continent => this.filters.zone.includes(continent))
                  .map((countryKey) => countries[countryKey])
                  .flat()
                  .includes(item)
            )
          }
        }

        let filter = { and: [] }
        if (this.filters.featured) {
          filter.status = {
            eq: 'xFEATURED'
          }
        } else {
          if (this.filters.verified) {
            filter.status = {
              match: ['xFEATURED', 'VERIFIED']
            }
          } else {
            filter.status = {
              match: ['xFEATURED', 'VERIFIED', 'PUBLISHED']
            }
          }
        }

        if (this.filters.zone && this.filters.zone.length) {
          if (this.filters.zone.length === 1) {
            filter.zone = { matchPhrase: this.filters.zone }
          } else {
            let or = []
            this.filters.zone.forEach((zone) => {
              or.push({ zone: { matchPhrase: zone } })
            })
            filter.and.push({ or })
          }
        }

        if (this.filters.type && this.filters.type.length) {
          if (this.filters.type.length === 1) {
            filter.type = { matchPhrase: this.filters.type }
          } else {
            let or = []
            this.filters.type.forEach((type) => {
              or.push({ type: { matchPhrase: type } })
            })
            filter.and.push({ or })
          }
        }

        if (this.filters.country && this.filters.country.length) {
          if (this.filters.country.length === 1) {
            filter.country = { matchPhrase: this.filters.country }
          } else {
            let or = []
            this.filters.country.forEach((country) => {
              or.push({ country: { matchPhrase: country } })
            })
            filter.and.push({ or })
          }
        }
        if (this.filters.field && this.filters.field.length) {
          if (this.filters.field.length === 1) {
            filter.field = { matchPhrase: this.filters.field }
          } else {
            let or = []
            this.filters.field.forEach((field) => {
              or.push({ field: { matchPhrase: field } })
            })
            filter.and.push({ or })
          }
        }
        if (this.filters.status && this.filters.status.length) {
          filter.state = {
            matchPhrase: this.filters.status
          }
        }
        if (this.filters.thematics && this.filters.thematics.length) {
          if (this.filters.thematics.length === 1) {
            filter.thematics = { matchPhrase: this.filters.thematics }
          } else {
            let or = []
            this.filters.thematics.forEach((thematics) => {
              or.push({ thematics: { matchPhrase: thematics } })
            })
            filter.and.push({ or })
          }
        }
        if (this.filters.search && this.filters.search.length) {
          let or = []
          if (this.filters.search.includes(' ')) {
            let splitted = this.filters.search.split(' ')

            // remove stop words and words with less that 3 chars
            let filtered = splitted.filter(item => !stopWords.includes(item) && item.length > 2)

            if (filtered.length) {
              filtered.forEach((element) => {
                or.push(
                  {
                    pubId: {
                      eq: element
                    }
                  },
                  {
                    name: {
                      wildcard: '*' + element + '*'
                    }
                  },
                  {
                    description: {
                      wildcard: '*' + element + '*'
                    }
                  },
                  {
                    contact_lastname: {
                      wildcard: '*' + element + '*'
                    }
                  },
                  {
                    contact_entity: {
                      wildcard: '*' + element + '*'
                    }
                  },
                  {
                    name: {
                      match: element
                    }
                  },
                  {
                    description: {
                      match: element
                    }
                  },
                  {
                    contact_lastname: {
                      match: element
                    }
                  },
                  {
                    contact_entity: {
                      match: element
                    }
                  }
                )
              })

              filter.and.push({ or })
            }
          } else {
            if (!stopWords.includes(this.filters.search)) {
              or = [
                {
                  pubId: {
                    eq: this.filters.search
                  }
                },
                {
                  name: {
                    wildcard: '*' + this.filters.search + '*'
                  }
                },
                {
                  description: {
                    wildcard: '*' + this.filters.search + '*'
                  }
                },
                {
                  contact_lastname: {
                    wildcard: '*' + this.filters.search + '*'
                  }
                },
                {
                  contact_entity: {
                    wildcard: '*' + this.filters.search + '*'
                  }
                },
                {
                  name: {
                    match: this.filters.search
                  }
                },
                {
                  description: {
                    match: this.filters.search
                  }
                },
                {
                  contact_lastname: {
                    match: this.filters.search
                  }
                },
                {
                  contact_entity: {
                    match: this.filters.search
                  }
                }
              ]
            }
            filter.and.push({ or })
          }
        }
        this.loading = true
        if (!filter.and.length) delete filter.and
        const options = {}
        if (Object.keys(filter).length) options.filter = filter

        options.limit = this.options.itemsPerPage
        options.nextToken = (
          (this.options.page - 1) *
          this.options.itemsPerPage
        ).toString()
        options['sort'] = { field: 'status', direction: 'desc' }

        const projects = await client.query({
          query: gql(queries.searchProjects),
          variables: options
        })

        this.total = projects.data.searchProjects.total
        this.projects = projects.data.searchProjects.items
        this.loading = false
      } catch (error) {}
    }
  }
}
</script>
<style lang="scss" scoped>
tr {
  cursor: pointer !important;
}
</style>
