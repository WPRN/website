<template>
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
          <v-expansion-panel-header class="pa-6">
            <h3 class="font-weight-regular headline">
              Who are WPRN users and members?
            </h3>
          </v-expansion-panel-header>
          <v-expansion-panel-content :class="$vuetify.breakpoint.mdAndDown?'py-3':'pa-3'">
            <WhoMembers />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="pa-6">
            <h3 class="font-weight-regular headline">
              Why register your project on WPRN?
            </h3>
          </v-expansion-panel-header>
          <v-expansion-panel-content :class="$vuetify.breakpoint.mdAndDown?'py-3':'pa-3'">
            <WhyProject />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="pa-6">
            <h3 class="font-weight-regular headline">
              How Do I Register My Project on WPRN?
            </h3>
          </v-expansion-panel-header>
          <v-expansion-panel-content :class="$vuetify.breakpoint.mdAndDown?'py-3':'pa-3'">
            <HowProject />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="pa-6">
            <h3 class="font-weight-regular headline">
              What is the WPRN validation process ?
            </h3>
          </v-expansion-panel-header>
          <v-divider />
          <v-expansion-panel-content :class="$vuetify.breakpoint.mdAndDown?'py-3':'pa-3'">
            <Process />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="pa-6">
            <h3 class="font-weight-regular headline">
              Who are the WPRN referents and how are they chosen?
            </h3>
          </v-expansion-panel-header>
          <v-expansion-panel-content :class="$vuetify.breakpoint.mdAndDown?'py-3':'pa-3'">
            <WhoReferent />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="pa-6">
            <h3 class="font-weight-regular headline">
              Why Should I Become a Referent for WPRN?
            </h3>
          </v-expansion-panel-header>
          <v-expansion-panel-content :class="$vuetify.breakpoint.mdAndDown?'py-3':'pa-3'">
            <WhyReferent />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="pa-6">
            <h3 class="font-weight-regular headline">
              How Do I Become a WPRN Referent?
            </h3>
          </v-expansion-panel-header>
          <v-expansion-panel-content :class="$vuetify.breakpoint.mdAndDown?'py-3':'pa-3'">
            <HowReferent />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="pa-6">
            <h3 class="font-weight-regular headline">
              What are the benefits for my Institution to Become Partner?
            </h3>
          </v-expansion-panel-header>
          <v-expansion-panel-content :class="$vuetify.breakpoint.mdAndDown?'py-3':'pa-3'">
            <WhyInstitution />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="pa-6">
            <h3 class="font-weight-regular headline">
              How do I Become a Partner Institution?
            </h3>
          </v-expansion-panel-header>
          <v-expansion-panel-content :class="$vuetify.breakpoint.mdAndDown?'py-3':'pa-3'">
            <HowInstitution />
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header class="pa-6">
            <h3 class="font-weight-regular headline">
              Does WPRN comply with GDPR/ePR?
            </h3>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <GDPR />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="pa-6">
            <h3 class="font-weight-regular headline">
              I would like to promote WPRN, how should I proceed?
            </h3>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <Promote />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>
<script>
import BackButton from '~/components/navigation/BackButton'
import Process from '~/components/contentBlocks/Process'
import HowInstitution from '~/components/contentBlocks/HowInstitution'
import HowReferent from '~/components/contentBlocks/HowReferent'
import HowProject from '~/components/contentBlocks/HowProject'
import Promote from '~/components/contentBlocks/Promote'
import WhoMembers from '~/components/contentBlocks/WhoMembers'
import WhoReferent from '~/components/contentBlocks/WhoReferent'
import WhyInstitution from '~/components/contentBlocks/WhyInstitution'
import WhyProject from '~/components/contentBlocks/WhyProject'
import WhyReferent from '~/components/contentBlocks/WhyReferent'
import GDPR from '~/components/contentBlocks/GDPR'
export default {
  layout: 'page',
  components: {
    BackButton,
    Process,
    HowInstitution,
    HowReferent,
    HowProject,
    Promote,
    WhoMembers,
    WhoReferent,
    WhyInstitution,
    WhyProject,
    WhyReferent,
    GDPR
  },
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>
