<template>
  <v-card class="pb-3" :class="{'ml-3 mt-3':pageMode}" flat>
    <v-card-title class="pl-0 pb-1 justify-space-between d-flex" v-if="pageMode">
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
      <v-btn-toggle rounded :class="{'float-right':$vuetify.breakpoint.smAndDown}">
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
    <v-card-subtitle v-if="pageMode" class="ml-12 pl-4 overline">WPRN-{{project.pubId}}</v-card-subtitle>
    <v-card-text class="pb-0 white--text" :class="{'pl-12 ml-4':pageMode}">
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
        <v-col cols="12" md="6" xl="4" class="subtitle-1">
          <span class="overline">{{project.field.length >1?'DISCIPLINES':'DISCIPLINE'}} :</span>
          <br />
          <v-chip
            class="ma-1"
            label
            :small="!pageMode"
            light
            v-for="(field, index) in project.field"
            :key="index"
          >{{field}}</v-chip>
        </v-col>
        <v-col cols="12" md="6" xl="4" class="subtitle-1">
          <span class="overline">{{project.type.length >1?'TYPES':'TYPE'}} :</span>
          <br />
          <v-chip
            class="ma-1"
            :small="!pageMode"
            light
            v-for="(type, index) in project.type"
            :key="index"
          >{{type}}</v-chip>
        </v-col>
        <v-col cols="12" md="6" xl="4" class="subtitle-1" v-if="project.thematics">
          <span
            class="overline"
          >{{project.thematics&&project.thematics.length >1?'THEMATICS':'THEMATIC'}} :</span>
          <br />
          <v-chip
            class="ma-1"
            :small="!pageMode"
            label
            outlined
            v-for="(thematic, index) in project.thematics"
            :key="index"
          >{{thematic}}</v-chip>
        </v-col>
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
        <v-col cols="12" md="6" xl="4" class="subtitle-1" v-if="project.country">
          <span
            class="overline"
          >{{project.country&&project.country.length >1?'COUNTRIES':'COUNTRY'}} :</span>
          <br />
          <v-chip
            :small="!pageMode"
            class="ma-1"
            v-for="(country, index) in project.country"
            :key="index"
          >{{country}}</v-chip>
        </v-col>
        <v-col cols="12" class="subtitle-1">
          <span class="overline">CONTACT :</span>
          <br />
          {{project.contact_firstname + ' ' + project.contact_lastname}}
          <template
            v-if="project.contact_entity"
          >({{project.contact_entity}})</template>
        </v-col>
        <v-col cols="12" class="subtitle-1 pr-12">
          <span class="overline">Description</span>
          <br />
          {{project.description}}
        </v-col>
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
            rel="noopener noreferrer"
            style="text-decoration:none;color:white;"
          >
            Open project url&nbsp;
            <v-icon>mdi-chevron-right</v-icon>
          </a>
        </v-btn>
      </template>
      <template v-else>
        <v-btn color="accent">
          <a :href="'/item/'+ project.pubId" style="text-decoration:none;color:white;">
            Open project page&nbsp;
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
        //console.log("failed to copy");
      }
      /* unselect the range */
      copyNode.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    }
  }
};
</script>
