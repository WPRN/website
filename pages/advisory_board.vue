<template>
  <v-row
    align="center"
    justify="center"
  >
    <!--  BackButton takes one col -->
    <BackButton url="/#who" />
    <v-col
      cols="10"
      sm="10"
      md="8"
    >
      <h2
        id="board"
        class="display-2 font-weight-bold my-3 text-uppercase text-center"
      >
        Scientific Advisory Board
      </h2>
    </v-col>
    <v-col cols="1" />
    <v-col
      cols="12"
      sm="12"
      md="8"
    >
      <v-responsive
        class="mx-auto mb-6"
        width="56"
      >
        <v-divider class="mb-1" />
        <v-divider />
      </v-responsive>

      <v-list
        three-line
        subheader
        align="left"
       :dark="$vuetify.theme.isDark"
       :flat="$vuetify.theme.isDark"
      >
        <v-list-item
          v-for="(person, index) in board"
          :key="index"
        >
          <v-list-item-avatar>
            <img
              v-if="person.picture"
              :src="'/board/' + person.picture"
              :alt="person.name"
              :title="person.name"
              :lazy-src="person.placeholder"
            >
            <v-icon
              v-else
              large
            >
              mdi-account-circle
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <template v-if="person.url">
                <a
                  :href="person.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="text-decoration: none; "
                  :style="$vuetify.theme.isDark?'color: white;':'color:black;'"
                >
                  <v-icon small>mdi-link</v-icon>
                        &nbsp;
                  {{ person.name }}
                </a>
              </template>
              <template v-else>
                {{ person.name }}
              </template>
              <br v-if="$vuetify.breakpoint.smAndDown">
              <v-chip
                v-if="person.role"
                small
                label
                class="ml-2"
              >
                {{ person.role }}
              </v-chip>
            </v-list-item-title>
            <v-list-item-subtitle>{{ person.position }}</v-list-item-subtitle>
          </v-list-item-content>
          <!--    <v-list-item-icon>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn icon color="primary" v-on="on">
                        <v-icon color="grey">mdi-email</v-icon>
                      </v-btn>
                    </template>
                    <span>Contact {{person.name}}</span>
                  </v-tooltip>
                </v-list-item-icon>-->
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>
<script>
import { board, contributors, institutions } from '~/assets/data'
import BackButton from '~/components/navigation/BackButton'
export default {
  layout: 'page',
  components: {
    BackButton
  },
  data () {
    return {
      board,
      contributors,
      institutions,
      referents: []
    }
  },
  mounted () {
    this.$store.commit('setTab', null)
  },
  methods: {

  }
}
</script>
