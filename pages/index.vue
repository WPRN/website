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
            src="/splash_xl.jpg"
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
                max-width="720"
                height="100%"
              >
                <b>The World Pandemic Research Network (WPRN)</b> maintains a searchable global directory of
                research projects, surveys and initiatives about the societal and human impacts of the Covid-19
                pandemic.
                <br />WPRN facilitates project awareness, collaboration, follow-up and reference by other projects.
                Registered projects get a WPRN-ID number and a WPRN webpage which signals their project,
                enables other researchers and stakeholders to get in touch and to follow project updates or
                publications.
                <br />Registration is free. WPRN is a non-profit academic resource. There is no dependence, no legal
                nor economic binding. Each contributor remains completely independent for action and
                publication.
                <br />WPRN is GDPR compliant and will not publish, give or sell e-mail addresses to third parties.
                <br />
                <nuxt-link to="/board_and_contributors">Advisory Board</nuxt-link>,
                <nuxt-link to="/board_and_contributors#refs">Referents</nuxt-link>&nbsp;and
                <nuxt-link to="/board_and_contributors#institutions">Contributors' Institutions</nuxt-link>
              </v-responsive>
            </v-col>
            <v-col cols="12" sm="12" md="6">
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
                  WPRN publishes a
                  <nuxt-link
                    to="/worldwide"
                    class="blue--text"
                  >searchable directory of projects, calls and resources worldwide</nuxt-link>. Please
                  <span
                    @click="$vuetify.goTo('#contact'); contactOnly=false; step=1"
                    class="blue--text"
                    style="cursor:pointer;text-decoration:underline"
                  >register your project</span>
                  if you feel that you can contribute. Your project will automatically be added, attributed a WPRN-
                  ID number and become searcheable in the Directory as soon as you confirm your e-mail address.
                  <br />A WPRN webpage will be generated for your project once your project is validated by one of our expert
                  Referents.
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="6">
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
                  <nuxt-link to="/worldwide" class="blue--text">Search the database</nuxt-link>&nbsp;and get in touch to set up
                  collaboration, find or share resources, get updates. Use the “contact” buttons for initial get-in-touch
                  with project contact-points.
                  <br />WPRN highlights
                  <span
                    @click="$vuetify.goTo('#featured', {offset:100})"
                    class="blue--text"
                    style="cursor:pointer;text-decoration:underline"
                  >Research Projects, Open Calls, Resources and Initiatives</span> that have been flagged by our
                  Referents among the registered projects.
                  .
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
              <v-img
                src="/economics.jpg"
                class="mb-4"
                height="275"
                max-width="100%"
                lazy-src="data:image/jpeg;base64,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"
              ></v-img>

              <h3 class="font-weight-black mb-4 text-uppercase">Economic impact of Covid-19.</h3>

              <div class="title font-weight-light mb-5">
                This multicentric survey on businesses stems from the pioneer research led by Professor Xiaobo
                Zhang on the economic impact of the epidemic on Chinese SMEs (WPRN ID XXXXX).
                Their team has agreed to share their questionnaire, which is currently translated and surveys
                launched around the world.
              </div>

              <v-btn class="ml-n4 font-weight-black" text>
                <nuxt-link
                  to="/economical_impact_of_covid"
                  style="color:white; text-decoration:none;"
                >More</nuxt-link>
              </v-btn>
            </v-col>
            <v-col cols="12" md="4">
              <v-img
                src="/future.jpg"
                class="mb-4"
                height="275"
                max-width="100%"
                lazy-src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QBoRXhpZgAASUkqAAgAAAADABIBAwABAAAAAQAAADEBAgAQAAAAMgAAAGmHBAABAAAAQgAAAAAAAABTaG90d2VsbCAwLjI4LjQAAgACoAkAAQAAAIACAAADoAkAAQAAAOABAAAAAAAA/+EJ9Gh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSI2NDAiIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSI0ODAiIHRpZmY6SW1hZ2VXaWR0aD0iNjQwIiB0aWZmOkltYWdlSGVpZ2h0PSI0ODAiIHRpZmY6T3JpZW50YXRpb249IjEiLz4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgADgATAwEiAAIRAQMRAf/EABcAAQEBAQAAAAAAAAAAAAAAAAgABQb/xAAlEAABAwMDAwUAAAAAAAAAAAABAgMEAAUGERJBIjFhBwgUIXH/xAAWAQEBAQAAAAAAAAAAAAAAAAAFBgf/xAAlEQAABAUCBwAAAAAAAAAAAAAAAQIDBAUGESExQRQiUnGRktH/2gAMAwEAAhEDEQA/AGtKfhk9DhI81y2MZnaslduTcSdFluwZSoryWHAotqHCtKy5N4Und0nT9ouX3H7v6KZdds2tlyD0abLdeMdZIK1OkqKFp02lIPOuvPejWIxTzhNJPJ6CvmFPMwMKqMeTypyq2pFudr57BuJfZ2jtVQ5c92eQQFfHkW2E68j6UtsLSknwCqqneBmnQXkhnRT6kd3leivg/9k="
              ></v-img>

              <h3 class="font-weight-black mb-4 text-uppercase">Just One Giant Lab</h3>

              <div class="title font-weight-light mb-5">
                Just One Giant Lab (JOGL) is the first research and innovation laboratory operating as a
                distributed, open and massive mobilisation platform for collaborative task solving. JOGL helps
                humanity to sync onto fixing our most urgent and important problems using Open Science,
                Responsible Innovation and Continuous Learning. JOGL partners with academic labs,
                companies, startups, foundations, NGOs and public services to create participatory research
                programs for understanding and solving Health, Environmental, Social and Humanitarian issues.
              </div>

              <v-btn class="ml-n4 font-weight-black" text>
                <a
                  href="https://jogl.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="color:white; text-decoration:none;"
                >More</a>
              </v-btn>
            </v-col>
            <v-col cols="12" md="4">
              <v-img
                src="/social.jpg"
                class="mb-4"
                height="275"
                max-width="100%"
                lazy-src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4gIcSUNDX1BST0ZJTEUAAQEAAAIMbGNtcwIQAABtbnRyUkdCIFhZWiAH3AABABkAAwApADlhY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApkZXNjAAAA/AAAAF5jcHJ0AAABXAAAAAt3dHB0AAABaAAAABRia3B0AAABfAAAABRyWFlaAAABkAAAABRnWFlaAAABpAAAABRiWFlaAAABuAAAABRyVFJDAAABzAAAAEBnVFJDAAABzAAAAEBiVFJDAAABzAAAAEBkZXNjAAAAAAAAAANjMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB0ZXh0AAAAAElYAABYWVogAAAAAAAA9tYAAQAAAADTLVhZWiAAAAAAAAADFgAAAzMAAAKkWFlaIAAAAAAAAG+iAAA49QAAA5BYWVogAAAAAAAAYpkAALeFAAAY2lhZWiAAAAAAAAAkoAAAD4QAALbPY3VydgAAAAAAAAAaAAAAywHJA2MFkghrC/YQPxVRGzQh8SmQMhg7kkYFUXdd7WtwegWJsZp8rGm/fdPD6TD////bAEMACQYGCAYFCQgHCAoJCQoNFg4NDAwNGhMUEBYfHCEgHxweHiMnMiojJS8lHh4rOywvMzU4ODghKj1BPDZBMjc4Nf/bAEMBCQoKDQsNGQ4OGTUkHiQ1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1Nf/AABEIABEAGgMBIgACEQEDEQH/xAAZAAACAwEAAAAAAAAAAAAAAAAAAwIEBQb/xAAvEAACAQMDAQYDCQAAAAAAAAABAgMABBEFEiExBhMUIkFhMzVyNFJzgZGhsbLB/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEAP/EAB0RAAMAAgIDAAAAAAAAAAAAAAABAhEyA3ESITH/2gAMAwEAAhEDEQA/ANC07R38d3eS+LeNopmVo3TdGZCMjzfdwc+nIFWLm/1efVNNnlV3YJMjxRDbGTtyhfnn8qUst5b3s63No72uUWMBCcnAGQR16nk8cGrVqupXurKmp2sPhoGLI2F5Pp0Ofetmqy6YFMQkpRlSdnhd6yIZdNs0tm272RMOBjnac5HOf0roYrzU4oUSPR1VFUBVDDgD06VS1iGZ9Wjl7t5I2A7wxsSIsAnzexx+9bUTB4UYC6QMoO3cOPbrTQ8IXknyfslN9ij+kf5S2+MaKKlWqKl9Yi3+XXv1SfxSdN+V2v4Kf1FFFGtZ6Gje+z//2Q=="
              ></v-img>

              <h3
                class="font-weight-black mb-4 text-uppercase"
              >Psychological and Social impact of Covid-19.</h3>

              <div class="title font-weight-light mb-5">
                How do people cope, positively or not, with the stressful situation of lockdown and confinement?
                A multidisciplinary team provides a set of questions that assess the sources and forms of stress
                and coping, as well as the levers for communication and influence to support people during the
                crisis. The questions can be added to any survey to assess the resilience of respondents.
              </div>

              <v-btn class="ml-n4 font-weight-black" text>
                <nuxt-link
                  to="/psychological_and_social_impact_of_covid"
                  style="color:white; text-decoration:none;"
                >More</nuxt-link>
              </v-btn>
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
    <!--     <WorkInProgressDialog
      :dialog="WorkInProgressDialogToggle"
      @close="WorkInProgressDialogToggle=false"
    />-->
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
/* import WorkInProgressDialog from "~/components/navigation/WorkInProgressDialog"; */
import Logo from "~/components/navigation/Logo";
import { zones } from "~/assets/data";
export default {
  data() {
    return {
      zones,
      drawer: false,
      contactOnly: false,
      /*   WorkInProgressDialogToggle: true, */
      valid: false,
      step: 1,
      offsetTop: 0,
      stats: [
        ["XXX", "Projects"],
        ["XX", "Contributing Institutions"],
        ["XX", "Referents"],
        ["34", "Disciplines"]
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
    /*  WorkInProgressDialog, */
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
