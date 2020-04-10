<template>
  <section id="about-us">
    <div class="py-12"></div>
    <v-container class="text-center">
      <h2 class="display-2 font-weight-bold mb-3">ABOUT WPRN</h2>

      <v-responsive class="mx-auto mb-8" width="56">
        <v-divider class="mb-1"></v-divider>
        <v-divider></v-divider>
      </v-responsive>
      <v-row>
        <v-col cols="12">
          <v-responsive
            class="d-flex align-center mx-auto title font-weight-light mb-8"
            max-width="800"
            height="100%"
          >
            <b>The World Pandemic Research Network (WPRN)</b> maintains a searchable global directory of
            research projects, surveys and initiatives about the societal and human impacts of the Covid-19
            pandemic.
            <br />WPRN facilitates project awareness, collaboration, follow-up and reference by other projects.
            Registered projects get a timestamped WPRN-ID number and a WPRN webpage which signals their project. It enables other researchers and stakeholders to get in touch and to follow and cite project updates or pre-publications.
            <br />Registration is free. WPRN is a non-profit academic resource, supported by scientific societies, networks and institutions worldwide and by hundreds of senior scientific referents. There is no dependence, no legal nor economic binding. Each contributor remains completely independent for action and publication.
            <br />WPRN is GDPR compliant and will not publish, give or sell e-mail addresses to third parties.
            <br />
            <nuxt-link to="/board_and_contributors">Advisory Board</nuxt-link>&nbsp;-&nbsp;
            <nuxt-link to="/board_and_contributors#refs">Referents</nuxt-link>&nbsp;-&nbsp;
            <nuxt-link to="/board_and_contributors#institutions">Contributors' Institutions</nuxt-link>
          </v-responsive>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-card class="pa-6 mb-6" flat>
            <div>
              <v-avatar color="primary" size="88">
                <v-icon dark large>mdi-share-variant</v-icon>
              </v-avatar>
            </div>
            <v-card-title
              class="justify-center font-weight-black text-uppercase"
              @click="$vuetify.goTo('#contact'); contactOnly=false; step=1"
              style="cursor:pointer;"
            >REGISTER YOUR PROJECT</v-card-title>
            <v-card-text class="subtitle-1" color="black">
              WPRN publishes a
              searchable directory of projects, calls and resources worldwide.
              <span
                @click="$vuetify.goTo('#contact'); contactOnly=false; step=1"
                class="blue--text"
                style="cursor:pointer;text-decoration:underline"
              >Register your project</span> here.
              Your project will automatically be added, attributed a timestamped WPRN-ID number and become searchable in the Directory as soon as you confirm your email address. Your WPRN-ID enables others to refer to your work and cite it even before publication.
              <br />Registration in the WPRN Directory is free and non-binding. A WPRN webpage will be generated for your project once your project is validated by one of our
              <nuxt-link to="/board_and_contributors#refs">Referents</nuxt-link>. You can update your webpage once validated.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-card class="pa-6" flat>
            <div>
              <v-avatar color="primary" size="88">
                <v-icon dark large>mdi-database-search</v-icon>
              </v-avatar>
            </div>
            <v-card-title
              class="justify-center font-weight-black text-uppercase"
              @click="$router.push({path:'/worldwide'})"
              style="cursor:pointer;"
            >Search the database</v-card-title>
            <v-card-text class="subtitle-1" color="black">
              WPRN is a gateway for collaboration. Find who works on what and where.
              <nuxt-link to="/worldwide" class="blue--text">Search the database</nuxt-link>&nbsp;to identify projects of interest, find or share resources, get updates, set up collaborations. Use the “contact” buttons to get-in-touch with the other registered contributors. WPRN also publishes calls for research proposals from major research institutions.
              <br />WPRN highlights research projects, calls, resources and initiatives that have been flagged by our Referents. Check the list of
              <span
                @click="$vuetify.goTo('#featured', {offset:100})"
                class="blue--text"
                style="cursor:pointer;text-decoration:underline"
              >featured projects</span>.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div class="py-12"></div>
  </section>
</template>
