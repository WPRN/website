<template>
  <v-card
    class="pb-3"
    :class="{ 'ml-3 mt-3': $vuetify.breakpoint.mdAndUp }"
    flat
    :max-width="$vuetify.breakpoint.width"
    :style="$vuetify.theme.isDark?'background-color:rgb(45, 45, 45)':'background-color:#FAFAFA;'"
      color="transparent"
  >
    <!-- SOCIAL -->
    <SocialWidget :project="project" />
    <v-card-title
      class="pb-1 justify-space-between d-flex"
      :class="{ 'pl-3': $vuetify.breakpoint.smAndDown }"
    >
      <v-row>
        <!--  BackButton takes one col -->
        <BackButton url="/search" />
        <v-col
          cols="12"
          sm="10"
          xs="12"
          class=" d-flex align-center"
        >
          <!-- NAME -->
          <h3
            class="d-flex justify-center"
            :class="{ 'pr-12 mr-6': $vuetify.breakpoint.mdAndUp }"
          >
            <!-- STATUS -->
            <ProjectStatusBadge
              :status="project.status"
              :details="true"
            />&nbsp;
            {{ project.name }}&nbsp;(WPRN-{{ project.pubId }})
          </h3>
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text
      class="pb-0"
      :class="{ 'pl-12 ml-4': $vuetify.breakpoint.mdAndUp , 'white--text': $vuetify.theme.isDark } "
    >
      <v-row>
        <!-- CONTACT -->
        <v-col
          cols="12"
          class="subtitle-1"
        >
          <span class="overline">CONTACT :</span>
          <br>
          <v-tooltip
            v-if="!isNotContactable()"
            bottom
          >
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                icon
                v-on="on"
                @click="$emit('contact')"
              >
                <v-icon>mdi-email</v-icon>
              </v-btn>
            </template>
            <span>Email this project contact</span>
          </v-tooltip>
          <template
            v-if="!isNotContactable()"
          >
            <span
              v-html="
                $options.filters.highlight(
                  project.contact_lastname,
                  filters.search.split(' ')
                )
              "
            />
            {{ ", " + project.contact_firstname }}
            <template
              v-if="project.contact_entity"
            >
              ({{ project.contact_entity }})
            </template>
          </template>
          <template v-else>
            <template
              v-if="project.contact_entity"
            >
              {{ project.contact_entity }}
            </template>
          </template>
        </v-col>
        <!-- DESCRIPTION -->
        <v-col
          cols="12"
          class="subtitle-1"
        >
          <span class="overline">Team and Project description</span>
          <br>
          <p v-html="$options.filters.nl2br(project.description)" />
        </v-col>
        <!-- STATE (private key) STATUS (public key) -->
        <v-col
          cols="12"
          md="6"
          xl="4"
        >
          <span class="overline">STATUS :</span>
          <br>
          <span class="subtitle-1">{{ project.state }}</span>
        </v-col>

        <!-- FIELD -->
        <v-col
          cols="12"
          md="6"
          xl="4"
          class="subtitle-1"
        >
          <span class="overline">
            {{
              project.field.length > 1 ? "DISCIPLINES" : "DISCIPLINE"
            }}
            :
          </span>
          <br>
          <template v-if="project.field.length > 10 && !showFields">
            <template v-for="(field, index) in project.field">
              <v-chip
                v-if="index < 11"
                :key="index"
                class="ma-1"
                label
                outlined
              >
                {{ field }}
              </v-chip>
              <span
                v-if="index === 11"
                :key="index"
                style="cursor: pointer;"
                class="caption"
                @click="showFields = true"
              >(show {{ project.field.length - 11 }} more)</span>
            </template>
          </template>
          <template v-else>
            <template v-for="(field, index) in project.field">
              <v-chip
                :key="index"
                class="ma-1"
                label
                outlined
              >
                {{ field }}
              </v-chip>
            </template>
            <span
              v-if="project.field.length > 10 && showFields"
              style="cursor: pointer;"
              class="caption"
              @click="showFields = false"
            >(Show less)</span>
          </template>
        </v-col>
        <!-- TYPE -->
        <v-col
          cols="12"
          md="6"
          xl="4"
          class="subtitle-1"
        >
          <span class="overline">{{ project.type.length > 1 ? "TYPES" : "TYPE" }} :</span>
          <br>
          <template v-if="project.type.length > 10 && !showType">
            <template v-for="(type, index) in project.type">
              <v-chip
                v-if="index < 11"
                :key="index"
                class="ma-1"
                outlined
              >
                {{ type }}
              </v-chip>
              <span
                v-if="index === 11"
                :key="index"
                style="cursor: pointer;"
                class="caption"
                @click="showType = true"
              >(show {{ project.type.length - 11 }} more)</span>
            </template>
          </template>
          <template v-else>
            <template v-for="(type, index) in project.type">
              <v-chip
                :key="index"
                class="ma-1"
                outlined
              >
                {{ type }}
              </v-chip>
            </template>
            <span
              v-if="project.type.length > 10 && showType"
              style="cursor: pointer;"
              class="caption"
              @click="showType = false"
            >(Show less)</span>
          </template>
        </v-col>
        <!-- THEMATICS -->
        <v-col
          v-if="project.thematics"
          cols="12"
          md="6"
          xl="4"
          class="subtitle-1"
        >
          <span class="overline">
            {{
              project.thematics && project.thematics.length > 1
                ? "THEMATICS"
                : "THEMATIC"
            }}
            :
          </span>
          <br>
          <template v-if="project.thematics.length > 10 && !showThematics">
            <template v-for="(thematic, index) in project.thematics">
              <v-chip
                v-if="index < 11"
                :key="index"
                class="ma-1"
                label
                outlined
              >
                {{ thematic }}
              </v-chip>
              <span
                v-if="index === 11"
                :key="index"
                style="cursor: pointer;"
                class="caption"
                @click="showThematics = true"
              >(show {{ project.thematics.length - 11 }} more)</span>
            </template>
          </template>
          <template v-else>
            <template v-for="(thematic, index) in project.thematics">
              <v-chip
                :key="index"
                class="ma-1"
                label
                outlined
              >
                {{ thematic }}
              </v-chip>
            </template>
            <span
              v-if="project.thematics.length > 10 && showThematics"
              style="cursor: pointer;"
              class="caption"
              @click="showThematics = false"
            >(Show less)</span>
          </template>
        </v-col>
        <!-- LOCATION -->
        <v-col
          cols="12"
          md="6"
          xl="4"
          class="subtitle-1"
        >
          <span class="overline">
            {{ project.zone.length > 1 || project.country&&project.country.length > 1
              ? "LOCATIONS"
              : "LOCATION"
            }} :
          </span>
          <br>
          <v-chip
            v-for="(zone, index) in zoneFiltered"
            :key="index"
            class="ma-1"
            label
          >
            {{ zones.find((zoneItem) => zone === zoneItem.value).text }}
          </v-chip>
          <template v-if="project.country&&project.country.length > 10 && !showCountry">
            <template v-for="(country, index) in project.country">
              <v-chip
                v-if="index < 11"
                :key="index"
                class="ma-1"
              >
                {{ country }}
              </v-chip>
              <span
                v-if="index === 11"
                :key="index"
                style="cursor: pointer;"
                class="caption"
                @click="showCountry = true"
              >(show {{ project.country.length - 11 }} more)</span>
            </template>
          </template>
          <template v-else-if="project.country">
            <template v-for="(country, index) in project.country">
              <v-chip
                :key="index"
                class="ma-1"
              >
                {{ country }}
              </v-chip>
            </template>
            <span
              v-if="project.country.length > 10 && showCountry"
              style="cursor: pointer;"
              class="caption"
              @click="showCountry = false"
            >(Show less)</span>
          </template>
        </v-col>
        <!-- ZONE -->
        <!-- <v-col
          cols="12"
          md="6"
          xl="4"
          class="subtitle-1"
        >
          <span class="overline">{{ project.zone.length > 1 ? "CONTINENTS" : "CONTINENT" }} :</span>
          <br>
          <v-chip
            v-for="(zone, index) in project.zone"
            :key="index"
            class="ma-1"
            label
          >
            {{ zones.find((zoneItem) => zone === zoneItem.value).text }}
          </v-chip>
        </v-col> -->
        <!-- COUNTRY -->
        <!-- <v-col
          v-if="project.country"
          cols="12"
          md="6"
          xl="4"
          class="subtitle-1"
        >
          <span class="overline">
            {{
              project.country && project.country.length > 1
                ? "COUNTRIES"
                : "COUNTRY"
            }}
            :
          </span>
          <br>
          <template v-if="project.country.length > 10 && !showCountry">
            <template v-for="(country, index) in project.country">
              <v-chip
                v-if="index < 11"
                :key="index"
                class="ma-1"
              >
                {{ country }}
              </v-chip>
              <span
                v-if="index === 11"
                :key="index"
                style="cursor: pointer;"
                class="caption"
                @click="showCountry = true"
              >(show {{ project.country.length - 11 }} more)</span>
            </template>
          </template>
          <template v-else>
            <template v-for="(country, index) in project.country">
              <v-chip
                :key="index"
                class="ma-1"
              >
                {{ country }}
              </v-chip>
            </template>
            <span
              v-if="project.country.length > 10 && showCountry"
              style="cursor: pointer;"
              class="caption"
              @click="showCountry = false"
            >(Show less)</span>
          </template>
        </v-col> -->
        <!--  CREATION DATE -->
        <v-col
          cols="12"
          md="6"
          xl="4"
        >
          <span class="overline">CREATION DATE :</span>
          <br>
          <span class="subtitle-1">
            {{ project.createdAt.split("T")[0] }} at
            {{ project.createdAt.split("T")[1].split(":")[0] }}h{{
              project.createdAt.split("T")[1].split(":")[1]
            }}
            (GMT)
          </span>
        </v-col>
        <!--  PROJECT DATE(S) -->
        <v-col
          v-if="(project.date && project.date.length > 0) || (project.dates && project.dates.length > 0)"
          cols="12"
          md="6"
          xl="4"
        >
          <span class="overline">
            {{
              project.date
                ? 'PROJECT DATE'
                : 'PROJECT DATES'
            }}
            :
          </span>
          <br>
          <span class="subtitle-1">
            {{ project.date ? project.date : '' }}
            {{ project.dates && project.dates.length
              ? project.dates.length === 1
                ? project.dates[0]
                : getDateRange(project.dates.slice())
              : ''
            }}
          </span>
        </v-col>
        <!--  PROJECT TIME INFO -->
        <v-col
          v-if="project.time && project.time.length"
          cols="12"
          md="6"
          xl="4"
        >
          <span class="overline">
            PROJECT TIME INFO :
          </span>
          <br>
          <span class="subtitle-1">
            {{ project.time }}
          </span>
        </v-col>
        <!-- PROJECT TEAM MEMBERS -->
        <v-col
          v-if="project.team && project.team.length"
          cols="12"
          class="subtitle-1"
        >
          <span class="overline">
            PROJECT TEAM MEMBERS :
          </span>
          <br>
          <v-row
            v-if="!$vuetify.breakpoint.smAndDown"
            no-gutters
            class="mb-2"
          >
            <v-col
              cols="12"
              md="4"
            >
              <div class="font-weight-light caption">
                Firstname
              </div>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <div class="font-weight-light caption">
                Lastname
              </div>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <div class="font-weight-light caption">
                Institution
              </div>
            </v-col>
          </v-row>
          <v-row
            v-for="(item, index) in project.team"
            :key="'team'+index"
            no-gutters
          >
            <v-col
              cols="12"
              md="4"
            >
              <span
                v-if="$vuetify.breakpoint.smAndDown"
                class="font-weight-light caption"
              >
                Firstname
              </span>
              <span class="subtitle-1">
                {{ item.firstname }}
              </span>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <span
                v-if="$vuetify.breakpoint.smAndDown"
                class="font-weight-light caption"
              >
                Lastname
              </span>
              <span class="subtitle-1">
                {{ item.lastname }}
              </span>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <span
                v-if="$vuetify.breakpoint.smAndDown"
                class="font-weight-light caption"
              >
                Institution
              </span>
              <span class="subtitle-1">
                {{ item.entity }}
              </span>
            </v-col>
            <v-divider
              v-if="index < project.team.length-1"
              :key="'divider' + index"
              inset
              class="mt-1 mb-2"
            />
          </v-row>
        </v-col>
        <!--  CITE WIDGET -->
        <CiteWidget
          v-if="!hasNoCiteWidget()"
          :project="project"
          @copied="snackbar = true"
        />

        <v-col
          :align="$vuetify.breakpoint.xsOnly ? 'center' : 'right'"
        >
          <!--  ACTION BUTTONS -->
          <v-btn
            v-if="!isNotContactable()"
            color="primary"
            class="mt-3"
            :small="$vuetify.breakpoint.xsOnly"
            @click="$emit('contact')"
          >
            <v-icon>mdi-email-edit</v-icon>&nbsp;Email this project contact
          </v-btn>
          <v-btn
            v-if="project.url"
            color="primary"
            class="mt-3"
            :small="$vuetify.breakpoint.xsOnly"
            :class="{ 'ml-6': !$vuetify.breakpoint.xsOnly }"
          >
            <a
              :href="
                project.url.includes('http')
                  ? project.url
                  : 'https://' + project.url
              "
              target="_blank"
              style="text-decoration: none; color: white;"
            >
              <v-icon>mdi-link</v-icon>&nbsp;Open project url&nbsp;
            </a>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>

    <v-snackbar
      v-model="snackbar"
      top
      :timeout="3000"
      color="accent"
    >
      CITATION REFERENCE COPIED
      <v-icon large>
        mdi-content-copy
      </v-icon>
    </v-snackbar>
  </v-card>
</template>
<script>
import {
  zones,
  countries,
  types,
  fields,
  state,
  thematics,
  extendedTypes
} from '~/assets/data'
import ProjectStatusBadge from '~/components/projectList/ProjectStatusBadge'
import SocialWidget from '~/components/misc/SocialWidget'
import CiteWidget from '~/components/misc/CiteWidget'
import BackButton from '~/components/navigation/BackButton'

export default {
  components: {
    ProjectStatusBadge,
    BackButton,
    SocialWidget,
    CiteWidget
  },
  props: {
    project: {
      type: Object,
      default: () => {}
    },
    filters: {
      type: Object,
      default: () => {}
    },
    expanded: {
      type: Array,
      default: () => []
    },
    pageMode: Boolean
  },
  data () {
    return {
      zones,
      countries,
      types,
      fields,
      state,
      thematics,
      extendedTypes,
      snackbar: false,
      showThematics: false,
      showCountry: false,
      showFields: false,
      showType: false

    }
  },
  computed: {
    zoneFiltered () {
      let continents = this.project.zone.slice()
      continents = continents.filter((continent) => {
        return !(countries[continent] && countries[continent].some((country) => {
          return this.project.country && this.project.country.some(selectedCountry => selectedCountry === country)
        }))
      })
      return continents
    }
  },
  mounted () {
  },
  methods: {
    getDateRange (dates) {
      dates.sort(function (a, b) {
        return new Date(a) - new Date(b)
      })
      return 'From ' + dates[0] + ' to ' + dates[1]
    },
    isNotContactable () {
      return this.project.type.length === 1 && extendedTypes.some(item => !item.isContactable && this.project.type.includes(item.name))
    },
    hasNoCiteWidget () {
      return this.project.type.length === 1 && extendedTypes.some(item => !item.citeWidget && this.project.type.includes(item.name))
    }
  }
}
</script>
