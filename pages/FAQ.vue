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
        <v-row
          align="center"
          justify="center"
        >
          <!--  BackButton takes one col -->
          <BackButton />
          <v-col
            cols="10"
            sm="10"
            md="8"
          >
            <h2
              id="board"
              class="display-2 font-weight-bold my-3 text-uppercase text-center"
            >
              Frequently Asked Questions
            </h2>
          </v-col>
          <v-col cols="1" />
          <v-col
            cols="12"
            sm="12"
            md="8"
          >
            <v-expansion-panels
              popout
              class="white--text"
            >
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <h3 class="font-weight-regular headline">
                    Why register your project on WPRN?
                  </h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <p>WPRN is a platform serving research communities. It shows who works on what, right now, at global level, about the impacts of the Covid-19 pandemic on societies and humans.</p>
                  <p>
                    Designed and maintained by researchers, WPRN is a commons for Research. It is free, non-profit, public-funded, open (creative commons, open-source), GDPR compliant. It is independent from institutional nationalisms and supported by major scientific institutions and scientific networks worldwide.
                  </p>
                  <p>
                    Compared to repositories and search engines where search yields a mixed bag, WPRN is the product of collective scientific intelligence: it is edited at three levels. Edition level 0: a heavy duty reactive cloud infrastructure filters from bots & spam. Projects are tagged with keywords by authors. Edition level 1: Dozens of volunteer senior scholar “referents” weed out amateurish projects, suggest improvements and flag best resources. Edition level 3): partner academic institutions can tag, with blazons earmarked projects (e.g. those selected in calls).
                  </p>
                  <p>
                    WPRN provides a new type of live project authorship with a WPRN time-stamped ID that facilitates collaboration and citation while the project is running, before final publication.
                  </p>
                  <p>
                    An alert system warns projects leaders of initiatives and resources that match their keywords and full text contents.
                  </p>
                  <p>
                    WPRN is a window for becoming visible at international level, also an instrument to follow in real time relevant resources for your research. Registration is quick and free at www.wprn.org.
                  </p>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <h3 class="font-weight-regular headline">
                    What is the WPRN validation process ?
                  </h3>
                </v-expansion-panel-header>
                <v-divider />
                <v-expansion-panel-content :class="$vuetify.breakpoint.mdAndDown?'py-3':'pa-3'">
                  <p>
                    WPRN is an edited directory that serves as an infrastructure for scientific communities. It features resources that have been filtered, tagged, and indexed, by bots and by human experts.
                  </p>
                  <p>Here is the process, from start to finish:</p>
                  <v-timeline
                    dense
                    align-top
                  >
                    <v-timeline-item
                      icon="mdi-upload"
                      fill-dot
                    >
                      <v-card
                        class="elevation-20"
                      >
                        <v-card-title class="title pt-0">
                          Upload of a project
                        </v-card-title>
                        <v-card-text class="white--text">
                          The abstract should be brief, informative and self-explanatory. They should be straight to the point of what they are doing and what is the added value and should not waste some of the available 2000 characters of the abstract to state the obvious. They should be very explicit about the problem they address, the research question, the method, the data set, the team, expected outcome. They can provide a link to a URL containing a more detailed description and material.
                        </v-card-text>
                      </v-card>
                    </v-timeline-item>
                    <v-timeline-item
                      icon="mdi-check"
                      fill-dot
                    >
                      <v-card class="elevation-20">
                        <v-card-title class="title pt-0">
                          Verification of a project
                        </v-card-title>
                        <v-card-text class="white--text">
                          Once a project has been submitted, WPRN performs a “level zero” check that the project form was not uploaded by a bot and is not spam. Beverli, our Bot for email verification, will send an email to the PI address that he/she provided, with a link to click. The project will not be published until the PI has clicked on the link.
                        </v-card-text>
                      </v-card>
                    </v-timeline-item>
                    <v-timeline-item
                      icon="mdi-publish"
                      fill-dot
                    >
                      <v-card class="elevation-20">
                        <v-card-title class="title pt-0">
                          Publication on WPRN website
                        </v-card-title>
                        <v-card-text class="white--text">
                          Once the email address has been verified, WPRN creates the project’s webpage. Apucontok (another bot) will email confirmation to the PI that the project is going to be published on WPRN, <b>with a link to edit or delete it</b>. PI should keep this link: that is their token of access to edit their webpage. The status of the project is now “Published, pending validation” and its tag is grey.
                        </v-card-text>
                      </v-card>
                    </v-timeline-item>
                    <v-timeline-item
                      icon="mdi-magnify"
                      fill-dot
                    >
                      <v-card class="elevation-20">
                        <v-card-title class="title pt-0">
                          Validation of the project
                        </v-card-title>
                        <v-card-text class="white--text">
                          <p>
                            After publication on the website, a project is sent for a  “level 1” validation to WPRN referents whose fields of expertise match the project. Referents will review a project within two weeks. Referents will sometimes request precisions or recommend edits to , please watch your emails coming with a #WPRN in the subject.
                          </p>
                          <p>
                            If a referent finds a serious issue (i.e. no relevance to covid-19 impact, ethical issues or strong methodological reservations), the project will go unpublished (the PI can appeal at <a href="mailto:appeal@wprn.org">appeal@wprn.org</a> ).
                          </p>
                          <p>In any other case, the project will get a tag reflecting the referents’ opinion: “green”, “one star” or “two stars”. Projects with two stars or more may be highlighted and featured in a special section of the WPRN website.</p>
                          <p>Level 1 validation is NOT an in-depth expertise. It merely checks the project meets basic quality requirements (relevance, ethics, minimal scientific validity). WPRN does NOT guarantee the excellence of all that is uploaded, especially since PIs can update the description of their project without continuous validation by WPRN. Quality can be formally warranted by blazons (see below).</p>
                          <p>Interest of the project is also rated by referents, who can tag the project with one or two stars.</p>
                          <p>Referents follow a charter in their screening.</p>
                        </v-card-text>
                      </v-card>
                    </v-timeline-item>
                    <v-timeline-item
                      icon="mdi-update"
                      fill-dot
                    >
                      <v-card class="elevation-20">
                        <v-card-title class="title pt-0">
                          Updates
                        </v-card-title>
                        <v-card-text class="white--text">
                          As projects are often work-in-progress, updates are encouraged. The PI can use the secure link and token provided in Apucontok’s email message to edit the project page.
                        </v-card-text>
                      </v-card>
                    </v-timeline-item>
                    <v-timeline-item
                      icon="mdi-shield-check"
                      fill-dot
                    >
                      <v-card class="elevation-20">
                        <v-card-title class="title pt-0">
                          Blazons (upcoming feature)
                        </v-card-title>
                        <v-card-text class="white--text">
                          Partnering institutions can signal projects that have undergone a full-fledged validation, e.g. with scientific expertise in research calls selection committees. They can stamp these projects on WPRN with their blazon, which is a label that vets the project with the institution’s cognitive authority.
                        </v-card-text>
                      </v-card>
                    </v-timeline-item>
                    <v-timeline-item
                      icon="mdi-bell"
                      fill-dot
                    >
                      <v-card class="elevation-20">
                        <v-card-title class="title pt-0">
                          Alerts (upcoming feature)
                        </v-card-title>
                        <v-card-text class="white--text">
                          After a project is uploaded, the PI will receive an email from Ainisydo, our AI agent for Notification of Interesting Stuff in Your Domain, which compares the key-word profile and full-text content of the upload with other items in WPRN. WPRN will send further alerts, if the PI wishes so. The PI can set a profile of alerts with a special button in the search menu of the “browse projects” page.”
                        </v-card-text>
                      </v-card>
                    </v-timeline-item>
                  </v-timeline>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <h3 class="font-weight-regular headline">
                    Who are the WPRN referents and how are they chosen?
                  </h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <p>WPRN referents are senior scientists with vast experience; they operate pro bono for the benefit of the community. A list of referents will be published on the WPRN website. If you feel that you are the right fit to be WPRN referent and want to join our community, please contact us at <a href="mailto:referents@wprn.org">referents@wprn.org</a> with information about your scientific profile. We will make sure to keep you updated shortly.</p>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <h3 class="font-weight-regular headline">
                    Does WPRN comply with GDPR?
                  </h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <p>Yes. We respect GDPR rules and even more.</p>
                  <p>Everywhere we can provide transparency on our activities or privacy on your activity, we do. </p>
                  <p>We do not track users or store any information outside of the projects definition scope.</p>
                  <p>
                    We do use <a
                      href="https://en.wikipedia.org/wiki/Google_Analytics"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="blue--text"
                    >Google Analytics</a> and <a
                      href="https://en.wikipedia.org/wiki/ReCAPTCHA"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="blue--text"
                    >Google Recaptcha</a>. Google Analytics is used to provide us with quantitative insights on the traffic and can be disabled with your browser "do not track" feature (or any other browser privacy extension).
                  </p>
                  <p>Google Recaptcha is used to protect our forms against spam and abuse.</p>
                  <p>
                    We welcome every suggestion or advices, so please do not hesitate to <nuxt-link to="/#contact">
                      contact us
                    </nuxt-link> if you have any.
                  </p>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <h3 class="font-weight-regular headline">
                    I would like to promote WPRN, how should I proceed?
                  </h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <p>First, thank you very much for your support!</p>
                  <p>
                    If you want to promote WPRN as an initiative, you can use our social media channels. Their links can be found in the footer of every page. You can also use the resources of our <nuxt-link to="/press_room">
                      press room
                    </nuxt-link>.
                  </p>
                  <p>
                    If you want to promote a particular project of WPRN, you can use the social share widgets of the share button <v-avatar
                      color="primary"
                      size="24"
                    >
                      <v-icon
                        dark
                        small
                      >
                        mdi-share-variant
                      </v-icon>
                    </v-avatar> &nbsp;on every WPRN project page. If you plan to share a project to a large audience, we advise you to give a heads up to the project contact using the "Email this project contact" button of the related project page.
                  </p>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
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
export default {
  components: {
    NavigationDrawer,
    BackButton
  },
  data () {
    return {
      drawer: false,
      offsetTop: 0
    }
  },
  methods: {
    onScroll (e) {
      this.offsetTop = e.target.scrollingElement.scrollTop
    }
  }
}
</script>
