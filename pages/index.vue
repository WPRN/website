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
            srcset="splash_sm.jpg 480w, splash_lg.jpg 600w, splash_xl 800w.jpg"
            src="/splash_xl.jpg"
            lazy-src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAgAB8DASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABwYIBf/EACkQAAIBAwIFBAIDAAAAAAAAAAECAwQFEQAGEhMhMUEHIlFhFDIjQvD/xAAWAQEBAQAAAAAAAAAAAAAAAAADAQX/xAAiEQABBAEDBQEAAAAAAAAAAAABAAIDERIEITETQVFhcfD/2gAMAwEAAhEDEQA/AMlWW2Vt4uUVvoITLPJkgDwAMkn6A/2dOFj9Kdo2qzULbjFdWXKrLGUyymCmgVRklVX3sfHUgE57Y1EejFRR2msa7VqQFHl5QMgLZCqWMeFIYcZKrxeM+caUp6KPcV5kittytkNXVUytb+VV+2Bf25TKTlT1ZeED40x0krg1zTTd72v977oXycgcqL3RtX0uuFJcH27cqi0VVLHxQxVErSfkEY4hwni8k44XPRScHRDWU8lLUNDIVJHZlOQw8EfWk/d21a21yvDw86QJluBWGMDJAB+B8fGoa+yRTWul9kCzQSMhKKQ7K3X3dMHBB+9JKyEszhdYUikJNFdn0vojequayQ1FJHXSfyUkdQxTnNjBRX/UOcDAbAPbIPe12lfJNvXeOWqRoY6WrAlR4CJ42XIJVsFkdcYPbv8AZ0MQSyQTJNC7RyIcqynqDpg2t61wwWdbXujatHdf1V6tAvMkReg4lcEFsYHFkdABjoMJDrMY+k4WFXRW7IK+v1wtwNXemhqK2kg5c0siqHlCSgdTGWz5Iz2B7kaz1vKsoay8zzW4VAp5HMiioVRKmf6sV9rY+QBnVnvr1Sp7mlVT7atVZa4qs5qGqasSlugGFUKAq4AwMkDRiSSck5OsyCEQtPkpfgX/2Q=="
          >
            <v-container fill-height>
              <v-row align="center" class="white--text mx-auto" justify="center">
                <v-col class="white--text text-center" cols="12" tag="h1">
                  <span
                    :class="[$vuetify.breakpoint.smAndDown ? 'display-3': 'display-4']"
                    class="font-weight-black"
                  >
                    <Logo />
                  </span>
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

      <section id="about-us">
        <div class="py-12"></div>
        <v-container class="text-center">
          <h2 class="display-2 font-weight-bold mb-3">ABOUT US</h2>

          <v-responsive class="mx-auto mb-8" width="56">
            <v-divider class="mb-1"></v-divider>
            <v-divider></v-divider>
          </v-responsive>
          <v-row>
            <v-col sm="12" md="6" lg="5" offset-lg="1">
              <v-responsive
                :class="{ 'text-right' : $vuetify.breakpoint.mdAndUp } "
                class="d-flex align-center mx-auto title font-weight-light mb-8"
                max-width="720"
                height="100%"
              >
                <b>The World Pandemic Research Network (WPRN)</b> publishes the list of all research initiatives, projects and surveys about the social and economic impacts of the Covid-19 pandemic.
                <br />WPRN is a non-profit academic resource that does not substitute to any ongoing research. It enables each researcher or stakeholder to be aware of what initiatives are taken and get in touch with their contact-points.
                <br />There is no dependence, no legal nor economic binding. Each participant remains completely independent for action and publication.
                <br />WPRN is RGDP compliant and will not publish, give or sell your email address.
                <br />
                <nuxt-link to="/board_and_contributors">Board and contributors</nuxt-link>
              </v-responsive>
            </v-col>
            <v-col sm="12" md="6" lg="5">
              <v-card class="pa-6 mb-6" flat>
                <div>
                  <v-avatar color="primary" size="88">
                    <v-icon dark large>mdi-information-outline</v-icon>
                  </v-avatar>
                </div>
                <v-card-title
                  class="justify-center font-weight-black text-uppercase"
                >Directory of projects</v-card-title>
                <v-card-text class="subtitle-1" color="black">
                  We host and publish a
                  <nuxt-link
                    to="/worldwide"
                    class="blue--text"
                  >searchable directory of projects, calls and resources worldwide</nuxt-link>. Please
                  <span
                    @click="$vuetify.goTo('#contact'); contactOnly=false; step=1"
                    class="blue--text"
                    style="cursor:pointer;text-decoration:underline"
                  >register your project</span>
                  if you feel that you can contribute.
                </v-card-text>
              </v-card>
              <v-card class="pa-6" flat>
                <div>
                  <v-avatar color="primary" size="88">
                    <v-icon dark large>mdi-share-variant</v-icon>
                  </v-avatar>
                </div>
                <v-card-title
                  class="justify-center font-weight-black text-uppercase"
                >Hub for collaboration</v-card-title>
                <v-card-text class="subtitle-1" color="black">
                  <nuxt-link to="/worldwide" class="blue--text">Our project list</nuxt-link>&nbsp;serves as an hub for collaboration and resource sharing. Use the “contact” button for initial get-in-touch with project contact-points. WPRN also houses
                  <span
                    @click="$vuetify.goTo('#featured', {offset:100})"
                    class="blue--text"
                    style="cursor:pointer;text-decoration:underline"
                  >multicentric projects</span>.
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <div class="py-12"></div>
      </section>
      <section id="stats">
        <v-parallax
          :height="$vuetify.breakpoint.smAndDown ? 700 : 500"
          src="/parallax_lg.jpg"
          srcset="parallax_sm.jpg 480w, parallax_md.jpg 600w, parallax_lg 800w.jpg"
        >
          <v-overlay absolute z-index="0" opacity="0.6"></v-overlay>
          <v-container fill-height style="z-index:2;">
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
              <v-img src="/economics.jpg" class="mb-4" height="275" max-width="100%"></v-img>

              <h3 class="font-weight-black mb-4 text-uppercase">Economic impact of Covid-19.</h3>

              <div class="title font-weight-light mb-5">
                This stems from the pioneer research led by Professor Xiaobo Zhang on the economic impact of the
                epidemic on Chinese SMEs. Their team has agreed to share their questionnaire, which is currently
                translated and surveys launched around the world. Here are the specifications to participate. Please
                <span
                  @click="$vuetify.goTo('#contact', {offset:100})"
                  class="blue--text"
                  style="cursor:pointer;text-decoration:underline"
                >click here</span>
                if you are interested in
                contributing.”
              </div>

              <v-btn class="ml-n4 font-weight-black" text>More info</v-btn>
            </v-col>
            <v-col cols="12" md="4">
              <v-img src="/future.jpg" class="mb-4" height="275" max-width="100%"></v-img>

              <h3
                class="font-weight-black mb-4 text-uppercase"
              >Resource Directory of Positive Future Programmes.</h3>

              <div class="title font-weight-light mb-5">
                Positive Futures aims, in collaboration with major forecast and scientific institutes, at creating and
                disseminating visions of positive, liveable futures, to show that another world is possible and counteract
                mainstream dystopic visions. It includes a data repository of inspiring positive cases, reports and
                discoveries that could contribute to make the world better. This will include cases of positive initiatives
                taken by governments, organizations, or citizens to address the consequences of the current pandemic.
                <span
                  @click="$vuetify.goTo('#contact', {offset:100})"
                  class="blue--text"
                  style="cursor:pointer;text-decoration:underline"
                >Write here</span> if you have a pointer to an inspiring resource.”
              </div>

              <v-btn class="ml-n4 font-weight-black" text>More info</v-btn>
            </v-col>
            <v-col cols="12" md="4">
              <v-img src="/social.jpg" class="mb-4" height="275" max-width="100%"></v-img>

              <h3
                class="font-weight-black mb-4 text-uppercase"
              >Psychological and Social impact of Covid-19.</h3>

              <div class="title font-weight-light mb-5">
                Confinement has direct impacts on the morale and behaviour (domestic violence, suicides, divorces,
                etc.) which in turn impact social services, courts, etc. How do people cope, positively or not, with the
                stressful situation of lockdown? This survey intends to monitor these effects in various countries and
                collect the factors that can help mitigating the damage. Please
                <span
                  @click="$vuetify.goTo('#contact', {offset:100})"
                  class="blue--text"
                  style="cursor:pointer;text-decoration:underline"
                >click here</span> if you are interested in
                contributing.
              </div>

              <v-btn class="ml-n4 font-weight-black" text>More info</v-btn>
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
                        <ContactForm
                          @complete="valid=true"
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
    <WorkInProgressDialog
      :dialog="WorkInProgressDialogToggle"
      @close="WorkInProgressDialogToggle=false"
    />
  </div>
</template>

<script>
import ContactForm from "~/components/contact/ContactForm";
import ProjectForm from "~/components/projectForm/ProjectForm";
import FeaturedItem from "~/components/mainPage/FeaturedItem";
/* import MeetingList from "~/components/mainPage/MeetingList";
import WorldMap from "~/components/mainPage/WorldMap"; */
import ProjectPostedWindow from "~/components/projectForm/ProjectPostedWindow";
import ContactPostedWindow from "~/components/contact/ContactPostedWindow";
import NavigationDrawer from "~/components/navigation/NavigationDrawer";
import WorkInProgressDialog from "~/components/navigation/WorkInProgressDialog";
import Logo from "~/components/navigation/Logo";
import { zones } from "~/assets/data";
export default {
  data() {
    return {
      zones,
      drawer: false,
      contactOnly: false,
      WorkInProgressDialogToggle: true,
      valid: false,
      step: 1,
      offsetTop: 0,
      stats: [
        ["XX", "Contributors"],
        ["XXX+", "Projects"],
        ["7", "Continental Zones"],
        ["XX", "reports"]
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
    /*   MeetingList, */
    NavigationDrawer,
    ContactPostedWindow,
    ProjectPostedWindow,
    WorkInProgressDialog,
    Logo
  },

  async mounted() {
    if (this.$route.hash) {
      console.log("HASH", this.$route.hash);

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
          console.log("goto");
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
