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
        <template
          v-if="ready&&(!project.status||['NEW','PENDING','REMOVED', 'BLOCKED'].includes(project.status))"
        >
          <v-overlay :value="error" class="text-center headline">
            <div class="display-1">Sorry for the inconvenience!</div>
            <br />
            <v-icon x-large class="mb-3">mdi-ladybug</v-icon>
            <br />This project is not available because its contact point email is not verified or because it has been removed.
            <br />Or it could just not be an existing project.
            <br />You can try again and
            refresh this page or
            <nuxt-link to="/#contact">contact WPRN</nuxt-link>.
          </v-overlay>
        </template>
        <template v-else>
          <v-col cols="12" v-if="ready&&project">
            <v-fade-transition mode="out-in">
              <ProjectDetails v-show="ready" :project="project" @contact="contact=true" pageMode />
            </v-fade-transition>
          </v-col>
          <v-boilerplate v-else class="mb-6" type="article, actions"></v-boilerplate>
        </template>
      </v-row>
    </v-content>
  </v-container>
</template>
<script>
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../../backend/src/graphql/queries";
import NavigationDrawer from "~/components/navigation/NavigationDrawer";
import ContactDialog from "~/components/contact/ContactDialog";
import ProjectDetails from "~/components/projectList/ProjectDetails";
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
    ContactDialog,
    NavigationDrawer,
    ProjectDetails
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
            this.ready = true;
          }
        } catch (error) {
          this.error = true;
          this.ready = true;
        }
      }
    }
  },
  methods: {}
};
</script>
