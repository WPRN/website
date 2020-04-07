<template>
  <v-container
    app
    fluid
    fill-height
    style="align-items:start;"
    :class="{'pr-0':$vuetify.breakpoint.smAndDown}"
  >
    <NavigationDrawer
      @close="drawer=false"
      @contact="$router.push({path:'/', hash:'contact'})"
      @register="$router.push({path:'/', hash:'register'})"
      @about="$router.push({path:'/', hash:'about-us'})"
      @featured="$router.push({path:'/', hash:'featured'});"
      @list="drawer=false"
      :drawer="drawer"
    />
    <v-app-bar app color="white" height="100" elevate-on-scroll elevation-3>
      <v-btn text @click="$router.push({path:'/'})" class="ml-0 pl-0">
        <v-avatar class="mr-3" tile color="grey lighten-5" size="72">
          <v-img contain max-height="100%" src="/logo.png"></v-img>
        </v-avatar>
      </v-btn>
      <h2 class="black--text pr-12" :class="$vuetify.breakpoint.smAndDown?'title':'headline'">
        <template
          v-if="$route.params.zone === 'worldwide'"
        >{{zones.find(zone => $route.params.zone === zone.value).text }} Projects</template>
        <template
          v-else
        >Search results for Projects in {{zones.find(zone => $route.params.zone === zone.value).text }}</template>
      </h2>

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
    <v-content>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-text :class="$vuetify.breakpoint.mdAndUp?'px-6':'pl-6'">
              <ProjectList />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-content>
  </v-container>
</template>
<script>
import { zones, countries, types, fields } from "~/assets/data";
import ProjectList from "~/components/projectList/ProjectList";
import NavigationDrawer from "~/components/navigation/NavigationDrawer";
export default {
  data() {
    return {
      zones,
      drawer: false
    };
  },
  components: {
    ProjectList,
    NavigationDrawer
  },
  watch: {
    "$route.params"() {
      console.log("paarams", this.$route.params);
    }
  },
  mounted() {
    if (!zones.map(zone => zone.value).includes(this.$route.params.zone)) {
      // not an allowed zone
      this.$router.push({
        path: "/worldwide",
        params: {
          zone: "worldwide"
        }
      });
    }
  }
};
</script>
