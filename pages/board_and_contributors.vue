<template>
  <v-container
    app
    fill-height
    style="align-items:start;"
    :class="{'pr-0':$vuetify.breakpoint.smAndDown}"
  >
    <v-app-bar app color="white" height="100" elevate-on-scroll elevation-3>
      <v-btn text @click="$router.push({path:'/'})" class="ml-0 pl-0">
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
                <v-btn fab icon large v-on="on" to="/#hero" class="mr-2">
                  <v-icon large>mdi-arrow-left</v-icon>
                </v-btn>
              </template>
              <span>Back to the main page</span>
            </v-tooltip>
          </v-col>
          <v-col cols="10" sm="10" md="8">
            <h2
              class="display-2 font-weight-bold my-3 text-uppercase text-center"
              id="board"
            >Board, Referents, Contributors</h2>
          </v-col>
          <v-col cols="1"></v-col>
          <v-col cols="12" sm="12" md="8">
            <v-responsive class="mx-auto mb-6" width="56">
              <v-divider class="mb-1"></v-divider>
              <v-divider></v-divider>
            </v-responsive>
            <v-item-group>
              <v-row align-content="center" justify="center">
                <v-col
                  v-for="(item, i) in supports"
                  :key="i"
                  cols="auto"
                  class="justify-items-center d-flex"
                >
                  <v-item v-slot:default="{  }">
                    <a
                      :href="item.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      :title="item.name"
                      :style="'background-color:'+ item.color"
                      class="pa-2 d-flex justify-items-center"
                    >
                      <v-img
                        :src="'/logos/'+item.image"
                        contain
                        :width="$vuetify.breakpoint.mdAndUp?'190':'130'"
                        height="100"
                        class="text-right pa-2"
                      ></v-img>
                    </a>
                  </v-item>
                </v-col>
              </v-row>
            </v-item-group>
            <v-responsive class="mx-auto my-6" width="56">
              <v-divider class="mb-1"></v-divider>
              <v-divider></v-divider>
            </v-responsive>
            <v-list three-line subheader align="left">
              <v-subheader class="overline white--text">Advisory Board</v-subheader>
              <v-list-item v-for="(person, index) in board" :key="index">
                <v-list-item-avatar>
                  <img v-if="person.picture" :src="person.picture" alt="alt" />
                  <v-icon large v-else>mdi-account-circle</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    <template v-if="person.url">
                      <a
                        :href="person.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        style="text-decoration:none; color:white;"
                      >
                        <v-icon small>mdi-link</v-icon>
                        &nbsp;
                        {{person.name}}
                      </a>
                    </template>
                    <template v-else>{{person.name}}</template>
                    <v-chip small label v-if="person.role" class="ml-2">{{person.role}}</v-chip>
                  </v-list-item-title>
                  <v-list-item-subtitle>{{person.position}}</v-list-item-subtitle>
                </v-list-item-content>
                <!--    <v-list-item-icon>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn icon color="primary" v-on="on">
                        <v-icon color="grey">mdi-email</v-icon>
                      </v-btn>
                    </template>
                    <span>Contact {{person.name}}</span>
                  </v-tooltip>
                </v-list-item-icon>-->
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list subheader align="left" id="refs">
              <v-subheader class="overline white--text">Referents</v-subheader>
              <v-alert type="info" align="left" color="gray lighten-4">
                WPRN Referents are senior scientists who accepted, by invitation of the Advisory Board, to screen projects in
                their domain of expertise (discipline, theme, type of projects).
                <br />They weed out spam and irrelevant
                projects, validate projects that will get a web-page, flag those which they consider most interesting and
                innovative.
                <br />Referents receive on a regular basis an updated list of newly uploaded projects to validate. Uploaded
                projects are visible and searchable on WPRN with the mention “pending validation” until validated by
                our referents. Please be patient.
                <br />Referents work
                <em>pro bono</em> -as everyone else in WPRN.
              </v-alert>

              <v-list-item class="ml-3" v-for="(person, index) in referents" :key="index">
                <v-list-item-content>
                  <v-list-item-title>{{person}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list subheader align="left" id="institutions">
              <v-subheader class="overline white--text">Contributors' Institutions</v-subheader>
              <v-alert
                type="info"
                align="left"
                color="gray lighten-4"
              >The list of the WPRN Contributors' Institutions will be made available shortly</v-alert>
              <v-list-item class="ml-3" v-for="(person, index) in contributors" :key="index">
                <v-list-item-content>
                  <v-list-item-title>{{person}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
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
import { board, contributors, supports } from "~/assets/data";
import NavigationDrawer from "~/components/navigation/NavigationDrawer";
export default {
  data() {
    return {
      board,
      contributors,
      supports,
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
