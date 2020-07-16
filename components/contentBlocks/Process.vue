<template>
  <v-sheet>
    <p>
      WPRN is an edited directory that serves as an infrastructure for scientific communities. It features resources that have been filtered, tagged, and indexed, screened by bots first and validated by human experts second.
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
            Contributors upload the information about their project themselves with a
            <!-- eslint-disable-next-line vue/singleline-html-element-content-newline-->
            <nuxt-link to="/#register">very simple form</nuxt-link> on the WPRN website. They should be straight to the point of what they are doing and what is the added value of their project. The abstract should be brief, informative and self-explanatory,  very explicit about the problem addressed, the research question, the method, the data set, the team, or the expected outcome.  A link can be provided to a webpage containing a more detailed description and material.
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
            Once a project has been submitted, WPRN performs a “level zero” check that the project form was not uploaded by a bot and is not spam. Beverli, our Bot for email verification, will send an email to the address that the Project Leader provided with a link to click. The project will not be published until the project contact person has clicked on the link.
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
            Once the email address has been verified, WPRN creates the project’s webpage. Apucontok (another bot) will email confirmation to the project contact person that the project is published on WPRN, <b>with a link to edit or delete it</b>. The project contact person should keep this link: that is their token of access to edit their webpage. The status of the project is now “Published, pending validation” and its tag is grey.
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
              After publication on the website, a project is sent for a  “level 1” validation to WPRN referents whose fields of expertise match the project. Referents will review a project within 48h. Referents will sometimes request precisions or recommend edits so please watch your emails coming with a #WPRN in the subject.
            </p>
            <p>
              If a referent finds a serious issue (i.e. no relevance to covid-19 impact, ethical issues or strong methodological reservations), the project will go unpublished (the project contact person can appeal at <a href="mailto:appeal@wprn.org">appeal@wprn.org</a> ).
            </p>
            <p>In any other case, the project will get a tag reflecting the referents’ opinion: “green”, “one star” or “two stars”. Projects with two stars or more may be highlighted and featured in a special section of the WPRN website.</p>
            <p>Level 1 validation is <b>NOT</b> an in-depth expertise. It merely checks the project meets basic quality requirements (relevance, ethics, minimal scientific validity). WPRN does <b>NOT</b> guarantee the excellence of all that is uploaded, especially since project contacts can update the description of their project without continuous validation by WPRN. Quality can be formally warranted by blazons (see below).</p>
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
            As projects are often work-in-progress, updates are encouraged. The project contact person can use the secure link and token provided in Apucontok’s email message to edit the project page.
          </v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item
        icon="mdi-shield-check"
        fill-dot
      >
        <v-card class="elevation-20">
          <v-card-title class="title pt-0">
            Blazons <i>(upcoming feature)</i>
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
            Alerts <i>(upcoming feature)</i>
          </v-card-title>
          <v-card-text class="white--text">
            After a project is uploaded, the project contact person will receive an email from Ainisydo, our AI agent for Notification of Interesting Stuff in Your Domain, which compares the key-word profile and full-text content of the upload with other items in WPRN. WPRN will send further alerts, if the project contact person wishes so. The project contact person can set a profile of alerts with a special button in the search menu of the “browse projects” page.”
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-sheet>
</template>
