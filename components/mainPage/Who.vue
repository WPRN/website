<template>
  <section
    id="who"
    :style="$vuetify.theme.isDark?'background-color:#212121;':'background-color:#FAFAFA;'"
  >
    <div class="py-12" />

    <v-container>
      <h2
        class="display-2 font-weight-bold mb-3 text-uppercase text-center"
      >
        Who is behind WPRN?
      </h2>

      <v-responsive
        class="mx-auto mb-12"
        width="56"
      >
        <v-divider
          class="mb-1"
        />

        <v-divider />
      </v-responsive>

      <v-row>
        <v-col
          cols="12"
          md="4"
          class="pa-3"
        >
          <v-hover
            v-slot:default="{ hover }"
          >
            <v-card
              class="pa-6 text-center"
              flat
              :elevation="hover ? 12 : 2"
              height="100%"
              href="/advisory_board"
              nuxt
              :color="$vuetify.theme.isDark?'accent':'white'"
            >
              <v-avatar
                color="primary"
                size="88"
              >
                <v-icon
                  dark
                  large
                >
                  mdi-account-group
                </v-icon>
              </v-avatar>
              <v-card-title
                class="justify-center font-weight-black text-uppercase"
                style="word-break:normal;"
              >
                Scientific Advisory Board
              </v-card-title>
            </v-card>
          </v-hover>
        </v-col>
        <v-col
          cols="12"
          md="4"
          class="pa-3"
        >
          <v-hover
            v-slot:default="{ hover }"
          >
            <v-card
              class="pa-6 text-center"
              :elevation="hover ? 12 : 2"
              flat
              href="/institutions"
              nuxt
              :color="$vuetify.theme.isDark?'accent':'white'"
              height="100%"
            >
              <v-avatar
                color="primary"
                size="88"
              >
                <v-icon
                  dark
                  large
                >
                  mdi-handshake
                </v-icon>
              </v-avatar>
              <v-card-title
                class="justify-center font-weight-black text-uppercase"
                style="word-break:normal;"
              >
                Partner Institutions
              </v-card-title>
            </v-card>
          </v-hover>
        </v-col>
        <v-col
          cols="12"
          md="4"
          class="pa-3"
        >
          <v-hover
            v-slot:default="{ hover }"
          >
            <v-card
              class="pa-6 text-center"
              flat
              :elevation="hover ? 12 : 2"
              href="/referents"
              nuxt
              :color="$vuetify.theme.isDark?'accent':'white'"
              height="100%"
            >
              <v-avatar
                color="primary"
                size="88"
              >
                <v-icon
                  dark
                  large
                >
                  mdi-account-multiple-check-outline
                </v-icon>
              </v-avatar>
              <v-card-title
                class="justify-center font-weight-black text-uppercase"
                style="word-break:normal;"
                height="100%"
                justify="center"
                align="center"
              >
                Referents
              </v-card-title>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
    <div class="py-12" />
  </section>
</template>
