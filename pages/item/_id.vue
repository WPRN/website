<template>
  <v-container app fill-height :class="{'pr-0':$vuetify.breakpoint.smAndDown}" align-start>
    <v-app-bar app color="white" height="100" elevate-on-scroll elevation-3>
      <v-btn text @click="$router.push({path:'/'})" class="ml-0 pl-0">
        <v-avatar class="mr-3" tile color="grey lighten-5" size="72">
          <v-img contain max-height="100%" src="/logo.png"></v-img>
        </v-avatar>
      </v-btn>

      <v-spacer></v-spacer>
      <v-fab-transition>
        <v-btn
          light
          absolute
          top
          right
          tile
          fab
          outlined
          class="mt-12 mr-0"
          x-large
          @click.stop="drawer = !drawer"
          v-show="!drawer"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-app-bar>
    <NavigationDrawer
      @close="drawer=false"
      @contact="$router.push({path:'/', hash:'contact'})"
      @register="$router.push({path:'/', hash:'register'})"
      @about="$router.push({path:'/', hash:'about-us'})"
      @featured="$router.push({path:'/', hash:'featured'});"
      @list="$router.push({path:'/worldwide'})"
      :drawer="drawer"
    />
    <v-content>
      <v-row>
        <v-col cols="12" v-if="ready&&project">
          <v-fade-transition mode="out-in">
            <v-card flat min-height="320px" class="pa-4 text-left" v-show="ready">
              <v-card class="ml-3 mt-3 pb-3" flat>
                <v-card-title class="pl-0">
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
                </v-card-title>
                <v-card-text class="pb-0 white--text pl-12 ml-4">
                  <v-col cols="12" md="6" class="subtitle-1">
                    <span class="overline">CREATION DATE :</span>
                    <br />
                    {{project.createdAt.split('T')[0]}} at {{project.createdAt.split('T')[1].split(':')[0]}}h{{project.createdAt.split('T')[1].split(':')[1]}} (GMT)
                  </v-col>
                  <v-col cols="12" md="6" class="subtitle-1">
                    <span class="overline">STATUS :</span>
                    <br />
                    {{project.state}}
                  </v-col>
                  <v-col cols="12" class="subtitle-1">
                    <span class="overline">{{project.field.length >1?'DISCIPLINES':'DISCIPLINE'}} :</span>
                    <br />
                    <v-chip
                      class="ma-1"
                      small
                      light
                      v-for="(field, index) in project.field"
                      :key="index"
                    >{{field}}</v-chip>
                  </v-col>
                  <v-col cols="12" class="subtitle-1">
                    <span class="overline">{{project.type.length >1?'TYPES':'TYPE'}} :</span>
                    <br />
                    <v-chip
                      class="ma-1"
                      small
                      label
                      light
                      v-for="(type, index) in project.type"
                      :key="index"
                    >{{type}}</v-chip>
                  </v-col>
                  <v-col cols="12" class="subtitle-1" v-if="project.thematics">
                    <span
                      class="overline"
                    >{{project.thematics&&project.thematics.length >1?'THEMATICS':'THEMATIC'}} :</span>
                    <br />
                    <v-chip
                      class="ma-1"
                      small
                      label
                      light
                      v-for="(thematic, index) in project.thematics"
                      :key="index"
                    >{{thematic}}</v-chip>
                  </v-col>
                  <v-col cols="12" class="subtitle-1">
                    <span class="overline">{{project.zone.length >1?'CONTINENTS':'CONTINENT'}} :</span>
                    <br />
                    <v-chip
                      small
                      class="ma-1"
                      v-for="(zone, index) in project.zone"
                      :key="index"
                    >{{zones.find(zoneItem => zone === zoneItem.value).text }}</v-chip>
                  </v-col>
                  <v-col cols="12" class="subtitle-1">
                    <span
                      class="overline"
                    >{{project.country&&project.country.length >1?'COUNTRIES':'COUNTRY'}} :</span>
                    <br />
                    <v-chip
                      small
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
                  <v-col cols="12" class="subtitle-1">
                    <span class="overline">Description</span>
                    <br />
                    {{project.description}}
                  </v-col>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="accent" @click="contact=true">
                    <v-icon>mdi-email-edit</v-icon>&nbsp;
                    Email this project contact
                  </v-btn>
                  <v-btn v-if="project.url" color="accent">
                    <a
                      :href="project.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      style="text-decoration:none;color:white;"
                    >
                      Open project url&nbsp;
                      <v-icon>mdi-chevron-right</v-icon>
                    </a>
                  </v-btn>
                </v-card-actions>
                <v-divider class="mt-3"></v-divider>
              </v-card>
            </v-card>
          </v-fade-transition>
          <ContactDialog :open="contact" @close="contact=false" :id="project.pubId" />
        </v-col>
      </v-row>
    </v-content>
  </v-container>
</template>
<script>
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../../backend/src/graphql/queries";
import NavigationDrawer from "~/components/navigation/NavigationDrawer";
import ProjectStatusBadge from "~/components/projectList/ProjectStatusBadge";
import ContactDialog from "~/components/contact/ContactDialog";
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
      drawer: false,
      ready: false,
      project: this.$store.state.project || false,
      contact: false
    };
  },
  components: {
    ProjectStatusBadge,
    ContactDialog,
    NavigationDrawer
  },
  async mounted() {
    // do we have the right project
    if (this.project.pubId === this.$route.params.id) {
      this.ready = true;
    } else {
      // check if we have it in project
      const storedProject = this.$store.state.projects.find(
        item => item.pubId === this.$route.params.id
      );
      if (storedProject) {
        this.store.commit("setProject", storedProject);
        this.ready = true;
      } else {
        try {
          const res = await API.graphql(
            graphqlOperation(queries.getProject, {
              pubId: this.$route.params.id
            })
          );
          if (res && res.data && res.data.getProject && !res.errors) {
            this.project = res.data.getProject;
            this.$store.commit("setProject", res.data.getProject);

            this.ready = true;
          } else {
          }
        } catch (error) {
          this.error = true;
        }
      }
    }
  },
  methods: {}
};
</script>
