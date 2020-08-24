<template>
  <div>
    <Splash
      @intersect="onIntersect($event)"
    />
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
        :color="$vuetify.theme.isDark?'#333333':'white'"
        tile
      >
        <div class="py-12" />

        <v-container>
          <h2
            class="display-2 font-weight-bold mb-3 text-uppercase text-center"
            :class="$vuetify.theme.isDark?'text--white':'text--black'"
          >
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
                        step = [...step, {gerger}]
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
      valid: false,
      step: 1,
      offsetTop: 0,
      mounted: false,
      isIntersecting: null,
      tab: null
    }
  },
  computed: {
    contactOnly: {
      get () {
        return this.$store.state.contactOnly
      },
      set (newValue) {
        return this.$store.commit('setContactOnly', newValue)
      }
    }
  },
  watch: {
    '$store.state.tab': function () {
      if (this.$store.state.tab !== null && this.$store.state.tab !== this.tab) this.updateScroll()

      this.tab = this.$store.state.tab
      this.isIntersecting = false
    },
    '$store.state.contactOnly': function () {

    }
  },
  async mounted () {
    this.$nextTick(() => {
      this.mounted = true
    })
    if (this.$route.hash) this.processHashes()
    if (this.$store.state.tab !== null && !this.isIntersecting) this.updateScroll()
    await this.$recaptcha.init()
  },
  updated () {
    if (this.isIntersecting) {
      if (this.$route.hash) this.processHashes()
      if (this.$store.state.tab !== null && !this.isIntersecting) this.updateScroll()
    }
    this.isIntersecting = false
  },
  methods: {
    processHashes () {
      if (this.$route.hash) {
        if (this.$route.hash === '#register') {
          this.$store.commit('setTab', 1)
          this.contactOnly = false
          this.step = 1
          this.$store.commit('lockScrolling')
          this.isIntersecting = true
          setTimeout(() => { this.$vuetify.goTo('#register') }, 200)
          setTimeout(() => { this.$store.commit('unlockScrolling') }, 700)
        }
        if (this.$route.hash === '#about-us') {
          this.$store.commit('setTab', 0)
          this.$store.commit('lockScrolling')
          this.$vuetify.goTo('#about-us')
          setTimeout(() => { this.$store.commit('unlockScrolling') }, 500)
        }
        if (this.$route.hash === '#contact-us') {
          this.$store.commit('setTab', 3)
          this.step = 0
          this.contactOnly = true
          this.$store.commit('lockScrolling')
          setTimeout(() => { this.$vuetify.goTo('#register') }, 200)
          this.isIntersecting = true

          setTimeout(() => { this.$store.commit('unlockScrolling') }, 700)
        }
        if (this.$route.hash === '#who') {
          this.$store.commit('lockScrolling')
          setTimeout(() => { this.$vuetify.goTo('#who') }, 200)
          this.isIntersecting = true

          setTimeout(() => { this.$store.commit('unlockScrolling') }, 700)
        }
        this.$router.replace({hash: null})
      }
    },
    updateScroll () {
      switch (this.$store.state.tab) {
        case 0:
          this.$store.commit('lockScrolling')
          this.$vuetify.goTo('#about-us')
          setTimeout(() => { this.$store.commit('unlockScrolling') }, 500)

          break
        case 1:
          this.$store.commit('lockScrolling')
          this.$vuetify.goTo('#register')
          this.step = 1
          setTimeout(() => { this.$store.commit('unlockScrolling') }, 500)
          break
        case 2:
          this.$router.push('/search')
          break
        case 3:
          this.$store.commit('lockScrolling')
          this.step = 0
          this.contactOnly = true
          this.$vuetify.goTo('#register')
          setTimeout(() => { this.$store.commit('unlockScrolling') }, 500)

          break
      }
    },
    onIntersect (event) {
      if (this.mounted && this.$store.state.offsetTop && !this.$store.state.scrolling && !this.$store.state.contactOnly && !this.$route.hash) {
        this.isIntersecting = true
        if (event === 'REGISTER') {
          this.$store.commit('setTab', 1)
          this.tab = 1
        }
        if (event === 'ABOUT-US') {
          this.$store.commit('setTab', 0)
          this.tab = 0
        }
        if (event === 'TOP') {
          this.$store.commit('setTab', null)
          this.tab = null
        }
      }
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
    font-family: 'Poiret One', sans-serif;
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
