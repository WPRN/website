<template>
  <v-row
    align="center"
    justify="center"
    class=" px-3"
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
        Referents
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
      md="8"
    >
      <div class="white--text text-justify title">
        <WhoReferent /> <br>
        <!-- eslint-disable-next-line vue/singleline-html-element-content-newline -->
        <nuxt-link to="/referent_list">See the list of WPRN referents.</nuxt-link>
      </div>
    </v-col>

    <v-col
      cols="12"
      sm="12"
      md="8"
    >
      <v-responsive
        class="mx-auto"
        width="56"
      >
        <v-divider class="mb-1 mt-6" />
        <v-divider class="mb-6" />
      </v-responsive>
    </v-col>
    <v-row>
      <v-col
        cols="12"
        md="6"
        class="pa-3"
      >
        <v-card
          class="pa-6 "
          :flat="$vuetify.theme.isDark"
        >
          <v-card-title
            class="justify-center font-weight-black text-uppercase text-center"
          >
            Why Should I Become a Referent for WPRN?
          </v-card-title>
          <v-card-text
            class="subtitle-1 white--text title font-weight-regular"
            color="black"
          >
            <WhyReferent />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="pa-3"
      >
        <v-card
          class="pa-6"
          :flat="$vuetify.theme.isDark"
        >
          <v-card-title
            class="justify-center font-weight-black text-uppercase text-center"
          >
            How Do I Become a WPRN Referent?
          </v-card-title>
          <v-card-text
            class="subtitle-1  white--text title font-weight-regular"
            color="black"
          >
            <HowReferent />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-row>
</template>
<script>
import { institutions } from '~/assets/data'
import BackButton from '~/components/navigation/BackButton'
import HowReferent from '~/components/contentBlocks/HowReferent'
import WhoReferent from '~/components/contentBlocks/WhoReferent'
import WhyReferent from '~/components/contentBlocks/WhyReferent'
export default {
  layout: 'page',
  components: {
    BackButton,
    HowReferent,
    WhoReferent,
    WhyReferent
  },
  data () {
    return {
      institutions
    }
  },
  mounted () {
    this.$store.commit('setTab', null)
  }
}
</script>
