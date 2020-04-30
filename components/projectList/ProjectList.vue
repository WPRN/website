<template>
  <div>
    <v-data-table
      dense
      :expanded.sync="expanded"
      :headers="headers"
      :items="projects"
      :loading="loading"
      item-key="id"
      :server-items-length="total"
      :class="$vuetify.breakpoint.mdAndUp?' elevation-1 ':'elevation-1'"
      class="px-1"
      :options.sync="options"
      :footer-props="{itemsPerPageOptions: [5,10,20,50,100]}"
      hide-default-footer
    >
      <!-- FILTERS -->
      <template v-slot:top>
        <ProjectFilters :loading="loading" />
        <template v-if="total">{{total}}&nbsp;{{total>1?'Results':'Result'}}</template>
      </template>
      <!--  LOADING STATE -->
      <template v-slot:loading>
        <v-skeleton-loader transition="scale-transition" type="table-tbody"></v-skeleton-loader>
      </template>
      <!-- NO DATA STATE -->
      <template v-slot:no-data>
        <template v-if="!filtering">
          <div class="my-3">There are no projects to display</div>
        </template>
        <template v-else>
          No projects match your search.
          <br />
          <v-btn
            outlined
            small
            v-if="filtering"
            color="white"
            @click="$router.push({query:{}})"
            class="ma-3"
          >
            <v-icon>mdi-refresh</v-icon>&nbsp;Reset filters
          </v-btn>
        </template>
      </template>
      <!-- RESULT ROW -->
      <template v-slot:item="{ item }">
        <ProjectRow
          :item="item"
          :expanded="expanded"
          :filters="filters"
          @expand="expanded.includes(item)?expanded=[]:expanded=[item]"
        />
      </template>
      <template v-slot:expanded-item="{ item }">
        <td colspan="9">
          <ProjectDetails
            :project="item"
            :filters="filters"
            @contact="contact=true"
            :expanded="expanded"
          />
        </td>
        <ContactDialog :open="contact" @close="contact=false" :id="item.pubId" />
      </template>
    </v-data-table>
  </div>
</template>
<script>
import * as queries from "~/graphql/queries";
import ProjectFilters from "~/components/projectList/ProjectFilters";
import ProjectRow from "~/components/projectList/ProjectRow";
import ProjectDetails from "~/components/projectList/ProjectDetails";
import ContactDialog from "~/components/contact/ContactDialog";
import gql from "graphql-tag";
import client from "~/plugins/amplify";
import {
  zones,
  countries,
  types,
  fields,
  state,
  thematics
} from "~/assets/data";
export default {
  data() {
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
      projectId: "",
      nextToken: false,
      total: 0,
      options: {
        itemsPerPage: 100,
        page: 1,
        sortBy: [],
        sortDesc: [true]
      },
      search: "",
      headers: [
        {
          text: "",
          align: "left",
          sortable: false,
          value: "status"
        },
        {
          text: "Name",
          align: "left",
          sortable: false,
          value: "name"
        },
        {
          text: "Status",
          align: "left",
          sortable: false,
          value: "state"
        },
        {
          text: "Discipline",
          align: "left",
          sortable: false,
          value: "type"
        },
        {
          text: "Thematic",
          align: "left",
          sortable: false,
          value: "type"
        },
        {
          text: "Type",
          align: "left",
          sortable: false,
          value: "hostCount"
        },
        {
          text: "Continent",
          align: "left",
          sortable: false,
          value: "continent"
        },
        {
          text: "Country",
          align: "left",
          sortable: false,
          value: "country"
        },
        { text: "Actions", value: "action", sortable: false }
      ],
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
            : "",
        zone:
          this.$route.query && this.$route.query.zone
            ? zones.find(
                zone => JSON.parse(this.$route.query.zone) === zone.value
              ).value
            : "worldwide",
        country:
          this.$route.query && this.$route.query.country
            ? JSON.parse(this.$route.query.country)
            : [],
        verified: this.$route.query ? this.$route.query.verified : false,
        featured: this.$route.query ? this.$route.query.featured : false,
        search:
          this.$route.query && this.$route.query.search
            ? JSON.parse(this.$route.query.search)
            : ""
      }
    };
  },
  created() {},
  mounted() {
    this.refreshQuery();
  },
  props: {},
  computed: {},
  methods: {
    updateCheckBox() {
      if (this.filters.featured) {
        this.filters.verified = true;
      }
      this.refreshQuery();
    },
    async refreshQuery(model) {
      try {
        // clean models from search string artefacts
        if (model) {
          if (model === "field") {
            this.filters.field = this.filters.field.filter(item =>
              fields.includes(item)
            );
          }
          if (model === "country") {
            this.filters.country = this.filters.country.filter(item =>
              this.filters.zone === "worldwide"
                ? Object.keys(countries)
                    .map(countryKey => countries[countryKey])
                    .flat()
                    .includes(item)
                : countries[this.filters.zone].includes(item)
            );
          }
        }
        let filter = { and: [] };
        if (this.filters.featured) {
          filter.status = {
            eq: "xFEATURED"
          };
        } else {
          if (this.filters.verified) {
            filter.status = {
              match: ["xFEATURED", "VERIFIED"]
            };
          } else {
            filter.status = {
              match: ["xFEATURED", "VERIFIED", "PUBLISHED"]
            };
          }
        }
        if (
          this.filters.zone &&
          this.filters.zone.length &&
          !this.filters.zone.includes("worldwide")
        ) {
          filter.zone = {
            match: this.filters.zone
          };
        } else {
          if (!this.filters.zone) {
            this.filters.zone = "worldwide";
          }
        }

        if (this.filters.type && this.filters.type.length) {
          if (this.filters.type.length === 1) {
            filter.type = { matchPhrase: this.filters.type };
          } else {
            let or = [];
            this.filters.type.forEach(type => {
              or.push({ type: { matchPhrase: type } });
            });
            filter.and.push({ or });
          }
        }

        if (this.filters.country && this.filters.country.length) {
          if (this.filters.country.length === 1) {
            filter.country = { matchPhrase: this.filters.country };
          } else {
            let or = [];
            this.filters.country.forEach(country => {
              or.push({ country: { matchPhrase: country } });
            });
            filter.and.push({ or });
          }
        }
        if (this.filters.field && this.filters.field.length) {
          if (this.filters.field.length === 1) {
            filter.field = { matchPhrase: this.filters.field };
          } else {
            let or = [];
            this.filters.field.forEach(field => {
              or.push({ field: { matchPhrase: field } });
            });
            filter.and.push({ or });
          }
        }
        if (this.filters.status && this.filters.status.length) {
          filter.state = {
            matchPhrase: this.filters.status
          };
        }
        if (this.filters.thematics && this.filters.thematics.length) {
          if (this.filters.thematics.length === 1) {
            filter.thematics = { matchPhrase: this.filters.thematics };
          } else {
            let or = [];
            this.filters.thematics.forEach(thematics => {
              or.push({ thematics: { matchPhrase: thematics } });
            });
            filter.and.push({ or });
          }
        }
        if (this.filters.search && this.filters.search.length) {
          let or = [];
          if (this.filters.search.includes(" ")) {
            this.filters.search.split(" ").forEach(element => {
              or.push(
                {
                  pubId: {
                    eq: element
                  }
                },
                {
                  name: {
                    wildcard: "*" + element + "*"
                  }
                },
                {
                  description: {
                    wildcard: "*" + element + "*"
                  }
                },
                {
                  contact_lastname: {
                    wildcard: "*" + element + "*"
                  }
                },
                {
                  contact_entity: {
                    wildcard: "*" + element + "*"
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
              );
            });
          } else {
            or = [
              {
                pubId: {
                  eq: this.filters.search
                }
              },
              {
                name: {
                  wildcard: "*" + this.filters.search + "*"
                }
              },
              {
                description: {
                  wildcard: "*" + this.filters.search + "*"
                }
              },
              {
                contact_lastname: {
                  wildcard: "*" + this.filters.search + "*"
                }
              },
              {
                contact_entity: {
                  wildcard: "*" + this.filters.search + "*"
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
            ];
          }
          filter.and.push({ or });
        }
        this.loading = true;
        if (!filter.and.length) delete filter.and;
        const options = {};
        if (Object.keys(filter).length) options.filter = filter;
        options.limit = 200;
        options["sort"] = { field: "status", direction: "desc" };
        const projects = await client.query({
          query: gql(queries.searchProjects),
          variables: options,
          fetchPolicy: "network-only"
        });
        this.total = projects.data.searchProjects.total;
        this.projects = projects.data.searchProjects.items;
        this.nextToken = projects.data.searchProjects.nextToken;
        this.loading = false;
      } catch (error) {}
    }
  },
  components: {
    ContactDialog,
    ProjectDetails,
    ProjectFilters,
    ProjectRow
  },
  watch: {
    "$route.query"() {
      this.filtering = false;
      Object.keys(this.filters).forEach(key => {
        if (typeof this.$route.query[key] !== "undefined") {
          this.filters[key] = JSON.parse(this.$route.query[key]);
          this.filtering = true;
        } else {
          switch (typeof this.filters[key]) {
            case "boolean":
              this.filters[key] = false;
              break;
            case "string":
              key === "zone"
                ? (this.filters[key] = "worldwide")
                : (this.filters[key] = "");
              break;
            case "object":
              this.filters[key] = [];
              break;
            default:
              break;
          }
        }
      });

      this.refreshQuery();
    }
  }
};
</script>
<style lang="scss" scoped>
tr {
  cursor: pointer !important;
}
</style>
