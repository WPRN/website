<template>
  <v-card
    class="pb-3"
    :class="{ 'ml-3 mt-3': $vuetify.breakpoint.mdAndUp }"
    flat
    :max-width="$vuetify.breakpoint.width"
    style="background-color:rgb(45, 45, 45)"
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
      class="pb-0 white--text"
      :class="{ 'pl-12 pr-12': $vuetify.breakpoint.mdAndUp }"
    >
      <v-row>
        <!-- CONTACT -->
        <v-col
          cols="12"
          class="subtitle-1"
        >
          <span class="overline">CONTACT :</span>
          <br>
          <v-tooltip bottom>
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
              v-if="project.type.length > 10 && showFields"
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
        <!-- ZONE -->
        <v-col
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
        </v-col>
        <!-- COUNTRY -->
        <v-col
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
        </v-col>
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
        <!--  CITE WIDGET -->
        <CiteWidget
          :project="project"
          @copied="snackbar = true"
        />

        <v-col
          align="center"
          :class="{'justify-space-between d-flex': !$vuetify.breakpoint.xsOnly}"
        >
          <!--  ACTION BUTTONS -->
          <v-btn
            color="primary"
            :class="{'mt-3': $vuetify.breakpoint.xsOnly}"
            @click="$emit('contact')"
          >
            <v-icon>mdi-email-edit</v-icon><span style="white-space: normal;">&nbsp;Email this project contact</span>
          </v-btn>
          <v-btn
            v-if="project.url"
            color="primary"
            :class="{ 'mt-3': $vuetify.breakpoint.xsOnly }"
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
  thematics
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
      snackbar: false,
      showThematics: false,
      showCountry: false,
      showFields: false,
      showType: false

    }
  },
  mounted () {},
  methods: {

  }
}
</script>
