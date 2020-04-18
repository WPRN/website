<template>
  <v-card
    class="pb-3"
    :class="{'ml-3 mt-3':pageMode&&$vuetify.breakpoint.mdAndUp}"
    flat
    :max-width="$vuetify.breakpoint.width"
  >
    <v-card-title
      class="pl-0 pb-1 justify-space-between d-flex"
      v-if="pageMode"
      :class="{'pl-3':$vuetify.breakpoint.smAndDown}"
    >
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <nuxt-link to="/worldwide">
            <v-btn fab icon large v-on="on" class="mr-2">
              <v-icon large>mdi-arrow-left</v-icon>
            </v-btn>
          </nuxt-link>
        </template>
        <span>Back to the project list</span>
      </v-tooltip>
      <ProjectStatusBadge :status="project.status" />
      &nbsp;
      {{project.name}}
      <v-spacer></v-spacer>
      <v-btn-toggle rounded :class="{'mt-3':$vuetify.breakpoint.smAndDown}">
        <v-tooltip bottom v-for="(social, index) in socialChannels" :key="index">
          <template v-slot:activator="{ on }">
            <v-btn
              :small="$vuetify.breakpoint.smAndDown"
              v-on="on"
              :href="social.url"
              target="_blank"
            >
              <v-icon :small="$vuetify.breakpoint.smAndDown">mdi-{{social.icon}}</v-icon>
            </v-btn>
          </template>
          <span v-if="social.label!=='Email'">Share this project on {{social.label}}</span>
          <span v-else>Share this project by {{social.label}}</span>
        </v-tooltip>
      </v-btn-toggle>
    </v-card-title>
    <br v-if="pageMode&&$vuetify.breakpoint.smAndDown" />
    <v-card-subtitle
      :class="{'ml-12 pl-4':pageMode&&$vuetify.breakpoint.mdAndUp}"
      class="overline font-weight-black white--text"
    >WPRN-{{project.pubId}}</v-card-subtitle>
    <v-card-text
      class="pb-0 white--text"
      :class="{'pl-12 ml-4':pageMode&&$vuetify.breakpoint.mdAndUp}"
    >
      <v-row>
        <v-col cols="12" md="6" xl="4">
          <span class="overline">CREATION DATE :</span>
          <br />
          <span
            class="subtitle-1"
          >{{project.createdAt.split('T')[0]}} at {{project.createdAt.split('T')[1].split(':')[0]}}h{{project.createdAt.split('T')[1].split(':')[1]}} (GMT)</span>
        </v-col>
        <v-col cols="12" md="6" xl="4">
          <span class="overline">STATUS :</span>
          <br />
          <span class="subtitle-1">{{project.state}}</span>
        </v-col>

        <!-- FIELD -->
        <v-col cols="12" md="6" xl="4" class="subtitle-1">
          <span class="overline">{{project.field.length >1?'DISCIPLINES':'DISCIPLINE'}} :</span>
          <br />
          <template v-if="project.field.length > 10&&!showFields">
            <template v-for="(field, index) in project.field">
              <v-chip
                class="ma-1"
                label
                :small="!pageMode"
                light
                :key="index"
                v-if="index<11"
              >{{field}}</v-chip>
              <span
                :key="index"
                v-if="index===11"
                style="cursor:pointer;"
                @click="showFields = true"
                class="caption"
              >(show {{project.field.length-11}} more)</span>
            </template>
          </template>
          <template v-else>
            <template v-for="(field, index) in project.field">
              <v-chip class="ma-1" label :small="!pageMode" light :key="index">{{field}}</v-chip>
            </template>
            <span
              v-if="project.type.length > 10&&showFields"
              style="cursor:pointer;"
              @click="showFields = false"
              class="caption"
            >(Show less)</span>
          </template>
        </v-col>
        <!-- TYPE -->
        <v-col cols="12" md="6" xl="4" class="subtitle-1">
          <span class="overline">{{project.type.length >1?'TYPES':'TYPE'}} :</span>
          <br />
          <template v-if="project.type.length > 10&&!showType">
            <template v-for="(type, index) in project.type">
              <v-chip class="ma-1" :small="!pageMode" light :key="index" v-if="index<11">{{type}}</v-chip>
              <span
                :key="index"
                v-if="index===11"
                style="cursor:pointer;"
                @click="showType = true"
                class="caption"
              >(show {{project.type.length-11}} more)</span>
            </template>
          </template>
          <template v-else>
            <template v-for="(type, index) in project.type">
              <v-chip class="ma-1" :small="!pageMode" light :key="index">{{type}}</v-chip>
            </template>
            <span
              v-if="project.type.length > 10&&showType"
              style="cursor:pointer;"
              @click="showType = false"
              class="caption"
            >(Show less)</span>
          </template>
        </v-col>
        <!-- THEMATICS -->
        <v-col cols="12" md="6" xl="4" class="subtitle-1" v-if="project.thematics">
          <span
            class="overline"
          >{{project.thematics&&project.thematics.length >1?'THEMATICS':'THEMATIC'}} :</span>
          <br />
          <template v-if="project.thematics.length > 10&&!showThematics">
            <template v-for="(thematic, index) in project.thematics">
              <v-chip
                class="ma-1"
                :small="!pageMode"
                label
                outlined
                :key="index"
                v-if="index<11"
              >{{thematic}}</v-chip>
              <span
                :key="index"
                v-if="index===11"
                style="cursor:pointer;"
                @click="showThematics = true"
                class="caption"
              >(show {{project.thematics.length-11}} more)</span>
            </template>
          </template>
          <template v-else>
            <template v-for="(thematic, index) in project.thematics">
              <v-chip class="ma-1" :small="!pageMode" label outlined :key="index">{{thematic}}</v-chip>
            </template>
            <span
              v-if="project.thematics.length > 10&&showThematics"
              style="cursor:pointer;"
              @click="showThematics = false"
              class="caption"
            >(Show less)</span>
          </template>
        </v-col>
        <!-- ZONE -->
        <v-col cols="12" md="6" xl="4" class="subtitle-1">
          <span class="overline">{{project.zone.length >1?'CONTINENTS':'CONTINENT'}} :</span>
          <br />
          <v-chip
            :small="!pageMode"
            class="ma-1"
            v-for="(zone, index) in project.zone"
            :key="index"
            label
            light
          >{{zones.find(zoneItem => zone === zoneItem.value).text }}</v-chip>
        </v-col>
        <!-- COUNTRY -->
        <v-col cols="12" md="6" xl="4" class="subtitle-1" v-if="project.country">
          <span
            class="overline"
          >{{project.country&&project.country.length >1?'COUNTRIES':'COUNTRY'}} :</span>
          <br />
          <template v-if="project.country.length > 10&&!showCountry">
            <template v-for="(country, index) in project.country">
              <v-chip :small="!pageMode" class="ma-1" :key="index" v-if="index <11">{{country}}</v-chip>
              <span
                :key="index"
                v-if="index===11"
                style="cursor:pointer;"
                @click="showCountry = true"
                class="caption"
              >(show {{project.country.length-11}} more)</span>
            </template>
          </template>
          <template v-else>
            <template v-for="(country, index) in project.country">
              <v-chip :small="!pageMode" class="ma-1" :key="index">{{country}}</v-chip>
            </template>
            <span
              v-if="project.country.length > 10&&showCountry"
              style="cursor:pointer;"
              @click="showCountry = false"
              class="caption"
            >(Show less)</span>
          </template>
        </v-col>
        <!-- CONTACT -->
        <v-col cols="12" class="subtitle-1">
          <span class="overline">CONTACT :</span>
          <br />
          {{project.contact_lastname + ', ' + project.contact_firstname}}
          <template
            v-if="project.contact_entity"
          >({{project.contact_entity}})</template>
        </v-col>
        <!-- DESCRIPTION -->
        <v-col cols="12" class="subtitle-1 pr-12">
          <span class="overline">Team and Project description</span>
          <br />
          <template v-if="!pageMode&&project.description.length > 400">
            <p
              v-html="$options.filters.truncate($options.filters.nl2br(project.description), 400, '(read more)', '/item/'+ project.pubId)"
            ></p>
          </template>
          <template v-else>
            <p v-html="$options.filters.nl2br(project.description)"></p>
          </template>
        </v-col>
        <!--  CITE WIDGET -->
        <v-col cols="12" class="subtitle-1" v-if="pageMode">
          <span class="overline">To cite this project in your research</span>
          <br />
          <v-sheet light elevation="3" class="mr-6 py-3 pl-5 mt-3">
            <v-row no-gutters>
              <v-col class="align-self-center">
                {{project.contact_lastname}}, {{project.contact_firstname}}.
                <b>&ldquo;{{project.name}}&rdquo;</b>.
                <em>World Pandemic Research Network</em>
                . WPRN-{{project.pubId}}, {{project.createdAt.split('T')[0]}} at {{project.createdAt.split('T')[1].split(':')[0]}}h{{project.createdAt.split('T')[1].split(':')[1]}} (GMT):
                <a
                  :href="'https://wprn.org/item/' + project.pubId"
                  target="_blank"
                  rel="noopener noreferrer"
                >https://wprn.org/item/{{project.pubId}}</a>
                <input
                  type="hidden"
                  id="cite"
                  :value="project.contact_lastname + ', ' + project.contact_firstname+'.“'+project.name+'”. World Pandemic Research Network. WPRN-'+project.pubId+', '+project.createdAt.split('T')[0]+' at '+project.createdAt.split('T')[1].split(':')[0]+'h'+project.createdAt.split('T')[1].split(':')[1]+' (GMT):'"
                />
              </v-col>
              <v-col cols="auto" class="align-self-center">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn icon large tile v-on="on" class="mr-2" @click="copyToClipBoard()">
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
      <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>
      <v-btn color="accent" @click="$emit('contact')" :class="{'mr-3':!project.url}">
        <v-icon>mdi-email-edit</v-icon>&nbsp;
        Email this project contact
      </v-btn>
      <template v-if="pageMode">
        <v-btn v-if="project.url" color="accent">
          <a
            :href="project.url.includes('http')?project.url:'https://'+project.url"
            target="_blank"
            style="text-decoration:none;color:white;"
          >
            <v-icon>mdi-link</v-icon>&nbsp;Open project url&nbsp;
          </a>
        </v-btn>
      </template>
      <template v-if="!pageMode">
        <v-btn color="accent">
          <a :href="'/item/'+ project.pubId" style="text-decoration:none;color:white;">
            Project details&nbsp;
            <v-icon>mdi-chevron-right</v-icon>
          </a>
        </v-btn>
      </template>
    </v-card-actions>
    <v-snackbar v-model="snackbar" top :timeout="3000" color="accent" v-if="pageMode">
      CITATION REFERENCE COPIED
      <v-icon large>mdi-content-copy</v-icon>
    </v-snackbar>
    <v-divider class="my-3" v-if="!pageMode"></v-divider>
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
import slugify from "slugify";
import ProjectStatusBadge from "~/components/projectList/ProjectStatusBadge";
export default {
  data() {
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
          label: "Facebook",
          icon: "facebook",
          url:
            "https://www.facebook.com/sharer.php?u=" +
            "https://wprn.org/item/" +
            this.project.pubId
        },
        {
          label: "Twitter",
          icon: "twitter",
          url:
            "https://twitter.com/share?url=https://wprn.org/item/" +
            this.project.pubId +
            "&text=Check this project on WPRN : &via=WPRN&hashtags=WPRN"
        },
        {
          label: "Pinterest",
          icon: "pinterest",
          url:
            "https://pinterest.com/pin/create/bookmarklet/?media=https://wprn.org/logo.png&url=" +
            "https://wprn.org/item/" +
            this.project.pubId
        },
        {
          label: "Email",
          icon: "email",
          url:
            "mailto:?bcc=contact@wprn.org&subject=WPRN%20Project%20&body=Hello%2CPlease%20check%20this%20project%20%22" +
            this.project.name.replace(" ", "%20") +
            "%22%20on%20WPRN%20(World%20Pandemic%20Research%20Network)%3A%20https%3A%2F%2Fwprn.org%2Fitem%2F" +
            this.project.pubId +
            "Best%20regards%2C"
        }
      ]
    };
  },
  props: {
    project: Object,
    pageMode: Boolean
  },
  components: {
    ProjectStatusBadge
  },
  methods: {
    copyToClipBoard() {
      let copyNode = document.querySelector("#cite");
      copyNode.setAttribute("type", "text");
      copyNode.select();
      try {
        document.execCommand("copy");
        this.snackbar = true;
      } catch (err) {
        //
      }
      /* unselect the range */
      copyNode.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    }
  },
  mounted() {}
};
</script>
