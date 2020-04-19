<template>
  <tr @click="$emit('expand',item)" class="font-weight-medium">
    <!-- STATUS -->
    <td class="px-1">
      <ProjectStatusBadge :status="item.status" />
    </td>
    <!-- NAME -->
    <td
      :style="$vuetify.breakpoint.mdAndUp?'min-width:30vw;':'min-width:40vw;'"
      class="px-1"
      v-html="$options.filters.highlight(item.name, filters.search)"
    >
      <!-- STATE -->
    </td>
    <td class="px-1">{{item.state.split(' ')[0]}}</td>
    <!-- FIELD -->
    <td class="px-1">
      <template v-for="(field, index) in orderItems(item, 'field')">
        <template v-if="index < 2">
          <template v-if="field.length>16">
            <v-tooltip top :key="index">
              <template v-slot:activator="{ on }">
                <v-chip
                  class="ma-1"
                  :dark="filters.field.includes(field)"
                  small
                  light
                  label
                  v-on="on"
                >{{field|truncate(16)}}</v-chip>
              </template>
              <span>{{field}}</span>
            </v-tooltip>
          </template>
          <template v-else>
            <v-chip
              class="ma-1"
              :dark="filters.field.includes(field)"
              small
              light
              label
              :key="index"
            >{{field}}</v-chip>
          </template>
        </template>
        <template v-if="index===2&&item.field.length>2">
          <v-tooltip :key="index" top>
            <template v-slot:activator="{ on }">
              <span
                v-on="on"
                class="caption"
                style="white-space:nowrap;"
              >+ {{item.field.length - 2}} more</span>
            </template>
            <span>{{orderItems(item, 'field').slice(2).join(",&nbsp;")}}</span>
          </v-tooltip>
        </template>
      </template>
    </td>
    <!-- THEMATICS -->
    <td class="px-1">
      <template v-for="(thematics, index) in orderItems(item, 'thematics')">
        <template v-if="index < 2">
          <template v-if="thematics.length>16">
            <v-tooltip top :key="index">
              <template v-slot:activator="{ on }">
                <v-chip
                  class="ma-1"
                  :light="filters.thematics.includes(thematics)"
                  :color="filters.thematics.includes(thematics)?'white':''"
                  outlined
                  small
                  label
                  :key="index"
                  v-on="on"
                >{{thematics|truncate(16)}}</v-chip>
              </template>
              <span>{{thematics}}</span>
            </v-tooltip>
          </template>
          <template v-else>
            <v-chip
              class="ma-1"
              :light="filters.thematics.includes(thematics)"
              :color="filters.thematics.includes(thematics)?'white':''"
              outlined
              small
              label
              :key="index"
            >{{thematics}}</v-chip>
          </template>
        </template>
        <template v-else>
          <template v-if="index===2&&item.thematics.length>2">
            <v-tooltip :key="index" top>
              <template v-slot:activator="{ on }">
                <span
                  v-on="on"
                  class="caption"
                  style="white-space:nowrap;"
                >+ {{item.thematics.length - 2}} more</span>
              </template>
              <span>{{orderItems(item, 'thematics').slice(2).join(",&nbsp;")}}</span>
            </v-tooltip>
          </template>
        </template>
      </template>
    </td>
    <!-- TYPE -->
    <td class="px-1">
      <template v-for="(type, index) in  orderItems(item, 'type')">
        <template v-if="index < 2">
          <template v-if="type.length>19&&item.type.length>1">
            <v-tooltip top :key="index">
              <template v-slot:activator="{ on }">
                <v-chip
                  :dark="filters.type.includes(type)"
                  class="ma-1"
                  small
                  light
                  v-on="on"
                  :key="index"
                >{{type|truncate(19)}}</v-chip>
              </template>
              <span>{{type}}</span>
            </v-tooltip>
          </template>
          <template v-else>
            <v-chip
              class="ma-1"
              :dark="filters.type.includes(type)"
              small
              light
              :key="index"
            >{{type}}</v-chip>
          </template>
        </template>
        <template v-else>
          <template v-if="index===2&&item.type.length>2">
            <v-tooltip :key="index" top>
              <template v-slot:activator="{ on }">
                <span
                  v-on="on"
                  class="caption"
                  style="white-space:nowrap;"
                >+ {{item.type.length - 2}} more</span>
              </template>
              <span>{{orderItems(item, 'type').slice(2).join(",&nbsp;")}}</span>
            </v-tooltip>
          </template>
        </template>
      </template>
    </td>
    <!-- ZONE (CONTINENT) -->
    <td class="px-1">
      <template v-for="(zone, index) in item.zone">
        <template v-if="item.zone.length===1&&zone==='worldwide'">
          <v-chip
            small
            label
            :color="filters.zone.includes(zone)?'#c4c4c4':'accent'"
            light
            class="ma-1"
            :key="index"
          >Worldwide</v-chip>
        </template>
        <template v-else>
          <template v-if="index < 2">
            <v-chip
              small
              label
              :color="filters.zone.includes(zone)?'#c4c4c4':'accent'"
              light
              class="ma-1"
              :key="index"
            >{{zones.find(zoneItem => zone === zoneItem.value).text }}</v-chip>
          </template>
          <template v-else>
            <template v-if="index===2&&item.zone.length>2">
              <v-tooltip :key="index" top>
                <template v-slot:activator="{ on }">
                  <span
                    v-on="on"
                    class="caption"
                    style="white-space:nowrap;"
                  >+ {{item.zone.length - 2}} more</span>
                </template>
                <span>{{zones.filter(zone => !orderItems(item, 'zone').slice(2).includes(zone.value)).map(zone => zone.text).join(",&nbsp;")}}</span>
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
            small
            class="ma-1"
            :key="index"
            :light="filters.country.includes(country)"
          >{{country}}</v-chip>
        </template>
        <template v-else>
          <template v-if="index===2&&item.country.length>2">
            <v-tooltip :key="index" top>
              <template v-slot:activator="{ on }">
                <span
                  v-on="on"
                  class="caption"
                  style="white-space:nowrap;"
                >+ {{item.country.length - 2}} more</span>
              </template>
              <span>{{orderItems(item, 'country').slice(2).join(",&nbsp;")}}</span>
            </v-tooltip>
          </template>
        </template>
      </template>
    </td>
    <!-- ACTIONS -->
    <td class="pr-0">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn text icon @click.stop="$emit('expand',item)" v-on="on">
            <v-icon>{{expanded.includes(item)?'mdi-chevron-up':'mdi-chevron-down'}}</v-icon>
          </v-btn>
        </template>
        <span>{{expanded.includes(item)?'Hide details':'See this project details'}}</span>
      </v-tooltip>
    </td>
  </tr>
</template>
<script>
import ProjectStatusBadge from "~/components/projectList/ProjectStatusBadge";
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
      thematics
    };
  },
  props: {
    expanded: Array,
    item: Object,
    filters: Object
  },
  methods: {
    orderItems(project, item) {
      if (this.filters[item].length && project[item] && project[item].length) {
        let items = project[item];

        if (item === "zone") {
          items = [
            items.find(dat => dat === this.filters[item]),
            ...items.filter(dat => dat !== this.filters[item])
          ];
        } else {
          this.filters[item].forEach(element => {
            if (items.includes(element)) {
              items = [element, ...items.filter(dat => dat !== element)];
            }
          });
        }
        return items;
      } else {
        return project[item];
      }
    }
  },
  components: {
    ProjectStatusBadge
  }
};
</script>
