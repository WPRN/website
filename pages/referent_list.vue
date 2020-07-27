<template>
  <v-row
    align="center"
    justify="center"
    class=" px-3"
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
      <div class="overline body-2 text-center">
        (in order of appearance, this list takes a while to be updated, please be patient)
      </div>
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
      <ReferentListContent />
    </v-col>
  </v-row>
</template>
<script>
import BackButton from '~/components/navigation/BackButton'
import ReferentListContent from '~/components/contentBlocks/ReferentListContent'

export default {
  layout: 'page',
  components: {
    BackButton,
    ReferentListContent
  },
  data () {
    return {
    }
  },
  mounted () {
    this.$store.commit('setTab', null)
  },
  methods: {
  }
}
</script>
