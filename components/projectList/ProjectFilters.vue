<template>
  <v-card flat>
    <!-- DEFAULT FILTERS -->
    <v-row no-gutters>
      <v-col cols="12">
        <v-card-title class="pl-0 pt-0" :class="{'pr-0':$vuetify.breakpoint.smAndDown}">
          <!--   TOGGLE FILTERS BUTTON -->
          <v-btn outlined small color="white" @click="showFilters=!showFilters" class="overline">
            <template v-if="showFilters">
              <v-icon>mdi-filter-variant</v-icon>&nbsp;Hide Filters&nbsp;
              <v-icon>mdi-chevron-up</v-icon>
            </template>
            <template v-else>
              <v-icon>mdi-filter-variant</v-icon>&nbsp;Show Filters&nbsp;
              <v-icon>mdi-chevron-down</v-icon>
            </template>
          </v-btn>
          <!-- RESET FILTERS BUTTON -->
          <v-btn
            outlined
            small
            v-if="filtering"
            color="white"
            @click="filters= {search:'', field: [],type: '',zone: 'worldwide',country: [], verified: false, thematics:[], state:'', featured:false};$router.push({query:{}});"
            class="ml-3"
          >
            <v-icon>mdi-refresh</v-icon>&nbsp;Reset filters
          </v-btn>
          <v-spacer></v-spacer>
          <!-- VERFIED ONLY TOGGLE CHECKBOX-->
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-checkbox
                v-model="filters.verified"
                label="Verified"
                class="mr-3"
                @change="$router.push({query:{...$route.query,verified:filters.verified?'true':undefined}})"
                v-on="on"
                :disabled="filters.featured==='true'"
              ></v-checkbox>
            </template>
            <span>{{filters.featured?'Featured projects are always verified':'Select to display only projects verified by a WPRN Referent'}}</span>
          </v-tooltip>
          <!-- FEATURED ONLY TOGGLE CHECKBOX-->
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
          <!-- SEARCH FIELD -->
          <v-text-field
            class="pt-0"
            v-model.trim="filters.search"
            label="Search"
            placeholder="Search a project"
            prepend-inner-icon="mdi-magnify"
            :class="$vuetify.breakpoint.smAndDown?'mr-0':'mr-4'"
            single-line
            hide-details
            clearable
            solo
            dense
            dark
            outlined
            max-width="400px;"
            @click:clear="$router.push({query:{...$route.query, search:undefined}}); filters.search=''"
            @blur="$router.push({query:{...$route.query,search:filters.search&&filters.search.length?JSON.stringify(filters.search):undefined}})"
            @keypress.enter="$router.push({query:{...$route.query, search:filters.search.length?JSON.stringify(filters.search):undefined}})"
            ref="search_field"
          ></v-text-field>
        </v-card-title>
      </v-col>
    </v-row>
    <!-- ADVANCED FILTERS -->
    <v-expand-transition class="align-center">
      <v-row :class="{'pr-8':$vuetify.breakpoint.mdAndUp}" v-show="showFilters">
        <!-- ZONE -->
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
            @change="updateZoneAndCountries()"
            @click:clear="filters.zone='worldwide';$router.push({query:{...$route.query,zone:JSON.stringify('worldwide')}});"
          ></v-select>
        </v-col>
        <!-- COUNTRY -->
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-combobox
            :disabled="loading"
            :items="!filters.zone||filters.zone!=='worldwide'?countries[filters.zone]:Object.keys(countries).map(countryKey=>countries[countryKey]).flat().sort()"
            no-data-text="No country matching your search"
            @change="$router.push({query:{...$route.query, country:filters.country&&filters.country.length?JSON.stringify(filters.country):undefined}})"
            @click:clear="$router.push({...$route.query,query:{country:undefined}});"
            label="Country"
            outlined
            multiple
            v-model="filters.country"
            clearable
            hide-details
            dense
          ></v-combobox>
        </v-col>
        <!-- STATE (ONGOING, COMPLETED ...) -->
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-select
            :items="state"
            label="Project status"
            outlined
            v-model="filters.status"
            ref="status"
            :disabled="loading"
            hide-details
            clearable
            dense
            @click:clear="$router.push({...$route.query,query:{status:undefined}});"
            @change="$router.push({query:{...$route.query, status:filters.status&&filters.status.length?JSON.stringify(filters.status):undefined}})"
          ></v-select>
        </v-col>

        <!--   FIELD (DISCIPLINES) -->
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
            @change="$router.push({query:{...$route.query, field:filters.field&&filters.field.length?JSON.stringify(filters.field):undefined}})"
            @click:clear="$router.push({...$route.query,query:{field:undefined}});"
          ></v-combobox>
        </v-col>
        <!-- THEMATICS -->
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
            @change="$router.push({query:{...$route.query, thematics:filters.thematics&&filters.thematics.length?JSON.stringify(filters.thematics):undefined}})"
            @click:clear="$router.push({...$route.query,query:{thematics:undefined}});"
          ></v-combobox>
        </v-col>
        <!-- PROJECT TYPE(S) -->
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
            @change="$router.push({query:{...$route.query, type:filters.type&&filters.type.length?JSON.stringify(filters.type):undefined}})"
            @click:clear="$router.push({...$route.query,query:{type:undefined}});"
            clearable
          ></v-select>
        </v-col>
      </v-row>
    </v-expand-transition>
  </v-card>
</template>
<script>
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
      showFilters: this.$route.query && !!Object.keys(this.$route.query).length,
      filtering: false,
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
      },

      searching: this.$route.query || this.$route.query.search || false
    };
  },
  mounted() {},
  props: {
    loading: Boolean
  },
  components: {},
  methods: {
    focusSearch() {
      this.filters.searching = !this.filters.searching;
      setTimeout(() => {
        this.$refs["search_field"].focus();
      }, 1000);
    },
    updateCheckBox() {
      if (this.filters.featured) {
        this.filters.verified = true;
      }
      this.$router.push({
        query: {
          ...this.$route.query,
          verified: JSON.stringify(this.filters.verified),
          featured: this.filters.featured ? "true" : undefined
        }
      });
    },
    updateZoneAndCountries() {
      if (!this.filters.zone) {
        this.filters.zone = "worldwide";
      }
      if (this.filters.country.length && this.filters.zone !== "worldwide") {
        this.filters.country = this.filters.country.filter(item =>
          this.countries[this.filters.zone].includes(item)
        );
      }
      if (this.filters.zone !== "worldwide") {
        this.$router.push({
          query: {
            ...this.$route.query,
            zone: JSON.stringify(this.filters.zone),
            country:
              this.filters.country && this.filters.country.length
                ? JSON.stringify(this.filters.country)
                : undefined
          }
        });
      } else {
        this.$router.push({
          query: {
            ...this.$route.query,
            zone: undefined
          }
        });
      }
    }
  },
  watch: {
    "$route.query"() {
      this.filtering = false;
      Object.keys(this.filters).forEach(key => {
        if (typeof this.$route.query[key] !== "undefined") {
          this.filtering = true;
          this.filters[key] = JSON.parse(this.$route.query[key]);
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
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
