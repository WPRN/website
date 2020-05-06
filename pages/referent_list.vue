<template>
  <v-row
    align="center"
    justify="center"
  >
    <!--  BackButton takes one col -->
    <BackButton url="/referents" />
    <v-col
      cols="10"
      sm="10"
      md="8"
    >
      <h2 class="display-2 font-weight-bold my-3 text-uppercase text-center">
        List of WPRN referents
      </h2>
    </v-col>
    <v-col cols="1" />
    <v-col
      cols="12"
      sm="12"
      md="8"
    >
      <v-responsive
        class="mx-auto mb-12"
        width="56"
      >
        <v-divider class="mb-1" />
        <v-divider />
      </v-responsive>
      The list of referents will be released in the upcoming days.
    </v-col>
  </v-row>
</template>
<script>
import { referents } from '~/assets/data'
import BackButton from '~/components/navigation/BackButton'

export default {
  layout: 'page',
  components: {
    BackButton
  },
  data () {
    return {
      referents
    }
  },
  methods: {
  }
}
</script>
