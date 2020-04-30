<template>
  <v-container
    app
    fill-height
    :class="{ 'pr-0': $vuetify.breakpoint.smAndDown }"
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
      <v-fab-transition>
        <v-btn
          v-show="!drawer"
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
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-app-bar>
    <NavigationDrawer
      :drawer="drawer"
      @close="drawer = false"
      @register="$router.push({ path: '/', hash: 'register' })"
      @about="$router.push({ path: '/', hash: 'about-us' })"
      @list="$router.push({ path: '/search' })"
    />
    <v-row
      align="center"
      justify="center"
    >
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
          <br>Verifying your email address
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
          <br>An error happened during the verification.
          <br>You can try
          again and refresh this page or
          <nuxt-link to="/#contact">
            contact WPRN
          </nuxt-link>.
        </v-overlay>
        <v-fade-transition mode="out-in">
          <v-card
            v-show="!error && !checking"
            flat
            min-height="320px"
            class="pa-4 text-center"
            align="center"
          >
            <v-icon
              x-large
              color="success"
              class="py-6"
            >
              mdi-email-check-outline
            </v-icon>
            <h3
              class="headline font-weight-heavy mb-2"
            >
              YOUR EMAIL IS VERIFIED AND YOUR PROJECT IS PUBLISHED!
            </h3>
            <v-responsive
              class="mx-auto mb-12"
              width="56"
            >
              <v-divider class="mb-1" />

              <v-divider />
            </v-responsive>
            <div class="title">
              Your project unique ID is WPRN-{{ $route.params.id }} and its page
              <nuxt-link :to="'/item/' + $route.params.id">
                can be found here
              </nuxt-link>.
              <br>You can also edit your project
              <nuxt-link :to="'/edit/' + $route.params.id + '/' + $route.params.key">
                here
              </nuxt-link>.
            </div>

            <!--     <v-card-actions>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn class large color="acent" @click="$emit('reset')" v-on="on" align="right">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </template>
        <span>Register another project</span>
      </v-tooltip>
            </v-card-actions>-->
          </v-card>
        </v-fade-transition>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import * as mutations from '~/graphql/mutations'
import NavigationDrawer from '~/components/navigation/NavigationDrawer'
import gql from 'graphql-tag'
import client from '~/plugins/amplify'
export default {
  components: {
    NavigationDrawer
  },
  data () {
    return {
      drawer: false,
      checking: true,
      error: false
    }
  },
  async mounted () {
    try {
      const res = await client.mutate({
        mutation: gql(mutations.verifyEmail),
        variables: {
          id: this.$route.params.id,
          key: this.$route.params.key
        }
      })

      if (res && res.data && res.data.verifyEmail === true && !res.errors) {
        this.checking = false
        this.error = false
      } else {
        this.checking = false
        this.error = true
      }
    } catch (error) {
      this.error = true
      this.checking = false
    }
  },
  methods: {}
}
</script>
