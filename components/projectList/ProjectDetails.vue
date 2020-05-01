<template>
  <v-card
    class="pb-3"
    :class="{ 'ml-3 mt-3': $vuetify.breakpoint.mdAndUp }"
    flat
    :max-width="$vuetify.breakpoint.width"
    style="background-color:rgb(45, 45, 45)"
  >
    <!-- SOCIAL -->
    <!-- TODO: make a social component -->
    <v-fab-transition>
      <v-speed-dial
        v-model="fab"
        :top="$vuetify.breakpoint.mdAndUp"
        :bottom="$vuetify.breakpoint.smAndDown"
        right
        absolute
        :direction="$vuetify.breakpoint.mdAndUp?'bottom':'top'"
        transition="slide-y-reverse-transition"
      >
        <template v-slot:activator>
          <v-btn
            v-model="fab"
            color="blue darken-2"
            dark
            fab
          >
            <v-icon v-if="fab">
              mdi-close
            </v-icon>
            <v-icon v-else>
              mdi-share-variant
            </v-icon>
          </v-btn>
        </template>
        <v-tooltip
          v-for="(social, index) in socialChannels"
          :key="index"
          bottom
        >
          <template v-slot:activator="{ on }">
            <v-btn
              :small="$vuetify.breakpoint.smAndDown"
              :href="social.url"
              :color="social.color"
              target="_blank"
              fab
              dark
              v-on="on"
            >
              <v-icon :small="$vuetify.breakpoint.smAndDown">
                mdi-{{ social.icon }}
              </v-icon>
            </v-btn>
          </template>
          <span v-if="social.label !== 'Email'">Share this project on {{ social.label }}</span>
          <span v-else>Share this project by {{ social.label }}</span>
        </v-tooltip>
      </v-speed-dial>
    </v-fab-transition>
    <v-card-title
      class="pl-0 pb-1 justify-space-between d-flex"
      :class="{ 'pl-3': $vuetify.breakpoint.smAndDown }"
    >
      <v-row>
        <!--  BackButton takes one col -->
        <BackButton url="/search" />
        <v-col
          cols="11"
          class=" d-flex align-center"
        >
          <!-- NAME -->
          <h3
            class="d-flex justify-center"
            :class="{ 'pr-12 mr-6': $vuetify.breakpoint.mdAndUp }"
          >
            <!-- STATUS -->
            <ProjectStatusBadge :status="project.status" />&nbsp;
            {{ project.name }}&nbsp;(WPRN-{{ project.pubId }})
          </h3>
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text
      class="pb-0 white--text"
      :class="{ 'pl-12 ml-4': $vuetify.breakpoint.mdAndUp }"
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
          class="subtitle-1 pr-12"
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
        <!-- TODO: make a cite component -->
        <v-col
          cols="12"
          class="subtitle-1"
        >
          <span class="overline">To cite this project in your research</span>
          <br>
          <v-sheet
            light
            elevation="3"
            class="mr-6 py-3 pl-5 mt-3"
          >
            <v-row no-gutters>
              <v-col class="align-self-center">
                {{ project.contact_lastname }}, {{ project.contact_firstname }}.
                <b>&ldquo;{{ project.name }}&rdquo;</b>.
                <em>World Pandemic Research Network</em>
                . WPRN-{{ project.pubId }},
                {{ project.createdAt.split("T")[0] }} at
                {{ project.createdAt.split("T")[1].split(":")[0] }}h{{
                  project.createdAt.split("T")[1].split(":")[1]
                }}
                (GMT):
                <a
                  :href="'https://wprn.org/item/' + project.pubId"
                  target="_blank"
                  rel="noopener noreferrer"
                >https://wprn.org/item/{{ project.pubId }}</a>
                <input
                  id="cite"
                  type="hidden"
                  :value="
                    project.contact_lastname +
                      ', ' +
                      project.contact_firstname +
                      '.“' +
                      project.name +
                      '”. World Pandemic Research Network. WPRN-' +
                      project.pubId +
                      ', ' +
                      project.createdAt.split('T')[0] +
                      ' at ' +
                      project.createdAt.split('T')[1].split(':')[0] +
                      'h' +
                      project.createdAt.split('T')[1].split(':')[1] +
                      ' (GMT):'
                  "
                >
              </v-col>
              <v-col
                cols="auto"
                class="align-self-center"
              >
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      large
                      tile
                      class="mr-2"
                      v-on="on"
                      @click="copyToClipBoard()"
                    >
                      <v-icon large>
                        mdi-content-copy
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Copy to clipboard</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>

        <v-col align="right">
          <!--  ACTION BUTTONS -->
          <v-btn
            color="primary"
            :class="{ 'mr-3': !project.url }"
            class="mr-6"
            @click="$emit('contact')"
          >
            <v-icon>mdi-email-edit</v-icon>&nbsp; Email this project contact
          </v-btn>
          <v-btn
            v-if="project.url"
            color="primary"
            class="mr-6"
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
import BackButton from '~/components/navigation/BackButton'

export default {
  components: {
    ProjectStatusBadge,
    BackButton
  },
  props: {
    project: Object,
    pageMode: Boolean,
    filters: Object,
    expanded: Array
  },
  data () {
    return {
      zones,
      countries,
      types,
      fields,
      state,
      thematics,
      fab: false,
      snackbar: false,
      showThematics: false,
      showCountry: false,
      showFields: false,
      showType: false,
      /* TODO add linkedin */
      socialChannels: [
        {
          label: 'Facebook',
          icon: 'facebook',
          url:
            `${'https://www.facebook.com/sharer.php?u=' +
            'https://wprn.org/item/'}${
              this.project.pubId}`,
          color: '#3b5998'
        },
        {
          label: 'Twitter',
          icon: 'twitter',
          url:
            `https://twitter.com/share?url=https://wprn.org/item/${
              this.project.pubId
            }&text=Check this project "${
              this.project.name
            }" on WPRN : &via=WPRN&hashtags=WPRN`,
          color: 'rgb(29, 161, 242)'
        },
        {
          label: 'Email',
          icon: 'email',
          url:
            `mailto:?subject=WPRN Project&body=Hello,%0d%0a%0d%0aPlease check this project called ${
              this.project.name
            } on WPRN (World Pandemic Research Network) :%0d%0ahttps%3A%2F%2Fwprn.org%2Fitem%2F${
              this.project.pubId
            }%0d%0a%0d%0aBest regards,`,
          color: 'accent'
        }
      ]
    }
  },
  mounted () {},
  methods: {
    copyToClipBoard () {
      const copyNode = document.querySelector('#cite')
      copyNode.setAttribute('type', 'text')
      copyNode.select()
      try {
        document.execCommand('copy')
        this.snackbar = true
      } catch (err) {
        //
      }
      /* unselect the range */
      copyNode.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
    }
  }
}
</script>
