<template>
  <v-hover
    v-slot:default="{ hover }"
    open-delay="200"
  >
    <tr
      class="font-weight-medium"
      :class="$vuetify.breakpoint.mdAndUp ? 'body-1' : 'body-2'"
      :style="expanded.includes(item)?hover?'#616161':'background-color:rgb(45, 45, 45);':'' "
      @click="$emit('expand', item)"
    >
      <!-- NAME & STATUS-->
      <!-- TODO migrate all style tags to a scoped style block-->
      <td
        :style="
          $vuetify.breakpoint.mdAndUp ? 'min-width:30vw;' : 'min-width:40vw;'
        "
        class="pl-1 pr-3"
      >
        <a
          :href="'/item/' + item.pubId"
          @click.prevent
        >
          <div class="d-flex">
            <template v-if="item.status === 'xFEATURED'">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <span v-on="on">
                    <ProjectStatusBadge :status="item.status" />
                  </span>
                </template>
                <span>This is a project featured by the WPRN community</span>
              </v-tooltip>
            </template>
            <ProjectStatusBadge
              v-else
              :status="item.status"
            />
            <span
              v-if="filters.search.length>0"
              v-html="$options.filters.highlight(item.name, filters.search.split(' '))"
            />
            <span
              v-else
            >{{ item.name }}</span>
          </div>
        </a>
      </td>
      <!-- INSTITUTION -->
      <td
        class="px-1"
        :style="
          $vuetify.breakpoint.mdAndUp ? 'min-width:15vw;' : 'min-width:20vw;'
        "
      >
        <a
          :href="'/item/' + item.pubId"
          @click.prevent
        >
          <span
            v-if="filters.search.length>0"
            v-html="$options.filters.highlight(item.contact_entity, filters.search.split(' '))"
          />
          <span
            v-else
          >{{ item.contact_entity }}</span>
        </a>
      </td>
      <!-- FIELD -->
      <td class="px-1">
        <a
          :href="'/item/' + item.pubId"
          @click.prevent
        >
          <template v-for="(field, index) in orderItems(item, 'field')">
            <template v-if="index < 2">
              <template v-if="field.length > 16">
                <v-tooltip
                  :key="index"
                  top
                >
                  <template v-slot:activator="{ on }">
                    <v-chip
                      class="ma-1"
                      :light="filters.field.includes(field)"
                      :color="filters.field.includes(field) ? 'white' : ''"
                      small
                      label
                      outlined
                      v-on="on"
                    >
                      <!--   @click.stop.prevent="updateSearch('field', field)"-->
                      {{ field | truncate(16) }}
                    </v-chip>
                  </template>
                  <span>{{ field }}</span>
                </v-tooltip>
              </template>
              <template v-else>
                <v-chip
                  :key="index"
                  class="ma-1"
                  :light="filters.field.includes(field)"
                  :color="filters.field.includes(field) ? 'white' : ''"
                  small
                  label
                  outlined
                >
                  {{ field }}
                </v-chip>
              </template>
            </template>
            <template v-if="index === 2 && item.field.length > 2">
              <v-tooltip
                :key="index"
                top
              >
                <template v-slot:activator="{ on }">
                  <span
                    class="caption"
                    style="white-space: nowrap;"
                    v-on="on"
                  >+ {{ item.field.length - 2 }} more</span>
                </template>
                <span>
                  {{
                    orderItems(item, "field").slice(2).join(",&nbsp;")
                  }}
                </span>
              </v-tooltip>
            </template>
          </template>
        </a>
      </td>
      <!-- THEMATICS -->
      <td class="px-1">
        <a
          :href="'/item/' + item.pubId"
          @click.prevent
        >
          <template v-for="(thematic, index) in orderItems(item, 'thematics')">
            <template v-if="index < 2">
              <template v-if="thematic.length > 16">
                <v-tooltip
                  :key="index"
                  top
                >
                  <template v-slot:activator="{ on }">
                    <v-chip
                      :key="index"
                      class="ma-1"
                      :light="filters.thematics.includes(thematic)"
                      :color="filters.thematics.includes(thematic) ? 'white' : ''"
                      outlined
                      small
                      label
                      v-on="on"
                    >
                      {{ thematic | truncate(16) }}
                    </v-chip>
                  </template>
                  <span>{{ thematic }}</span>
                </v-tooltip>
              </template>
              <template v-else>
                <v-chip
                  :key="index"
                  class="ma-1"
                  :light="filters.thematics.includes(thematic)"
                  :color="filters.thematics.includes(thematic) ? 'white' : ''"
                  outlined
                  small
                >
                  {{ thematic }}
                </v-chip>
              </template>
            </template>
            <template v-else>
              <template v-if="index === 2 && item.thematics.length > 2">
                <v-tooltip
                  :key="index"
                  top
                >
                  <template v-slot:activator="{ on }">
                    <span
                      class="caption"
                      style="white-space: nowrap;"
                      v-on="on"
                    >+ {{ item.thematics.length - 2 }} more</span>
                  </template>
                  <span>
                    {{
                      orderItems(item, "thematics").slice(2).join(",&nbsp;")
                    }}
                  </span>
                </v-tooltip>
              </template>
            </template>
          </template>
        </a>
      </td>
      <!-- TYPE -->
      <td class="px-1">
        <a
          :href="'/item/' + item.pubId"
          @click.prevent
        >
          <template v-for="(type, index) in orderItems(item, 'type')">
            <template v-if="index < 2">
              <template v-if="type.length > 19 && item.type.length > 1">
                <v-tooltip
                  :key="index"
                  top
                >
                  <template v-slot:activator="{ on }">
                    <v-chip
                      :key="index"
                      :light="filters.type.includes(type)"
                      :color="filters.type.includes(type) ? 'white' : ''"
                      class="ma-1"
                      small
                      outlined
                      v-on="on"
                    >
                      {{ type | truncate(19) }}
                    </v-chip>
                  </template>
                  <span>{{ type }}</span>
                </v-tooltip>
              </template>
              <template v-else>
                <v-chip
                  :key="index"
                  class="ma-1"
                  :light="filters.type.includes(type)"
                  :color="filters.type.includes(type) ? 'white' : ''"
                  small
                  outlined
                >
                  {{ type }}
                </v-chip>
              </template>
            </template>
            <template v-else>
              <template v-if="index === 2 && item.type.length > 2">
                <v-tooltip
                  :key="index"
                  top
                >
                  <template v-slot:activator="{ on }">
                    <span
                      class="caption"
                      style="white-space: nowrap;"
                      v-on="on"
                    >+ {{ item.type.length - 2 }} more</span>
                  </template>
                  <span>
                    {{
                      orderItems(item, "type").slice(2).join(",&nbsp;")
                    }}
                  </span>
                </v-tooltip>
              </template>
            </template>
          </template>
        </a>
      </td>
      <!-- ZONE (CONTINENT) -->
      <td class="px-1">
        <a
          :href="'/item/' + item.pubId"
          @click.prevent
        >
          <template v-for="(location, index) in [...zoneFiltered, ...item.country]">
            <template v-if="zones.map(item => item.value).includes(location)">

              <template v-if="index < 2">
                <v-chip
                  :key="index"
                  small
                  label
                  :color="filters.zone.includes(location) ? '#c4c4c4' : 'accent'"
                  light
                  class="ma-1"
                >
                  {{ zones.find((zoneItem) => location === zoneItem.value).text }}
                </v-chip>
              </template>
              <template v-else>
                <template v-if="index === 2 && item.zone.length > 2">
                  <v-tooltip
                    :key="index"
                    top
                  >
                    <template v-slot:activator="{ on }">
                      <span
                        class="caption"
                        style="white-space: nowrap;"
                        v-on="on"
                      >+ {{ item.zone.length - 2 }} more</span>
                    </template>
                    <span>
                      {{
                        zones
                          .filter(
                            (location) =>
                              !orderItems(item, "zone").slice(2).includes(location.value)
                          )
                          .map((location) => location.text)
                          .join(",&nbsp;")
                      }}
                    </span>
                    <!-- B-) -->
                  </v-tooltip>
                </template>
              </template>
            </template>
            <template v-else>
              <template v-if="item.country&&item.country.length">
                <!-- COUNTRY -->
                <template v-if="index < 2">
                  <v-chip
                    :key="index"
                    small
                    class="ma-1"
                    :light="filters.country.includes(location)"
                  >
                    {{ location }}
                  </v-chip>
                </template>
                <template v-else>
                  <template v-if="index === 2 && item.country.length > 2">
                    <v-tooltip
                      :key="index"
                      top
                    >
                      <template v-slot:activator="{ on }">
                        <span
                          class="caption"
                          style="white-space: nowrap;"
                          v-on="on"
                        >+ {{ item.country.length - 2 }} more</span>
                      </template>
                      <span>
                        {{
                          orderItems(item, "country").slice(2).join(",&nbsp;")
                        }}
                      </span>
                    </v-tooltip>
                  </template>
                </template>
              </template>
            </template>
          </template>
        </a>
      </td>
    </tr>
  </v-hover>
</template>
<script>
import ProjectStatusBadge from '~/components/projectList/ProjectStatusBadge'
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
    ProjectStatusBadge
  },
  props: {
    expanded: {
      type: Array,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    filters: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      zones,
      countries,
      types,
      fields,
      state,
      thematics
    }
  },
  computed: {
    zoneFiltered () {
      let continents = this.item.zone.slice()
      continents = continents.filter((continent) => {
        return !(countries[continent] && ((this.filter && this.filter.zone && this.filter.zone.includes(continent)) || countries[continent].some((country) => {
          return this.item.country && this.item.country.some(selectedCountry => selectedCountry === country)
        })))
      })
      console.log('this.item.country: ', this.item.country)
      console.log('continents: ', continents)
      return continents
    }
  },
  methods: {
    orderItems (project, item) {
      if (this.filters[item].length && project[item] && project[item].length) {
        let items = project[item]
        /* TODO zones do not work */
        if (item === 'zone') {
          items = [
            items.find(dat => dat === this.filters[item]),
            ...items.filter((dat) => dat !== this.filters[item])
          ]
        }
        if (item === 'country') {
          this.filters[item].forEach((element) => {
            if (items.includes(element) || (this.filter && this.filter.zone && this.filter.zone.some(zone => {
              if (this.item.pubId === '411152') {
                console.log('INCLUDED', countries[zone].includes(element))
              }
              return countries[zone].includes(element)
            }))) {
              items = [element, ...items.filter((dat) => dat !== element)]
            }
          })
        } else {
          this.filters[item].forEach((element) => {
            if (items.includes(element)) {
              items = [element, ...items.filter((dat) => dat !== element)]
            }
          })
        }
        return items
      } else {
        return project[item]
      }
    } /*
    updateSearch (filter, value) {
      /* TODO Refactor to make more legible
      const query = {
        ...this.$route.query
      }

      if (this.filters[filter] && this.filters[filter].includes(value)) {
        let currentValue = JSON.parse(this.$route.query[filter])

        if (currentValue.length === 1) {
          query[filter] = undefined
        } else {
          query[filter] = JSON.stringify(currentValue.filter(item => item === value))
        }
      } else {
        let currentValue = this.$route.query[filter] ? JSON.parse(this.$route.query[filter]) : false

        if (currentValue && currentValue.length > 0) {
          currentValue.push(value)

          query[filter] = JSON.stringify(currentValue)
        } else {
          query[filter] = this.$route.query[filter] ? [...JSON.stringify(this.$route.query[filter]), value] : JSON.stringify([value])
        }
      }

      this.$router.push({
        query
      })
    } */
  }
}
</script>
<style lang="scss" scoped>

td > a {
  display: block;
  text-decoration:none;
  width:100%;
  color:white;
outline: 0;
}
</style>
