<template>
  <div>
    <v-app-bar app color="white" height="100" inverted-scroll elevate-on-scroll elevation-3>
      <v-btn text @click="$vuetify.goTo('#hero')" class="ml-0 pl-0">
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
      @contact="$vuetify.goTo('#contact', {offset:100});contactOnly=true;drawer=false;step=0"
      @register="$vuetify.goTo('#contact', {offset:100});contactOnly=false;drawer=false;step=1"
      @about="$vuetify.goTo('#about-us', {offset:100});drawer=false"
      @featured="$vuetify.goTo('#featured', {offset:100});drawer=false"
      @list="$router.push({path:'/worldwide'})"
      :drawer="drawer"
    />
    <v-content v-scroll="onScroll">
      <section id="hero">
        <v-fab-transition>
          <v-btn
            dark
            absolute
            top
            right
            tile
            fab
            outlined
            class="mt-12 mr-0"
            size="90"
            @click.stop="drawer = !drawer"
            v-show="!drawer"
            x-large
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </v-fab-transition>
        <v-row no-gutters>
          <!-- TODO make a better responsive version -->
          <v-img
            :height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
            srcset="splash_sm.jpg 480w, splash_lg.jpg 600w, splash_xl.jpg 800w.jpg"
            src="/splash_lg.jpg"
            lazy-src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAgAB8DASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABwYIBf/EACkQAAIBAwIFBAIDAAAAAAAAAAECAwQFEQAGEhMhMUEHIlFhFDIjQvD/xAAWAQEBAQAAAAAAAAAAAAAAAAADAQX/xAAiEQABBAEDBQEAAAAAAAAAAAABAAIDERIEITETQVFhcfD/2gAMAwEAAhEDEQA/AMlWW2Vt4uUVvoITLPJkgDwAMkn6A/2dOFj9Kdo2qzULbjFdWXKrLGUyymCmgVRklVX3sfHUgE57Y1EejFRR2msa7VqQFHl5QMgLZCqWMeFIYcZKrxeM+caUp6KPcV5kittytkNXVUytb+VV+2Bf25TKTlT1ZeED40x0krg1zTTd72v977oXycgcqL3RtX0uuFJcH27cqi0VVLHxQxVErSfkEY4hwni8k44XPRScHRDWU8lLUNDIVJHZlOQw8EfWk/d21a21yvDw86QJluBWGMDJAB+B8fGoa+yRTWul9kCzQSMhKKQ7K3X3dMHBB+9JKyEszhdYUikJNFdn0vojequayQ1FJHXSfyUkdQxTnNjBRX/UOcDAbAPbIPe12lfJNvXeOWqRoY6WrAlR4CJ42XIJVsFkdcYPbv8AZ0MQSyQTJNC7RyIcqynqDpg2t61wwWdbXujatHdf1V6tAvMkReg4lcEFsYHFkdABjoMJDrMY+k4WFXRW7IK+v1wtwNXemhqK2kg5c0siqHlCSgdTGWz5Iz2B7kaz1vKsoay8zzW4VAp5HMiioVRKmf6sV9rY+QBnVnvr1Sp7mlVT7atVZa4qs5qGqasSlugGFUKAq4AwMkDRiSSck5OsyCEQtPkpfgX/2Q=="
          >
            <v-container fill-height>
              <v-row align="center" class="white--text mx-auto" justify="center">
                <v-col
                  class="white--text d-flex justify-center flex-column align-center"
                  cols="12"
                  tag="h1"
                >
                  <span
                    :class="[$vuetify.breakpoint.smAndDown ? 'display-3': 'display-4']"
                    class="font-weight-black"
                  >
                    <Logo />
                  </span>
                  <br />
                  <div
                    style="background-color:#333333; border-radius:10px; max-width:600px; "
                    class="pa-2 title d-flex justify-center text-center"
                  >ASSESSING SOCIETAL AND HUMAN IMPACT OF COVID-19</div>
                </v-col>
                <v-btn
                  large
                  class="align-self-end"
                  fab
                  @click="$vuetify.goTo('#about-us', {offset:100})"
                >
                  <v-icon large>mdi-arrow-down</v-icon>
                </v-btn>
              </v-row>
            </v-container>
          </v-img>
        </v-row>
      </section>

      <About />
      <Stats />

      <Featured />
      <section id="contact">
        <v-sheet color="#333333" tile>
          <div class="py-12"></div>

          <v-container>
            <h2
              class="display-2 font-weight-bold mb-3 text-uppercase text-center"
            >{{['CONTACT WPRN','REGISTER YOUR PROJECT','THANK YOU!'][step]}}</h2>

            <v-responsive class="mx-auto mb-12" width="56">
              <v-divider class="mb-1"></v-divider>

              <v-divider></v-divider>
            </v-responsive>
            <v-row no-gutters justify="center" v-if="step<2">
              <v-col cols="12" md="10" lg="8">
                <v-checkbox
                  class="pl-6 mt-0"
                  v-model="contactOnly"
                  label="I just want to contact WPRN"
                  dark
                  hide-details
                  @change="contactOnly?step=0:step=1"
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-window v-model="step">
              <v-window-item :value="0">
                <v-card-text class="pb-0">
                  <v-theme-provider light>
                    <v-row no-gutters justify="center">
                      <v-col cols="12" md="10" lg="8" no-gutters align="center">
                        <ContactForm
                          @complete="step=2"
                          @WorkInProgressDialogToggle="WorkInProgressDialogToggle=true"
                        />
                      </v-col>
                    </v-row>
                  </v-theme-provider>
                </v-card-text>
              </v-window-item>
              <v-window-item :value="1">
                <v-card-text class="pb-0">
                  <v-theme-provider light>
                    <v-row no-gutters justify="center">
                      <v-col cols="12" md="10" lg="8" no-gutters align="center">
                        <ProjectForm
                          @complete="step=2"
                          @WorkInProgressDialogToggle="WorkInProgressDialogToggle=true"
                        />
                      </v-col>
                    </v-row>
                  </v-theme-provider>
                </v-card-text>
              </v-window-item>
              <v-window-item :value="2">
                <v-row no-gutters justify="center">
                  <v-col cols="12" md="10" lg="8">
                    <template v-if="contactOnly">
                      <ContactPostedWindow @reset="step=0; contactOnly=true" />
                    </template>
                    <template v-else>
                      <ProjectPostedWindow @reset="step=1" />
                    </template>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-container>

          <div class="py-12"></div>
        </v-sheet>
      </section>
      <v-fab-transition>
        <v-btn
          v-if="$vuetify.breakpoint.mdAndUp"
          color="accent"
          dark
          fixed
          bottom
          right
          contained
          fab
          v-show="offsetTop>600"
          @click="$vuetify.goTo('#hero')"
        >
          <v-icon>mdi-arrow-up</v-icon>
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
import ContactForm from "~/components/contact/ContactForm";
import ProjectForm from "~/components/projectForm/ProjectForm";
import FeaturedItem from "~/components/mainPage/FeaturedItem";
import About from "~/components/mainPage/About";
import Stats from "~/components/mainPage/Stats";
import Featured from "~/components/mainPage/Featured";
/* import MeetingList from "~/components/mainPage/MeetingList";
import WorldMap from "~/components/mainPage/WorldMap"; */
import ProjectPostedWindow from "~/components/projectForm/ProjectPostedWindow";
import ContactPostedWindow from "~/components/contact/ContactPostedWindow";
import NavigationDrawer from "~/components/navigation/NavigationDrawer";
/* import WorkInProgressDialog from "~/components/navigation/WorkInProgressDialog"; */
import Logo from "~/components/navigation/Logo";
import { zones } from "~/assets/data";
export default {
  data() {
    return {
      zones,
      drawer: false,
      contactOnly: false,
      /*       WorkInProgressDialogToggle: true, */
      valid: false,
      step: 1,
      offsetTop: 0
    };
  },
  components: {
    ContactForm,
    ProjectForm,
    FeaturedItem,
    About,
    /*   MeetingList, */
    NavigationDrawer,
    ContactPostedWindow,
    ProjectPostedWindow /*
    WorkInProgressDialog, */,
    Logo,
    Stats,
    Featured
  },

  async mounted() {
    if (this.$route.hash) {
      if (this.$route.hash === "#register") {
        this.contactOnly = false;
        this.step = 1;
        setTimeout(() => {
          this.$vuetify.goTo("#contact");
        }, 1);
      } else {
        this.contactOnly = true;
        this.step = 0;
        setTimeout(() => {
          this.$vuetify.goTo(this.$route.hash, { offset: 100 });
        }, 1);
      }
    }
    await this.$recaptcha.init();
  },
  methods: {
    onScroll(e) {
      this.offsetTop = e.target.scrollingElement.scrollTop;
    }
  }
};
</script>
