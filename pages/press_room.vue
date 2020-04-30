<template>
  <v-container
    app
    fill-height
    style="align-items: start;"
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
      :drawer="drawer"
      @close="drawer = false"
      @register="$router.push({ path: '/', hash: 'register' })"
      @about="$router.push({ path: '/', hash: 'about-us' })"
      @list="$router.push({ path: '/search' })"
    />
    <v-content v-scroll="onScroll">
      <v-container id="content">
        <v-row justify="center">
          <!--  BackButton takes one col -->
          <BackButton />
          <v-col
            cols="10"
            sm="10"
            md="8"
          >
            <h2 class="display-2 font-weight-bold my-3 text-uppercase text-center">
              Press Room
            </h2>
          </v-col>
          <v-col cols="1" />
          <v-col
            cols="12"
            sm="12"
            md="8"
          >
            <v-responsive
              class="mx-auto"
              width="56"
            >
              <v-divider class="mb-1" />
              <v-divider />
            </v-responsive>
          </v-col>
          <v-col
            cols="12"
            class="text-center"
          >
            <v-tooltip
              v-for="(item, index) in socialIcons"
              :key="index"
              top
            >
              <template
                v-if="index>0"
                v-slot:activator="{ on }"
              >
                <v-btn
                  text
                  icon
                  v-on="on"
                >
                  <a
                    :href="item.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    style="text-decoration: none;"
                  >
                    <v-icon color="white">mdi-{{ item.icon }}</v-icon>
                  </a>
                </v-btn>
              </template>
              <span>{{ item.text }}</span>
            </v-tooltip>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="8"
          >
            <v-responsive
              class="mx-auto"
              width="56"
            >
              <v-divider class="mb-1" />
              <v-divider />
            </v-responsive>
          </v-col>
          <v-col
            cols="12"
            align="center"
          >
            <nuxt-link to="/board_and_contributors">
              Advisory Board
            </nuxt-link>&nbsp;-&nbsp;
            <nuxt-link to="/board_and_contributors#refs">
              Referents
            </nuxt-link>&nbsp;-&nbsp;
            <nuxt-link to="/board_and_contributors#institutions">
              Contributors' Institutions
            </nuxt-link>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="6"
          >
            <v-card
              class="pa-6 mb-6"
              flat
            >
              <v-card-title class="justify-center font-weight-black text-uppercase">
                Press releases
              </v-card-title>
              <v-card-text>
                <v-list
                  two-line
                  subheader
                >
                  <v-list-item
                    href="/press_releases/launch_en.pdf"
                    target="_blank"
                  >
                    <v-list-item-avatar>
                      <v-icon>mdi-file-pdf</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Launching of WPRN.org (English</v-list-item-title>
                      <v-list-item-subtitle>2020-04-20</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon>
                        <v-icon color="grey lighten-1" />
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                  <v-list-item
                    href="/press_releases/launch_fr.pdf"
                    target="_blank"
                  >
                    <v-list-item-avatar>
                      <v-icon>mdi-file-pdf</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Lancement de WPRN.org (French version)</v-list-item-title>
                      <v-list-item-subtitle>2020-04-20</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon>
                        <v-icon color="grey lighten-1" />
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="6"
          >
            <v-card
              class="pa-6"
              flat
            >
              <v-card-title class="justify-center font-weight-black text-uppercase">
                Contacts
              </v-card-title>
              <v-card-text
                class="subtitle-1"
                color="black"
              >
                <v-list
                  three-line
                  subheader
                  align="left"
                >
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-icon large>
                        mdi-account-circle
                      </v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>
                        Martine Savary
                        <v-chip
                          small
                          label
                          class="ml-2"
                        >
                          Mediathena
                        </v-chip>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <v-icon color="grey">
                          mdi-phone
                        </v-icon>
                        <span
                          v-html="
                            '&nbsp;&#051;&#051;&#032;(&#048;)&#054;&#032;&#054;&#052;&#032;&#050;&#053;&#032;&#054;&#054;&#032;&#053;&#057;'
                          "
                        />
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        <v-icon color="grey">
                          mdi-email
                        </v-icon>&nbsp;&#109;&#097;&#114;&#116;&#105;&#110;&#101;&#064;&#103;&#101;&#099;&#107;&#111;&#116;&#111;&#109;&#046;&#099;&#111;&#109;
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-icon large>
                        mdi-account-circle
                      </v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Claire Jeandel</v-list-item-title>
                      <v-list-item-subtitle>
                        <v-icon color="grey">
                          mdi-phone
                        </v-icon>&nbsp;+&#051;&#051;&#032;(&#048;)&#049;&#032;&#053;&#054;&#032;&#056;&#049;&#032;&#048;&#057;&#032;&#050;&#048;
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        <v-icon color="grey">
                          mdi-email
                        </v-icon>&nbsp;&#099;&#108;&#097;&#105;&#114;&#101;&#046;&#106;&#101;&#097;&#110;&#100;&#101;&#108;&#064;&#112;&#097;&#114;&#105;&#115;&#045;&#105;&#101;&#097;&#046;&#102;&#114;
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
        v-show="offsetTop > 600"
        color="accent"
        dark
        fixed
        bottom
        right
        contained
        fab
        @click="$vuetify.goTo('#content')"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>
<script>
import NavigationDrawer from '~/components/navigation/NavigationDrawer'
import BackButton from '~/components/navigation/BackButton'
import {socialIcons} from '~/assets/data'
export default {
  components: {
    NavigationDrawer,
    BackButton
  },
  data () {
    return {
      drawer: false,
      offsetTop: 0,
      contact: false,
      socialIcons
    }
  },
  methods: {
    onScroll (e) {
      this.offsetTop = e.target.scrollingElement.scrollTop
    }
  }
}
</script>
