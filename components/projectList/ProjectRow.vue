<template>
  <tr
    class="font-weight-medium"
    @click="$emit('expand', item)"
  >
    <!-- STATUS -->
    <td class="px-1">
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
    </td>
    <!-- NAME -->
    <td
      :style="
        $vuetify.breakpoint.mdAndUp ? 'min-width:30vw;' : 'min-width:40vw;'
      "
      class="px-1"
      v-html="$options.filters.highlight(item.name, filters.search.split(' '))"
    >
      <!-- INSTITUTION -->
    </td>
    <td
      class="px-1"
      :style="
        $vuetify.breakpoint.mdAndUp ? 'min-width:10vw;' : 'min-width:15vw;'
      "
    >
      {{ item.contact_entity | truncate(18) }}
    </td>
    <!-- FIELD -->
    <td class="px-1">
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
                  :dark="filters.field.includes(field)"
                  small
                  light
                  label
                  v-on="on"
                >
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
              :dark="filters.field.includes(field)"
              small
              light
              label
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
    </td>
    <!-- THEMATICS -->
    <td class="px-1">
      <template v-for="(thematics, index) in orderItems(item, 'thematics')">
        <template v-if="index < 2">
          <template v-if="thematics.length > 16">
            <v-tooltip
              :key="index"
              top
            >
              <template v-slot:activator="{ on }">
                <v-chip
                  :key="index"
                  class="ma-1"
                  :light="filters.thematics.includes(thematics)"
                  :color="filters.thematics.includes(thematics) ? 'white' : ''"
                  outlined
                  small
                  label
                  v-on="on"
                >
                  {{ thematics | truncate(16) }}
                </v-chip>
              </template>
              <span>{{ thematics }}</span>
            </v-tooltip>
          </template>
          <template v-else>
            <v-chip
              :key="index"
              class="ma-1"
              :light="filters.thematics.includes(thematics)"
              :color="filters.thematics.includes(thematics) ? 'white' : ''"
              outlined
              small
              label
            >
              {{ thematics }}
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
    </td>
    <!-- TYPE -->
    <td class="px-1">
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
                  :dark="filters.type.includes(type)"
                  class="ma-1"
                  small
                  light
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
              :dark="filters.type.includes(type)"
              small
              light
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
    </td>
    <!-- ZONE (CONTINENT) -->
    <td class="px-1">
      <template v-for="(zone, index) in item.zone">
        <template v-if="item.zone.length === 1 && zone === 'worldwide'">
          <v-chip
            :key="index"
            small
            label
            :color="filters.zone.includes(zone) ? '#c4c4c4' : 'accent'"
            light
            class="ma-1"
          >
            Worldwide
          </v-chip>
        </template>
        <template v-else>
          <template v-if="index < 2">
            <v-chip
              :key="index"
              small
              label
              :color="filters.zone.includes(zone) ? '#c4c4c4' : 'accent'"
              light
              class="ma-1"
            >
              {{ zones.find((zoneItem) => zone === zoneItem.value).text }}
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
                        (zone) =>
                          !orderItems(item, "zone").slice(2).includes(zone.value)
                      )
                      .map((zone) => zone.text)
                      .join(",&nbsp;")
                  }}
                </span>
                <!-- B-) -->
              </v-tooltip>
            </template>
          </template>
        </template>
      </template>
    </td>
    <!-- COUNTRY -->
    <td class="px-1">
      <template v-for="(country, index) in orderItems(item, 'country')">
        <template v-if="index < 2">
          <v-chip
            :key="index"
            small
            class="ma-1"
            :light="filters.country.includes(country)"
          >
            {{ country }}
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
    </td>
    <!-- ACTIONS -->
    <td class="pr-0">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            text
            icon
            @click.stop="$emit('expand', item)"
            v-on="on"
          >
            <v-icon>
              {{
                expanded.includes(item) ? "mdi-chevron-up" : "mdi-chevron-down"
              }}
            </v-icon>
          </v-btn>
        </template>
        <span>
          {{
            expanded.includes(item) ? "Hide details" : "See this project details"
          }}
        </span>
      </v-tooltip>
    </td>
  </tr>
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
    expanded: Array,
    item: Object,
    filters: Object
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
  methods: {
    orderItems (project, item) {
      if (this.filters[item].length && project[item] && project[item].length) {
        let items = project[item]

        if (item === 'zone') {
          items = [
            items.find((dat) => dat === this.filters[item]),
            ...items.filter((dat) => dat !== this.filters[item])
          ]
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
    }
  }
}
</script>
