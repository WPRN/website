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
        <nuxt-link to="/#contact-us">
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
            class="mx-auto  my-6"
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
          </div><!-- ALERTS UI
          <v-responsive
            class="mx-auto my-6"
            width="56"
          >
            <v-divider class="mb-1" />

            <v-divider />
          </v-responsive>
          <div class="title mb-3">
            You want to be notified of the new WPRN projects similar to yours? <br>
          </div>
          <v-btn
            color="primary"
            class="ma-1"
            @click="similarModalOpen = true"
          >
            Create a custom email alert
          </v-btn>-->
          <v-responsive
            class="mx-auto my-6"
            width="56"
          >
            <v-divider class="mb-1" />
            <v-divider />
          </v-responsive>
          <div class="overline">
            Share your project
          </div> <br>
          <div class="justify-center d-flex">
            <v-tooltip
              v-for="(social, index) in socialChannels"
              :key="index"
              bottom
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  :small="$vuetify.breakpoint.smAndDown"
                  :href="social.url"
                  :color="social.color"
                  target="_blank"
                  dark
                  class="mx-2"
                  v-on="on"
                >
                  <v-icon :small="$vuetify.breakpoint.smAndDown">
                    mdi-{{ social.icon }}
                  </v-icon>
                  {{ social.label }}
                </v-btn>
              </template>
              <span v-if="social.label !== 'Email'">Share this project on {{ social.label }}</span>
              <span v-else>Share this project by {{ social.label }}</span>
            </v-tooltip>
          </div>
        </v-card>
      </v-fade-transition>
      <SimilarProjectsAlertModal
        :open="similarModalOpen"
        @updated="subscribe"
        @close="similarModalOpen = false"
      />
    </v-col>
  </v-row>
</template>
<script>
import * as mutations from '~/graphql/mutations'
import gql from 'graphql-tag'
import client from '~/plugins/amplify'
import SimilarProjectsAlertModal from '~/components/misc/SimilarProjectsAlertModal'
export default {
  layout: 'page',
  components: {
    SimilarProjectsAlertModal
  },
  data () {
    return {
      checking: true,
      error: false,
      similarModalOpen: false,
      socialChannels: [
        {
          label: 'Facebook',
          icon: 'facebook',
          url:
            `${'https://www.facebook.com/sharer.php?u=' +
            'https://wprn.org/item/'}${
              this.$route.params.id}`,
          color: '#3b5998'
        },
        {
          label: 'Twitter',
          icon: 'twitter',
          url:
            `https://twitter.com/share?url=https://wprn.org/item/${
              this.$route.params.id
            }&text=My project is published on WPRN : &via=WPRN&hashtags=WPRN`,
          color: 'rgb(29, 161, 242)'
        },
        {
          label: 'Email',
          icon: 'email',
          url:
            `mailto:?subject=WPRN Project&body=Hello,%0d%0a%0d%0aPlease check this project on WPRN (World Pandemic Research Network) :%0d%0ahttps%3A%2F%2Fwprn.org%2Fitem%2F${
              this.$route.params.id
            }%0d%0a%0d%0aBest regards,`,
          color: 'accent'
        }
      ]
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
      console.log('error: ', error)
      this.error = true
      this.checking = false
    }
  },
  methods: {
    subscribe () {
      console.log('SUBSCRIBE')
    }
  }
}
</script>
