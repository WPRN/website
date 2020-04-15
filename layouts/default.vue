<template>
  <v-app>
    <nuxt />
    <recaptcha @error="onError" @success="onSuccess" @expired="onExpired" />
    <v-footer
      class="justify-center"
      color="#292929"
      :class="{'pb-4':$vuetify.breakpoint.smAndDown}"
    >
      <div class="title font-weight-light grey--text text--lighten-1 text-center">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn text icon v-on="on">
              <a href="https://github.com/WPRN/website" target="_blank" rel="noopener noreferrer">
                <v-icon color="white">mdi-github</v-icon>
              </a>
            </v-btn>
          </template>
          <span>See this website source code and contribute</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn text icon v-on="on">
              <a href="https://twitter.com/WPRN_org" target="_blank" rel="noopener noreferrer">
                <v-icon color="white">mdi-twitter</v-icon>
              </a>
            </v-btn>
          </template>
          <span>Follow us on Twitter</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn text icon v-on="on">
              <a
                href="https://www.facebook.com/WPRN.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <v-icon color="white">mdi-facebook</v-icon>
              </a>
            </v-btn>
          </template>
          <span>Visit our Facebook page</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn text icon v-on="on">
              <a
                href="https://www.linkedin.com/company/wprn-world-pandemic-research-network/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <v-icon color="white">mdi-linkedin</v-icon>
              </a>
            </v-btn>
          </template>
          <span>Visit our Linkedin page</span>
        </v-tooltip>
        <br />
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn text icon v-on="on">
              <a
                href="http://creativecommons.org/licenses/by-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <v-icon color="white">mdi-creative-commons</v-icon>
              </a>
            </v-btn>
          </template>
          <span>This website is licenced under Creative Commons</span>
        </v-tooltip>
        <span class="body-2">
          {{ new Date().getFullYear() }} - This website is maintained by
          <a
            href="https://www.paris-iea.fr/en"
            target="_blank"
            rel="noopener noreferrer"
          >IAS Paris</a>.
          <a style="text-decoration:underline;" @click="showCredits=true">See full credits</a> -
          <nuxt-link to="/privacy_policy">Privacy Policy</nuxt-link>
        </span>

        <Credits :credits="showCredits" @closeCredits="showCredits=false" />
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import Credits from "~/components/navigation/Credits";
export default {
  data() {
    return {
      showCredits: false
    };
  },
  components: { Credits },
  methods: {
    onError(error) {},

    onSuccess(token) {},
    onExpired() {}
  }
};
</script>
