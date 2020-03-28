<template>
  <v-container
    app
    fill-height
    style="align-items:start;"
    :class="{'pr-0':$vuetify.breakpoint.smAndDown}"
  >
    <v-app-bar app color="white" height="100" elevate-on-scroll elevation-3>
      <v-btn text @click="$router.push({path:'/'})">
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
    <v-content v-scroll="onScroll">
      <v-container id="content">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="12" md="8">
            <h2
              class="display-2 font-weight-bold my-3 text-uppercase text-center"
            >Boards and contributors</h2>
            <v-responsive class="mx-auto mb-12" width="56">
              <v-divider class="mb-1"></v-divider>
              <v-divider></v-divider>
            </v-responsive>
            <v-list two-line subheader align="left">
              <v-subheader>Scientific Advisory Board</v-subheader>
              <v-list-item v-for="(person, index) in board" :key="index">
                <v-list-item-avatar>
                  <img v-if="person.picture" :src="person.picture" alt="alt" />
                  <v-icon large v-else>mdi-account-circle</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{person.name}}
                    <v-chip small label v-if="person.role" class="ml-2">{{person.role}} contact</v-chip>
                  </v-list-item-title>
                  <v-list-item-subtitle>{{person.org}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn icon color="primary" v-on="on">
                        <v-icon color="grey">mdi-email</v-icon>
                      </v-btn>
                    </template>
                    <span>Contact {{person.name}}</span>
                  </v-tooltip>
                </v-list-item-icon>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>
            <v-list subheader align="left">
              <v-subheader>Contributors</v-subheader>
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
import { board, contributors } from "~/assets/data";
import NavigationDrawer from "~/components/navigation/NavigationDrawer";
export default {
  data() {
    return {
      board,
      contributors,
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
