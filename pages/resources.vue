<template>
  <v-row justify="center">
    <!--  BackButton takes one col -->
    <BackButton />
    <v-col
      cols="10"
      sm="10"
      md="8"
    >
      <h2 class="display-2 font-weight-bold my-3 text-uppercase text-center">
        Resources
      </h2>
    </v-col>
    <v-col cols="1" />
    <v-col
      cols="12"
      sm="12"
      md="8"
    >
      <v-responsive
        class="mx-auto"
        width="56"
      >
        <v-divider class="mb-1" />
        <v-divider />
      </v-responsive>
    </v-col>
    <v-col
      cols="12"
      sm="12"
      md="6"
    >
      <v-card
        class="pa-6 mb-6"
        flat
      >
        <v-card-title class="justify-center font-weight-black text-uppercase">
          Notes d'analyse (French)
        </v-card-title>
        <v-card-text>
          <v-list
            two-line
            subheader
          >
            <v-list-item
              href="/resources/Note_analyse_1.pdf"
              target="_blank"
            >
              <v-list-item-avatar>
                <v-icon>mdi-file-pdf</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  Note d'analyse 1 - Distanciation Sociale
                </v-list-item-title>
                <v-list-item-subtitle>2020-05-01</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1" />
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item
              href="/resources/Note_analyse_2.pdf"
              target="_blank"
            >
              <v-list-item-avatar>
                <v-icon>mdi-file-pdf</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  Note d'analyse 2 - Tracking et Covid 19
                </v-list-item-title>
                <v-list-item-subtitle>2020-06-01</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1" />
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item
              href="/resources/Note_analyse_3.pdf"
              target="_blank"
            >
              <v-list-item-avatar>
                <v-icon>mdi-file-pdf</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Note d'analyse 3 - Impact du Covid 19 sur la population étudiante</v-list-item-title>
                <v-list-item-subtitle>2020-07-01</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1" />
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col><v-col
      cols="12"
      sm="12"
      md="6"
    >
      <v-card
        class="pa-6 mb-6"
        flat
      >
        <v-card-title class="justify-center font-weight-black text-uppercase">
          Memorandums (English)
        </v-card-title>
        <v-card-text>
          <v-list
            two-line
            subheader
          >
            <v-list-item
              href="/resources/Memorandum_1.pdf"
              target="_blank"
            >
              <v-list-item-avatar>
                <v-icon>mdi-file-pdf</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  Memorandum 1 - Social Distancing
                </v-list-item-title>
                <v-list-item-subtitle>2020-05-01</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1" />
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item
              href="/resources/Memorandum_2.pdf"
              target="_blank"
            >
              <v-list-item-avatar>
                <v-icon>mdi-file-pdf</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  Memorandum 2 - Tracking and Covid 19
                </v-list-item-title>
                <v-list-item-subtitle>2020-06-01</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1" />
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item
              href="/resources/Memorandum_3.pdf"
              target="_blank"
            >
              <v-list-item-avatar>
                <v-icon>mdi-file-pdf</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title> Memorandum 3 - Impact of Covid 19 on students</v-list-item-title>
                <v-list-item-subtitle>2020-07-01</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1" />
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import BackButton from '~/components/navigation/BackButton'
import { socialIcons } from '~/assets/data'
export default {
  layout: 'page',
  components: {
    BackButton
  },
  data () {
    return {
      contact: false,
      socialIcons
    }
  },
  mounted () {
    this.$store.commit('setTab', null)
  }

}
</script>
