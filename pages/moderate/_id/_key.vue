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
    <v-content>
      <v-row>
        <v-col cols="12">
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
                <v-card-title class="pl-0">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <nuxt-link to="/worldwide">
                        <v-btn
                          fab
                          icon
                          large
                          class="mr-2"
                          v-on="on"
                        >
                          <v-icon large>
                            mdi-arrow-left
                          </v-icon>
                        </v-btn>
                      </nuxt-link>
                    </template>
                    <span>Back to the project list</span>
                  </v-tooltip>&nbsp;
                </v-card-title>
                <v-divider />
                <v-card-text
                  class="pb-0 white--text pl-12 ml-4 headline"
                >
                  This feature will be available shortly
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
export default {
  components: {
    NavigationDrawer
  },
  data () {
    return {
      drawer: false
    }
  },
  async mounted () {},
  methods: {}
}
</script>
