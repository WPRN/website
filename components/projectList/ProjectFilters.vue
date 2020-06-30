<template>
  <v-card
    flat
    :class="{'mt-6': !pinned||vuetify.breakpoint.smAndDown}"
  >
    <!-- DEFAULT FILTERS -->
    <v-row no-gutters>
      <v-col cols="12">
        <v-card-title
          class="pl-0 pt-0"
          :class="{ 'pr-0': $vuetify.breakpoint.smAndDown }"
        >
          <!-- SEARCH FIELD -->
          <v-text-field
            ref="search_field"
            v-model.trim="filters.search"
            class="pt-0 filter"
            label="Search"
            placeholder="Search projects"
            prepend-inner-icon="mdi-magnify"
            :class="$vuetify.breakpoint.smAndDown ? 'mr-0' : 'mr-4'"
            single-line
            hide-details
            clearable
            solo
            dense
            dark
            outlined
            max-width="400px;"
            @click:clear="
              $router.push({ query: { ...$route.query, search: undefined } })
              filters.search = ''
            "
            @blur="
              $router.push({
                query: {
                  ...$route.query,
                  search:
                    filters.search && filters.search.length
                      ? JSON.stringify(filters.search)
                      : undefined,
                },
              })
            "
            @keypress.enter="
              $router.push({
                query: {
                  ...$route.query,
                  search: filters.search.length
                    ? JSON.stringify(filters.search)
                    : undefined,
                },
              })
            "
          />
          <!-- VERFIED ONLY TOGGLE CHECKBOX-->
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-checkbox
                v-model="filters.verified"
                label="Verified"
                class="mx-3 filter"
                :dense="$vuetify.breakpoint.mdAndDown||pinned"
                :disabled="filters.featured === true"
                @change="
                  $router.push({
                    query: {
                      ...$route.query,
                      verified: filters.verified ? 'true' : undefined,
                    },
                  })
                "
                v-on="on"
              />
            </template>
            <span>
              {{
                filters.featured
                  ? "Featured projects are always verified"
                  : "Tick this to display only projects verified by a WPRN Referent"
              }}
            </span>
          </v-tooltip>
          <!-- FEATURED ONLY TOGGLE CHECKBOX-->
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-checkbox
                v-model="filters.featured"
                label="Featured"
                class="ml-3 filter"
                :dense="$vuetify.breakpoint.mdAndDown||pinned"
                @change="updateCheckBox()"
                v-on="on"
              />
            </template>
            <span>Tick this to display only projects featured by the WPRN community</span>
          </v-tooltip>
          <v-spacer />
          <!-- PIN BUTTON -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-show="showFilters&&$vuetify.breakpoint.mdAndUp"
                outlined
                color="white"
                class="mr-3"
                :dense="$vuetify.breakpoint.mdAndDown||pinned"
                @click="pinned = !pinned"
                v-on="on"
              >
                <v-icon>{{ pinned?'mdi-pin':'mdi-pin-off' }}</v-icon>
              </v-btn>
            </template>
            <span>{{ pinned?'Unpin the advanced filter menu':'Pin the advanced filter menu' }}</span>
          </v-tooltip>

          <!-- RESET FILTERS BUTTON -->
          <v-btn
            v-if="filtering&&showFilters"
            outlined
            color="white"
            class="mr-3 filter"
            :dense="$vuetify.breakpoint.mdAndDown||pinned"
            @click="
              filters = {
                search: '',
                field: [],
                type: '',
                zone: '',
                country: [],
                verified: false,
                thematics: [],
                state: '',
                featured: false,
              }
              $router.push({ query: {} })
            "
          >
            <v-icon>mdi-refresh</v-icon>&nbsp;Reset filters
          </v-btn>

          <!--   TOGGLE FILTERS BUTTON -->
          <v-btn
            v-if="!filtering"
            outlined
            color="white"
            :class="{ 'mr-4': $vuetify.breakpoint.mdAndUp }"
            :dense="$vuetify.breakpoint.mdAndDown||pinned"
            @click="showFilters = !showFilters"
          >
            <template v-if="showFilters">
              Hide Filters&nbsp;
              <v-icon>mdi-chevron-up</v-icon>
            </template>
            <template v-else>
              Show Filters&nbsp;
              <v-icon>mdi-chevron-down</v-icon>
            </template>
          </v-btn>
        </v-card-title>
      </v-col>
    </v-row>
    <!-- ADVANCED FILTERS -->
    <v-expand-transition class="align-center">
      <v-row
        v-show="showFilters"
        :class="{ 'pr-8': $vuetify.breakpoint.mdAndUp }"
      >
        <!--   FIELD (DISCIPLINES) -->
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-combobox
            ref="field"
            v-model="filters.field"
            :items="fields"
            label="Discipline(s)"
            outlined
            clearable
            class="filter"
            multiple
            :disabled="loading"
            hide-details
            dense
            @change="
              $router.push({
                query: {
                  ...$route.query,
                  field:
                    filters.field && filters.field.length
                      ? JSON.stringify(filters.field)
                      : undefined,
                },
              })
            "
            @click:clear="
              $router.push({ ...$route.query, query: { field: undefined } })
            "
          />
        </v-col>
        <!-- THEMATICS -->
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-combobox
            ref="thematics"
            v-model="filters.thematics"
            :items="thematics"
            label="Thematic(s)"
            outlined
            clearable
            multiple
            class="filter"
            :disabled="loading"
            hide-details
            dense
            @change="
              $router.push({
                query: {
                  ...$route.query,
                  thematics:
                    filters.thematics && filters.thematics.length
                      ? JSON.stringify(filters.thematics)
                      : undefined,
                },
              })
            "
            @click:clear="
              $router.push({ ...$route.query, query: { thematics: undefined } })
            "
          />
        </v-col>
        <!-- PROJECT TYPE(S) -->
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-select
            ref="type"
            v-model="filters.type"
            :items="types"
            label="Type(s)"
            outlined
            hide-details
            dense
            multiple
            clearable
            class="filter"
            @change="
              $router.push({
                query: {
                  ...$route.query,
                  type:
                    filters.type && filters.type.length
                      ? JSON.stringify(filters.type)
                      : undefined,
                },
              })
            "
            @click:clear="
              $router.push({ ...$route.query, query: { type: undefined } })
            "
          />
        </v-col>
        <!-- STATE (ONGOING, COMPLETED ...) -->
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-select
            ref="status"
            v-model="filters.status"
            :items="state"
            label="Status"
            outlined
            :disabled="loading"
            hide-details
            clearable
            dense
            @click:clear="
              $router.push({ ...$route.query, query: { status: undefined } })
            "
            @change="
              $router.push({
                query: {
                  ...$route.query,
                  status:
                    filters.status && filters.status.length
                      ? JSON.stringify(filters.status)
                      : undefined,
                },
              })
            "
          />
        </v-col>
        <!-- ZONE -->
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-select
            ref="zone"
            v-model="filters.zone"
            :items="zones"
            label="Continent(s)"
            outlined
            :disabled="loading"
            clearable
            hide-details
            multiple
            class="filter"
            dense
            @change="updateZoneAndCountries()"
            @click:clear="
              $router.push({
                query: { ...$route.query, zone:undefined },
              })
            "
          />
        </v-col>
        <!-- COUNTRY -->
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-combobox
            v-model="filters.country"
            :disabled="loading"
            :items="
              filters.zone.includes('worldwide') || !filters.zone.length
                ?
                  Object.keys(countries)
                    .map((countryKey) => countries[countryKey])
                    .flat()
                    .sort()
                : Object.keys(countries).filter(continent => filters.zone.includes(continent))
                  .map((countryKey) => countries[countryKey])
                  .flat()
                  .sort()
            "
            no-data-text="No country matching your search"
            label="Countries"
            outlined
            multiple
            clearable
            class="filter"
            hide-details
            dense
            @change="
              $router.push({
                query: {
                  ...$route.query,
                  country:
                    filters.country && filters.country.length
                      ? JSON.stringify(filters.country)
                      : undefined,
                },
              })
            "
            @click:clear="
              $router.push({ ...$route.query, query: { country: undefined } })
            "
          />
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
} from '~/assets/data'
export default {
  components: {},
  props: {
    loading: Boolean
  },
  data () {
    return {
      zones,
      countries,
      types,
      fields,
      state,
      thematics,
      showFilters: this.$route.query && !!Object.keys(this.$route.query).length,
      pinned: false,
      filtering: (this.$route.query && !!Object.keys(this.$route.query).length),
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
      },

      searching: this.$route.query || this.$route.query.search || false
    }
  },
  watch: {
    '$route.query' () {
      this.buildQuery()
    }
  },
  mounted () {
    this.buildQuery()
  },
  methods: {
    focusSearch () {
      this.filters.searching = !this.filters.searching
      setTimeout(() => {
        this.$refs.search_field.focus()
      }, 1000)
    },
    updateCheckBox () {
      if (this.filters.featured) {
        this.filters.verified = true
      }
      this.$router.push({
        query: {
          ...this.$route.query,
          verified: JSON.stringify(this.filters.verified),
          featured: this.filters.featured ? 'true' : undefined
        }
      })
    },
    updateZoneAndCountries () {
      const whitelist = []
      this.filters.zone.forEach(zone => whitelist.push(this.countries[zone]))
      if (this.filters.country.length && this.filters.zone !== ['worldwide']) {
        this.filters.country = this.filters.country.filter((item) =>
          whitelist.includes(item)
        )
      }
      if (this.filters.zone !== ['worldwide']) {
        this.$router.push({
          query: {
            ...this.$route.query,
            zone: this.filters.zone && this.filters.zone.length
              ? JSON.stringify(this.filters.zone)
              : undefined,
            country:
              this.filters.country && this.filters.country.length
                ? JSON.stringify(this.filters.country)
                : undefined
          }
        })
      } else {
        this.$router.push({
          query: {
            ...this.$route.query,
            zone: undefined
          }
        })
      }
    },
    buildQuery () {
      this.filtering = false
      Object.keys(this.filters).forEach((key) => {
        if (typeof this.$route.query[key] !== 'undefined') {
          this.filtering = true
          this.showFilters = true
          this.filters[key] = JSON.parse(this.$route.query[key])
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
    }
  }
}
</script>

<style lang="scss" scoped>
.filter[att]{
color:#90CAF9 !important;
    caret-color: #90CAF9 !important;
}

</style>
