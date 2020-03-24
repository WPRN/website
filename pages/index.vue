<template>
  <div>
    <v-app-bar app color="white" height="100" inverted-scroll elevate-on-scroll elevation-3>
      <v-btn text @click="$vuetify.goTo('#hero')">
        <v-avatar class="mr-3" tile color="grey lighten-5" size="72">
          <v-img contain max-height="100%" src="/website/logo.png"></v-img>
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
          class="mr-2 mt-12"
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
      @contact="contactOnly=$event;drawer=false;$event?step=0:step=1"
      :drawer="drawer"
    />
    <v-content>
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
            class="mt-12 mr-2"
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
            srcset="splash_sm.jpg 480w, splash_lg.jpg 600w, splash_xl 800w.jpg"
            src="/website/splash_xl.jpg"
            lazy-src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAgAB8DASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABwYIBf/EACkQAAIBAwIFBAIDAAAAAAAAAAECAwQFEQAGEhMhMUEHIlFhFDIjQvD/xAAWAQEBAQAAAAAAAAAAAAAAAAADAQX/xAAiEQABBAEDBQEAAAAAAAAAAAABAAIDERIEITETQVFhcfD/2gAMAwEAAhEDEQA/AMlWW2Vt4uUVvoITLPJkgDwAMkn6A/2dOFj9Kdo2qzULbjFdWXKrLGUyymCmgVRklVX3sfHUgE57Y1EejFRR2msa7VqQFHl5QMgLZCqWMeFIYcZKrxeM+caUp6KPcV5kittytkNXVUytb+VV+2Bf25TKTlT1ZeED40x0krg1zTTd72v977oXycgcqL3RtX0uuFJcH27cqi0VVLHxQxVErSfkEY4hwni8k44XPRScHRDWU8lLUNDIVJHZlOQw8EfWk/d21a21yvDw86QJluBWGMDJAB+B8fGoa+yRTWul9kCzQSMhKKQ7K3X3dMHBB+9JKyEszhdYUikJNFdn0vojequayQ1FJHXSfyUkdQxTnNjBRX/UOcDAbAPbIPe12lfJNvXeOWqRoY6WrAlR4CJ42XIJVsFkdcYPbv8AZ0MQSyQTJNC7RyIcqynqDpg2t61wwWdbXujatHdf1V6tAvMkReg4lcEFsYHFkdABjoMJDrMY+k4WFXRW7IK+v1wtwNXemhqK2kg5c0siqHlCSgdTGWz5Iz2B7kaz1vKsoay8zzW4VAp5HMiioVRKmf6sV9rY+QBnVnvr1Sp7mlVT7atVZa4qs5qGqasSlugGFUKAq4AwMkDRiSSck5OsyCEQtPkpfgX/2Q=="
          >
            <v-container fill-height>
              <v-row align="center" class="white--text mx-auto" justify="center">
                <v-col class="white--text text-center" cols="12" tag="h1">
                  <span
                    :class="[$vuetify.breakpoint.smAndDown ? 'display-3': 'display-4']"
                    class="font-weight-black"
                  >
                    <v-avatar
                      class="mr-3"
                      tile
                      :size="$vuetify.breakpoint.smAndDown ? 'calc(20vh - ' + $vuetify.application.top + 'px)': 'calc(40vh - ' + $vuetify.application.top + 'px)'"
                    >
                      <v-img
                        contain
                        src="/website/logo.svg"
                        lazy-loading="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAANX8AADV/AWBNYQcAAAAHdElNRQfkAxMOMxc5K7xoAAABq0lEQVQ4y5XUy05TURQG4G+fntP2AHIrQYxAMDGg8ZIw1gmJceBTOHDq0/g0TpwY48gYI1ETAzZSIBpLQShSWrqdVAhguKzhyvr3f1k7KzxtzReDi1X0fj+dLz6/4Di8KKYBF2cIkks8D9LTrbaamuiaaaXzATteWlTyUZ8FTwyfDeh6641d+5akckMey45NnPBQ986IRE3bTTWv/DibYcsXbQXjrmsbtGHD5FkMqZLvEjVF64KpUyZPAMbM6Qru+GZb2YiJsyUNeKSmIaobMOmB0fNiveuZ16oWzHjo3v/2EHRFBR2pA4lbptXl+hQkuoKAbk9/AnuWRVVNq7rqfvpl16ZPVqxaBJvq/0xHuT1N/ZYk2FY07sCGKS1NG1bQ0TlKKRi3bsy6IQ39Mh0HMh1RZlZd/fBH92Kt2LWtpOm3EV1rKjIfjMllZlXtHAekhn02p6qgKJhUkckdIOpzw9eepMNYr2qZsKuCXBFX3NdUVsao2/KjWNvWBGVVZQ0NiWBZLgr2NW3KBINHDEHUQu6PjkQq07ElKsrtiwq9TZBGUcGMi1QUhcuemb9RO4sbSkOhDAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0wMy0xOVQxNDo1MToyMyswMTowMP1FE98AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMDMtMTlUMTQ6NTE6MjMrMDE6MDCMGKtjAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=="
                      ></v-img>
                    </v-avatar>
                  </span>
                </v-col>
                <v-btn class="align-self-end" fab @click="$vuetify.goTo('#about-us', {offset:100})">
                  <v-icon>mdi-chevron-double-down</v-icon>
                </v-btn>
              </v-row>
            </v-container>
          </v-img>
        </v-row>
      </section>

      <section id="about-us">
        <div class="py-12"></div>
        <v-container class="text-center">
          <h2 class="display-2 font-weight-bold mb-3">ABOUT US</h2>

          <v-responsive class="mx-auto mb-8" width="56">
            <v-divider class="mb-1"></v-divider>
            <v-divider></v-divider>
          </v-responsive>

          <v-responsive class="mx-auto title font-weight-light mb-8" max-width="720">
            The World Pandemic Research Network (WPRN) has been created to publish and share in one single
            place the list of all research initiatives and surveys about the current pandemic of Covid-19 coronavirus.
            <br />This is a non-profit academic resource that does not substitute to any ongoing research but enables
            each researcher or stakeholder to be aware of what initiatives are taken, and get in touch directly with
            those in charge.
            <br />There is
            no dependence, no legal nor economic binding. Each participant remains completely independent for
            action and publication.
          </v-responsive>
        </v-container>

        <div class="py-12"></div>
      </section>

      <section id="missions" class="grey lighten-3">
        <div class="py-12"></div>
        <v-container class="text-center">
          <h2 class="display-2 font-weight-bold mb-3 black--text">OUR MISSIONS</h2>
          <v-responsive class="mx-auto mb-8" width="56">
            <v-divider class="mb-1" dark></v-divider>
            <v-divider dark></v-divider>
          </v-responsive>

          <v-row>
            <v-col cols="12" md="6">
              <v-card class="py-12 px-4" color="grey lighten-5" light flat>
                <div>
                  <v-avatar color="primary" size="88">
                    <v-icon dark large>mdi-information-outline</v-icon>
                  </v-avatar>
                </div>
                <v-card-title
                  class="justify-center font-weight-black text-uppercase"
                  color="black"
                >Gather information</v-card-title>
                <v-card-text class="subtitle-1" color="black">
                  We want to consolidate information on existing research initiatives and projects in a single place and be able to orient actors directly
                  to the project contact points to inform, mutualize and share their discoveries. Please
                  <a
                    href
                  >register your project</a> if you feel that you can contribute.
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card class="py-12 px-4" color="grey lighten-5" light flat>
                <div>
                  <v-avatar color="primary" size="88">
                    <v-icon dark large>mdi-head-cog-outline</v-icon>
                  </v-avatar>
                </div>
                <v-card-title
                  class="justify-center font-weight-black text-uppercase"
                  color="black"
                >Distribute knowledge</v-card-title>
                <v-card-text class="subtitle-1" color="black">
                  Our second mission is to serve as an entry point for the evaluation of the impacts of Covid-19 (with open access to
                  methodologies, questionnaires) and as aggregator of locally cropped data made available to all
                  participants for analysis.
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <div class="py-12"></div>
      </section>

      <section id="branches">
        <v-sheet color="#333333" tag="section" tile>
          <div class="py-12"></div>
          <v-container>
            <h2
              class="display-2 font-weight-bold mb-3 text-uppercase text-center"
            >CONTINENTAL BRANCHES</h2>
            <WorldMap />
          </v-container>

          <div class="py-12"></div>
        </v-sheet>
      </section>

      <section id="stats">
        <v-parallax
          :height="$vuetify.breakpoint.smAndDown ? 700 : 500"
          src="/website/parralax_lg.jpg"
        >
          <v-container fill-height>
            <v-row class="mx-auto">
              <v-col v-for="[value, title] of stats" :key="title" cols="12" md="3">
                <div class="text-center">
                  <div class="display-3 font-weight-black mb-4" v-text="value"></div>

                  <div class="title font-weight-regular text-uppercase" v-text="title"></div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-parallax>
      </section>
      <section id="meetings" class="grey lighten-3">
        <div class="py-12"></div>
        <v-container class="text-center">
          <h2 class="display-2 font-weight-bold mb-3 black--text">NEXT MEETINGS</h2>
          <v-responsive class="mx-auto mb-8" width="56">
            <v-divider class="mb-1" dark></v-divider>
            <v-divider dark></v-divider>
          </v-responsive>
          <MeetingList :events="events" />
        </v-container>
        <div class="py-12"></div>
      </section>
      <section id="featured">
        <div class="py-12"></div>

        <v-container>
          <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center">FEATURED PROJECTS</h2>

          <v-responsive class="mx-auto mb-12" width="56">
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-row>
            <v-col cols="12" md="4">
              <v-img src="/website/economics.jpg" class="mb-4" height="275" max-width="100%"></v-img>

              <h3 class="font-weight-black mb-4 text-uppercase">Economic impact of Covid-19.</h3>

              <div class="title font-weight-light mb-5">
                This stems from the pioneer research led by Professor Xiaobo Zhang on the economic impact of the
                epidemic on Chinese SMEs. Their team has agreed to share their questionnaire, which is currently
                translated and surveys launched around the world. Here are the specifications to participate. Please
                <a
                  href
                >check here</a>
                with WPRN-W if someone is already involved in your geographic zone, to collaborate
                and share the work.
              </div>

              <v-btn class="ml-n4 font-weight-black" text>Continue Reading</v-btn>
            </v-col>
            <v-col cols="12" md="4">
              <v-img src="/website/future.jpg" class="mb-4" height="275" max-width="100%"></v-img>

              <h3
                class="font-weight-black mb-4 text-uppercase"
              >Resource Directory of Positive Future Programmes.</h3>

              <div class="title font-weight-light mb-5">
                This initiative aims at creating and disseminating visions of a positive, liveable and possible future, to
                show that another world is possible and counteract mainstream dystopic visions. We will create a data
                repository of positive cases, reports and discoveries that could contribute to make the world better, in
                collaboration with major forecast and scientific institutes.
                This will include cases of positive initiatives taken by governments, organizations, or citizens to address
                the consequences of the current pandemic.
              </div>

              <v-btn class="ml-n4 font-weight-black" text>Continue Reading</v-btn>
            </v-col>
            <v-col cols="12" md="4">
              <v-img src="/website/social.jpg" class="mb-4" height="275" max-width="100%"></v-img>

              <h3 class="font-weight-black mb-4 text-uppercase">Social impact of Covid-19.</h3>

              <div class="title font-weight-light mb-5">
                This stems from the pioneer research led by Professor Xiaobo Zhang on the economic impact of the
                epidemic on Chinese SMEs. Their team has agreed to share their questionnaire, which is currently
                translated and surveys launched around the world. Here are the specifications to participate. Please
                <a
                  href
                >check here</a>
                with WPRN-W if someone is already involved in your geographic zone, to collaborate
                and share the work.
              </div>

              <v-btn class="ml-n4 font-weight-black" text>Continue Reading</v-btn>
            </v-col>
          </v-row>
        </v-container>

        <div class="py-12"></div>
      </section>
      <section id="contact">
        <v-sheet color="#333333" tile>
          <div class="py-12"></div>

          <v-container>
            <h2
              class="display-2 font-weight-bold mb-3 text-uppercase text-center"
            >{{['CONTACT US','REGISTER YOUR PROJECT','THANK YOU!'][step]}}</h2>

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
                        <ContactForm @complete="valid=true" />
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
                        <ProjectForm @complete="step=2" />
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
    </v-content>
  </div>
</template>

<script>
import ContactForm from "~/components/contact/ContactForm";
import ProjectForm from "~/components/projectForm/ProjectForm";
import FeaturedItem from "~/components/mainPage/FeaturedItem";
import MeetingList from "~/components/mainPage/MeetingList";
import WorldMap from "~/components/mainPage/WorldMap";
import ProjectPostedWindow from "~/components/projectForm/ProjectPostedWindow";
import ContactPostedWindow from "~/components/contact/ContactPostedWindow";
import NavigationDrawer from "~/components/navigation/NavigationDrawer";
import { zones } from "~/assets/data";
export default {
  data() {
    return {
      zones,
      drawer: false,
      contactOnly: false,
      valid: false,
      step: 2,
      stats: [
        ["45", "Contributors"],
        ["330+", "Projects"],
        ["7", "Continental Zones"],
        ["12", "reports"]
      ],
      events: [
        {
          date: "04/10/2020",
          name: "Weekly Meeting"
        },
        {
          date: "04/18/2020",
          name: "Weekly Meeting"
        },
        {
          date: "04/24/2020",
          name: "Weekly Meeting"
        },
        {
          date: "04/30/2020",
          name: "Weekly Meeting"
        },
        {
          date: "05/07/2020",
          name: "Weekly Meeting"
        }
      ]
    };
  },
  components: {
    ContactForm,
    ProjectForm,
    FeaturedItem,
    MeetingList,
    WorldMap,
    NavigationDrawer,
    ContactPostedWindow,
    ProjectPostedWindow
  },

  async mounted() {
    await this.$recaptcha.init();
  },
  methods: {
    async onSubmit() {
      try {
        const token = await this.$recaptcha.execute("login");
      } catch (error) {}
    }
  }
};
</script>
