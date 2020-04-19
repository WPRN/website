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
      @list="$router.push({path:'/search'})"
      :drawer="drawer"
    />
    <v-content v-scroll="onScroll">
      <v-container id="content">
        <v-row justify="center">
          <v-col cols="1">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <nuxt-link to="/#featured">
                  <v-btn fab icon large v-on="on" class="mr-2">
                    <v-icon large>mdi-arrow-left</v-icon>
                  </v-btn>
                </nuxt-link>
              </template>
              <span>Back to the main page</span>
            </v-tooltip>
          </v-col>
          <v-col cols="10" sm="10" md="8">
            <h2 class="display-2 font-weight-bold my-3 text-uppercase text-center">Press Room</h2>
          </v-col>
          <v-col cols="1"></v-col>
          <v-col cols="12" sm="12" md="8">
            <v-responsive class="mx-auto" width="56">
              <v-divider class="mb-1"></v-divider>
              <v-divider></v-divider>
            </v-responsive>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn text icon v-on="on">
                  <a
                    href="https://twitter.com/WPRN_org"
                    target="_blank"
                    rel="noopener noreferrer"
                    style="text-decoration:none;"
                  >
                    <v-icon color="white">mdi-twitter</v-icon>
                  </a>
                </v-btn>
              </template>
              <span>Follow us on Twitter</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn text icon v-on="on">
                  <a
                    href="https://www.facebook.com/WPRN.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style="text-decoration:none;"
                  >
                    <v-icon color="white">mdi-facebook</v-icon>
                  </a>
                </v-btn>
              </template>
              <span>Visit our Facebook page</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn text icon v-on="on">
                  <a
                    href="https://www.linkedin.com/company/wprn-world-pandemic-research-network/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style="text-decoration:none;"
                  >
                    <v-icon color="white">mdi-linkedin</v-icon>
                  </a>
                </v-btn>
              </template>
              <span>Visit our Linkedin page</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="12" md="8">
            <v-responsive class="mx-auto" width="56">
              <v-divider class="mb-1"></v-divider>
              <v-divider></v-divider>
            </v-responsive>
          </v-col>
          <v-col cols="12" align="center">
            <nuxt-link to="/board_and_contributors">Advisory Board</nuxt-link>&nbsp;-&nbsp;
            <nuxt-link to="/board_and_contributors#refs">Referents</nuxt-link>&nbsp;-&nbsp;
            <nuxt-link to="/board_and_contributors#institutions">Contributors' Institutions</nuxt-link>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-card class="pa-6 mb-6" flat>
              <v-card-title class="justify-center font-weight-black text-uppercase">Press releases</v-card-title>
              <v-card-text>
                <v-list two-line subheader>
                  <v-list-item href="/press_releases/launch_en.pdf" target="_blank">
                    <v-list-item-avatar>
                      <v-icon>mdi-file-pdf</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Launching of WPRN.org (English version)</v-list-item-title>
                      <v-list-item-subtitle>2020-04-20</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon>
                        <v-icon color="grey lighten-1"></v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                  <v-list-item href="/press_releases/launch_fr.pdf" target="_blank">
                    <v-list-item-avatar>
                      <v-icon>mdi-file-pdf</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Lancement de WPRN.org (French version)</v-list-item-title>
                      <v-list-item-subtitle>2020-04-20</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon>
                        <v-icon color="grey lighten-1"></v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-card class="pa-6" flat>
              <v-card-title class="justify-center font-weight-black text-uppercase">Contacts</v-card-title>
              <v-card-text class="subtitle-1" color="black">
                <v-list three-line subheader align="left">
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-icon large>mdi-account-circle</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>
                        Martine Savary
                        <v-chip small label class="ml-2">Mediathena</v-chip>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <v-icon color="grey">mdi-phone</v-icon>
                        <span
                          v-html="'&nbsp;&#051;&#051;&#032;(&#048;)&#054;&#032;&#054;&#052;&#032;&#050;&#053;&#032;&#054;&#054;&#032;&#053;&#057;'"
                        ></span>
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        <v-icon color="grey">mdi-email</v-icon>&nbsp;&#109;&#097;&#114;&#116;&#105;&#110;&#101;&#064;&#103;&#101;&#099;&#107;&#111;&#116;&#111;&#109;&#046;&#099;&#111;&#109;
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-icon large>mdi-account-circle</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Claire Jeandel</v-list-item-title>
                      <v-list-item-subtitle>
                        <v-icon color="grey">mdi-phone</v-icon>&nbsp;+&#051;&#051;&#032;(&#048;)&#049;&#032;&#053;&#054;&#032;&#056;&#049;&#032;&#048;&#057;&#032;&#050;&#048;
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        <v-icon color="grey">mdi-email</v-icon>&nbsp;&#099;&#108;&#097;&#105;&#114;&#101;&#046;&#106;&#101;&#097;&#110;&#100;&#101;&#108;&#064;&#112;&#097;&#114;&#105;&#115;&#045;&#105;&#101;&#097;&#046;&#102;&#114;
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
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
import ContactDialog from "~/components/contact/ContactDialog";
export default {
  data() {
    return {
      drawer: false,
      offsetTop: 0,
      contact: false
    };
  },
  components: {
    NavigationDrawer,
    ContactDialog
  },
  methods: {
    onScroll(e) {
      this.offsetTop = e.target.scrollingElement.scrollTop;
    }
  }
};
</script>
