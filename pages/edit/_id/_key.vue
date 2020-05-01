<template>
  <v-container
    app
    fill-height
    :class="{ 'pr-0': $vuetify.breakpoint.smAndDown }"
    align-start
  >
    <v-app-bar
      app
      color="white"
      height="100"
      elevate-on-scroll
      elevation-3
    >
      <v-btn
        text
        class="mx-0 px-0"
        height="auto"
        @click="$router.push({ path: '/' })"
      >
        <v-avatar
          class="mr-3"
          tile
          color="grey lighten-5"
          size="72"
        >
          <v-img
            contain
            max-height="100%"
            src="/logo.png"
          />
        </v-avatar>
      </v-btn>
      <v-spacer />
      <v-tabs
        v-if="$vuetify.breakpoint.mdAndUp"
        light
        right
        optional
      >
        <v-tab
          to="/#about-us"
          nuxt
        >
          About WPRN
        </v-tab>
        <v-tab
          to="/#register"
          nuxt
        >
          Register your project
        </v-tab>
        <v-tab
          active
          to="/search"
          nuxt
        >
          Browse projects
        </v-tab>
      </v-tabs>
      <v-btn
        v-show="$vuetify.breakpoint.smAndDown"
        light
        tile
        outlined
        class="pa-0 mb-0 ml-0 mt-1 mr-1"
        width="72"
        height="72"
        @click.stop="drawer = !drawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <NavigationDrawer
      :drawer="drawer"
      @close="drawer = false"
      @register="$router.push({ path: '/', hash: 'register' })"
      @about="$router.push({ path: '/', hash: 'about-us' })"
      @list="$router.push({ path: '/search' })"
    />
    <v-content>
      <v-row>
        <v-col cols="12">
          <v-overlay
            :value="checking"
            class="text-center headline"
          >
            <v-progress-circular
              class="mb-4"
              indeterminate
              size="64"
            />
            <br>Verifying your credentials
          </v-overlay>
          <v-overlay
            :value="error"
            class="text-center headline"
          >
            <div class="display-1">
              Sorry for the inconvenience!
            </div>
            <br>
            <v-icon
              x-large
              class="mb-3"
            >
              mdi-alert-circle-outline
            </v-icon>
            <br>An error happened during the verification. <br>You can try
            again and refresh this page or
            <nuxt-link to="/#contact">
              contact WPRN
            </nuxt-link>.
          </v-overlay>
          <v-fade-transition mode="out-in">
            <v-card
              flat
              min-height="320px"
              class="pa-4 text-left"
            >
              <v-card
                class="ml-3 mt-3 pb-3"
                flat
              >
                <v-card-title class="pl-0 headline">
                  <!--  BackButton takes one col -->
                  <BackButton url="/#search" />
                  <v-col cols="11">
                    Edit your project
                  </v-col>
                </v-card-title>
                <v-card-subtitle>
                  The delete feature will be available soon. Meanwhile, you can <nuxt-link to="/#contact">
                    contact us
                  </nuxt-link> to request its removal.
                </v-card-subtitle>
                <v-divider />
                <v-card-text
                  class="pb-0 white--text align-center"
                  justify="center"
                >
                  <v-expand-transition v-if="ready">
                    <v-row
                      no-gutters
                      justify="center"
                    >
                      <v-col cols="12">
                        <ProjectForm
                          v-if="project && !done"
                          edit-mode
                          :project-input="project"
                          @complete="done = true"
                        />
                        <ProjectUpdatedWindow v-else />
                      </v-col>
                    </v-row>
                  </v-expand-transition>
                </v-card-text>
                <v-card-actions />
                <v-divider class="mt-3" />
              </v-card>
            </v-card>
          </v-fade-transition>
        </v-col>
      </v-row>
    </v-content>
  </v-container>
</template>
<script>
import NavigationDrawer from '~/components/navigation/NavigationDrawer'
import ProjectForm from '~/components/projectForm/ProjectForm'
import ProjectUpdatedWindow from '~/components/projectForm/ProjectUpdatedWindow'
import * as queries from '~/graphql/queries'
import gql from 'graphql-tag'
import client from '~/plugins/amplify'
import BackButton from '~/components/navigation/BackButton'

export default {
  components: {
    NavigationDrawer,
    ProjectForm,
    ProjectUpdatedWindow,
    BackButton
  },
  data () {
    return {
      drawer: false,
      project: false,
      ready: false,
      checking: true,
      error: false,
      done: false
    }
  },
  async mounted () {
    try {
      const res = await client.query({
        query: gql(queries.getProjectForEdit),
        variables: {
          id: this.$route.params.id,
          key: this.$route.params.key
        }
      })

      if (res && res.data && res.data.getProjectForEdit && !res.errors) {
        this.project = res.data.getProjectForEdit
        this.checking = false
        this.ready = true
      } else {
        this.ready = true
      }
    } catch (error) {
      this.error = true
      this.ready = true
    }
  },
  methods: {}
}
</script>
