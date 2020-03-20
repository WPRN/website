<template>
  <v-app>
    <v-app-bar app color="white" height="100" inverted-scroll>
      <v-avatar class="mr-3" tile color="grey lighten-5" size="90">
        <v-img contain max-height="100%" src="/logo.png"></v-img>
      </v-avatar>

      <v-toolbar-title class="font-weight-black headline">WPRN</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <section id="hero">
        <v-row no-gutters>
          <v-img
            :max-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
            src="/splash_xl.jpg"
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
                      color="grey lighten-5"
                      :size="$vuetify.breakpoint.smAndDown ? 'calc(15vh - ' + $vuetify.application.top + 'px)': 'calc(30vh - ' + $vuetify.application.top + 'px)'"
                    >
                      <v-img contain src="/logo.png"></v-img>
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
            <v-col cols="12" md="4">
              <v-card class="py-12 px-4" color="grey lighten-5" light flat>
                <div>
                  <v-avatar color="primary" size="88">
                    <v-icon dark large>mdi-currency-usd</v-icon>
                  </v-avatar>
                </div>
                <v-card-title
                  class="justify-center font-weight-black text-uppercase"
                  color="black"
                >Economic impact of Covid-19.</v-card-title>

                <v-card-text class="subtitle-1" color="black">
                  This stems from the pioneer research led by Professor Xiaobo Zhang on the economic impact on Chinese SMEs. Their team has agreed to share their questionnaire, which is currently translated and surveys launched around the world. Here are the specifications to participate.
                  Please check here (link) if someone is already involved in your geographic zone to collaborate and share the work.
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card class="py-12 px-4" color="grey lighten-5" light flat>
                <div>
                  <v-avatar color="primary" size="88">
                    <v-icon dark large>mdi-account-group-outline</v-icon>
                  </v-avatar>
                </div>
                <v-card-title
                  class="justify-center font-weight-black text-uppercase"
                  light
                >Social impact of Covid-19.</v-card-title>

                <v-card-text class="subtitle-1" color="black">
                  This stems from the pioneer research led by Professor Xin Meng on the social impact of confinement following the lock-down.
                  Their team has agreed to share their questionnaire, which is currently translated and surveys launched around the world. Here are the specifications to participate.
                  <a
                    href="http://"
                    target="_blank"
                    rel="noopener noreferrer"
                  >Please check here</a> if someone is already involved in your geographic zone to collaborate and share the work.
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card class="py-12 px-4" color="grey lighten-5" light text>
                <div>
                  <v-avatar color="primary" size="88" dark>
                    <v-icon dark large>mdi-lightbulb-on-outline</v-icon>
                  </v-avatar>
                </div>
                <v-card-title
                  class="justify-center font-weight-black text-uppercase"
                  color="black"
                >Positive Future Program and creative contest</v-card-title>
                <v-card-text
                  class="subtitle-1"
                  color="black"
                >This initiatives tries to create and disseminate visions of a positive, liveable and possible future, to show that another world is possible and counteract the dystopic visions that circulate in majority. We (a) create a data repository of positive cases, reports and discoveries that could contribute to make the world better, in collaboration with major forecast and scientific institutes. We (b) organize a contest for short, media-friendly pieces with a story of which the background is liveable city in 2100. The background context must be realistically possible, based on the possibilities described in the repository.</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <div class="py-12"></div>
      </section>

      <section id="stats">
        <v-parallax :height="$vuetify.breakpoint.smAndDown ? 700 : 500" src="/parralax_lg.jpg">
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

      <section id="featured">
        <div class="py-12"></div>

        <v-container>
          <h2
            class="display-2 font-weight-bold mb-3 text-uppercase text-center"
          >CONTINENTAL BRANCHES</h2>

          <v-responsive class="mx-auto mb-12" width="56">
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-row>
            <v-col cols="12">
              <v-img src="/map.svg" class="mb-4" height="275" max-width="100%"></v-img>
            </v-col>
          </v-row>
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
            <v-col v-for="({ src, text, title }, i) in articles" :key="i" cols="12" md="4">
              <v-img :src="src" class="mb-4" height="275" max-width="100%"></v-img>

              <h3 class="font-weight-black mb-4 text-uppercase" v-text="title"></h3>

              <div class="title font-weight-light mb-5" v-text="text"></div>

              <v-btn class="ml-n4 font-weight-black" text>Continue Reading</v-btn>
            </v-col>
          </v-row>
        </v-container>

        <div class="py-12"></div>
      </section>
      <v-sheet id="contact" color="#333333" tag="section" tile>
        <div class="py-12"></div>

        <v-container>
          <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center">Contact Us</h2>

          <v-responsive class="mx-auto mb-12" width="56">
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-theme-provider light>
            <v-row>
              <v-col cols="12" md="8" offset-md="2" lg="6" offset-lg="3">
                <v-text-field label="Name*" solo></v-text-field>
              </v-col>

              <v-col cols="12" md="8" offset-md="2" lg="6" offset-lg="3">
                <v-text-field label="Email*" solo></v-text-field>
              </v-col>

              <v-col cols="12" md="8" offset-md="2" lg="6" offset-lg="3">
                <v-text-field label="Subject*" solo></v-text-field>
              </v-col>

              <v-col cols="12" md="8" offset-md="2" lg="6" offset-lg="3">
                <v-textarea label="Message*" solo></v-textarea>
              </v-col>

              <v-col cols="12" md="8" offset-md="2" lg="6" offset-lg="3" class="text-center">
                <v-btn color="accent" x-large>
                  Submit&nbsp;
                  <v-icon>mdi-send</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-theme-provider>
        </v-container>

        <div class="py-12"></div>
      </v-sheet>
    </v-content>

    <v-footer class="justify-center" color="#292929" height="100">
      <div class="title font-weight-light grey--text text--lighten-1 text-center">
        <v-icon>mdi-creative-commons</v-icon>
        {{ new Date().getFullYear() }}
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn text icon v-on="on">
              <v-icon>mdi-github</v-icon>
            </v-btn>
          </template>
          <span>See this website source code and contribute</span>
        </v-tooltip>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      articles: [
        {
          src:
            "https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
          title: "Mobile first & Responsive",
          text:
            "Phasellus lorem enim, luctus ut velit eget, convallis egestas eros. Sed ornare ligula eget tortor tempor, quis porta tellus dictum."
        },
        {
          src:
            "https://images.unsplash.com/photo-1475938476802-32a7e851dad1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
          title: "Think outside the box",
          text:
            "Nam ut leo ipsum. Maecenas pretium aliquam feugiat. Aenean vel tempor est, vitae tincidunt risus. Sed sodales vestibulum nibh."
        },
        {
          src:
            "https://images.unsplash.com/photo-1416339442236-8ceb164046f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1892&q=80",
          title: "Small changes, big difference",
          text:
            "Vestibulum in dictum velit, in rhoncus nibh. Maecenas neque libero, interdum a dignissim in, aliquet vitae lectus. Phasellus lorem enim, luctus ut velit eget."
        }
      ],
      missions: [
        {
          icon: "mdi-account-group-outline",
          title: "Economic impact of Covid-19.",
          text:
            "This stems from the pioneer research led by Professor Xiaobo Zhang on the economic impact on Chinese SMEs. Their team has agreed to share their questionnaire, which is currently translated and surveys launched around the world. Here are the specifications to participate. Please check here (link) if someone is already involved in your geographic zone to collaborate and share the work."
        },
        {
          icon: "mdi-update",
          title: "Social impact of Covid-19.",
          text:
            "This stems from the pioneer research led by Professor Xin Meng on the social impact of confinement following the lock-down. Their team has agreed to share their questionnaire, which is currently translated and surveys launched around the world. Here are the specifications to participate. Please check here (link) if someone is already involved in your geographic zone to collaborate and share the work."
        },
        {
          icon: "mdi-shield-outline",
          title: "Positive Future Programme and creative contest",
          text:
            "This initiatives tries to create and disseminate visions of a positive, liveable and possible future, to show that another world is possible and counteract the dystopic visions that circulate in majority. We (a) create a data repository of positive cases, reports and discoveries that could contribute to make the world better, in collaboration with major forecast and scientific institutes. We (b) organize a contest for short, media-friendly pieces with a story of which the background is liveable city in 2100. The background context must be realistically possible, based on the possibilities described in the repository."
        }
      ],
      stats: [
        ["45", "Contributors"],
        ["330+", "Projects"],
        ["7", "Continental Zones"],
        ["12", "reports"]
      ]
    };
  },
  components: {}
};
</script>
