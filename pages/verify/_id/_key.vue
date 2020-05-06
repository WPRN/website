<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-col cols="12">
      <v-overlay
        :value="checking"
        class="text-center headline"
      >
        <v-progress-circular
          class="mb-4"
          indeterminate
          size="64"
        />
        <br>Verifying your email address
      </v-overlay>
      <v-overlay
        :value="error"
        class="text-center headline"
      >
        <div class="display-1">
          Sorry for the inconvenience!
        </div>
        <br>
        <v-icon
          x-large
          class="mb-3"
        >
          mdi-alert-circle-outline
        </v-icon>
        <br>An error happened during the verification.
        <br>You can try
        again and refresh this page or
        <nuxt-link to="/#contact">
          contact WPRN
        </nuxt-link>.
      </v-overlay>
      <v-fade-transition mode="out-in">
        <v-card
          v-show="!error && !checking"
          flat
          min-height="320px"
          class="pa-4 text-center"
          align="center"
        >
          <v-icon
            x-large
            color="success"
            class="py-6"
          >
            mdi-email-check-outline
          </v-icon>
          <h3
            class="headline font-weight-heavy mb-2"
          >
            YOUR EMAIL IS VERIFIED AND YOUR PROJECT IS PUBLISHED!
          </h3>
          <v-responsive
            class="mx-auto mb-12"
            width="56"
          >
            <v-divider class="mb-1" />

            <v-divider />
          </v-responsive>
          <div class="title">
            Your project unique ID is WPRN-{{ $route.params.id }} and its page
            <nuxt-link :to="'/item/' + $route.params.id">
              can be found here
            </nuxt-link>.
            <br>You can also edit your project
            <nuxt-link :to="'/edit/' + $route.params.id + '/' + $route.params.key">
              here
            </nuxt-link>.
          </div>

          <!--     <v-card-actions>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn class large color="acent" @click="$emit('reset')" v-on="on" align="right">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </template>
        <span>Register another project</span>
      </v-tooltip>
            </v-card-actions>-->
        </v-card>
      </v-fade-transition>
    </v-col>
  </v-row>
</template>
<script>
import * as mutations from '~/graphql/mutations'
import gql from 'graphql-tag'
import client from '~/plugins/amplify'
export default {
  layout: 'page',
  components: {
  },
  data () {
    return {
      checking: true,
      error: false
    }
  },
  async mounted () {
    try {
      const res = await client.mutate({
        mutation: gql(mutations.verifyEmail),
        variables: {
          id: this.$route.params.id,
          key: this.$route.params.key
        }
      })

      if (res && res.data && res.data.verifyEmail === true && !res.errors) {
        this.checking = false
        this.error = false
      } else {
        this.checking = false
        this.error = true
      }
    } catch (error) {
      this.error = true
      this.checking = false
    }
  },
  methods: {}
}
</script>
