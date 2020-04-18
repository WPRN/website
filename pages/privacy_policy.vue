<template>
  <v-container
    app
    fill-height
    style="align-items:start;"
    :class="{'pr-0':$vuetify.breakpoint.smAndDown}"
  >
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
    <NavigationDrawer
      @close="drawer=false"
      @contact="$router.push({path:'/', hash:'contact'})"
      @register="$router.push({path:'/', hash:'register'})"
      @about="$router.push({path:'/', hash:'about-us'})"
      @featured="$router.push({path:'/', hash:'featured'});"
      @list="$router.push({path:'/worldwide'})"
      :drawer="drawer"
    />
    <v-content v-scroll="onScroll">
      <v-container id="content">
        <v-row align="center" justify="center">
          <v-col cols="1">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <nuxt-link to="/">
                  <v-btn fab icon large v-on="on" class="mr-2">
                    <v-icon large>mdi-arrow-left</v-icon>
                  </v-btn>
                </nuxt-link>
              </template>
              <span>Back to the main page</span>
            </v-tooltip>
          </v-col>
          <v-col cols="10" sm="10" md="8">
            <h2 class="display-2 font-weight-bold my-3 text-uppercase text-center">Privacy Policy</h2>
          </v-col>
          <v-col cols="1"></v-col>
          <v-col cols="12" sm="12" md="8">
            <v-responsive class="mx-auto mb-12" width="56">
              <v-divider class="mb-1"></v-divider>
              <v-divider></v-divider>
            </v-responsive>The World Pandemic Research Network (WPRN) website’s purpose is to offer a global directory of research projects, surveys and initiatives about the societal and human impacts of the Covid-19 pandemic.
            <br />By registering their project on the WPRN website, contributors authorize the WPRN to publish online the data collected, except for their personal contact details (e-mail address).
            <br />E-mail addresses will never be disclosed online nor transferred or sold to any third party. They will be used only:
            <ul>
              <li>to redirect potential contact requests to contributors through the WPRN servers;</li>
              <li>by WPRN to contact contributors to enable their uploads, update their project, facilitate their collaborations and occasionally regarding evolutions of WPRN.</li>
            </ul>In compliance with the EU General Data Protection Regulation, you can exert your right to access, correct or oppose the use of your data by contacting info@wprn.org.
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-fab-transition>
      <v-btn
        color="accent"
        dark
        fixed
        bottom
        right
        contained
        fab
        v-show="offsetTop>600"
        @click="$vuetify.goTo('#content')"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>
<script>
import { board, contributors } from "~/assets/data";
import NavigationDrawer from "~/components/navigation/NavigationDrawer";
export default {
  data() {
    return {
      board,
      contributors,
      referents: [],
      drawer: false,
      offsetTop: 0
    };
  },
  components: {
    NavigationDrawer
  },
  methods: {
    onScroll(e) {
      this.offsetTop = e.target.scrollingElement.scrollTop;
    }
  }
};
</script>
