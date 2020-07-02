<template>
  <div>
    <Splash />
    <About
      @goToRegister=" $vuetify.goTo('#register', { offset: 100 })
                      tabsValue ='#register';
                      contactOnly = false
                      step = 1"
      @intersect="onIntersect($event)"
    />
    <ShareProject
      @register=" $vuetify.goTo('#register', { offset: 100 })
                  tabsValue='#register';
                  contactOnly = false
                  step = 1"
    />
    <Stats />
    <Who />
    <section
      id="register"
    >
      <v-sheet
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
                        @intersect="onIntersect($event)"
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
  </div>
</template>

<script>
import ContactForm from '~/components/contact/ContactForm'
import ProjectForm from '~/components/projectForm/ProjectForm'
import About from '~/components/mainPage/About'
import Splash from '~/components/mainPage/Splash'
import Stats from '~/components/mainPage/Stats'
import ShareProject from '~/components/mainPage/ShareProject'
import Who from '~/components/mainPage/Who'
import ProjectPostedWindow from '~/components/projectForm/ProjectPostedWindow'
import ContactPostedWindow from '~/components/contact/ContactPostedWindow'

/* import WorkInProgressDialog from "~/components/navigation/WorkInProgressDialog"; */
import { zones } from '~/assets/data'
export default {
  components: {
    ContactForm,
    ProjectForm,
    About,
    ContactPostedWindow,
    ProjectPostedWindow,
    Stats,
    ShareProject,
    Who,
    Splash
  },
  data () {
    return {
      zones,
      drawer: false,
      contactOnly: false,
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
          this.$vuetify.goTo('#register')
        }, 1)
      } else {
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
    onIntersect (event) {
      if (event === 'REGISTER') this.tabsValue = '/#register'
      if (event === 'ABOUT') this.tabsValue = '/#about'
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
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
    font-family: 'Poiret One', 'sans-serif'!important;
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
