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
        <v-col cols="12">
          <v-fade-transition mode="out-in">
            <v-card flat min-height="320px" class="pa-4 text-left">
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
                  </v-tooltip>&nbsp;
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text
                  class="pb-0 white--text pl-12 ml-4 headline"
                >This feature will be available shortly</v-card-text>
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
export default {
  data() {
    return {
      drawer: false
    };
  },
  components: {
    NavigationDrawer
  },
  async mounted() {},
  methods: {}
};
</script>
