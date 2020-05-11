<template>
  <div>
    <v-app-bar
      app
      light
      height="80"
      elevate-on-scroll
      inverted-scroll
      elevation-3
    >
      <v-btn
        text
        class="mx-0 px-0"
        height="auto"
        @click="$vuetify.goTo('#hero')"
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
      <v-tabs
        v-if="$vuetify.breakpoint.mdAndUp"
        v-model="tabsValue"
        light
        right
        slider-size="8"
      >
        <v-tab
          large
          to="/#about-us"
          @click="$vuetify.goTo('#about-us', { offset: 100 })"
        >
          About WPRN
        </v-tab>
        <v-tab
          large
          to="/#register"
          @click="
            $vuetify.goTo('#contact', { offset: 100 })
            contactOnly = false
            drawer = false
            step = 1"
        >
          Register your project
        </v-tab>
        <v-tab
          v-if="$vuetify.breakpoint.mdAndUp"
          large
          text
          height="100%"
          light
          nuxt
          to="/search"
        >
          Browse projects
        </v-tab>
      </v-tabs>
      <v-fab-transition>
        <v-btn
          v-show="!drawer&&$vuetify.breakpoint.smAndDown"
          light
          absolute
          top
          right
          tile
          fab
          outlined
          class="mt-10 mr-0"
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
      @register="
        $vuetify.goTo('#contact', { offset: 100 })
        tabsValue='#register';
        contactOnly = false
        drawer = false
        step = 1
      "
      @about="
        $vuetify.goTo('#about-us', { offset: 100 })
        drawer = false
        tabsValue='#about-us';
      "
      @list="$router.push({ path: '/search' })"
    />
    <v-content v-scroll="onScroll">
      <section
        id="hero"
      >
        <v-row no-gutters>
          <!-- TODO make a better responsive version -->
          <v-img
            class="px-6"
            height="100vh"
            srcset="splash_sm.jpg 480w, splash_lg.jpg 600w, splash_xl.jpg 800w"
            src="/splash_lg.jpg"
            :contain="$vuetify.breakpoint.mdAndUp"
            lazy-src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAgAB8DASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABwYIBf/EACkQAAIBAwIFBAIDAAAAAAAAAAECAwQFEQAGEhMhMUEHIlFhFDIjQvD/xAAWAQEBAQAAAAAAAAAAAAAAAAADAQX/xAAiEQABBAEDBQEAAAAAAAAAAAABAAIDERIEITETQVFhcfD/2gAMAwEAAhEDEQA/AMlWW2Vt4uUVvoITLPJkgDwAMkn6A/2dOFj9Kdo2qzULbjFdWXKrLGUyymCmgVRklVX3sfHUgE57Y1EejFRR2msa7VqQFHl5QMgLZCqWMeFIYcZKrxeM+caUp6KPcV5kittytkNXVUytb+VV+2Bf25TKTlT1ZeED40x0krg1zTTd72v977oXycgcqL3RtX0uuFJcH27cqi0VVLHxQxVErSfkEY4hwni8k44XPRScHRDWU8lLUNDIVJHZlOQw8EfWk/d21a21yvDw86QJluBWGMDJAB+B8fGoa+yRTWul9kCzQSMhKKQ7K3X3dMHBB+9JKyEszhdYUikJNFdn0vojequayQ1FJHXSfyUkdQxTnNjBRX/UOcDAbAPbIPe12lfJNvXeOWqRoY6WrAlR4CJ42XIJVsFkdcYPbv8AZ0MQSyQTJNC7RyIcqynqDpg2t61wwWdbXujatHdf1V6tAvMkReg4lcEFsYHFkdABjoMJDrMY+k4WFXRW7IK+v1wtwNXemhqK2kg5c0siqHlCSgdTGWz5Iz2B7kaz1vKsoay8zzW4VAp5HMiioVRKmf6sV9rY+QBnVnvr1Sp7mlVT7atVZa4qs5qGqasSlugGFUKAq4AwMkDRiSSck5OsyCEQtPkpfgX/2Q=="
          >
            <v-container
              fill-height
              :class="{'px-0' : $vuetify.breakpoint.smAndDown}"
            >
              <v-row
                align="center"
                class="white--text mx-auto"
                justify="center"
                :no-gutters="$vuetify.breakpoint.smAndDown"
                @click="$vuetify.goTo('#about-us', { offset: 100 })"
              >
                <v-col
                  class="white--text d-flex justify-center flex-column align-center "
                  cols="12"
                  :class="$vuetify.breakpoint.name"
                >
                  <div
                    class="mission pa-9"
                    :class="$vuetify.breakpoint.name"
                  >
                    <h1
                      class="main_title mb-6"
                    >
                      World Pandemic Research Network
                    </h1>
                    <div
                      class="main_subtitle pa-2 d-flex justify-center text-center"
                    >
                      Societal Impacts and Aftermath of Covid-19: <br>
                      A Global Searchable Directory
                    </div>
                  </div>
                </v-col>
                <v-btn
                  large
                  class="align-self-end"
                  fab
                  outlined
                  color="white"
                  style="background-color:#272727;"
                  @click="$vuetify.goTo('#about-us', { offset: 100 })"
                >
                  <v-icon large>
                    mdi-arrow-down
                  </v-icon>
                </v-btn>
              </v-row>
            </v-container>
          </v-img>
        </v-row>
      </section>

      <About
        @goToRegister=" $vuetify.goTo('#contact', { offset: 100 })
                        tabsValue='#register';
                        contactOnly = false
                        step = 1"
      />
      <ShareProject
        @register=" $vuetify.goTo('#contact', { offset: 100 })
                    tabsValue='#register';
                    contactOnly = false
                    step = 1"
      />
      <Stats />
      <Who />
      <section id="contact">
        <v-sheet
          v-intersect="setTab('register')"
          color="#333333"
          tile
        >
          <div class="py-12" />

          <v-container>
            <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center">
              {{
                ["CONTACT WPRN", "REGISTER YOUR PROJECT", "THANK YOU!"][step]
              }}
            </h2>

            <v-responsive
              class="mx-auto mb-12"
              width="56"
            >
              <v-divider class="mb-1" />

              <v-divider />
            </v-responsive>
            <v-row
              v-if="step < 2"
              no-gutters
              justify="center"
            >
              <v-col
                cols="12"
                md="10"
                lg="8"
              >
                <v-checkbox
                  v-model="contactOnly"
                  class="pl-6 mt-0"
                  label="I want to contact WPRN"
                  dark
                  hide-details
                  @change="contactOnly ? (step = 0) : (step = 1)"
                />
              </v-col>
            </v-row>
            <v-window
              v-model="step"
              touchless
            >
              <v-window-item :value="0">
                <v-card-text class="pb-0">
                  <v-theme-provider light>
                    <v-row
                      no-gutters
                      justify="center"
                    >
                      <v-col
                        cols="12"
                        md="10"
                        lg="8"
                        no-gutters
                        align="center"
                      >
                        <ContactForm
                          @complete="step = 2"
                          @WorkInProgressDialogToggle="
                            WorkInProgressDialogToggle = true
                          "
                        />
                      </v-col>
                    </v-row>
                  </v-theme-provider>
                </v-card-text>
              </v-window-item>
              <v-window-item :value="1">
                <v-card-text class="pb-0">
                  <v-theme-provider light>
                    <v-row
                      no-gutters
                      justify="center"
                    >
                      <v-col
                        cols="12"
                        md="10"
                        lg="8"
                        no-gutters
                        align="center"
                      >
                        <ProjectForm
                          @complete="step = 2"
                          @WorkInProgressDialogToggle="
                            WorkInProgressDialogToggle = true
                          "
                        />
                      </v-col>
                    </v-row>
                  </v-theme-provider>
                </v-card-text>
              </v-window-item>
              <v-window-item :value="2">
                <v-row
                  no-gutters
                  justify="center"
                >
                  <v-col
                    cols="12"
                    md="10"
                    lg="8"
                  >
                    <template v-if="contactOnly">
                      <ContactPostedWindow
                        @reset="
                          step = 0
                          contactOnly = true
                        "
                      />
                    </template>
                    <template v-else>
                      <ProjectPostedWindow @reset="step = 1" />
                    </template>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-container>
          <div class="py-12" />
        </v-sheet>
      </section>
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
          @click="$vuetify.goTo('#hero')"
        >
          <v-icon
            color="primary"
          >
            mdi-arrow-up
          </v-icon>
        </v-btn>
      </v-fab-transition>
    </v-content>
    <!-- <WorkInProgressDialog
      :dialog="WorkInProgressDialogToggle"
      @close="WorkInProgressDialogToggle=false"
    />-->
  </div>
</template>

<script>
import ContactForm from '~/components/contact/ContactForm'
import ProjectForm from '~/components/projectForm/ProjectForm'
import About from '~/components/mainPage/About'
import Stats from '~/components/mainPage/Stats'
import ShareProject from '~/components/mainPage/ShareProject'
import Who from '~/components/mainPage/Who'
/* import MeetingList from "~/components/mainPage/MeetingList";
import WorldMap from "~/components/mainPage/WorldMap"; */
import ProjectPostedWindow from '~/components/projectForm/ProjectPostedWindow'
import ContactPostedWindow from '~/components/contact/ContactPostedWindow'
import NavigationDrawer from '~/components/navigation/NavigationDrawer'

/* import WorkInProgressDialog from "~/components/navigation/WorkInProgressDialog"; */
import { zones } from '~/assets/data'
export default {
  components: {
    ContactForm,
    ProjectForm,
    About,
    /*   MeetingList, */
    NavigationDrawer,
    ContactPostedWindow,
    ProjectPostedWindow, /*    WorkInProgressDialog, */
    Stats,
    ShareProject,
    Who

    /* Featured */
  },
  data () {
    return {
      zones,
      drawer: false,
      contactOnly: false,
      /*       WorkInProgressDialogToggle: true, */
      valid: false,
      step: 1,
      offsetTop: 0,
      tabsValue: ''
    }
  },

  async mounted () {
    if (this.$route.hash) {
      if (this.$route.hash === '#register') {
        this.tabsValue = '#register'
        this.contactOnly = false
        this.step = 1
        setTimeout(() => {
          this.$vuetify.goTo('#contact')
        }, 1)
      }
      if (this.$route.hash === '#contact') {
        this.contactOnly = true
        this.step = 0
        setTimeout(() => {
          this.$vuetify.goTo(this.$route.hash, { offset: 100 })
        }, 1)
      }
    }
    await this.$recaptcha.init()
  },
  methods: {
    onScroll (e) {
      this.offsetTop = e.target.scrollingElement.scrollTop
    },
    setTab (name) {
      console.log('setting tab to ', name)
      this.tabsValue = '/#' + name
    }

  }
}

</script>
<style lang="scss">
  .mission {
    background-color: rgb(39, 39, 39, 0.95);
border: 0.5px solid white;
    .main_title {
    font-size: 3em;
    font-family: 'Poiret One', cursive!important;
    text-align: center;
    }
     .main_subtitle {
    font-size: 2em;
    font-family: 'Poiret One', cursive!important;
    font-weight: 800;

    }
  }

  .mission.sm , .mission.xs {
         .main_title {
    font-size: 2.5em;
         }
     .main_subtitle {
    font-size: 1.7em;
     }
         }

 .mission.md {
  .main_title {
    font-size: 2em;
         }
  .main_subtitle {
    font-size: 1.3em;
  }
}
    #hero {
       background-color:#060606
    }
    .main_menu {
      position:absolute;
      top:10px;
      right:10px;
      text-align: right;
    }

</style>
