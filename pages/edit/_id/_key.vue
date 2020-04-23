<template>
  <v-container app fill-height :class="{'pr-0':$vuetify.breakpoint.smAndDown}" align-start>
    <v-app-bar app color="white" height="100" elevate-on-scroll elevation-3>
      <v-btn text @click="$router.push({path:'/'})" class="mx-0 px-0" height="auto">
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
      @list="$router.push({path:'/search'})"
      :drawer="drawer"
    />
    <v-content>
      <v-row>
        <v-col cols="12">
          <v-overlay :value="checking" class="text-center headline">
            <v-progress-circular class="mb-4" indeterminate size="64"></v-progress-circular>
            <br />Verifying your credentials
          </v-overlay>
          <v-overlay :value="error" class="text-center headline">
            <div class="display-1">Sorry for the inconvenience!</div>
            <br />
            <v-icon x-large class="mb-3">mdi-alert-circle-outline</v-icon>
            <br />An error happened during the verification.
            <br />You can try again and
            refresh this page or
            <nuxt-link to="/#contact">contact WPRN</nuxt-link>.
          </v-overlay>
          <v-fade-transition mode="out-in">
            <v-card flat min-height="320px" class="pa-4 text-left">
              <v-card class="ml-3 mt-3 pb-3" flat>
                <v-card-title class="pl-0 headline">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <nuxt-link to="/search">
                        <v-btn fab icon large v-on="on" class="mr-2">
                          <v-icon large>mdi-arrow-left</v-icon>
                        </v-btn>
                      </nuxt-link>
                    </template>
                    <span>Back to the project list</span>
                  </v-tooltip>Edit your project
                </v-card-title>
                <v-card-subtitle>The delete feature will be available in a few days</v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text class="pb-0 white--text align-center" justify="center">
                  <v-expand-transition v-if="ready">
                    <v-row no-gutters justify="center">
                      <v-col cols="12">
                        <ProjectForm
                          editMode
                          :projectInput="project"
                          v-if="project&&!done"
                          @complete="done=true"
                        />
                        <ProjectUpdatedWindow v-else />
                      </v-col>
                    </v-row>
                  </v-expand-transition>
                </v-card-text>
                <v-card-actions></v-card-actions>
                <v-divider class="mt-3"></v-divider>
              </v-card>
            </v-card>
          </v-fade-transition>
        </v-col>
      </v-row>
    </v-content>
  </v-container>
</template>
<script>
import NavigationDrawer from "~/components/navigation/NavigationDrawer";
import ProjectForm from "~/components/projectForm/ProjectForm";
import ProjectUpdatedWindow from "~/components/projectForm/ProjectUpdatedWindow";
import * as queries from "~/graphql/queries";
import gql from "graphql-tag";
import client from "~/plugins/amplify";

export default {
  data() {
    return {
      drawer: false,
      project: false,
      ready: false,
      checking: true,
      error: false,
      done: false
    };
  },
  components: {
    NavigationDrawer,
    ProjectForm,
    ProjectUpdatedWindow
  },
  async mounted() {
    try {
      const res = await client.query({
        query: gql(queries.getProjectForEdit),
        variables: {
          id: this.$route.params.id,
          key: this.$route.params.key
        }
      });

      if (res && res.data && res.data.getProjectForEdit && !res.errors) {
        this.project = res.data.getProjectForEdit;
        this.checking = false;
        this.ready = true;
      } else {
        this.ready = true;
      }
    } catch (error) {
      this.error = true;
      this.ready = true;
    }
  },
  methods: {}
};
</script>
