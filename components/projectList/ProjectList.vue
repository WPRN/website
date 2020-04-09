<template>
  <div>
    <v-data-table
      dense
      :expanded.sync="expanded"
      :headers="headers"
      :items="projects"
      :loading="loading"
      item-key="id"
      :server-items-length="projects&&projects['total']"
      :class="$vuetify.breakpoint.mdAndUp?' elevation-1 px-6':'elevation-1'"
      :options.sync="options"
      :footer-props="{itemsPerPageOptions: [5,10,20,50,100]}"
    >
      <template v-slot:top>
        <v-card flat>
          <v-row no-gutters>
            <v-col cols="12" class="mt-6">
              <v-card-title class="pl-0">
                <span class="overline">
                  <v-icon>mdi-filter-variant</v-icon>Filters
                </span>
                <v-btn
                  outlined
                  small
                  v-if="filtering"
                  color="white"
                  @click="search=''; filters= {field: [],type: '',zone: '',country: [],verified: false, thematics:[], state:'', featured:false};refreshQuery();$router.push({path: '/worldwide'})"
                  class="ml-3"
                >
                  <v-icon>mdi-refresh</v-icon>&nbsp;Reset filters
                </v-btn>
                <v-spacer></v-spacer>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-checkbox
                      v-model="filters.verified"
                      label="Verified"
                      class="mr-3"
                      @change="refreshQuery()"
                      v-on="on"
                      :disabled="filters.featured"
                    ></v-checkbox>
                  </template>
                  <span>{{filters.featured?'Featured projects are always verified':'Select to display only projects verified by a WPRN Referent'}}</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-checkbox
                      v-model="filters.featured"
                      label="Featured"
                      class="mr-3"
                      @change="updateCheckBox()"
                      v-on="on"
                    ></v-checkbox>
                  </template>
                  <span>Select to display only projects featured by the WPRN community</span>
                </v-tooltip>
                <v-text-field
                  class="pt-0 mr-4"
                  v-model.trim="search"
                  label="Search"
                  placeholder="Search a project"
                  prepend-inner-icon="mdi-magnify"
                  single-line
                  hide-details
                  clearable
                  solo
                  dense
                  dark
                  outlined
                  max-width="400px;"
                  @click:clear="refreshQuery()"
                  @change="refreshQuery()"
                  ref="search_field"
                ></v-text-field>
              </v-card-title>
            </v-col>
          </v-row>
          <v-row :class="{'pr-8':$vuetify.breakpoint.mdAndUp}">
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-select
                :items="state"
                label="Project status"
                outlined
                v-model="filters.state"
                ref="state"
                :disabled="loading"
                hide-details
                dense
                @click:clear="refreshQuery()"
                @change="refreshQuery()"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-select
                :items="zones"
                label="Continent"
                outlined
                v-model="filters.zone"
                :clearable="filters.zone!=='worldwide'"
                ref="zone"
                :disabled="loading"
                hide-details
                dense
                @click:clear="filters.zone='worlwide';refreshQuery()"
                @change="refreshQuery()"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-combobox
                :disabled="!filters.zone|| loading"
                :items="filters.zone!=='worldwide'?countries[filters.zone]:Object.keys(countries).map(countryKey=>countries[countryKey]).flat().sort()"
                no-data-text="No country matching your search"
                @change="refreshQuery('country')"
                label="Country"
                outlined
                multiple
                v-model="filters.country"
                clearable
                hide-details
                dense
              ></v-combobox>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-combobox
                :items="fields"
                label="Project discipline(s)"
                outlined
                v-model="filters.field"
                clearable
                multiple
                ref="field"
                :disabled="loading"
                hide-details
                dense
                @change="refreshQuery('field')"
              ></v-combobox>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-combobox
                :items="thematics"
                label="Project Thematic(s)"
                outlined
                v-model="filters.thematics"
                clearable
                multiple
                ref="thematics"
                :disabled="loading"
                hide-details
                dense
                @change="refreshQuery()"
              ></v-combobox>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-select
                :items="types"
                label="Project type"
                outlined
                v-model="filters.type"
                ref="type"
                hide-details
                dense
                multiple
                @change="refreshQuery()"
                clearable
              ></v-select>
            </v-col>
          </v-row>
        </v-card>
      </template>
      <template v-slot:loading>
        <v-skeleton-loader transition="scale-transition" type="table-tbody"></v-skeleton-loader>
      </template>
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
            v-if="search&&search.length||filters.field&&filters.field.length||filters.type&&filters.type.length||((filters.zone&&filters.zone.length)||filters.zone!=='worldwide')"
            color="white"
            @click="search=''; filters= {field: [],type: '',zone: '',country: [],verified: false, thematics:[], state:'', featured:false};refreshQuery();$router.push({path: '/worldwide', query:undefined})"
            class="ma-3"
          >
            <v-icon>mdi-refresh</v-icon>&nbsp;Reset filters
          </v-btn>
        </template>
      </template>
      <template v-slot:item="{ item }">
        <tr
          :class="$vuetify.theme.dark?{'grey darken-3':item.hasViewed}:{'grey lighten-4':item.hasViewed}"
          @click="expanded.includes(item)?expanded=[]:expanded=[item]"
        >
          <td>{{item.name}}</td>
          <td>
            <ProjectStatusBadge :status="item.status" />
          </td>
          <td>
            <v-chip
              class="ma-1"
              small
              light
              label
              v-for="(field, index) in item.field"
              :key="index"
            >{{field}}</v-chip>
          </td>
          <td>
            <v-chip
              class="ma-1"
              small
              light
              v-for="(type, index) in item.type"
              :key="index"
            >{{type}}</v-chip>
          </td>
          <td>
            <v-chip
              small
              label
              light
              class="ma-1"
              v-for="(zone, index) in item.zone"
              :key="index"
            >{{zones.find(zoneItem => zone === zoneItem.value).text }}</v-chip>
          </td>
          <td>
            <v-chip
              small
              class="ma-1"
              v-for="(country, index) in item.country"
              :key="index"
            >{{country}}</v-chip>
          </td>
          <td class="pr-0">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  icon
                  @click.stop="expanded.includes(item)?expanded=[]:expanded=[item]"
                  v-on="on"
                >
                  <v-icon>{{expanded.includes(item)?'mdi-chevron-up':'mdi-chevron-down'}}</v-icon>
                </v-btn>
              </template>
              <span>{{expanded.includes(item)?'Hide details':'See this project details'}}</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
      <template v-slot:expanded-item="{ item }">
        <v-expand-transition>
          <td colspan="8">
            <v-card class="ml-3 mt-3 pb-3" flat>
              <v-card-text class="pb-0 white--text">
                <span class="overline">CREATION DATE :</span>
                <br />
                {{item.createdAt.split('T')[0]}} at {{item.createdAt.split('T')[1].split(':')[0]}}h{{item.createdAt.split('T')[1].split(':')[1]}} (GMT)
              </v-card-text>
              <v-card-text class="pb-0 white--text">
                <span class="overline">CONTACT :</span>
                <br />
                {{item.contact_firstname + ' ' + item.contact_lastname}}
                <template
                  v-if="item.contact_entity"
                >({{item.contact_entity}})</template>
              </v-card-text>
              <v-card-text class="pb-0 white--text">
                <span class="overline">Thematics</span>
                <br />
                <span v-for="(thematic, index) in item.thematics" :key="index">
                  <template v-if="index>0">,&nbsp;</template>
                  {{thematic}}
                </span>
              </v-card-text>
              <v-card-text class="pb-0 white--text">
                <span class="overline">Status</span>
                <br />
                {{item.state}}
              </v-card-text>
              <v-card-text class="pb-0 white--text">
                <span class="overline">Description</span>
                <br />
                {{item.description}}
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="accent" @click="contact=true">
                  <v-icon>mdi-email-edit</v-icon>&nbsp;
                  Email this project contact
                </v-btn>
                <v-btn v-if="item.url" color="accent">
                  <a
                    :href="item.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    style="text-decoration:none;color:white;"
                  >
                    Open project url&nbsp;
                    <v-icon>mdi-chevron-right</v-icon>
                  </a>
                </v-btn>
                <v-btn
                  v-else
                  color="accent"
                  @click="$store.commit('setProject', item);$router.push({path:'/item/'+ item.pubId})"
                >
                  Open project page&nbsp;
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-card-actions>
              <v-divider class="mt-3"></v-divider>
            </v-card>
          </td>
        </v-expand-transition>
        <ContactDialog :open="contact" @close="contact=false" :id="item.pubId" />
      </template>
    </v-data-table>
  </div>
</template>
<script>
import * as queries from "../../../backend/src/graphql/queries";
import ProjectStatusBadge from "~/components/projectList/ProjectStatusBadge";
import ContactDialog from "~/components/contact/ContactDialog";
import Amplify, { API, graphqlOperation } from "aws-amplify";
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
      projects: this.$store.state.projects,
      expanded: [],
      showFilters: false,
      filtering: false,
      projectId: "",
      limit: 10,
      nextToken: false,
      filters: {
        field: [],
        type: [],
        thematics: [],
        status: "",
        zone:
          zones.find(zone => this.$route.params.zone === zone.value).value ||
          "worldwide",
        country: [],
        verified: false,
        featured: false
      },
      total: 0,
      options: {
        itemsPerPage: 100,
        page: 1,
        sortBy: [],
        sortDesc: [true]
      },
      limit: 100,
      search: "",
      headers: [
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
          value: "status"
        },
        {
          text: "Discipline",
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
      ]
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
      let filter = {};
      if (this.filters.featured) {
        filter = {
          and: [
            {
              or: [
                {
                  status: {
                    eq: "FEATURED"
                  }
                }
              ]
            }
          ]
        };
      } else {
        if (this.filters.verified) {
          filter = {
            and: [
              {
                or: [
                  {
                    status: {
                      eq: "FEATURED"
                    }
                  },
                  {
                    status: {
                      eq: "VERIFIED"
                    }
                  }
                ]
              }
            ]
          };
        } else {
          filter = {
            and: [
              {
                or: [
                  {
                    status: {
                      eq: "FEATURED"
                    }
                  },
                  {
                    status: {
                      eq: "VERIFIED"
                    }
                  },
                  {
                    status: {
                      eq: "PUBLISHED"
                    }
                  }
                ]
              }
            ]
          };
        }
      }
      if (
        this.filters.zone &&
        this.filters.zone.length &&
        !this.filters.zone.includes("worldwide")
      ) {
        filter.and.push({
          zone: {
            eq: this.filters.zone
          }
        });
      } else {
        if (!this.filters.zone) {
          this.filters.zone = "worldwide";
        }
      }
      this.$router.push({
        path: "/" + this.filters.zone,
        params: { zone: this.filters.zone },
        query: this.$router.query
      });
      if (this.filters.type && this.filters.type.length) {
        let typeFilter = { or: [] };
        this.filters.type.forEach(item => {
          typeFilter.or.push({
            type: {
              contains: item
            }
          });
          filter.and.push(typeFilter);
        });
      }
      if (this.filters.country && this.filters.country.length) {
        let countryFilter = { or: [] };
        this.filters.country.forEach(item => {
          countryFilter.or.push({
            country: {
              contains: item
            }
          });
          filter.and.push(countryFilter);
        });
      }
      if (this.filters.field && this.filters.field.length) {
        let fieldFilter = { or: [] };
        this.filters.field.forEach(item => {
          fieldFilter.or.push({
            field: {
              contains: item
            }
          });
          filter.and.push(fieldFilter);
        });
      }
      if (this.filters.state && this.filters.state.length) {
        filter.and.push({
          state: {
            eq: this.filters.state
          }
        });
      }
      if (this.filters.thematics && this.filters.thematics.length) {
        let thematicsFilter = { or: [] };
        this.filters.thematics.forEach(item => {
          thematicsFilter.or.push({
            thematics: {
              contains: item
            }
          });
          filter.and.push(thematicsFilter);
        });
      }
      if (this.search && this.search.length) {
        /*    filter.multi_match = {
          query: this.search,
          fields: [
            "title^3",
            "description",
            "field",
            "contact_lastname^2",
            "contact_entity^2",
            "country"
          ]
        };  */
        const search = {
          or: [
            {
              name: {
                contains: this.search
              }
            },
            {
              field: {
                contains: this.search
              }
            },
            {
              contact_lastname: {
                contains: this.search
              }
            },
            {
              contact_entity: {
                contains: this.search
              }
            },
            {
              country: {
                contains: this.search
              }
            },
            {
              description: {
                contains: this.search
              }
            }
          ]
        };
        filter.and.push(search);
      }
      const limit = 0;
      this.loading = true;

      const options = {};
      if (Object.keys(filter).length) options.filter = filter;
      if (this.nextToken) options.nextToken = this.nextToken;
      Object.keys(filter).length
        ? (this.filtering = true)
        : (this.filtering = false);
      options.limit = this.options.itemsPerPage;

      const projects = await API.graphql(
        graphqlOperation(queries.listProjects, options)
      );

      this.$store.commit("setProjects", projects.data.listProjects.items);
      this.projects = projects.data.listProjects.items;
      this.nextToken = projects.data.listProjects.nextToken;
      this.loading = false;
    },
    getFilters() {
      const filterObject = []; /*
      if (this.filters.type) filterObject.push("type");
      if (this.filters.zone) filterObject.push("zone");
      if (this.filters.field) filterObject.push("field");
      if (this.filters.country) filterObject.push("country");
      if (this.filters.verified) filterObject.push("verified"); */
      return JSON.stringify(filterObject);
    }
  },
  components: {
    ProjectStatusBadge,
    ContactDialog
  },
  watch: {
    "$route.query"() {
      if (this.$route.query.search) {
        this.search = JSON.parse(this.$route.query.search);
      } else {
        this.search = "";
      }
      if (this.$route.query.filters) {
        this.filters = JSON.parse(this.$route.query.filters);
      } else {
        this.filters = [];
      }
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
