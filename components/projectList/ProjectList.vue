<template>
  <div>
    <v-data-table
      dense
      :expanded.sync="expanded"
      :headers="headers"
      :items="projects"
      item-key="id"
      :server-items-length="projects&&projects['total']"
      class="elevation-1"
      :options.sync="options"
      :footer-props="{itemsPerPageOptions: [5,10,20,50,100]}"
    >
      <template v-slot:no-data>
        <template v-if="!filters.length&&!search.length">
          <div class="my-3"></div>There are no projects to display
        </template>
        <template v-else>No projects match your search.</template>
      </template>
      <template v-slot:item="{ item }">
        <!--  TODO fix this damn toggle to handle when dark mode is activated, the row bg color should adapt if item has been viewed before -->
        <tr
          :class="$vuetify.theme.dark?{'grey darken-3':item.hasViewed}:{'grey lighten-4':item.hasViewed}"
          @click="$router.push({ path: 'projects/'+item.id, params: { id: item.id }})"
        >
          <td>{{item.name}}</td>
          <td>
            <ProjectStatusBadge :status="item.status" />
          </td>
          <td>
            <v-chip small v-for="(field, index) in item.field" :key="index">{{field}}</v-chip>
          </td>
          <td>{{item.type}}</td>
          <td>{{item.zone}}</td>
          <td>
            <v-chip small v-for="(country, index) in item.country" :key="index">{{country}}</v-chip>
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
              <span>{{expanded.includes(item)?'Collapse this row':'Expand this row'}}</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
      <template v-slot:expanded-item="{ item }">
        <v-expand-transition>
          <td colspan="8">
            <v-card class="ml-3 mt-3 pb-3" flat>
              <span class="overline">CONTACT :</span>
              {{item.contact_firstname + ' ' + item.contact_lastname}}
              <template
                v-if="item.contact_entity"
              >({{item.contact_entity}})</template>
              <span class="overline">Descripion</span>
              <v-card-text>{{item.description}}</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  @click="all?$router.push({ path: 'projects/'+item.id, params: { id: item.id }}):$router.push({ path: 'projects/draft/'+item.id, params: { id: item.id }})"
                >
                  Open project url&nbsp;
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-card-actions>
              <v-divider class="mt-3"></v-divider>
            </v-card>
          </td>
        </v-expand-transition>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import listProjects from "~/graphql/queries/list.gql";
import ProjectStatusBadge from "~/components/projectList/ProjectStatusBadge";
import Amplify, { API, graphqlOperation } from "aws-amplify";
export default {
  data() {
    return {
      projects: [],
      expanded: [],
      showFilters: false,
      projectId: "",
      filters: this.$route.query.filters
        ? JSON.parse(this.$route.query.filters)
        : false,
      total: 0,
      options: {
        itemsPerPage: 10,
        page: 1,
        sortBy: [],
        sortDesc: [true]
      },
      skip: 0,
      limit: 10,
      search: this.$route.query.search
        ? JSON.parse(this.$route.query.search)
        : "",
      headers: [
        {
          text: "Name",
          align: "left",
          sortable: true,
          value: "name"
        },
        {
          text: "Status",
          align: "left",
          sortable: true,
          value: "status"
        },
        {
          text: "Field",
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
  mounted() {
    this.refreshQuery();
  },
  props: {},
  computed: {},
  methods: {
    async refreshQuery() {
      console.log("REFRESH QUERY", listProjects);

      const projects = await API.graphql(
        graphqlOperation(listProjects.loc.source.body, {})
      );
      console.log(projects);

      this.projects = projects.data.listProjects.items;
    }
  },
  components: {
    ProjectStatusBadge
  },
  watch: {
    "$route.query"() {
      console.log("QUERY", this.$route.query);
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
      refreshQuery();
    }
  }
};
</script>
<style lang="scss" scoped>
tr {
  cursor: pointer !important;
}
</style>
