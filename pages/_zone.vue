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
      <v-btn text @click="$router.push({path:'/'})" class="mx-0 px-0" height="auto">
        <v-avatar class="mr-3" tile color="grey lighten-5" size="72">
          <v-img contain max-height="100%" src="/logo.png"></v-img>
        </v-avatar>
      </v-btn>

      <v-spacer></v-spacer>
      <v-btn
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
    <v-content>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title class="pb-0">Project list</v-card-title>
            <v-card-text :class="$vuetify.breakpoint.mdAndUp?'px-3':'pl-3'">
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
    "$route.params"() {}
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
