<template>
  <div>
    <v-card class="mx-auto" flat>
      <v-card-title primary-title class="pl-0">
        <v-btn text @click="showFilters=!showFilters;filters.searching=showFilters">
          <v-icon>mdi-filter-variant</v-icon>FILTERS
          <v-icon>{{showFilters?'mdi-chevron-down':'mdi-chevron-up'}}</v-icon>
        </v-btn>
        <v-btn
          v-if="
         $route.query.tags ||
         $route.query.filters ||
         $route.query.search"
          @click="$router.push({query:{}});showFilters=false;filters.search='';filters.followed=false;filters.reviewed=false;filters.hosted=false;"
        >
          <v-icon>mdi-refresh</v-icon>Reset filters
        </v-btn>
        <v-spacer></v-spacer>
        <v-tooltip bottom v-if="!filters.searching">
          <template v-slot:activator="{ on }">
            <v-btn icon @click="focusSearch()" class="mr-4" v-on="on">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </template>
          <span>Search</span>
        </v-tooltip>
        <!--      EXPANDABLE SEARCH FIELD -->
        <v-card flat v-show="filters.searching" height="auto" width="auto">
          <v-expand-transition class="align-center">
            <v-text-field
              class="pt-0 mr-4"
              v-model="filters.search"
              label="Search"
              placeholder="Search a project"
              prepend-icon="mdi-magnify"
              single-line
              hide-details
              clearable
              outlined
              dense
              @click:clear="filters.search='';filters.searching=false;$router.push({
              path: $route.path,
              query: {
                tags:$route.query.tags,
                filters:$route.query.filters,
                search: undefined
                }})"
              @change="$router.push({
              path: $route.path,
              query: {
                tags:$route.query.tags,
                filters:$route.query.filters,
                search: JSON.stringify(filters.search)
                }
            })"
              ref="search_field"
            ></v-text-field>
          </v-expand-transition>
        </v-card>
        <nuxt-link :to="{ path: '/#register'}">
          <v-btn color="primary" depressed>
            <v-icon>mdi-plus</v-icon>NEW PROJECT
          </v-btn>
        </nuxt-link>
      </v-card-title>

      <v-expand-transition>
        <v-card-text v-show="showFilters" class="filter_panel ml-0 ml-0 pl-0">
          <TagPicker profile routeSlugs></TagPicker>
          <v-row justify="space-between" class="ml-7">
            <v-checkbox
              inline
              v-model="filters.followed"
              @change="$router.push({
              path: $route.path,
              query: {
                tags:$route.query.tags,
                search:$route.query.search,
                filters: getFilters()}
            })"
              label="Only followed content"
            ></v-checkbox>
            <v-checkbox
              inline
              v-model="filters.reviewed"
              @change="$router.push({
              path: $route.path,
              query: {
                tags:$route.query.tags,
                search:$route.query.search,
                filters: getFilters()}
            })"
              label="With reviews"
            ></v-checkbox>
            <v-checkbox
              inline
              v-model="filters.hosted "
              @change="$router.push({
              path: $route.path,
              query: {
                tags:$route.query.tags,
                search:$route.query.search,
                filters: getFilters()}
            })"
              label="With an host candidate"
            ></v-checkbox>
            <v-col cols="0" md="6"></v-col>
          </v-row>
        </v-card-text>
      </v-expand-transition>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showFilters: this.$route.query.filters || this.$route.query.search,
      expanded: [],
      filters: {
        fields: [],
        status: [],
        reviewed: this.$route.query.filters
          ? JSON.parse(this.$route.query.filters).includes("reviewed")
          : false,
        hosted: this.$route.query.filters
          ? JSON.parse(this.$route.query.filters).includes("hosted")
          : false,
        followed: this.$route.query.filters
          ? JSON.parse(this.$route.query.filters).includes("followed")
          : false,
        search: this.$route.query.search
          ? JSON.parse(this.$route.query.search)
          : "",
        searching:
          this.$route.query.filters || this.$route.query.search || false
      }
    };
  },
  mounted() {
    console.log(
      this.$route.query.filters ? JSON.parse(this.$route.query.filters) : false
    );
  },
  props: {
    all: Boolean
  },
  components: {},
  methods: {
    focusSearch() {
      this.filters.searching = !this.filters.searching;
      setTimeout(() => {
        this.$refs["search_field"].focus();
      }, 1000);
    },
    getFilters() {
      const filterObject = [];
      if (this.filters.followed) filterObject.push("followed");
      if (this.filters.hosted) filterObject.push("hosted");
      if (this.filters.reviewed) filterObject.push("reviewed");
      return JSON.stringify(filterObject);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
