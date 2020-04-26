<template>
  <v-card
    v-show="pageMode ? true : expanded.includes(project)"
    class="pb-3"
    :class="{ 'ml-3 mt-3': pageMode && $vuetify.breakpoint.mdAndUp }"
    flat
    :max-width="$vuetify.breakpoint.width"
  >
    <v-card-title
      v-if="pageMode"
      class="pl-0 pb-1 justify-space-between d-flex"
      :class="{ 'pl-3': $vuetify.breakpoint.smAndDown }"
    >
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <nuxt-link to="/search">
            <v-btn fab icon large class="mr-2" v-on="on">
              <v-icon large>mdi-arrow-left</v-icon>
            </v-btn>
          </nuxt-link>
        </template>
        <span>Back to the project list</span>
      </v-tooltip>
      <!-- STATUS -->
      <ProjectStatusBadge :status="project.status" />&nbsp;
      <!-- NAME -->
      {{ project.name }}
      <v-spacer />
      <!-- SOCIAL -->
      <v-btn-toggle rounded :class="{ 'mt-3': $vuetify.breakpoint.smAndDown }">
        <v-tooltip v-for="(social, index) in socialChannels" :key="index" bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              :small="$vuetify.breakpoint.smAndDown"
              :href="social.url"
              target="_blank"
              v-on="on"
            >
              <v-icon :small="$vuetify.breakpoint.smAndDown">mdi-{{ social.icon }}</v-icon>
            </v-btn>
          </template>
          <span v-if="social.label !== 'Email'">Share this project on {{ social.label }}</span>
          <span v-else>Share this project by {{ social.label }}</span>
        </v-tooltip>
      </v-btn-toggle>
    </v-card-title>
    <br v-if="pageMode && $vuetify.breakpoint.smAndDown" />
    <!--  PUB ID -->
    <v-card-subtitle
      :class="{ 'ml-12 pl-4': pageMode && $vuetify.breakpoint.mdAndUp }"
      class="overline font-weight-black white--text"
      v-html="
        'WPRN-' +
          $options.filters.highlight(project.pubId, filters.search.split(' '))
      "
    />
    <v-card-text
      class="pb-0 white--text"
      :class="{ 'pl-12 ml-4': pageMode && $vuetify.breakpoint.mdAndUp }"
    >
      <v-row>
        <!--  CREATION DATE -->
        <v-col cols="12" md="6" xl="4">
          <span class="overline">CREATION DATE :</span>
          <br />
          <span class="subtitle-1">
            {{ project.createdAt.split("T")[0] }} at
            {{ project.createdAt.split("T")[1].split(":")[0] }}h{{
            project.createdAt.split("T")[1].split(":")[1]
            }}
            (GMT)
          </span>
        </v-col>
        <!-- STATE (private key) STATUS (public key) -->
        <v-col cols="12" md="6" xl="4">
          <span class="overline">STATUS :</span>
          <br />
          <span class="subtitle-1">{{ project.state }}</span>
        </v-col>

        <!-- FIELD -->
        <v-col cols="12" md="6" xl="4" class="subtitle-1">
          <span class="overline">
            {{
            project.field.length > 1 ? "DISCIPLINES" : "DISCIPLINE"
            }}
            :
          </span>
          <br />
          <template v-if="project.field.length > 10 && !showFields">
            <template v-for="(field, index) in project.field">
              <v-chip
                v-if="index < 11"
                :key="index"
                class="ma-1"
                label
                :small="!pageMode"
                :dark="!pageMode && filters.field.includes(field)"
                light
              >{{ field }}</v-chip>
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
                :dark="!pageMode && filters.field.includes(field)"
                label
                :small="!pageMode"
                light
              >{{ field }}</v-chip>
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
        <v-col cols="12" md="6" xl="4" class="subtitle-1">
          <span class="overline">{{ project.type.length > 1 ? "TYPES" : "TYPE" }} :</span>
          <br />
          <template v-if="project.type.length > 10 && !showType">
            <template v-for="(type, index) in project.type">
              <v-chip
                v-if="index < 11"
                :key="index"
                class="ma-1"
                :dark="!pageMode && filters.type.includes(type)"
                :small="!pageMode"
                light
              >{{ type }}</v-chip>
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
                :dark="!pageMode && filters.type.includes(type)"
                :small="!pageMode"
                light
              >{{ type }}</v-chip>
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
        <v-col v-if="project.thematics" cols="12" md="6" xl="4" class="subtitle-1">
          <span class="overline">
            {{
            project.thematics && project.thematics.length > 1
            ? "THEMATICS"
            : "THEMATIC"
            }}
            :
          </span>
          <br />
          <template v-if="project.thematics.length > 10 && !showThematics">
            <template v-for="(thematic, index) in project.thematics">
              <v-chip
                v-if="index < 11"
                :key="index"
                class="ma-1"
                :small="!pageMode"
                label
                outlined
                :light="!pageMode && filters.thematics.includes(thematics)"
                :color="
                  !pageMode && filters.thematics.includes(thematics)
                    ? 'white'
                    : ''
                "
              >{{ thematic }}</v-chip>
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
                :light="!pageMode && filters.thematics.includes(thematics)"
                :color="
                  !pageMode && filters.thematics.includes(thematics)
                    ? 'white'
                    : ''
                "
                :small="!pageMode"
                label
                outlined
              >{{ thematic }}</v-chip>
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
        <v-col cols="12" md="6" xl="4" class="subtitle-1">
          <span class="overline">{{ project.zone.length > 1 ? "CONTINENTS" : "CONTINENT" }} :</span>
          <br />
          <v-chip
            v-for="(zone, index) in project.zone"
            :key="index"
            :small="!pageMode"
            class="ma-1"
            :color="
              !pageMode && filters.zone.includes(zone) ? '#c4c4c4' : 'accent'
            "
            label
            light
          >{{ zones.find((zoneItem) => zone === zoneItem.value).text }}</v-chip>
        </v-col>
        <!-- COUNTRY -->
        <v-col v-if="project.country" cols="12" md="6" xl="4" class="subtitle-1">
          <span class="overline">
            {{
            project.country && project.country.length > 1
            ? "COUNTRIES"
            : "COUNTRY"
            }}
            :
          </span>
          <br />
          <template v-if="project.country.length > 10 && !showCountry">
            <template v-for="(country, index) in project.country">
              <v-chip
                v-if="index < 11"
                :key="index"
                :small="!pageMode"
                :light="!pageMode && filters.country.includes(country)"
                class="ma-1"
              >{{ country }}</v-chip>
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
                :small="!pageMode"
                :light="!pageMode && filters.country.includes(country)"
                class="ma-1"
              >{{ country }}</v-chip>
            </template>
            <span
              v-if="project.country.length > 10 && showCountry"
              style="cursor: pointer;"
              class="caption"
              @click="showCountry = false"
            >(Show less)</span>
          </template>
        </v-col>
        <!-- CONTACT -->
        <v-col cols="12" class="subtitle-1">
          <span class="overline">CONTACT :</span>
          <br />
          <template v-if="pageMode">
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
            >({{ project.contact_entity }})</template>
          </template>
          <template v-else>
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
              <template v-if="!pageMode">
                <template v-if="filters.search && filters.search.length">
                  <span
                    v-html="
                      '(' +
                        $options.filters.highlight(
                          project.contact_entity,
                          filters.search.split(' ')
                        ) +
                        ')'
                    "
                  />
                </template>
                <template v-else>({{ project.contact_entity }})</template>
              </template>
              <template v-else>({{ project.contact_entity }})</template>
            </template>
          </template>
        </v-col>
        <!-- DESCRIPTION -->
        <v-col cols="12" class="subtitle-1 pr-12">
          <span class="overline">Team and Project description</span>
          <br />
          <template v-if="pageMode">
            <p v-html="$options.filters.nl2br(project.description)" />
          </template>
          <template v-else>
            <template v-if="project.description.length > 400">
              <template v-if="filters.search && filters.search.length">
                <p
                  v-html="
                    $options.filters.nl2br(
                      $options.filters.highlight(
                        $options.filters.truncate(
                          project.description,
                          400,
                          '(read more)',
                          '/item/' + project.pubId
                        ),
                        filters.search.split(' ')
                      )
                    )
                  "
                />
              </template>
              <template v-else>
                <p
                  v-html="
                    $options.filters.nl2br(
                      $options.filters.truncate(
                        project.description,
                        400,
                        '(read more)',
                        '/item/' + project.pubId
                      )
                    )
                  "
                />
              </template>
            </template>
            <template v-else>
              <p
                v-html="
                  $options.filters.nl2br(
                    $options.filters.highlight(
                      project.description,
                      filters.search.split(' ')
                    )
                  )
                "
              />
            </template>
          </template>
        </v-col>
        <!--  CITE WIDGET -->
        <v-col v-if="pageMode" cols="12" class="subtitle-1">
          <span class="overline">To cite this project in your research</span>
          <br />
          <v-sheet light elevation="3" class="mr-6 py-3 pl-5 mt-3">
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
                />
              </v-col>
              <v-col cols="auto" class="align-self-center">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn icon large tile class="mr-2" v-on="on" @click="copyToClipBoard()">
                      <v-icon large>mdi-content-copy</v-icon>
                    </v-btn>
                  </template>
                  <span>Copy to clipboard</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer v-if="$vuetify.breakpoint.mdAndUp" />
      <v-btn color="accent" :class="{ 'mr-3': !project.url }" @click="$emit('contact')">
        <v-icon>mdi-email-edit</v-icon>&nbsp; Email this project contact
      </v-btn>
      <template v-if="pageMode">
        <v-btn v-if="project.url" color="accent">
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
      </template>
      <template v-if="!pageMode">
        <v-btn color="accent">
          <a :href="'/item/' + project.pubId" style="text-decoration: none; color: white;">
            Project details&nbsp;
            <v-icon>mdi-chevron-right</v-icon>
          </a>
        </v-btn>
      </template>
    </v-card-actions>
    <v-snackbar v-if="pageMode" v-model="snackbar" top :timeout="3000" color="accent">
      CITATION REFERENCE COPIED
      <v-icon large>mdi-content-copy</v-icon>
    </v-snackbar>
    <v-divider v-if="!pageMode" class="my-3" />
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

export default {
  components: {
    ProjectStatusBadge
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
      snackbar: false,
      showThematics: false,
      showCountry: false,
      showFields: false,
      showType: false,
      socialChannels: [
        {
          label: 'Facebook',
          icon: 'facebook',
          url:
            `${'https://www.facebook.com/sharer.php?u=' +
            'https://wprn.org/item/'}${
              this.project.pubId}`
        },
        {
          label: 'Twitter',
          icon: 'twitter',
          url:
            `https://twitter.com/share?url=https://wprn.org/item/${
              this.project.pubId
            }&text=Check this project on WPRN : &via=WPRN&hashtags=WPRN`
        },
        {
          label: 'Email',
          icon: 'email',
          url:
            `mailto:?subject=WPRN Project&body=Hello,%0d%0a%0d%0aPlease check this project called ${
              this.project.name
            } on WPRN (World Pandemic Research Network) :%0d%0ahttps%3A%2F%2Fwprn.org%2Fitem%2F${
              this.project.pubId
            }%0d%0a%0d%0aBest regards,`
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
